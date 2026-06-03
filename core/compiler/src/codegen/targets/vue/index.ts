import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { vueConformance } from "./conformance.ts";
import type { Code, CTmplAttr } from "../../code-ir/nodes.ts";
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
import { rewriteExpr, rewriteAttrName, extractKeyBody } from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import { assertNever } from "../../../core/assert.ts";
import * as ts from "typescript";

// Script context (`<script setup>`): props are accessed via the `defineProps()` result, so
// `props.x` must be kept. The template resolves bare prop names against the component's props,
// so it strips `props.x` → `x` (see TEMPLATE_RULES).
const REWRITES: RewriteRules = {
  reactiveRead: { kind: "field-access", field: "value" },
  setterStyle: { kind: "field-assignment", field: "value" },
  refAccess: { kind: "field", field: "value" },
  jsxAttrCasing: "html",
  eventNameCase: "kebab",
  members: {
    props: { strip: false },
    slots: { strip: true },
  },
};

// In the template, Vue auto-unwraps refs: reads use the bare name (`count`, not `count.value`)
// and writes are compiled to `.value` (so a setter mutates via `count = …`, not `count.value = …`).
const TEMPLATE_RULES: RewriteRules = {
  ...REWRITES,
  reactiveRead: { kind: "strip-call" },
  setterStyle: { kind: "direct-assignment" },
  members: { ...REWRITES.members, props: { strip: true } },
};

// ── Shared template attr helpers ───────────────────────────────────

// Vue native DOM event listeners must match the all-lowercase DOM event name (`@mousemove`,
// `@submit`); a kebab-cased `@mouse-move` would never fire. Component custom events use kebab
// case (`@mouse-move`), which Vue normalizes against the child's camelCase `emits`.
function vueEventName(name: string, isComponent: boolean): string {
  const base = name.startsWith("on") ? name.slice(2) : name;
  if (isComponent) {
    return `@${base.replace(/[A-Z]/g, (c, i) => (i === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`))}`;
  }
  return `@${base.toLowerCase()}`;
}

function tmplAttrs(
  node: {
    readonly attrs: readonly any[];
    readonly events: readonly any[];
    readonly refs: readonly any[];
  },
  rules: RewriteRules,
  isComponent = false,
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
      name: vueEventName(e.name, isComponent),
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
      const attrs = tmplAttrs(node, rules, true);
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
      const scopeAttrs = node.scopedArgs.map((arg, i) => {
        const argName = ts.isIdentifier(arg.expr) ? arg.expr.text : `prop${i}`;
        return cTmplAttr({
          name: `:${argName}`,
          value: { kind: "expr", expr: cExpr({ text: rewriteExpr(arg.expr, rules) }) },
        });
      });
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
    case "Transition": {
      const attrs: CTmplAttr[] = [];
      if (node.name !== "v") {
        attrs.push(cTmplAttr({ name: "name", value: { kind: "static", text: node.name } }));
      }
      if (node.appear) {
        attrs.push(cTmplAttr({ name: "appear", value: { kind: "static", text: "" } }));
      }
      return cTmplElement({
        tag: "Transition",
        attrs,
        children: [emitNode(node.child, rules)],
        selfClose: false,
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
  const setters = Object.fromEntries(component.state.map((s) => [s.setterName, s.name]));
  const rules: RewriteRules = { ...ctx.rewrites, setters };
  // The Vue template auto-unwraps refs, so resource data/loading/error are read by their bare names
  // (reactiveRead strip-call). Only the template needs this — the <script setup> reads them via
  // `.value`. Build the set of bound resource names and spread it into the template rules.
  const resourceReads = new Set(
    component.resources.flatMap((r) =>
      [r.name, r.loadingName, r.errorName].filter((n): n is string => n !== undefined),
    ),
  );
  const templateRules: RewriteRules = {
    ...TEMPLATE_RULES,
    setters,
    reactiveBindings: resourceReads,
  };
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
  // Lower each resource to reactive refs (data/loading/error) plus a fire-and-forget loader that
  // runs the fetcher and updates them — the universal "manual fetch with loading/error state"
  // pattern in idiomatic Vue. The template auto-unwraps the refs (see reactiveBindings below).
  for (const res of component.resources) {
    vueImports.push("ref");
    scriptBody.push(cStmt({ body: `const ${res.name} = ref(undefined)`, span: res.loc }));
    if (res.loadingName) {
      scriptBody.push(cStmt({ body: `const ${res.loadingName} = ref(true)`, span: res.loc }));
    }
    if (res.errorName) {
      scriptBody.push(cStmt({ body: `const ${res.errorName} = ref(undefined)`, span: res.loc }));
    }
    const fetcher = rewriteExpr(res.fetcher.expr, rules);
    const onError = res.errorName ? `.catch((e) => ${res.errorName}.value = e)` : "";
    const onFinally = res.loadingName ? `.finally(() => ${res.loadingName}.value = false)` : "";
    scriptBody.push(
      cStmt({
        body: `;(${fetcher})().then((d) => ${res.name}.value = d)${onError}${onFinally}`,
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

  if (component.propsTypeText) {
    scriptBody.unshift(cStmt({ body: `const props = defineProps<${component.propsTypeText}>()` }));
  } else if (component.props.length > 0) {
    const defs = component.props
      .map((p) => {
        const type = p.typeText ?? p.typeNode?.getText();
        return `${p.name}${p.required ? "" : "?"}${type ? `: ${type}` : ""}`;
      })
      .join("; ");
    // Object-form props carry defaults; wrap defineProps in withDefaults and seed only the props
    // that declared one, keeping the `const props` binding the <script> reads via `props.x`.
    const defaults = component.props
      .filter((p) => p.defaultValue)
      .map((p) => `${p.name}: ${rewriteExpr(p.defaultValue!.expr, rules)}`);
    const body =
      defaults.length > 0
        ? `const props = withDefaults(defineProps<{ ${defs} }>(), { ${defaults.join(", ")} })`
        : `const props = defineProps<{ ${defs} }>()`;
    scriptBody.unshift(cStmt({ body }));
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

  // A root fragment must emit its children as sibling root nodes (Vue 3 multi-root). Wrapping
  // them in a directive-less `<template>` would render nothing, so spread them directly.
  const renderTree: Code[] =
    component.render.kind === "Fragment"
      ? component.render.children.map((c) => emitNode(c, templateRules))
      : [emitNode(component.render, templateRules)];
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
        ...(ctx.typeDeclarations.length > 0 ? [cRaw({ text: "" }), ...ctx.typeDeclarations] : []),
        cRaw({ text: "" }),
        ...scriptBody,
      ],
    }),
    cRaw({ text: "" }),
    cRaw({ text: "<template>" }),
    ...renderTree,
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
