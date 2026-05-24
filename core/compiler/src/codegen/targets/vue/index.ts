import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { vueConformance } from "./conformance.ts";
import type { Code } from "../../code-ir/nodes.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import {
  cFile,
  cImport,
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
} from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "field-access", field: "value" },
  setterStyle: { kind: "field-assignment", field: "value" },
  refAccess: { kind: "field", field: "value" },
  jsxAttrCasing: "html",
  eventNameCase: "kebab",
  members: {
    props: { strip: true },
    slots: { strip: true },
  },
};

const TEMPLATE_RULES: RewriteRules = { ...REWRITES, reactiveRead: { kind: "strip-call" } };

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
      name: `:${name}`,
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
    cTmplAttr({
      name: "ref",
      value: { kind: "expr", expr: cExpr({ text: rewriteExpr(r.ref.expr, rules) }) },
    }),
  );
  return [...attrs, ...evts, ...refs];
}

// ── Directive wrapping helper ──────────────────────────────────────

function wrapDirective(node: Code, directive: string, expr: string | undefined): Code {
  const dir = cTmplDirective({ directive, expr: expr ? cExpr({ text: expr }) : undefined });
  if (node.kind === "CTmplElement") {
    return cTmplElement({
      tag: node.tag,
      directives: [dir, ...node.directives],
      attrs: node.attrs,
      children: node.children,
      selfClose: node.selfClose,
    });
  }
  return cTmplElement({
    tag: "template",
    directives: [dir],
    attrs: [],
    children: [node],
    selfClose: false,
  });
}

// ── Render-tree walker ─────────────────────────────────────────────

