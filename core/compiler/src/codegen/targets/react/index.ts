import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { reactConformance } from "./conformance.ts";
import type { Code } from "../../code-ir/nodes.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import type { SourceLocation } from "../../../ir/types.ts";
import {
  cFile,
  cImport,
  cStmt,
  cExpr,
  cRaw,
  cJsxElement,
  cJsxAttr,
  cJsxText,
  cGroup,
} from "../../code-ir/builders.ts";
import * as ts from "typescript";
import { rewriteExpr, rewriteEventName, rewriteAttrName } from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import {
  FALLTHROUGH_REST,
  classMergeExpr,
  rootAcceptsFallthrough,
} from "../../shared/fallthrough.ts";
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "strip-call" },
  setterStyle: { kind: "function-call" },
  refAccess: { kind: "field", field: "current" },
  jsxAttrCasing: "react",
  eventNameCase: "camel",
  members: {
    props: { strip: false },
    slots: { strip: true, rename: { default: "children" } },
  },
};

// ── Attribute fallthrough (Vue-style attribute inheritance) ─────────

/** Props destructured out of the rest so they never leak onto the root DOM element. */
function fallthroughRestBindings(component: IRComponent): string[] {
  const names = new Set<string>();
  for (const slot of component.slots) {
    if (slot.name === "default") {
      names.add(slot.isScoped ? "renderDefault" : "children");
    } else {
      names.add(`render${slot.name.charAt(0).toUpperCase()}${slot.name.slice(1)}`);
    }
  }
  for (const p of component.props) names.add(p.name);
  return [...names];
}

// ── Shared attr helpers ────────────────────────────────────────────

function jsxAttrs(
  node: {
    readonly attrs: readonly any[];
    readonly events: readonly any[];
    readonly refs: readonly any[];
    readonly acceptsAttrFallthrough?: boolean;
  },
  rules: RewriteRules,
) {
  const fallthrough = node.acceptsAttrFallthrough === true;
  const out = [];

  // Spread inherited attributes first so authored attributes below win on conflict.
  if (fallthrough) {
    out.push(cJsxAttr({ name: `{...${FALLTHROUGH_REST}}`, value: { kind: "boolean" } }));
  }

  let classMerged = false;
  for (const a of node.attrs as any[]) {
    if (fallthrough && a.binding === "class") {
      const authored =
        a.value.kind === "Static"
          ? JSON.stringify(String(a.value.value))
          : rewriteExpr(a.value.expr, rules);
      out.push(
        cJsxAttr({
          name: "className",
          value: {
            kind: "expr",
            expr: cExpr({ text: classMergeExpr(authored, "props.className") }),
          },
        }),
      );
      classMerged = true;
      continue;
    }
    const name = rewriteAttrName(a.name, rules);
    if (a.value.kind === "Static") {
      const v = a.value.value;
      out.push(
        typeof v === "boolean"
          ? cJsxAttr({ name, value: { kind: "boolean" } })
          : cJsxAttr({ name, value: { kind: "static", text: String(v) } }),
      );
    } else {
      out.push(
        cJsxAttr({
          name,
          value: { kind: "expr", expr: cExpr({ text: rewriteExpr(a.value.expr, rules) }) },
        }),
      );
    }
  }

  // Root has no authored class but still inherits one — forward it.
  if (fallthrough && !classMerged) {
    out.push(
      cJsxAttr({
        name: "className",
        value: { kind: "expr", expr: cExpr({ text: classMergeExpr(null, "props.className") }) },
      }),
    );
  }

  for (const e of node.events) {
    out.push(
      cJsxAttr({
        name: rewriteEventName(e.name, rules),
        value: { kind: "expr", expr: cExpr({ text: rewriteExpr(e.handler.expr, rules) }) },
      }),
    );
  }
  for (const r of node.refs) {
    out.push(
      cJsxAttr({
        name: "ref",
        value: { kind: "expr", expr: cExpr({ text: rewriteExpr(r.ref.expr, rules) }) },
      }),
    );
  }
  return out;
}

// ── Render-tree walker ─────────────────────────────────────────────

