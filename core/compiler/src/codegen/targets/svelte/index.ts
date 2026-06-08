import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { svelteConformance } from "./conformance.ts";
import type { Code, CTmplDirective } from "../../code-ir/nodes.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import {
  cFile,
  cScript,
  cImport,
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
  eventToCallbackProp,
} from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import {
  FALLTHROUGH_REST,
  classMergeExpr,
  rootAcceptsFallthrough,
} from "../../shared/fallthrough.ts";
import { assertNever } from "../../../core/assert.ts";
import * as ts from "typescript";

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
    readonly acceptsAttrFallthrough?: boolean;
  },
  rules: RewriteRules,
  isComponent = false,
) {
  const fallthrough = node.acceptsAttrFallthrough === true;
  // A `$bind:<prop>` on a component lowers to a value attr + a synthesized `update:<prop>` event;
  // collapse the pair into Svelte's `bind:<prop>` directive (the child prop is `$bindable`).
  const twoWay = node.events.filter((e: any) => e.twoWayProp);
  const twoWayProps = new Set<string>(twoWay.map((e: any) => e.twoWayProp));
  const bindDirectives = twoWay.map((e: any) => {
    const attr = node.attrs.find((a: any) => a.name === e.twoWayProp);
    const lvalue =
      attr && attr.value.kind === "Expression" ? rewriteExpr(attr.value.expr, rules) : "";
    return cTmplDirective({ directive: "bind", arg: e.twoWayProp, expr: cExpr({ text: lvalue }) });
  });
  const attrs = node.attrs
    .filter((a: any) => !twoWayProps.has(a.name))
    .map((a: any) => {
      if (fallthrough && a.binding === "class") {
        const authored =
          a.value.kind === "Static"
            ? JSON.stringify(String(a.value.value))
            : rewriteExpr(a.value.expr, rules);
        return cTmplAttr({
          name: "class",
          value: {
            kind: "expr",
            expr: cExpr({ text: classMergeExpr(authored, `${FALLTHROUGH_REST}.class`) }),
          },
        });
      }
      const name = rewriteAttrName(a.name, rules);
      if (a.value.kind === "Static")
        return cTmplAttr({ name, value: { kind: "static", text: String(a.value.value) } });
      return cTmplAttr({
        name,
        value: { kind: "expr", expr: cExpr({ text: rewriteExpr(a.value.expr, rules) }) },
      });
    });
  if (fallthrough) {
    // Spread inherited attributes first so authored attributes win on conflict.
    attrs.unshift(
      cTmplAttr({ name: "", value: { kind: "spread", expr: cExpr({ text: FALLTHROUGH_REST }) } }),
    );
    if (!node.attrs.some((a: any) => a.binding === "class")) {
      attrs.push(
        cTmplAttr({
          name: "class",
          value: { kind: "expr", expr: cExpr({ text: `${FALLTHROUGH_REST}.class` }) },
        }),
      );
    }
  }
  const evts = node.events
    .filter((e: any) => !e.twoWayProp)
    .map((e: any) =>
      cTmplAttr({
        name: rewriteEventName(e.name, rules, isComponent),
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
  return { attrs: [...attrs, ...evts], directives: [...bindDirectives, ...refs] };
}

// ── Transition helpers ─────────────────────────────────────────────

function transitionDirectives(name: string): [CTmplDirective, CTmplDirective] {
  const params = cExpr({ text: `{ name: "${name}" }` });
  return [
    cTmplDirective({ directive: "in", arg: "__inkTransitionIn", expr: params }),
    cTmplDirective({ directive: "out", arg: "__inkTransitionOut", expr: params }),
  ];
}

function applyTransitionDirective(code: Code, name: string): Code {
  const [dIn, dOut] = transitionDirectives(name);
  if (code.kind === "CTmplElement") {
    return cTmplElement({
      tag: code.tag,
      directives: [dIn, dOut, ...code.directives],
      attrs: code.attrs,
      children: code.children,
      selfClose: code.selfClose,
    });
  }
  return cTmplElement({
    tag: "div",
    directives: [dIn, dOut],
    attrs: [cTmplAttr({ name: "style", value: { kind: "static", text: "display:contents" } })],
    children: [code],
    selfClose: false,
  });
}

function hasTransition(node: IRNode): boolean {
  if (node.kind === "Transition") return true;
  switch (node.kind) {
    case "Element":
    case "Fragment":
      return node.children.some(hasTransition);
    case "If":
      return (
        node.branches.some((b) => hasTransition(b.body)) ||
        (node.fallback ? hasTransition(node.fallback) : false)
      );
    case "For":
      return hasTransition(node.body);
    case "Switch":
      return (
        node.cases.some((c) => hasTransition(c.body)) ||
        (node.fallback ? hasTransition(node.fallback) : false)
      );
    case "ComponentInstance":
      return node.slots.some((s) => hasTransition(s.body));
    default:
      return false;
  }
}

function __inkTransitionFn(prefix: "enter" | "leave") {
  return `function(node: HTMLElement, { name = "ink" }: { name: string }) {
    node.classList.add(name + "-${prefix}-from", name + "-${prefix}-active");
    requestAnimationFrame(() => {
      node.classList.remove(name + "-${prefix}-from");
      node.classList.add(name + "-${prefix}-to");
    });
    const cs = getComputedStyle(node);
    const dur = (parseFloat(cs.transitionDuration) || 0.3) * 1000;
    return { duration: dur, tick() {} };
  }`;
}

const SVELTE_TRANSITION_HELPER = `const __inkTransitionIn = ${__inkTransitionFn("enter")};
  const __inkTransitionOut = ${__inkTransitionFn("leave")};`;

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
      const { attrs, directives } = tmplAttrs(node, rules, true);
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
      const scopeAttrs = node.scopedArgs.map((arg, i) => {
        const argName = ts.isIdentifier(arg.expr) ? arg.expr.text : `prop${i}`;
        return cTmplAttr({
          name: argName,
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
      if (node.child.kind === "If") {
        const [first, ...rest] = node.child.branches;
        const children: Code[] = [
          cRaw({ text: `{#if ${rewriteExpr(first.test.expr, rules)}}` }),
          applyTransitionDirective(emitNode(first.body, rules), node.name),
        ];
        for (const b of rest) {
          children.push(cRaw({ text: `{:else if ${rewriteExpr(b.test.expr, rules)}}` }));
          children.push(applyTransitionDirective(emitNode(b.body, rules), node.name));
        }
        if (node.child.fallback) {
          children.push(cRaw({ text: "{:else}" }));
          children.push(applyTransitionDirective(emitNode(node.child.fallback, rules), node.name));
        }
        children.push(cRaw({ text: "{/if}" }));
        return cGroup({ children });
      }
      return applyTransitionDirective(emitNode(node.child, rules), node.name);
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
  const propFallthrough = rootAcceptsFallthrough(component);
  const restBinding = propFallthrough ? `...${FALLTHROUGH_REST}` : "";

  // A model is two-way via `$bindable` (the parent uses `bind:`), so it needs no callback prop — only
  // general emitted events become plain callback props.
  const callbackNames = component.events.map((ev) => eventToCallbackProp(ev.name));
  const modelNames = component.models.map((m) => m.propName);

  // Plain binding names (no defaults) used to reconstruct the whole `props` object below.
  const nameBindings = [
    ...component.props.map((p) => p.name),
    ...modelNames,
    ...callbackNames,
    restBinding,
  ]
    .filter(Boolean)
    .join(", ");

  // Model setters reassign the `$bindable` prop (`setValue(v)` → `value = v`), which Svelte propagates
  // back to the parent's `bind:`. `emit(…)` calls a bare callback prop.
  const setters = Object.fromEntries([
    ...component.state.map((s) => [s.setterName, s.name]),
    ...component.models.map((m) => [m.setterName, m.name]),
  ]);
  const emitRule = component.emitName
    ? ({ local: component.emitName, style: "callback-prop", propsAccess: "" } as const)
    : undefined;
  // Svelte destructures `$props()`, so there is no `props` binding for whole-object references
  // (e.g. `badge(props)`). Reconstruct it from the destructured bindings instead.
  const rules: RewriteRules =
    nameBindings.length > 0
      ? {
          ...ctx.rewrites,
          setters,
          emit: emitRule,
          members: {
            ...ctx.rewrites.members,
            props: { ...ctx.rewrites.members?.props, strip: true, whole: `{ ${nameBindings} }` },
          },
        }
      : { ...ctx.rewrites, setters, emit: emitRule };

  // Destructure bindings carry each prop's default (`color = "blue"`) so `$props()` applies it; each
  // model becomes a `$bindable()` binding; each callback prop is a plain binding.
  const bindings = [
    ...component.props.map((p) =>
      p.defaultValue ? `${p.name} = ${rewriteExpr(p.defaultValue.expr, rules)}` : p.name,
    ),
    ...component.models.map((m) => `${m.propName} = $bindable()`),
    ...callbackNames,
    restBinding,
  ]
    .filter(Boolean)
    .join(", ");

  const scriptBody: Code[] = [];
  const svelteImports: string[] = [];

  // ── Consume declarations ──────────────────────────────────────────
  for (const c of component.consumes) {
    svelteImports.push("getContext");
    scriptBody.push(
      cStmt({
        body: `const ${c.name} = getContext(${c.contextName}.key)`,
        span: c.loc,
      }),
    );
  }
  // Type fields a model (value prop + update callback) and each emitted event contribute.
  // A model contributes a `$bindable` value prop (two-way via `bind:`, no callback); each emitted
  // event contributes a callback prop.
  const emissionTypeFields = [
    ...component.models.map((m) => `${m.propName}?: ${m.typeNode?.getText() ?? "unknown"}`),
    ...component.events.map((ev) => `${eventToCallbackProp(ev.name)}?: (...args: any[]) => void`),
  ];
  const hasEmission = emissionTypeFields.length > 0;
  if (component.propsTypeText) {
    const extra = hasEmission ? ` & { ${emissionTypeFields.join("; ")} }` : "";
    const type = `${component.propsTypeText}${extra}${propFallthrough ? " & Record<string, any>" : ""}`;
    scriptBody.push(cStmt({ body: `let { ${bindings} }: ${type} = $props()` }));
  } else if (component.props.length > 0 || hasEmission) {
    const defs = [
      ...component.props.map((p) => {
        const type = p.typeText ?? p.typeNode?.getText();
        return `${p.name}${p.required ? "" : "?"}${type ? `: ${type}` : ""}`;
      }),
      ...emissionTypeFields,
    ].join("; ");
    scriptBody.push(cStmt({ body: `interface Props { ${defs} }` }));
    const type = `Props${propFallthrough ? " & Record<string, any>" : ""}`;
    scriptBody.push(cStmt({ body: `let { ${bindings} }: ${type} = $props()` }));
  } else if (propFallthrough) {
    scriptBody.push(cStmt({ body: `let { ${bindings} }: Record<string, any> = $props()` }));
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
  // Lower each resource to reactive $state (data/loading/error) plus a top-level loader that runs
  // the fetcher and updates them — the universal "manual fetch with loading/error state" pattern in
  // idiomatic Svelte. The template reads the state by its bare name (see reactiveBindings below).
  for (const res of component.resources) {
    scriptBody.push(cStmt({ body: `let ${res.name} = $state(undefined)`, span: res.loc }));
    if (res.loadingName) {
      scriptBody.push(cStmt({ body: `let ${res.loadingName} = $state(true)`, span: res.loc }));
    }
    if (res.errorName) {
      scriptBody.push(cStmt({ body: `let ${res.errorName} = $state(undefined)`, span: res.loc }));
    }
    const fetcher = rewriteExpr(res.fetcher.expr, rules);
    const onError = res.errorName ? `.catch((e) => ${res.errorName} = e)` : "";
    const onFinally = res.loadingName ? `.finally(() => ${res.loadingName} = false)` : "";
    scriptBody.push(
      cStmt({
        body: `;(${fetcher})().then((d) => ${res.name} = d)${onError}${onFinally}`,
        span: res.loc,
      }),
    );
  }
  for (const m of component.lifecycle.onMount)
    scriptBody.push(cStmt({ body: `$effect(${rewriteExpr(m.body, rules)})`, span: m.loc }));
  for (const c of component.lifecycle.onCleanup)
    scriptBody.push(
      cStmt({ body: `$effect(() => { return ${rewriteExpr(c.body, rules)} })`, span: c.loc }),
    );
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

  const needsTransition = hasTransition(component.render);

  // ── Provide declarations ──────────────────────────────────────────
  for (const p of component.provides) {
    svelteImports.push("setContext");
    scriptBody.push(
      cStmt({
        body: `setContext(${p.contextName}.key, ${rewriteExpr(p.value.expr, rules)})`,
        span: p.loc,
      }),
    );
  }

  // ── Svelte imports ────────────────────────────────────────────────
  const uniqueSvelteImports = [...new Set(svelteImports)];
  if (uniqueSvelteImports.length > 0) {
    scriptBody.unshift(
      cImport({
        module: "svelte",
        named: uniqueSvelteImports.map((i) => ({ imported: i })),
      }),
    );
  }

  // ── Module-level context definitions (<script module>) ────────────
  const fileChildren: Code[] = [];
  if (ctx.contexts.length > 0) {
    const moduleChildren: Code[] = [];
    for (const ctxDef of ctx.contexts) {
      const defaultExpr = ctxDef.defaultValue
        ? rewriteExpr(ctxDef.defaultValue.expr, rules)
        : "undefined";
      moduleChildren.push(
        cStmt({
          body: `export const ${ctxDef.name} = { key: "${ctxDef.name}", defaultValue: ${defaultExpr} }`,
          span: ctxDef.loc,
        }),
      );
    }
    fileChildren.push(cRaw({ text: '<script module lang="ts">' }));
    fileChildren.push(...moduleChildren);
    fileChildren.push(cRaw({ text: "</script>" }));
    fileChildren.push(cRaw({ text: "" }));
  }

  // The render tree reads resource bindings (`data`/`loading`/`error`) by their bare name; flag them
  // as reactive so a bare read follows Svelte's `reactiveRead` (strip-call, so they stay verbatim).
  const resourceReads = new Set(
    component.resources.flatMap((r) => [r.name, r.loadingName, r.errorName].filter(Boolean)),
  ) as Set<string>;
  const renderRules: RewriteRules = { ...rules, reactiveBindings: resourceReads };
  const renderTree = emitNode(component.render, renderRules);
  fileChildren.push(
    cScript({
      lang: "ts",
      setup: false,
      children: [
        ...emitComponentImports(ctx.componentImports, ".svelte", true),
        ...ctx.externalImports,
        ...(ctx.typeDeclarations.length > 0 ? [cRaw({ text: "" }), ...ctx.typeDeclarations] : []),
        ...scriptBody,
        ...(needsTransition ? [cRaw({ text: "" }), cRaw({ text: SVELTE_TRANSITION_HELPER })] : []),
      ],
    }),
    cRaw({ text: "" }),
    renderTree,
    ...component.styles.map((s) => cStyle({ css: s.css, scoped: true })),
  );

  const file = cFile({
    flavor: "sfc-svelte",
    children: fileChildren,
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
