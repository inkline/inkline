import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { solidConformance } from "./conformance.ts";
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
import * as ts from "typescript";
import { rewriteExpr, rewriteEventName, rewriteAttrName } from "../../shared/expr-rewrite.ts";
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "preserve-call" },
  setterStyle: { kind: "function-call" },
  refAccess: { kind: "bare" },
  jsxAttrCasing: "html",
  eventNameCase: "lower",
  members: { props: { strip: false } },
};

// ── Shared attr / event / ref helpers ──────────────────────────────

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
    const name = rewriteExpr(r.ref.expr, rules);
    out.push(
      cJsxAttr({
        name: "ref",
        value: { kind: "expr", expr: cExpr({ text: `(el) => ${name} = el` }) },
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
    case "If": {
      let fallback: Code | undefined = node.fallback ? emitNode(node.fallback, rules) : undefined;

      for (let i = node.branches.length - 1; i >= 0; i--) {
        const b = node.branches[i]!;
        const attrs = [
          cJsxAttr({
            name: "when",
            value: { kind: "expr", expr: cExpr({ text: rewriteExpr(b.test.expr, rules) }) },
          }),
          ...(fallback
            ? [
                cJsxAttr({
                  name: "fallback",
                  value: {
                    kind: "expr",
                    expr: cExpr({ text: `<>${inlineCode(fallback)}</>` }),
                  },
                }),
              ]
            : []),
        ];
        const show = cJsxElement({
          tag: "Show",
          attrs,
          children: [emitNode(b.body, rules)],
          selfClose: false,
        });
        fallback = show;
      }

      return fallback!;
    }
    case "For": {
      const params = node.indexBinding
        ? `(${node.itemBinding}, ${node.indexBinding})`
        : `(${node.itemBinding})`;
      let bodyStr: string;
      if (node.body.kind === "Expression" && ts.isArrowFunction(node.body.expr)) {
        const arrow = node.body.expr;
        const arrowBody = ts.isBlock(arrow.body)
          ? rewriteExpr(arrow, rules)
          : rewriteExpr(arrow.body, rules);
        bodyStr = arrowBody;
      } else {
        bodyStr = inlineNode(node.body, rules);
      }
      return cJsxElement({
        tag: "For",
        attrs: [
          cJsxAttr({
            name: "each",
            value: { kind: "expr", expr: cExpr({ text: rewriteExpr(node.each.expr, rules) }) },
          }),
        ],
        children: [cExpr({ text: `{${params} => ${bodyStr}}` })],
        selfClose: false,
      });
    }
    case "Switch": {
      const children = node.cases.map((c) =>
        cJsxElement({
          tag: "Match",
          attrs: [
            cJsxAttr({
              name: "when",
              value: { kind: "expr", expr: cExpr({ text: rewriteExpr(c.test.expr, rules) }) },
            }),
          ],
          children: [emitNode(c.body, rules)],
          selfClose: false,
        }),
      );
      const switchAttrs = node.fallback
        ? [
            cJsxAttr({
              name: "fallback",
              value: {
                kind: "expr",
                expr: cExpr({ text: `<>${inlineCode(emitNode(node.fallback, rules))}</>` }),
              },
            }),
          ]
        : [];
      return cJsxElement({ tag: "Switch", attrs: switchAttrs, children, selfClose: false });
    }
    case "SlotPlaceholder":
      return node.fallback
        ? cExpr({ text: `{props.${node.name} ?? ${inlineNode(node.fallback, rules)}}` })
        : cExpr({ text: `{props.${node.name}}` });
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
  return inlineCode(emitNode(node, rules));
}

// ── Control-flow import collector ──────────────────────────────────

function collectCFImports(node: IRNode, out: string[]): void {
  switch (node.kind) {
    case "If":
      out.push("Show");
      node.branches.forEach((b) => collectCFImports(b.body, out));
      if (node.fallback) collectCFImports(node.fallback, out);
      break;
    case "For":
      out.push("For");
      collectCFImports(node.body, out);
      break;
    case "Switch":
      out.push("Switch", "Match");
      node.cases.forEach((c) => collectCFImports(c.body, out));
      if (node.fallback) collectCFImports(node.fallback, out);
      break;
    case "Element":
    case "Fragment":
      (node.kind === "Element" ? node.children : node.children).forEach((c) =>
        collectCFImports(c, out),
      );
      break;
    case "ComponentInstance":
      node.slots.forEach((s) => collectCFImports(s.body, out));
      break;
    case "Text":
    case "Expression":
    case "SlotPlaceholder":
      break;
    default:
      assertNever(node);
  }
}

// ── Emit entry point ───────────────────────────────────────────────

function buildSolidPropsType(component: IRComponent): string {
  if (component.props.length === 0) return "Record<string, never>";
  const defs = component.props
    .map((p) => {
      const opt = p.required ? "" : "?";
      const type = p.typeNode ? `: ${p.typeNode.getText()}` : "";
      return `${p.name}${opt}${type}`;
    })
    .join("; ");
  return `{ ${defs} }`;
}

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  const rules = ctx.rewrites;
  const body: Code[] = [];
  const solidImports: string[] = [];

  for (const s of component.state) {
    solidImports.push("createSignal");
    body.push(
      cStmt({
        body: `const [${s.name}, ${s.setterName}] = createSignal(${rewriteExpr(s.initial.expr, rules)})`,
        span: s.loc,
      }),
    );
  }
  for (const m of component.memos) {
    solidImports.push("createMemo");
    body.push(
      cStmt({
        body: `const ${m.name} = createMemo(() => ${rewriteExpr(m.expr.expr, rules)})`,
        span: m.loc,
      }),
    );
  }
  for (const e of component.effects) {
    solidImports.push("createEffect");
    body.push(cStmt({ body: `createEffect(${rewriteExpr(e.body, rules)})`, span: e.loc }));
  }
  for (const res of component.resources) {
    solidImports.push("createResource");
    body.push(
      cStmt({
        body: `const [${res.name}, { ${res.loadingName}: loading, ${res.errorName}: error, ${res.refetchName}: refetch }] = createResource(${rewriteExpr(res.fetcher.expr, rules)})`,
        span: res.loc,
      }),
    );
  }
  for (const m of component.lifecycle.onMount) {
    solidImports.push("onMount");
    body.push(cStmt({ body: `onMount(${rewriteExpr(m.body, rules)})`, span: m.loc }));
  }
  for (const c of component.lifecycle.onCleanup) {
    solidImports.push("onCleanup");
    body.push(cStmt({ body: `onCleanup(${rewriteExpr(c.body, rules)})`, span: c.loc }));
  }
  for (const r of component.refs)
    body.push(cStmt({ body: `let ${r.name}: ${r.elementType ?? "HTMLElement"} | undefined` }));

  collectCFImports(component.render, solidImports);
  const unique = [...new Set(solidImports)];
  const imports: Code[] =
    unique.length > 0
      ? [cImport({ module: "solid-js", named: unique.map((i) => ({ imported: i })) })]
      : [];

  const styleImport =
    component.styles.length > 0
      ? [cRaw({ text: `import styles from "./${component.name}.module.css";` })]
      : [];

  const renderTree = emitNode(component.render, rules);
  const file = cFile({
    flavor: "tsx",
    children: [
      ...imports,
      ...styleImport,
      cRaw({ text: "" }),
      cStmt({
        body: `export default function ${component.name}(props: ${buildSolidPropsType(component)})`,
      }),
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

export const solid: Target = {
  name: "solid",
  rewrites: REWRITES,
  conformance: solidConformance,
  emit,
};
export default solid;