function emitNode(node: IRNode, rules: RewriteRules): Code {
  const span = "loc" in node ? (node as { loc: SourceLocation }).loc : undefined;

  switch (node.kind) {
    case "Element": {
      const attrs = jsxAttrs(node, rules);
      const children = node.children.map((c) => emitNode(c, rules));
      return cJsxElement({
        tag: node.tag,
        attrs,
        children,
        selfClose: children.length === 0,
        span,
      });
    }
    case "ComponentInstance": {
      const tag = node.resolved?.name ?? node.reference.getText();
      const attrs = jsxAttrs(node, rules);
      const children = node.slots.map((s) =>
        s.name === "default"
          ? emitNode(s.body, rules)
          : cJsxElement({
              tag: `${tag}.${s.name}`,
              attrs: [],
              children: [emitNode(s.body, rules)],
              selfClose: false,
              span: s.loc,
            }),
      );
      return cJsxElement({ tag, attrs, children, selfClose: children.length === 0, span });
    }
    case "Text":
      return cJsxText({ text: node.value, span });
    case "Expression":
      return cExpr({ text: `{${rewriteExpr(node.expr, rules)}}`, span });
    case "If":
      return cExpr({
        text: `{${buildTernary(node.branches, 0, node.fallback, rules)}}`,
        span,
      });
    case "For": {
      const each = rewriteExpr(node.each.expr, rules);
      const params = node.indexBinding
        ? `(${node.itemBinding}, ${node.indexBinding})`
        : `(${node.itemBinding})`;
      const key = rewriteExpr(node.key.expr, rules);
      return cExpr({
        text: `{${each}.map(${params} => (<React.Fragment key={${key}}>${inlineNode(node.body, rules)}</React.Fragment>))}`,
        span,
      });
    }
    case "Switch": {
      let result = node.fallback ? inlineNode(node.fallback, rules) : "null";
      for (let i = node.cases.length - 1; i >= 0; i--) {
        const c = node.cases[i];
        result = `${rewriteExpr(c.test.expr, rules)} ? ${inlineNode(c.body, rules)} : ${result}`;
      }
      return cExpr({ text: `{${result}}`, span });
    }
    case "SlotPlaceholder": {
      const argsStr =
        node.scopedArgs.length > 0
          ? node.scopedArgs.map((a) => rewriteExpr(a.expr, rules)).join(", ")
          : "";
      if (node.name === "default") {
        if (node.scopedArgs.length > 0) {
          return node.fallback
            ? cExpr({
                text: `{props.renderDefault?.(${argsStr}) ?? ${inlineNode(node.fallback, rules)}}`,
                span,
              })
            : cExpr({ text: `{props.renderDefault?.(${argsStr})}`, span });
        }
        return node.fallback
          ? cExpr({ text: `{props.children ?? ${inlineNode(node.fallback, rules)}}`, span })
          : cExpr({ text: "{props.children}", span });
      }
      const prop = `render${node.name.charAt(0).toUpperCase()}${node.name.slice(1)}`;
      return node.fallback
        ? cExpr({
            text: `{props.${prop}?.(${argsStr}) ?? ${inlineNode(node.fallback, rules)}}`,
            span,
          })
        : cExpr({ text: `{props.${prop}?.(${argsStr})}`, span });
    }
    case "Transition": {
      const attrs = [cJsxAttr({ name: "name", value: { kind: "static", text: node.name } })];
      if (node.appear) {
        attrs.push(cJsxAttr({ name: "appear", value: { kind: "boolean" } }));
      }
      return cJsxElement({
        tag: "__InkTransition",
        attrs,
        children: [emitNode(node.child, rules)],
        selfClose: false,
        span,
      });
    }
    case "Fragment":
      return cJsxElement({
        tag: "",
        attrs: [],
        children: node.children.map((c) => emitNode(c, rules)),
        selfClose: false,
        span,
      });
    default:
      assertNever(node);
  }
}

function buildTernary(
  branches: readonly { readonly test: { readonly expr: any }; readonly body: IRNode }[],
  idx: number,
  fallback: IRNode | undefined,
  rules: RewriteRules,
): string {
  if (idx >= branches.length) return fallback ? inlineNode(fallback, rules) : "null";
  const b = branches[idx];
  return `${rewriteExpr(b.test.expr, rules)} ? ${inlineNode(b.body, rules)} : ${buildTernary(branches, idx + 1, fallback, rules)}`;
}