function emitNode(node: IRNode, rules: RewriteRules): Code {
  switch (node.kind) {
    case "Element": {
      const attrs = tmplAttrs(node, rules);
      const children = node.children.map((c) => emitNode(c, rules));
      return cTmplElement({ tag: node.tag, attrs, children, selfClose: children.length === 0 });
    }
    case "ComponentInstance": {
      const tag = node.resolved?.name ?? node.reference.getText();
      const attrs = tmplAttrs(node, rules);
      const children: Code[] = [];
      for (const slot of node.slots) {
        if (slot.name === "default") {
          children.push(emitNode(slot.body, rules));
          continue;
        }
        const scope =
          slot.scopedParams.length > 0
            ? ` v-slot:${slot.name}="{ ${slot.scopedParams.join(", ")} }"`
            : "";
        children.push(cRaw({ text: `<template #${slot.name}${scope}>` }));
        children.push(emitNode(slot.body, rules));
        children.push(cRaw({ text: "</template>" }));
      }
      return cTmplElement({ tag, attrs, children, selfClose: children.length === 0 });
    }
    case "Text":
      return cTmplText({ text: node.value });
    case "Expression":
      return cTmplMustache({ expr: cExpr({ text: rewriteExpr(node.expr, rules) }) });
    case "If": {
      const [first, ...rest] = node.branches;
      const children: Code[] = [
        wrapDirective(emitNode(first.body, rules), "v-if", rewriteExpr(first.test.expr, rules)),
      ];
      for (const b of rest)
        children.push(
          wrapDirective(emitNode(b.body, rules), "v-else-if", rewriteExpr(b.test.expr, rules)),
        );
      if (node.fallback)
        children.push(wrapDirective(emitNode(node.fallback, rules), "v-else", undefined));
      return cGroup({ children });
    }
    case "For": {
      const binding = node.indexBinding
        ? `(${node.itemBinding}, ${node.indexBinding})`
        : node.itemBinding;
      const each = rewriteExpr(node.each.expr, rules);
      const key = extractKeyBody(node.key.expr, rules);
      const body = emitNode(node.body, rules);
      const vFor = cTmplDirective({
        directive: "v-for",
        expr: cExpr({ text: `${binding} in ${each}` }),
      });
      const vKey = cTmplDirective({ directive: ":key", expr: cExpr({ text: key }) });
      if (body.kind === "CTmplElement") {
        return cTmplElement({
          tag: body.tag,
          directives: [vFor, vKey, ...body.directives],
          attrs: body.attrs,
          children: body.children,
          selfClose: body.selfClose,
        });
      }
      return cTmplElement({
        tag: "template",
        directives: [vFor, vKey],
        attrs: [],
        children: [body],
        selfClose: false,
      });
    }
    case "Switch": {
      const [first, ...rest] = node.cases;
      const children: Code[] = [
        wrapDirective(emitNode(first.body, rules), "v-if", rewriteExpr(first.test.expr, rules)),
      ];
      for (const c of rest)
        children.push(
          wrapDirective(emitNode(c.body, rules), "v-else-if", rewriteExpr(c.test.expr, rules)),
        );
      if (node.fallback)
        children.push(wrapDirective(emitNode(node.fallback, rules), "v-else", undefined));
      return cGroup({ children });
    }
    case "SlotPlaceholder": {
      const scopeAttrs = node.scopedArgs.map((arg, i) =>
        cTmplAttr({
          name: `:prop${i}`,
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
      return children.length === 1
        ? children[0]
        : cTmplElement({ tag: "template", attrs: [], children, selfClose: false });
    }
    default:
      assertNever(node);
  }
}

// ── Emit entry point ───────────────────────────────────────────────

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  const rules = ctx.rewrites;
  const scriptBody: Code[] = [];
  const vueImports: string[] = [];

  for (const s of component.state) {
    vueImports.push("ref");
    scriptBody.push(
      cStmt({ body: `const ${s.name} = ref(${rewriteExpr(s.initial.expr, rules)})`, span: s.loc }),
    );
  }
  for (const m of component.memos) {
    vueImports.push("computed");
    scriptBody.push(
      cStmt({
        body: `const ${m.name} = computed(() => ${rewriteExpr(m.expr.expr, rules)})`,
        span: m.loc,
      }),
    );
  }
  for (const e of component.effects) {
    vueImports.push("watchEffect");
    scriptBody.push(cStmt({ body: `watchEffect(${rewriteExpr(e.body, rules)})`, span: e.loc }));
  }
  for (const res of component.resources) {
    vueImports.push("ref");
    scriptBody.push(
      cStmt({
        body: `const ${res.name} = ref(await (${rewriteExpr(res.fetcher.expr, rules)})())`,
        span: res.loc,
      }),
    );
  }
  for (const r of component.refs) {
    vueImports.push("ref");
    scriptBody.push(
      cStmt({
        body: `const ${r.name} = ref${r.elementType ? `<${r.elementType} | null>` : ""}(null)`,
        span: r.loc,
      }),
    );
  }
  for (const m of component.lifecycle.onMount) {
    vueImports.push("onMounted");
    scriptBody.push(cStmt({ body: `onMounted(${rewriteExpr(m.body, rules)})`, span: m.loc }));
  }
  for (const c of component.lifecycle.onCleanup) {
    vueImports.push("onUnmounted");
    scriptBody.push(cStmt({ body: `onUnmounted(${rewriteExpr(c.body, rules)})`, span: c.loc }));
  }

  // ── Provide declarations ──────────────────────────────────────────
  for (const p of component.provides) {
    vueImports.push("provide");
    scriptBody.push(
      cStmt({
        body: `provide(${p.contextName}.key, ${rewriteExpr(p.value.expr, rules)})`,
        span: p.loc,
      }),
    );
  }

  // ── Consume declarations ──────────────────────────────────────────
  for (const c of component.consumes) {
    vueImports.push("inject");
    scriptBody.push(
      cStmt({
        body: `const ${c.name} = inject(${c.contextName}.key, ${c.contextName}.defaultValue)!`,
        span: c.loc,
      }),
    );
  }

  if (component.expose && component.expose.length > 0) {
    scriptBody.push(cStmt({ body: `defineExpose({ ${component.expose.join(", ")} })` }));
  }

  const unique = [...new Set(vueImports)];
  const imports: Code[] =
    unique.length > 0
      ? [cImport({ module: "vue", named: unique.map((i) => ({ imported: i })) })]
      : [];

  if (component.props.length > 0) {
    const defs = component.props
      .map(
        (p) => `${p.name}${p.required ? "" : "?"}${p.typeNode ? `: ${p.typeNode.getText()}` : ""}`,
      )
      .join("; ");
    scriptBody.unshift(cStmt({ body: `const props = defineProps<{ ${defs} }>()` }));
  }

  // ── Module-level context definitions (non-setup <script>) ─────────
  const contextScriptChildren: Code[] = [];
  if (ctx.contexts.length > 0) {
    contextScriptChildren.push(
      cImport({ module: "vue", named: [{ imported: "InjectionKey" }], typeOnly: true }),
    );
    for (const ctxDef of ctx.contexts) {
      const typeText = ctxDef.typeText ?? "unknown";
      const defaultExpr = ctxDef.defaultValue
        ? rewriteExpr(ctxDef.defaultValue.expr, rules)
        : "undefined";
      contextScriptChildren.push(
        cStmt({
          body: `export const ${ctxDef.name} = { key: Symbol("${ctxDef.name}") as InjectionKey<${typeText}>, defaultValue: ${defaultExpr} }`,
          span: ctxDef.loc,
        }),
      );
    }
  }

  const renderTree = emitNode(component.render, TEMPLATE_RULES);
  const fileChildren: Code[] = [];

  // Non-setup <script> block for context definitions (must come before <script setup>)
  if (contextScriptChildren.length > 0) {
    fileChildren.push(cScript({ lang: "ts", setup: false, children: contextScriptChildren }));
    fileChildren.push(cRaw({ text: "" }));
  }

  fileChildren.push(
    cScript({
      lang: "ts",
      setup: true,
      children: [
        ...imports,
        ...emitComponentImports(ctx.componentImports, ".vue", true),
        ...ctx.externalImports,
        cRaw({ text: "" }),
        ...scriptBody,
      ],
    }),
    cRaw({ text: "" }),
    cRaw({ text: "<template>" }),
    renderTree,
    cRaw({ text: "</template>" }),
    ...component.styles.map((s) => cStyle({ css: s.css, scoped: s.scoped })),
  );

  const file = cFile({ flavor: "sfc-vue", children: fileChildren });
  return { componentName: component.name, root: file, fileName: `${component.name}.vue` };
}

export const vue: Target = {
  name: "vue",
  rewrites: REWRITES,
  conformance: vueConformance,
  emit,
};
export default vue;
