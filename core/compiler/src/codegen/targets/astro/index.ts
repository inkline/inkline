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
  // Astro renders once on the server: state is a plain `let`, so a setter call is a direct
  // re-assignment (`count = …`). There is no client reactivity to thread through.
  setterStyle: { kind: "direct-assignment" },
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
  const setters = Object.fromEntries(component.state.map((s) => [s.setterName, s.name]));
  const rules: RewriteRules = { ...ctx.rewrites, setters };

  // Resource data/loading/error are reactive bindings in the render tree: a bare read follows the
  // target's reactiveRead (here `strip-call`, so they stay bare). Only the template needs this.
  const resourceReads = new Set(
    component.resources.flatMap((r) =>
      [r.name, r.loadingName, r.errorName].filter((n): n is string => n !== undefined),
    ),
  );
  const template = emitNode(component.render, { ...rules, reactiveBindings: resourceReads });

  const fallthrough = rootAcceptsFallthrough(component);
  const inlineProps =
    component.props.length > 0
      ? `{ ${component.props.map((p) => `${p.name}${p.required ? "" : "?"}${(p.typeText ?? p.typeNode?.getText()) ? `: ${p.typeText ?? p.typeNode?.getText()}` : ": unknown"}`).join("; ")} }`
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

  const destructured = component.props.map((p) =>
    p.defaultValue ? `${p.name} = ${rewriteExpr(p.defaultValue.expr, rules)}` : p.name,
  );
  if (fallthrough) destructured.push(`...${FALLTHROUGH_REST}`);
  // Bind `props` so whole-object references (e.g. styling recipes) resolve, then derive the
  // named props and attribute-fallthrough rest from it — mirroring the other targets.
  const propsStmts: string[] =
    destructured.length > 0
      ? ["const props = Astro.props as Props;", `const { ${destructured.join(", ")} } = props;`]
      : [];

  // Signal state renders once on the server. Declare each as a mutable `let` holding its
  // initial value (no client reactivity); the template reads the bare name (`strip-call`).
  const stateDecls = component.state.map((s) =>
    cStmt({ body: `let ${s.name} = ${rewriteExpr(s.initial.expr, rules)}`, span: s.loc }),
  );

  // Memos are computed once during server render (no reactivity), as plain consts.
  const memoDecls = component.memos.map((m) =>
    cStmt({ body: `const ${m.name} = ${rewriteExpr(m.expr.expr, rules)}`, span: m.loc }),
  );

  // Astro has no client-side context runtime, so a consumed context can't resolve a provider at
  // render time. Best-effort: fall back to the context's declared default value so the template
  // read still resolves (rather than referencing an undefined binding).
  const consumeDecls = component.consumes.map((c) =>
    cStmt({ body: `const ${c.name} = ${c.contextName}.defaultValue`, span: c.loc }),
  );

  // Export the context definition (its default value) so consumer modules that import it can read
  // `Ctx.defaultValue`. There is no DI key — Astro context is the SSR default-value fallback only.
  const contextDefs = ctx.contexts.map((ctxDef) => {
    const defaultText = ctxDef.defaultValue
      ? rewriteExpr(ctxDef.defaultValue.expr, rules)
      : "undefined";
    return cStmt({ body: `export const ${ctxDef.name} = { defaultValue: ${defaultText} }` });
  });

  // Astro renders server-side, so each resource resolves once during the frontmatter: await the
  // fetcher with top-level await, capturing the error when bound. `loading` is therefore always
  // resolved (`false`) by the time the markup renders.
  const resourceDecls = component.resources.flatMap((res) => {
    const stmts: ReturnType<typeof cStmt>[] = [];
    if (res.errorName)
      stmts.push(cStmt({ body: `let ${res.errorName} = undefined`, span: res.loc }));
    stmts.push(cStmt({ body: `let ${res.name}`, span: res.loc }));
    const fetcher = rewriteExpr(res.fetcher.expr, rules);
    const catchClause = res.errorName
      ? ` catch (__e) { ${res.errorName} = __e }`
      : " catch { /* server render: best-effort */ }";
    stmts.push(
      cStmt({ body: `try { ${res.name} = await (${fetcher})() }${catchClause}`, span: res.loc }),
    );
    if (res.loadingName)
      stmts.push(cStmt({ body: `const ${res.loadingName} = false`, span: res.loc }));
    return stmts;
  });

  const file = cFile({
    flavor: "tsx",
    children: [
      cRaw({ text: "---" }),
      ...emitComponentImports(ctx.componentImports, ".astro", true),
      ...ctx.externalImports,
      ...(ctx.typeDeclarations.length > 0 ? [...ctx.typeDeclarations] : []),
      ...(propsInterface ? [cRaw({ text: propsInterface })] : []),
      ...contextDefs,
      ...propsStmts.map((s) => cStmt({ body: s })),
      ...consumeDecls,
      ...stateDecls,
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