function inlineCode(code: Code): string {
  switch (code.kind) {
    case "CJsxText":
      return code.text;
    case "CExpr":
      return code.text;
    case "CJsxElement": {
      const tag = code.tag || "";
      const attrStr = code.attrs
        .map((a) => {
          if (a.kind !== "CJsxAttr") return "";
          if (a.value.kind === "boolean") return ` ${a.name}`;
          if (a.value.kind === "static") return ` ${a.name}="${a.value.text}"`;
          return ` ${a.name}={${a.value.expr.text}}`;
        })
        .join("");
      if (code.selfClose) return `<${tag}${attrStr} />`;
      const childStr = code.children.map((c) => inlineCode(c)).join("");
      return `<${tag}${attrStr}>${childStr}</${tag}>`;
    }
    case "CGroup":
      return code.children.map((c) => inlineCode(c)).join("");
    case "CRaw":
      return code.text;
    default:
      return "";
  }
}

function inlineNode(node: IRNode, rules: RewriteRules): string {
  if (node.kind === "Expression") {
    const expr = node.expr;
    if (ts.isArrowFunction(expr) && !ts.isBlock(expr.body)) {
      return rewriteExpr(expr.body, rules);
    }
    return rewriteExpr(expr, rules);
  }
  if (node.kind === "Text") {
    return `"${node.value}"`;
  }
  if (node.kind === "SlotPlaceholder") {
    const argsStr =
      node.scopedArgs.length > 0
        ? node.scopedArgs.map((a) => rewriteExpr(a.expr, rules)).join(", ")
        : "";
    if (node.name === "default") {
      if (node.scopedArgs.length > 0) {
        return node.fallback
          ? `props.renderDefault?.(${argsStr}) ?? ${inlineNode(node.fallback, rules)}`
          : `props.renderDefault?.(${argsStr})`;
      }
      return node.fallback
        ? `props.children ?? ${inlineNode(node.fallback, rules)}`
        : "props.children";
    }
    const prop = `render${node.name.charAt(0).toUpperCase()}${node.name.slice(1)}`;
    return node.fallback
      ? `props.${prop}?.(${argsStr}) ?? ${inlineNode(node.fallback, rules)}`
      : `props.${prop}?.(${argsStr})`;
  }
  return inlineCode(emitNode(node, rules));
}

function depsList(deps: readonly { readonly name: string }[]): string {
  return deps.length === 0 ? "[]" : `[${deps.map((d) => d.name).join(", ")}]`;
}

function buildPropsType(component: IRComponent): string {
  const parts: string[] = [];

  if (component.propsTypeText) {
    parts.push(component.propsTypeText);
  } else if (component.props.length > 0) {
    const defs = component.props
      .map((p) => {
        const opt = p.required ? "" : "?";
        const type = p.typeNode ? `: ${p.typeNode.getText()}` : "";
        return `${p.name}${opt}${type}`;
      })
      .join("; ");
    parts.push(`{ ${defs} }`);
  }

  const slotFields: string[] = [];
  for (const slot of component.slots) {
    if (slot.name === "default") {
      if (slot.isScoped) {
        slotFields.push("renderDefault?: (...args: any[]) => React.ReactNode");
      } else {
        slotFields.push("children?: React.ReactNode");
      }
    } else {
      const prop = `render${slot.name.charAt(0).toUpperCase()}${slot.name.slice(1)}`;
      slotFields.push(`${prop}?: (...args: any[]) => React.ReactNode`);
    }
  }
  if (slotFields.length > 0) {
    parts.push(`{ ${slotFields.join("; ")} }`);
  }

  // A fallthrough root accepts any host-element attribute the parent passes through.
  if (rootAcceptsFallthrough(component)) {
    parts.push("React.HTMLAttributes<HTMLElement>");
  }

  return parts.length > 0 ? parts.join(" & ") : "Record<string, never>";
}

// ── Transition helper ──────────────────────────────────────────────

