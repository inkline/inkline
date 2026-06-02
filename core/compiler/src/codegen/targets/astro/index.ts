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
import {
  FALLTHROUGH_REST,
  classMergeExpr,
  rootAcceptsFallthrough,
} from "../../shared/fallthrough.ts";
import { assertNever } from "../../../core/assert.ts";

/** Build the attribute string for a fallthrough-capable root: spread rest first, then merge class. */
function fallthroughAttrParts(node: any, rules: RewriteRules): string[] {
  const parts: string[] = [`{...${FALLTHROUGH_REST}}`];
  let classMerged = false;
  for (const a of node.attrs) {
    if (a.binding === "class") {
      const authored =
        a.value.kind === "Static"
          ? JSON.stringify(String(a.value.value))
          : rewriteExpr(a.value.expr, rules);
      parts.push(`class={${classMergeExpr(authored, `${FALLTHROUGH_REST}.class`)}}`);
      classMerged = true;
      continue;
    }
    const name = rewriteAttrName(a.name, rules);
    if (a.value.kind === "Static") parts.push(`${name}="${a.value.value}"`);
    else parts.push(`${name}={${rewriteExpr(a.value.expr, rules)}}`);
  }
  for (const e of node.events) {
    parts.push(`${rewriteEventName(e.name, rules)}={${rewriteExpr(e.handler.expr, rules)}}`);
  }
  if (!classMerged) parts.push(`class={${classMergeExpr(null, `${FALLTHROUGH_REST}.class`)}}`);
  return parts;
}

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
      let parts: string[];
      if (node.acceptsAttrFallthrough) {
        parts = fallthroughAttrParts(node, rules);
      } else {
        parts = [];
        for (const a of node.attrs) {
          const name = rewriteAttrName(a.name, rules);
          if (a.value.kind === "Static") parts.push(`${name}="${a.value.value}"`);
          else parts.push(`${name}={${rewriteExpr(a.value.expr, rules)}}`);
        }
        for (const e of node.events) {
          parts.push(`${rewriteEventName(e.name, rules)}={${rewriteExpr(e.handler.expr, rules)}}`);
        }
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
      const tag = node.resolved?.name ?? node.reference.getText();
      let ciParts: string[];
      if (node.acceptsAttrFallthrough) {
        ciParts = fallthroughAttrParts(node, rules);
      } else {
        ciParts = [];
        for (const a of node.attrs) {
          const name = rewriteAttrName(a.name, rules);
          if (a.value.kind === "Static") ciParts.push(`${name}="${a.value.value}"`);
          else ciParts.push(`${name}={${rewriteExpr(a.value.expr, rules)}}`);
        }
        for (const e of node.events) {
          ciParts.push(
            `${rewriteEventName(e.name, rules)}={${rewriteExpr(e.handler.expr, rules)}}`,
          );
        }
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

  const fallthrough = rootAcceptsFallthrough(component);
  const inlineProps =
    component.props.length > 0
      ? `{ ${component.props.map((p) => `${p.name}${p.required ? "" : "?"}${p.typeNode ? `: ${p.typeNode.getText()}` : ": unknown"}`).join("; ")} }`
      : "";

  let propsInterface: string;
  if (fallthrough) {
    const base = component.propsTypeText ?? inlineProps;
    propsInterface = base
      ? `type Props = ${base} & Record<string, any>`
      : "type Props = Record<string, any>";
  } else if (component.propsTypeText) {
    propsInterface = `type Props = ${component.propsTypeText}`;
  } else if (inlineProps) {
    propsInterface = `interface Props ${inlineProps}`;
  } else {
    propsInterface = "";
  }

  const destructured = component.props.map((p) => p.name);
  if (fallthrough) destructured.push(`...${FALLTHROUGH_REST}`);
  // Bind `props` so whole-object references (e.g. styling recipes) resolve, then derive the
  // named props and attribute-fallthrough rest from it — mirroring the other targets.
  const propsStmts: string[] =
    destructured.length > 0
      ? ["const props = Astro.props as Props;", `const { ${destructured.join(", ")} } = props;`]
      : [];

  // Memos are computed once during server render (no reactivity), as plain consts.
  const memoDecls = component.memos.map((m) =>
    cStmt({ body: `const ${m.name} = ${rewriteExpr(m.expr.expr, rules)}`, span: m.loc }),
  );

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
      ...(ctx.typeDeclarations.length > 0 ? [...ctx.typeDeclarations] : []),
      ...(propsInterface ? [cRaw({ text: propsInterface })] : []),
      ...propsStmts.map((s) => cStmt({ body: s })),
      ...memoDecls,
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
