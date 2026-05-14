import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { qwikConformance } from "./conformance.ts";
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
  reactiveRead: { kind: "field-access", field: "value" },
  setterStyle: { kind: "field-assignment", field: "value" },
  refAccess: { kind: "field", field: "value" },
  jsxAttrCasing: "html",
  eventNameCase: "camel",
  members: { props: { strip: false } },
};

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
        value: {
          kind: "expr",
          expr: cExpr({ text: `$(() => ${rewriteExpr(e.handler.expr, rules)})` }),
        },
      }),
    );
  }
  return out;
}

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
      return cJsxElement({ tag, attrs, children: [], selfClose: true });
    }
    case "Text":
      return cJsxText({ text: node.value });
    case "Expression":
      return cExpr({ text: `{${rewriteExpr(node.expr, rules)}}` });
    case "If":
      return cExpr({
        text: `{${node.branches.map((b) => `${rewriteExpr(b.test.expr, rules)} ? (<>${emitNodeInline(b.body, rules)}</>)`).join(" : ")} : ${node.fallback ? `(<>${emitNodeInline(node.fallback, rules)}</>)` : "null"}}`,
      });
    case "For":
      return cExpr({
        text: `{${rewriteExpr(node.each.expr, rules)}.map((${node.itemBinding}) => (<>${emitNodeInline(node.body, rules)}</>))}`,
      });
    case "Switch":
      return cExpr({
        text: `{${node.cases.map((c) => `${rewriteExpr(c.test.expr, rules)} ? (<>${emitNodeInline(c.body, rules)}</>)`).join(" : ")} : null}`,
      });
    case "SlotPlaceholder":
      return cExpr({ text: `{props.${node.name === "default" ? "children" : node.name}}` });
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

function emitNodeInline(node: IRNode, rules: RewriteRules): string {
  const code = emitNode(node, rules);
  if (code.kind === "CJsxText") return code.text;
  if (code.kind === "CExpr") return code.text;
  return "";
}

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  const rules = ctx.rewrites;
  const body: Code[] = [];
  const qwikImports = ["component$", "useSignal", "useComputed$", "useVisibleTask$", "$"];

  for (const s of component.state) {
    body.push(
      cStmt({
        body: `const ${s.name} = useSignal(${rewriteExpr(s.initial.expr, rules)})`,
        span: s.loc,
      }),
    );
  }
  for (const m of component.memos) {
    body.push(
      cStmt({
        body: `const ${m.name} = useComputed$(() => ${rewriteExpr(m.expr.expr, rules)})`,
        span: m.loc,
      }),
    );
  }
  for (const e of component.effects) {
    body.push(cStmt({ body: `useVisibleTask$(${rewriteExpr(e.body, rules)})`, span: e.loc }));
  }

  const renderTree = emitNode(component.render, rules);

  const file = cFile({
    flavor: "tsx",
    children: [
      cImport({ module: "@builder.io/qwik", named: qwikImports.map((i) => ({ imported: i })) }),
      cRaw({ text: "" }),
      cStmt({ body: `export const ${component.name} = component$(() =>` }),
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
      cRaw({ text: "});" }),
    ],
  });

  return { componentName: component.name, root: file, fileName: `${component.name}.tsx` };
}

export const qwik: Target = {
  name: "qwik",
  rewrites: REWRITES,
  conformance: qwikConformance,
  emit,
};
export default qwik;
