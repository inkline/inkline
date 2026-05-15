import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { svelteConformance } from "./conformance.ts";
import type { Code } from "../../code-ir/nodes.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import {
  cFile,
  cScript,
  cStmt,
  cExpr,
  cRaw,
  cTmplElement,
  cTmplAttr,
  cTmplText,
  cTmplMustache,
  cTmplDirective,
  cGroup,
  cStyle,
} from "../../code-ir/builders.ts";
import {
  rewriteExpr,
  rewriteEventName,
  rewriteAttrName,
  extractKeyBody,
  emitExprAsTemplate,
} from "../../shared/expr-rewrite.ts";
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "strip-call" },
  setterStyle: { kind: "direct-assignment" },
  refAccess: { kind: "bare" },
  jsxAttrCasing: "html",
  eventNameCase: "lower",
  members: {
    props: { strip: true },
    slots: { strip: true },
  },
};

// ── Shared template attr helpers ───────────────────────────────────

function tmplAttrs(
  node: {
    readonly attrs: readonly any[];
    readonly events: readonly any[];
    readonly refs: readonly any[];
  },
  rules: RewriteRules,
) {
  const attrs = node.attrs.map((a: any) => {
    const name = rewriteAttrName(a.name, rules);
    if (a.value.kind === "Static")
      return cTmplAttr({ name, value: { kind: "static", text: String(a.value.value) } });
    return cTmplAttr({
      name,
      value: { kind: "expr", expr: cExpr({ text: rewriteExpr(a.value.expr, rules) }) },
    });
  });
  const evts = node.events.map((e: any) =>
    cTmplAttr({
      name: rewriteEventName(e.name, rules),
      value: { kind: "expr", expr: cExpr({ text: rewriteExpr(e.handler.expr, rules) }) },
    }),
  );
  const refs = node.refs.map((r: any) =>
    cTmplDirective({
      directive: "bind",
      arg: "this",
      expr: cExpr({ text: rewriteExpr(r.ref.expr, rules) }),
    }),
  );
  return { attrs: [...attrs, ...evts], directives: refs };
}

// ── Render-tree walker ─────────────────────────────────────────────

function emitNode(node: IRNode, rules: RewriteRules): Code {
  switch (node.kind) {
    case "Element": {
      const { attrs, directives } = tmplAttrs(node, rules);
      const children = node.children.map((c) => emitNode(c, rules));
      return cTmplElement({
        tag: node.tag,
        directives,
        attrs,
        children,
        selfClose: children.length === 0,
      });
    }
    case "ComponentInstance": {
      const tag = node.resolved?.name ?? node.reference.getText();
      const { attrs, directives } = tmplAttrs(node, rules);
      const children: Code[] = [];
      for (const slot of node.slots) {
        if (slot.name === "default") {
          children.push(emitNode(slot.body, rules));
          continue;
        }
        children.push(cRaw({ text: `{#snippet ${slot.name}(${slot.scopedParams.join(", ")})}` }));
        children.push(emitNode(slot.body, rules));
        children.push(cRaw({ text: "{/snippet}" }));
      }
      return cTmplElement({ tag, directives, attrs, children, selfClose: children.length === 0 });
    }
    case "Text":
      return cTmplText({ text: node.value });
    case "Expression": {
      const tmpl = emitExprAsTemplate(node.expr, rules);
      if (tmpl.startsWith("{")) return cTmplMustache({ expr: cExpr({ text: tmpl.slice(1, -1) }) });
      return cRaw({ text: tmpl });
    }
    case "If": {
      const [first, ...rest] = node.branches;
      const children: Code[] = [
        cRaw({ text: `{#if ${rewriteExpr(first.test.expr, rules)}}` }),
        emitNode(first.body, rules),
      ];
      for (const b of rest) {
        children.push(cRaw({ text: `{:else if ${rewriteExpr(b.test.expr, rules)}}` }));
        children.push(emitNode(b.body, rules));
      }
      if (node.fallback) {
        children.push(cRaw({ text: "{:else}" }));
        children.push(emitNode(node.fallback, rules));
      }
      children.push(cRaw({ text: "{/if}" }));
      return cGroup({ children });
    }
    case "For": {
      const binding = node.indexBinding
        ? `${node.itemBinding}, ${node.indexBinding}`
        : node.itemBinding;
      const key = extractKeyBody(node.key.expr, rules);
      return cGroup({
        children: [
          cRaw({
            text: `{#each ${rewriteExpr(node.each.expr, rules)} as ${binding} (${key})}`,
          }),
          emitNode(node.body, rules),
          cRaw({ text: "{/each}" }),
        ],
      });
    }
    case "Switch": {
      // Svelte has no native switch; emit as chained {#if}/{:else if}
      const [first, ...rest] = node.cases;
      const children: Code[] = [
        cRaw({ text: `{#if ${rewriteExpr(first.test.expr, rules)}}` }),
        emitNode(first.body, rules),
      ];
      for (const c of rest) {
        children.push(cRaw({ text: `{:else if ${rewriteExpr(c.test.expr, rules)}}` }));
        children.push(emitNode(c.body, rules));
      }
      if (node.fallback) {
        children.push(cRaw({ text: "{:else}" }));
        children.push(emitNode(node.fallback, rules));
      }
      children.push(cRaw({ text: "{/if}" }));
      return cGroup({ children });
    }
    case "SlotPlaceholder": {
      const scopeAttrs = node.scopedArgs.map((arg, i) =>
        cTmplAttr({
          name: `prop${i}`,
          value: { kind: "expr", expr: cExpr({ text: rewriteExpr(arg.expr, rules) }) },
        }),
      );
      const children: Code[] = node.fallback ? [emitNode(node.fallback, rules)] : [];
      const nameAttr =
        node.name === "default"
          ? []
          : [cTmplAttr({ name: "name", value: { kind: "static", text: node.name } })];
      return cTmplElement({
        tag: "slot",
        attrs: [...nameAttr, ...scopeAttrs],
        children,
        selfClose: children.length === 0,
      });
    }
    case "Fragment": {
      const children = node.children.map((c) => emitNode(c, rules));
      return children.length === 1 ? children[0] : cGroup({ children });
    }
    default:
      assertNever(node);
  }
}

