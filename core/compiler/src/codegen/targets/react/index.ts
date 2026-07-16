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
import {
  rewriteExpr,
  rewriteEventName,
  rewriteAttrName,
  extractKeyBody,
  eventToCallbackProp,
  callbackPropRules,
  reactiveReadNames,
} from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import { childrenArePhrasing } from "../../shared/phrasing.ts";
import {
  FALLTHROUGH_REST,
  classMergeExpr,
  rootAcceptsFallthrough,
} from "../../shared/fallthrough.ts";
import { unwrapRootExpr } from "../../shared/root-expr.ts";
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
  // A named slot is a plain node/function prop (default → `children`); filled iff non-null.
  // Parenthesized so it composes safely under `!`, `&&`, etc.
  hasSlotCheck: (name) => `(props.${name === "default" ? "children" : name} != null)`,
};

/** Capitalize the first character (for deriving `useState` setter names: `data` → `setData`). */
function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

// ── Attribute fallthrough (Vue-style attribute inheritance) ─────────

/**
 * Props destructured out of the rest so they never leak onto the root DOM element. A prop that
 * declares a default gets `name = <default>` so an omitted prop resolves to the default; the
 * destructured local is what the JSX reads (`props.color` is rewritten to the local), so the
 * default takes effect.
 */
function fallthroughRestBindings(component: IRComponent, rules: RewriteRules): string[] {
  const names = new Set<string>();
  for (const slot of component.slots) {
    if (slot.name === "default") {
      names.add(slot.isScoped ? "renderDefault" : "children");
    } else {
      names.add(slot.name);
    }
  }
  for (const p of component.props) {
    names.add(p.defaultValue ? `${p.name} = ${rewriteExpr(p.defaultValue.expr, rules)}` : p.name);
  }
  // Models contribute a value prop + an update callback; emitted events contribute a callback prop.
  // None may leak onto the root DOM element via the rest spread.
  for (const m of component.models) {
    names.add(m.propName);
    names.add(eventToCallbackProp(`update:${m.propName}`));
  }
  for (const ev of component.events) {
    names.add(eventToCallbackProp(ev.name));
  }
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
  isComponent = false,
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
    const name = rewriteAttrName(a.name, rules, isComponent);
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
    // A `$bind:<prop>` on a component lowers to an `update:<prop>` event; emit it as the child's
    // `onUpdate<Prop>` callback prop rather than a (colon-bearing) DOM event name.
    const name = e.twoWayProp ? eventToCallbackProp(e.name) : rewriteEventName(e.name, rules);
    out.push(
      cJsxAttr({
        name,
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
        inline: childrenArePhrasing(node.children),
        span,
      });
    }
    case "ComponentInstance": {
      const tag = node.resolved?.name ?? node.reference.getText();
      const attrs = jsxAttrs(node, rules, true);
      // The default slot is `children`; a named slot is consumed as a prop (see the `SlotPlaceholder`
      // case) — a node prop (`prefix={<>$</>}`) when unscoped, a function prop (`item={(row) => …}`)
      // when it takes args. A `<Tag.name>` child would never reach the consumer.
      const children: Code[] = [];
      for (const s of node.slots) {
        if (s.name === "default") {
          children.push(emitNode(s.body, rules));
        } else {
          const value =
            s.scopedParams.length > 0
              ? `(${s.scopedParams.join(", ")}) => (${inlineNode(s.body, rules)})`
              : inlineNode(s.body, rules);
          attrs.push(
            cJsxAttr({ name: s.name, value: { kind: "expr", expr: cExpr({ text: value }) } }),
          );
        }
      }
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
      const key = extractKeyBody(node.key.expr, rules);
      return cExpr({
        text: `{${each}.map(${params} => (<Fragment key={${key}}>${inlineNode(node.body, rules)}</Fragment>))}`,
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
      // A named slot is a node prop (unscoped) or a function prop (scoped), mirroring the fill.
      if (node.scopedArgs.length > 0) {
        return node.fallback
          ? cExpr({
              text: `{props.${node.name}?.(${argsStr}) ?? ${inlineNode(node.fallback, rules)}}`,
              span,
            })
          : cExpr({ text: `{props.${node.name}?.(${argsStr})}`, span });
      }
      return node.fallback
        ? cExpr({ text: `{props.${node.name} ?? ${inlineNode(node.fallback, rules)}}`, span })
        : cExpr({ text: `{props.${node.name}}`, span });
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
    if (node.scopedArgs.length > 0) {
      return node.fallback
        ? `props.${node.name}?.(${argsStr}) ?? ${inlineNode(node.fallback, rules)}`
        : `props.${node.name}?.(${argsStr})`;
    }
    return node.fallback
      ? `props.${node.name} ?? ${inlineNode(node.fallback, rules)}`
      : `props.${node.name}`;
  }
  return inlineCode(emitNode(node, rules));
}

function depRef(
  d: { readonly name: string; readonly path: readonly string[] },
  modelReads?: ReadonlyMap<string, string>,
): string {
  // A model getter dep is `{ name: "<getter>", path: [] }` (models are minted as signals), so map it
  // to the same prop read the body uses (`props.<prop>`); otherwise the deps array would reference a
  // bare local declared by the later props destructuring — a temporal-dead-zone ReferenceError.
  // Signals stay bare (they're `useState` locals) and props stay `props.x` (no modelReads entry).
  const root = modelReads?.get(d.name) ?? d.name;
  return d.path.length > 0 ? `${root}.${d.path.join(".")}` : root;
}

function depsList(
  deps: readonly { readonly name: string; readonly path: readonly string[] }[],
  modelReads?: ReadonlyMap<string, string>,
): string {
  // Dedupe: the same reactive value may be read more than once in the body.
  const refs = [...new Set(deps.map((d) => depRef(d, modelReads)))];
  return `[${refs.join(", ")}]`;
}

function buildPropsType(component: IRComponent): string {
  const parts: string[] = [];

  if (component.propsTypeText) {
    parts.push(component.propsTypeText);
  } else if (component.props.length > 0) {
    const defs = component.props
      .map((p) => {
        const opt = p.required ? "" : "?";
        const typeStr = p.typeText ?? p.typeNode?.getText();
        const type = typeStr ? `: ${typeStr}` : "";
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
      const type = slot.isScoped ? "(...args: any[]) => React.ReactNode" : "React.ReactNode";
      slotFields.push(`${slot.name}?: ${type}`);
    }
  }
  if (slotFields.length > 0) {
    parts.push(`{ ${slotFields.join("; ")} }`);
  }

  // Models surface a value prop + its update callback; emitted events surface a callback prop. Sourced
  // from component.models/events so they appear even when props come from an interface (propsTypeText).
  const emissionFields: string[] = [];
  for (const m of component.models) {
    const t = m.typeNode?.getText() ?? "unknown";
    emissionFields.push(`${m.propName}?: ${t}`);
    emissionFields.push(`${eventToCallbackProp(`update:${m.propName}`)}?: (value: ${t}) => void`);
  }
  for (const ev of component.events) {
    emissionFields.push(`${eventToCallbackProp(ev.name)}?: (...args: any[]) => void`);
  }
  if (emissionFields.length > 0) {
    parts.push(`{ ${emissionFields.join("; ")} }`);
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

// A `<For>`/`.map()` lowering wraps each row in a keyed `<Fragment>` (a keyed list needs a real
// Fragment, not the `<>` shorthand), so the named `Fragment` value must be imported from React.
function containsForLoop(node: IRNode): boolean {
  switch (node.kind) {
    case "For":
      return true;
    case "Element":
    case "Fragment":
      return node.children.some(containsForLoop);
    case "If":
      return (
        node.branches.some((b) => containsForLoop(b.body)) ||
        (node.fallback ? containsForLoop(node.fallback) : false)
      );
    case "Switch":
      return (
        node.cases.some((c) => containsForLoop(c.body)) ||
        (node.fallback ? containsForLoop(node.fallback) : false)
      );
    case "ComponentInstance":
      return node.slots.some((s) => containsForLoop(s.body));
    case "Transition":
      return containsForLoop(node.child);
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
  // Model getters read `props.<prop>`, model setters and `emit(…)` call `props.on…?.()` callbacks.
  const rules: RewriteRules = {
    ...ctx.rewrites,
    ...callbackPropRules(component.models, component.emitName),
    reactiveReads: reactiveReadNames(component),
  };
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
  // Refs are inert `null` declarations that depend on nothing, so they must precede any memo or
  // effect that reads them: React deps arrays (`[ref.current, …]`) are evaluated synchronously at
  // the `useMemo`/`useEffect` call site, so a ref referenced before its `const` declaration is a
  // temporal-dead-zone ReferenceError (INK-12).
  for (const r of component.refs) {
    reactImports.push("useRef");
    body.push(
      cStmt({
        body: `const ${r.name} = useRef${r.elementType ? `<${r.elementType}>` : ""}(null)`,
        span: r.loc,
      }),
    );
  }
  for (const m of component.memos) {
    reactImports.push("useMemo");
    body.push(
      cStmt({
        body: `const ${m.name} = useMemo(() => ${rewriteExpr(m.expr.expr, rules)}, ${depsList(m.expr.deps, rules.modelReads)})`,
        span: m.loc,
      }),
    );
  }
  for (const e of component.effects) {
    reactImports.push("useEffect");
    body.push(
      cStmt({
        body: `useEffect(${rewriteExpr(e.body, rules)}, ${depsList(e.deps, rules.modelReads)})`,
        span: e.loc,
      }),
    );
  }
  for (const res of component.resources) {
    // Lower a resource to manual fetch-with-state: `data`/`loading`/`error` become `useState`,
    // and a `useEffect` runs the fetcher once on mount, piping its result/error into the setters.
    reactImports.push("useState", "useEffect");
    const dataSetter = `set${capitalize(res.name)}`;
    body.push(
      cStmt({
        body: `const [${res.name}, ${dataSetter}] = useState(undefined)`,
        span: res.loc,
      }),
    );
    if (res.loadingName) {
      body.push(
        cStmt({
          body: `const [${res.loadingName}, set${capitalize(res.loadingName)}] = useState(true)`,
          span: res.loc,
        }),
      );
    }
    let errorSetter: string | undefined;
    if (res.errorName) {
      errorSetter = `set${capitalize(res.errorName.replace(/^_+/, ""))}`;
      body.push(
        cStmt({
          body: `const [${res.errorName}, ${errorSetter}] = useState(undefined)`,
          span: res.loc,
        }),
      );
    }
    const fetcher = rewriteExpr(res.fetcher.expr, rules);
    const catchPart = errorSetter ? `.catch(${errorSetter})` : "";
    const finallyPart = res.loadingName
      ? `.finally(() => set${capitalize(res.loadingName)}(false))`
      : "";
    body.push(
      cStmt({
        body: `useEffect(() => { (${fetcher})().then(${dataSetter})${catchPart}${finallyPart}; }, [])`,
        span: res.loc,
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

  // Props with a default destructure into a local with that default applied; the render tree then
  // reads the local (via `propLocals`) so an omitted prop resolves to its default.
  const propsWithDefaults = component.props.filter((p) => p.defaultValue !== undefined);
  const propLocals = new Set(propsWithDefaults.map((p) => p.name));

  if (rootAcceptsFallthrough(component)) {
    const bindings = fallthroughRestBindings(component, rules);
    const prefix = bindings.length > 0 ? `${bindings.join(", ")}, ` : "";
    body.push(cStmt({ body: `const { ${prefix}...${FALLTHROUGH_REST} } = props` }));
  } else if (propsWithDefaults.length > 0) {
    // No fallthrough rest binding to carry the defaults — destructure the default-bearing props on
    // their own so each local exists with its default applied.
    const defs = propsWithDefaults
      .map((p) => `${p.name} = ${rewriteExpr(p.defaultValue!.expr, rules)}`)
      .join(", ");
    body.push(cStmt({ body: `const { ${defs} } = props` }));
  }

  const needsTransition = hasTransition(component.render);
  if (needsTransition) {
    reactImports.push("useState", "useEffect", "useRef");
  }

  if (containsForLoop(component.render)) {
    reactImports.push("Fragment");
  }

  const propsType = buildPropsType(component);

  // The render tree reads resource bindings (`data`/`loading`/`error`) by their bare name; flag them
  // as reactive so a bare read follows React's `reactiveRead` (strip-call, so they stay verbatim).
  const resourceReads = new Set(
    component.resources.flatMap((r) => [r.name, r.loadingName, r.errorName].filter(Boolean)),
  ) as Set<string>;
  const renderRules: RewriteRules = {
    ...rules,
    reactiveBindings: new Set([...(rules.reactiveBindings ?? []), ...resourceReads]),
    propLocals,
  };

  let renderTree = emitNode(component.render, renderRules);

  for (const p of component.provides) {
    const valueExpr = rewriteExpr(p.value.expr, renderRules);
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
      // Span the function signature + return so coverage tools attribute the component function and
      // its render statement to their authored positions (not the lone render-expression mapping).
      cStmt({ body: signature, span: component.loc }),
      cRaw({ text: "{" }),
      cGroup({
        children: [
          ...body,
          cRaw({ text: "" }),
          cStmt({ body: "return (", span: component.render.loc }),
          unwrapRootExpr(renderTree),
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
