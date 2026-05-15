import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { astroConformance } from "./conformance.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import { cFile, cStmt, cRaw } from "../../code-ir/builders.ts";
import { rewriteExpr, rewriteAttrName, emitExprAsTemplate } from "../../shared/expr-rewrite.ts";
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
      const attrs = node.attrs
        .map((a) => {
          const name = rewriteAttrName(a.name, rules);
          if (a.value.kind === "Static") return `${name}="${a.value.value}"`;
          return `${name}={${rewriteExpr(a.value.expr, rules)}}`;
        })
        .join(" ");
      const children = node.children.map((c) => emitNode(c, rules)).join("\n");
      if (node.children.length === 0) return `<${node.tag}${attrs ? " " + attrs : ""} />`;
      return `<${node.tag}${attrs ? " " + attrs : ""}>\n${children}\n</${node.tag}>`;
    }
    case "Text":
      return node.value;
    case "Expression":
      return emitExprAsTemplate(node.expr, rules);
    case "If":
      return `{${node.branches.map((b) => `${rewriteExpr(b.test.expr, rules)} ? (${emitNode(b.body, rules)})`).join(" : ")} : ${node.fallback ? `(${emitNode(node.fallback, rules)})` : "null"}}`;
    case "For":
      return `{${rewriteExpr(node.each.expr, rules)}.map((${node.itemBinding}) => (${emitNode(node.body, rules)}))}`;
    case "Switch":
      return `{${node.cases.map((c) => `${rewriteExpr(c.test.expr, rules)} ? (${emitNode(c.body, rules)})`).join(" : ")} : null}`;
    case "Fragment":
      return node.children.map((c) => emitNode(c, rules)).join("\n");
    case "ComponentInstance":
      return `<${node.resolved?.name ?? "unknown"} client:load />`;
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

  const file = cFile({
    flavor: "tsx",
    children: [
      cRaw({ text: "---" }),
      ...(propsInterface ? [cRaw({ text: propsInterface })] : []),
      ...(propsDestructure ? [cStmt({ body: propsDestructure })] : []),
      cRaw({ text: "---" }),
      cRaw({ text: "" }),
      cRaw({ text: template }),
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