// ── Emit entry point ───────────────────────────────────────────────

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  const rules = ctx.rewrites;
  const scriptBody: Code[] = [];

  if (component.props.length > 0) {
    const defs = component.props
      .map(
        (p) => `${p.name}${p.required ? "" : "?"}${p.typeNode ? `: ${p.typeNode.getText()}` : ""}`,
      )
      .join("; ");
    scriptBody.push(cStmt({ body: `interface Props { ${defs} }` }));
    scriptBody.push(
      cStmt({
        body: `let { ${component.props.map((p) => p.name).join(", ")} }: Props = $props()`,
      }),
    );
  }
  for (const s of component.state)
    scriptBody.push(
      cStmt({
        body: `let ${s.name} = $state(${rewriteExpr(s.initial.expr, rules)})`,
        span: s.loc,
      }),
    );
  for (const m of component.memos)
    scriptBody.push(
      cStmt({
        body: `let ${m.name} = $derived(${rewriteExpr(m.expr.expr, rules)})`,
        span: m.loc,
      }),
    );
  for (const e of component.effects)
    scriptBody.push(cStmt({ body: `$effect(${rewriteExpr(e.body, rules)})`, span: e.loc }));
  for (const res of component.resources)
    scriptBody.push(
      cStmt({
        body: `let ${res.name} = $state(await (${rewriteExpr(res.fetcher.expr, rules)})())`,
        span: res.loc,
      }),
    );
  for (const m of component.lifecycle.onMount)
    scriptBody.push(cStmt({ body: `$effect(${rewriteExpr(m.body, rules)})`, span: m.loc }));
  for (const r of component.refs)
    scriptBody.push(
      cStmt({
        body: `let ${r.name} = $state<${r.elementType ?? "HTMLElement"} | null>(null)`,
        span: r.loc,
      }),
    );
  if (component.expose) {
    for (const name of component.expose) {
      scriptBody.push(cStmt({ body: `export function ${name}() {}` }));
    }
  }

  const renderTree = emitNode(component.render, rules);
  const file = cFile({
    flavor: "sfc-svelte",
    children: [
      cScript({ lang: "ts", setup: false, children: scriptBody }),
      cRaw({ text: "" }),
      renderTree,
      ...component.styles.map((s) => cStyle({ css: s.css, scoped: true })),
    ],
  });
  return { componentName: component.name, root: file, fileName: `${component.name}.svelte` };
}

export const svelte: Target = {
  name: "svelte",
  rewrites: REWRITES,
  conformance: svelteConformance,
  emit,
};
export default svelte;
