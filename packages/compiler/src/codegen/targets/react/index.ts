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
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "strip-call" },
  setterStyle: { kind: "function-call" },
  refAccess: { kind: "field", field: "current" },
  jsxAttrCasing: "react",
  eventNameCase: "camel",
  members: {
    props: { strip: true },
    slots: { strip: true, rename: { default: "children" } },
  },
};

// ── Shared attr helpers ────────────────────────────────────────────

function jsxAttrs(
  node: {
    readonly attrs: readonly any[];
    readonly events: readonly any[];
    readonly refs: readonly any[];
  },
  rules: RewriteRules,
) {
  const out = node.attrs.map((a: any) => {
    const name = rewriteAttrName(a.name, rules);
    if (a.value.kind === "Static") {
      const v = a.value.value;
      return typeof v === "boolean"
        ? cJsxAttr({ name, value: { kind: "boolean" } })
        : cJsxAttr({ name, value: { kind: "static", text: String(v) } });
    }
    return cJsxAttr({
      name,
      value: { kind: "expr", expr: cExpr({ text: rewriteExpr(a.value.expr, rules) }) },
    });
  });
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
      if (node.name === "default") {
        return node.fallback
          ? cExpr({ text: `{children ?? ${inlineNode(node.fallback, rules)}}`, span })
          : cExpr({ text: "{children}", span });
      }
      const prop = `render${node.name.charAt(0).toUpperCase()}${node.name.slice(1)}`;
      return node.fallback
        ? cExpr({ text: `{${prop}?.() ?? ${inlineNode(node.fallback, rules)}}`, span })
        : cExpr({ text: `{${prop}?.()}`, span });
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
  return inlineCode(emitNode(node, rules));
}

function depsList(deps: readonly { readonly name: string }[]): string {
  return deps.length === 0 ? "[]" : `[${deps.map((d) => d.name).join(", ")}]`;
}

function buildPropsType(component: IRComponent, hasDefaultSlot: boolean): string {
  const parts: string[] = [];

  if (component.props.length > 0) {
    const defs = component.props
      .map((p) => {
        const opt = p.required ? "" : "?";
        const type = p.typeNode ? `: ${p.typeNode.getText()}` : "";
        return `${p.name}${opt}${type}`;
      })
      .join("; ");
    parts.push(`{ ${defs} }`);
  }

  if (hasDefaultSlot) {
    parts.push("{ children?: React.ReactNode }");
  }

  return parts.length > 0 ? parts.join(" & ") : "Record<string, never>";
}

// ── Emit entry point ───────────────────────────────────────────────

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  const rules = ctx.rewrites;
  const body: Code[] = [];
  const reactImports: string[] = [];

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

  const hasDefaultSlot = component.slots.some((s) => s.name === "default");
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

  const propsType = buildPropsType(component, hasDefaultSlot);
  const renderTree = emitNode(component.render, rules);

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
    component.styles.length > 0
      ? [cRaw({ text: `import styles from "./${component.name}.module.css";` })]
      : [];

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
      ...styleImport,
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
