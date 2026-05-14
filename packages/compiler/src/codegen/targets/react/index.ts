import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { reactConformance } from "./conformance.ts";
import type { Code } from "../../code-ir/nodes.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
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
import { rewriteExpr, rewriteEventName, rewriteAttrName } from "../../shared/expr-rewrite.ts";
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "strip-call" },
  setterStyle: { kind: "function-call" },
  refAccess: { kind: "field", field: "current" },
  jsxAttrCasing: "react",
  eventNameCase: "camel",
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
  switch (node.kind) {
    case "Element": {
      const attrs = jsxAttrs(node, rules);
      const children = node.children.map((c) => emitNode(c, rules));
      return cJsxElement({ tag: node.tag, attrs, children, selfClose: children.length === 0 });
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
            }),
      );
      return cJsxElement({ tag, attrs, children, selfClose: children.length === 0 });
    }
    case "Text":
      return cJsxText({ text: node.value });
    case "Expression":
      return cExpr({ text: `{${rewriteExpr(node.expr, rules)}}` });
    case "If":
      return cExpr({ text: `{${buildTernary(node.branches, 0, node.fallback, rules)}}` });
    case "For": {
      const each = rewriteExpr(node.each.expr, rules);
      const params = node.indexBinding
        ? `(${node.itemBinding}, ${node.indexBinding})`
        : `(${node.itemBinding})`;
      const key = rewriteExpr(node.key.expr, rules);
      return cExpr({
        text: `{${each}.map(${params} => (<React.Fragment key={${key}}>${inlineNode(node.body, rules)}</React.Fragment>))}`,
      });
    }
    case "Switch": {
      let result = "null";
      for (let i = node.cases.length - 1; i >= 0; i--) {
        const c = node.cases[i];
        result = `${rewriteExpr(c.test.expr, rules)} ? ${inlineNode(c.body, rules)} : ${result}`;
      }
      if (node.fallback) result = result.replace(/null$/, inlineNode(node.fallback, rules));
      return cExpr({ text: `{${result}}` });
    }
    case "SlotPlaceholder": {
      if (node.name === "default") {
        return node.fallback
          ? cExpr({ text: `{children ?? ${inlineNode(node.fallback, rules)}}` })
          : cExpr({ text: "{children}" });
      }
      const prop = `render${node.name.charAt(0).toUpperCase()}${node.name.slice(1)}`;
      return node.fallback
        ? cExpr({ text: `{${prop}?.() ?? ${inlineNode(node.fallback, rules)}}` })
        : cExpr({ text: `{${prop}?.()}` });
    }
    case "Fragment":
      return cJsxElement({
        tag: "",
        attrs: [],
        children: node.children.map((c) => emitNode(c, rules)),
        selfClose: false,
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

function inlineNode(node: IRNode, rules: RewriteRules): string {
  const code = emitNode(node, rules);
  if (code.kind === "CJsxText") return `"${code.text}"`;
  if (code.kind === "CExpr") return code.text;
  return "(<>...</>)";
}

function depsList(deps: readonly { readonly name: string }[]): string {
  return deps.length === 0 ? "[]" : `[${deps.map((d) => d.name).join(", ")}]`;
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
      }),
    );
  }
  for (const m of component.memos) {
    reactImports.push("useMemo");
    body.push(
      cStmt({
        body: `const ${m.name} = useMemo(() => ${rewriteExpr(m.expr.expr, rules)}, [${m.expr.deps.map((d) => d.name).join(", ")}])`,
      }),
    );
  }
  for (const e of component.effects) {
    reactImports.push("useEffect");
    body.push(cStmt({ body: `useEffect(${rewriteExpr(e.body, rules)}, ${depsList(e.deps)})` }));
  }
  for (const r of component.refs) {
    reactImports.push("useRef");
    body.push(
      cStmt({ body: `const ${r.name} = useRef${r.elementType ? `<${r.elementType}>` : ""}(null)` }),
    );
  }
  for (const m of component.lifecycle.onMount) {
    reactImports.push("useEffect");
    body.push(cStmt({ body: `useEffect(${rewriteExpr(m.body, rules)}, [])` }));
  }
  for (const c of component.lifecycle.onCleanup) {
    reactImports.push("useEffect");
    body.push(cStmt({ body: `useEffect(() => ${rewriteExpr(c.body, rules)}, [])` }));
  }

  const unique = [...new Set(reactImports)];
  const imports: Code[] =
    unique.length > 0
      ? [cImport({ module: "react", named: unique.map((i) => ({ imported: i })) })]
      : [];

  const hasDefaultSlot = component.slots.some((s) => s.name === "default");
  const propsType = hasDefaultSlot ? "{ children?: React.ReactNode }" : "Record<string, never>";
  const renderTree = emitNode(component.render, rules);

  const file = cFile({
    flavor: "tsx",
    children: [
      cRaw({ text: '"use client";' }),
      cRaw({ text: "" }),
      ...imports,
      cRaw({ text: "" }),
      cStmt({ body: `export function ${component.name}(props: ${propsType})` }),
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
      cRaw({ text: "}" }),
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
