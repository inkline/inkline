import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { astroConformance } from "./conformance.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import { cFile, cStmt, cRaw, cStyle } from "../../code-ir/builders.ts";
import {
  rewriteExpr,
  rewriteAttrName,
  rewriteEventName,
  emitExprAsTemplate,
} from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "strip-call" },
  setterStyle: { kind: "function-call" },
  refAccess: { kind: "bare" },
  jsxAttrCasing: "html",
  eventNameCase: "camel",
  members: { props: { strip: true } },
};

function emitNode(node: IRNode, rules: RewriteRules): string {
  switch (node.kind) {
    case "Element": {
      const parts: string[] = [];
      for (const a of node.attrs) {
        const name = rewriteAttrName(a.name, rules);
        if (a.value.kind === "Static") parts.push(`${name}="${a.value.value}"`);
        else parts.push(`${name}={${rewriteExpr(a.value.expr, rules)}}`);
      }
      for (const e of node.events) {
        parts.push(`${rewriteEventName(e.name, rules)}={${rewriteExpr(e.handler.expr, rules)}}`);
      }
      const attrStr = parts.join(" ");
      const children = node.children.map((c) => emitNode(c, rules)).join("\n");
      if (node.children.length === 0) return `<${node.tag}${attrStr ? " " + attrStr : ""} />`;
      return `<${node.tag}${attrStr ? " " + attrStr : ""}>\n${children}\n</${node.tag}>`;
    }
    case "Text":
      return node.value;
    case "Expression":
      return emitExprAsTemplate(node.expr, rules);
    case "If":
      return `{${node.branches.map((b) => `${rewriteExpr(b.test.expr, rules)} ? (${emitNode(b.body, rules)})`).join(" : ")} : ${node.fallback ? `(${emitNode(node.fallback, rules)})` : "null"}}`;
    case "For": {
      const params = node.indexBinding
        ? `(${node.itemBinding}, ${node.indexBinding})`
        : `(${node.itemBinding})`;
      let body = emitNode(node.body, rules);
      if (body.startsWith("{") && body.endsWith("}")) body = body.slice(1, -1);
      return `{${rewriteExpr(node.each.expr, rules)}.map(${params} => (${body}))}`;
    }
    case "Switch":
      return `{${node.cases.map((c) => `${rewriteExpr(c.test.expr, rules)} ? (${emitNode(c.body, rules)})`).join(" : ")} : ${node.fallback ? `(${emitNode(node.fallback, rules)})` : "null"}}`;
    case "Fragment":
      return node.children.map((c) => emitNode(c, rules)).join("\n");
    case "ComponentInstance": {
      const tag = node.resolved?.name ?? "unknown";
      const ciParts: string[] = [];
      for (const a of node.attrs) {
        const name = rewriteAttrName(a.name, rules);
        if (a.value.kind === "Static") ciParts.push(`${name}="${a.value.value}"`);
        else ciParts.push(`${name}={${rewriteExpr(a.value.expr, rules)}}`);
      }
      for (const e of node.events) {
        ciParts.push(`${rewriteEventName(e.name, rules)}={${rewriteExpr(e.handler.expr, rules)}}`);
      }
      if (node.slots.length === 0) {
        const ciAttrStr = ciParts.join(" ");
        return `<${tag}${ciAttrStr ? " " + ciAttrStr : ""} />`;
      }
      const ciAttrStr = ciParts.join(" ");
      const slotContent = node.slots
        .map((s) => {
          if (s.name === "default") return emitNode(s.body, rules);
          return `<Fragment slot="${s.name}">\n${emitNode(s.body, rules)}\n</Fragment>`;
        })
        .join("\n");
      return `<${tag}${ciAttrStr ? " " + ciAttrStr : ""}>\n${slotContent}\n</${tag}>`;
    }
    case "Transition":
      return emitNode(node.child, rules);
    case "SlotPlaceholder":
      return `<slot${node.name !== "default" ? ` name="${node.name}"` : ""} />`;
    default:
      assertNever(node);
  }
}

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  const rules = ctx.rewrites;
  const template = emitNode(component.render, rules);

  const propsInterface =
    component.props.length > 0
      ? `interface Props { ${component.props.map((p) => `${p.name}${p.required ? "" : "?"}${p.typeNode ? `: ${p.typeNode.getText()}` : ": unknown"}`).join("; ")} }`
      : "";

  const propsDestructure =
    component.props.length > 0
      ? `const { ${component.props.map((p) => p.name).join(", ")} } = Astro.props as Props;`
      : "";

  const resourceDecls = component.resources.map((res) =>
    cStmt({
      body: `const ${res.name} = await (${rewriteExpr(res.fetcher.expr, rules)})()`,
      span: res.loc,
    }),
  );

  const file = cFile({
    flavor: "tsx",
    children: [
      cRaw({ text: "---" }),
      ...emitComponentImports(ctx.componentImports, ".astro", true),
      ...ctx.externalImports,
      ...(propsInterface ? [cRaw({ text: propsInterface })] : []),
      ...(propsDestructure ? [cStmt({ body: propsDestructure })] : []),
      ...resourceDecls,
      cRaw({ text: "---" }),
      cRaw({ text: "" }),
      cRaw({ text: template }),
      ...component.styles.map((s) => cStyle({ css: s.css, scoped: s.scoped })),
    ],
  });

  return { componentName: component.name, root: file, fileName: `${component.name}.astro` };
}

export const astro: Target = {
  name: "astro",
  rewrites: REWRITES,
  conformance: astroConformance,
  emit,
};
export default astro;