function hasTransition(node: IRNode): boolean {
  if (node.kind === "Transition") return true;
  switch (node.kind) {
    case "Element":
    case "Fragment":
      return node.children.some(hasTransition);
    case "If":
      return (
        node.branches.some((b) => hasTransition(b.body)) ||
        (node.fallback ? hasTransition(node.fallback) : false)
      );
    case "For":
      return hasTransition(node.body);
    case "Switch":
      return (
        node.cases.some((c) => hasTransition(c.body)) ||
        (node.fallback ? hasTransition(node.fallback) : false)
      );
    case "ComponentInstance":
      return node.slots.some((s) => hasTransition(s.body));
    default:
      return false;
  }
}

const REACT_TRANSITION_HELPER = `function __InkTransition({ name = "ink", appear, children }: { name?: string; appear?: boolean; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(!!children);
  const prevRef = useRef(children);
  const mounted = useRef(false);
  const active = children !== null && children !== undefined && children !== false;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (active) {
      prevRef.current = children;
      if (!show) setShow(true);
      if (!mounted.current && !appear) { mounted.current = true; return; }
      mounted.current = true;
      el.classList.add(name + "-enter-from", name + "-enter-active");
      requestAnimationFrame(() => { el.classList.remove(name + "-enter-from"); el.classList.add(name + "-enter-to"); });
      const done = () => { el.classList.remove(name + "-enter-active", name + "-enter-to"); el.removeEventListener("transitionend", done); };
      el.addEventListener("transitionend", done, { once: true });
    } else if (show) {
      el.classList.add(name + "-leave-from", name + "-leave-active");
      requestAnimationFrame(() => { el.classList.remove(name + "-leave-from"); el.classList.add(name + "-leave-to"); });
      const done = () => { el.classList.remove(name + "-leave-active", name + "-leave-to"); el.removeEventListener("transitionend", done); setShow(false); };
      el.addEventListener("transitionend", done, { once: true });
      const t = setTimeout(done, 1000);
      return () => { clearTimeout(t); el.removeEventListener("transitionend", done); };
    }
  }, [active]);
  if (!show) return null;
  return <div ref={ref} style={{ display: "contents" }}>{active ? children : prevRef.current}</div>;
}`;

// ── Emit entry point ───────────────────────────────────────────────

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  const rules = ctx.rewrites;
  const body: Code[] = [];
  const reactImports: string[] = [];

  for (const c of component.consumes) {
    reactImports.push("useContext");
    body.push(cStmt({ body: `const ${c.name} = useContext(${c.contextName})`, span: c.loc }));
  }

  for (const s of component.state) {
    reactImports.push("useState");
    body.push(
      cStmt({
        body: `const [${s.name}, ${s.setterName}] = useState(${rewriteExpr(s.initial.expr, rules)})`,
        span: s.loc,
      }),
    );
  }
  for (const m of component.memos) {
    reactImports.push("useMemo");
    body.push(
      cStmt({
        body: `const ${m.name} = useMemo(() => ${rewriteExpr(m.expr.expr, rules)}, [${m.expr.deps.map((d) => d.name).join(", ")}])`,
        span: m.loc,
      }),
    );
  }
  for (const e of component.effects) {
    reactImports.push("useEffect");
    body.push(
      cStmt({ body: `useEffect(${rewriteExpr(e.body, rules)}, ${depsList(e.deps)})`, span: e.loc }),
    );
  }
  for (const res of component.resources) {
    reactImports.push("use");
    body.push(
      cStmt({
        body: `const ${res.name} = use(${rewriteExpr(res.fetcher.expr, rules)})`,
        span: res.loc,
      }),
    );
  }
  for (const r of component.refs) {
    reactImports.push("useRef");
    body.push(
      cStmt({
        body: `const ${r.name} = useRef${r.elementType ? `<${r.elementType}>` : ""}(null)`,
        span: r.loc,
      }),
    );
  }
  for (const m of component.lifecycle.onMount) {
    reactImports.push("useEffect");
    body.push(cStmt({ body: `useEffect(${rewriteExpr(m.body, rules)}, [])`, span: m.loc }));
  }
  for (const c of component.lifecycle.onCleanup) {
    reactImports.push("useEffect");
    body.push(cStmt({ body: `useEffect(() => ${rewriteExpr(c.body, rules)}, [])`, span: c.loc }));
  }

  const hasComponentRefs = component.refs.some((r) => r.category === "component");
  const needsForwardRef = hasComponentRefs || (component.expose && component.expose.length > 0);

  if (needsForwardRef) {
    reactImports.push("forwardRef");
    if (component.expose && component.expose.length > 0) {
      reactImports.push("useImperativeHandle");
      body.push(
        cStmt({
          body: `useImperativeHandle(ref, () => ({ ${component.expose.join(", ")} }))`,
        }),
      );
    }
  }

  if (rootAcceptsFallthrough(component)) {
    const bindings = fallthroughRestBindings(component);
    const prefix = bindings.length > 0 ? `${bindings.join(", ")}, ` : "";
    body.push(cStmt({ body: `const { ${prefix}...${FALLTHROUGH_REST} } = props` }));
  }

  const needsTransition = hasTransition(component.render);
  if (needsTransition) {
    reactImports.push("useState", "useEffect", "useRef");
  }

  const propsType = buildPropsType(component);
  let renderTree = emitNode(component.render, rules);

  for (const p of component.provides) {
    const valueExpr = rewriteExpr(p.value.expr, rules);
    renderTree = cJsxElement({
      tag: `${p.contextName}.Provider`,
      attrs: [
        cJsxAttr({
          name: "value",
          value: { kind: "expr", expr: cExpr({ text: valueExpr }) },
        }),
      ],
      children: [renderTree],
      selfClose: false,
    });
  }

  const contextDefs: Code[] = [];
  for (const ctxDef of ctx.contexts) {
    reactImports.push("createContext");
    const defaultText = ctxDef.defaultValue
      ? rewriteExpr(ctxDef.defaultValue.expr, rules)
      : "undefined";
    const typeParam = ctxDef.typeText ? `<${ctxDef.typeText}>` : "";
    contextDefs.push(
      cStmt({ body: `export const ${ctxDef.name} = createContext${typeParam}(${defaultText})` }),
    );
  }

  const updatedImports: Code[] =
    new Set(reactImports).size > 0
      ? [
          cImport({
            module: "react",
            named: [...new Set(reactImports)].map((i) => ({ imported: i })),
          }),
        ]
      : [];

  const signature = needsForwardRef
    ? `export const ${component.name} = forwardRef(function ${component.name}(props: ${propsType}, ref)`
    : `export function ${component.name}(props: ${propsType})`;

  const styleImport =
    component.styles.length > 0 ? [cRaw({ text: `import "./${component.name}.css";` })] : [];

  const runtimeDirective =
    component.runtime === "client"
      ? [cRaw({ text: '"use client";' })]
      : component.runtime === "server"
        ? [cRaw({ text: '"use server";' })]
        : [];

  const file = cFile({
    flavor: "tsx",
    children: [
      ...runtimeDirective,
      ...(runtimeDirective.length > 0 ? [cRaw({ text: "" })] : []),
      ...updatedImports,
      ...emitComponentImports(ctx.componentImports, "", false),
      ...ctx.externalImports,
      ...styleImport,
      ...(ctx.typeDeclarations.length > 0 ? [cRaw({ text: "" }), ...ctx.typeDeclarations] : []),
      ...(contextDefs.length > 0 ? [cRaw({ text: "" }), ...contextDefs] : []),
      ...(needsTransition ? [cRaw({ text: "" }), cRaw({ text: REACT_TRANSITION_HELPER })] : []),
      cRaw({ text: "" }),
      cStmt({ body: signature }),
      cRaw({ text: "{" }),
      cGroup({
        children: [
          ...body,
          cRaw({ text: "" }),
          cStmt({ body: "return (" }),
          renderTree,
          cStmt({ body: ")" }),
        ],
      }),
      cRaw({ text: needsForwardRef ? "});" : "}" }),
    ],
  });
  return { componentName: component.name, root: file, fileName: `${component.name}.tsx` };
}

export const react: Target = {
  name: "react",
  rewrites: REWRITES,
  conformance: reactConformance,
  emit,
};
export default react;
