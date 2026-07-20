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
import {
  rewriteExpr,
  rewriteEventName,
  rewriteAttrName,
  eventToCallbackProp,
  callbackPropRules,
  reactiveReadNames,
  foldConstTest,
} from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import { childrenArePhrasing } from "../../shared/phrasing.ts";
import {
  FALLTHROUGH_REST,
  classMergeExpr,
  rootAcceptsFallthrough,
} from "../../shared/fallthrough.ts";
import { unwrapRootExpr } from "../../shared/root-expr.ts";
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "field-access", field: "value" },
  setterStyle: { kind: "field-assignment", field: "value" },
  refAccess: { kind: "field", field: "value" },
  jsxAttrCasing: "html",
  eventNameCase: "camel",
  members: { props: { strip: false } },
  // Qwik has no runtime slot-presence API: always render and let CSS `:empty` collapse the wrapper.
  hasSlotCheck: () => "true",
};

function jsxAttrs(
  node: {
    readonly attrs: readonly any[];
    readonly events: readonly any[];
    readonly refs: readonly any[];
    readonly acceptsAttrFallthrough?: boolean;
  },
  rules: RewriteRules,
) {
  const fallthrough = node.acceptsAttrFallthrough === true;
  const out = [];

  // Spread inherited attributes first so authored attributes below win on conflict.
  if (fallthrough) {
    out.push(cJsxAttr({ name: `{...${FALLTHROUGH_REST}}`, value: { kind: "boolean" } }));
  }

  let classMerged = false;
  for (const a of node.attrs as any[]) {
    if (fallthrough && a.binding === "class") {
      const authored =
        a.value.kind === "Static"
          ? JSON.stringify(String(a.value.value))
          : rewriteExpr(a.value.expr, rules);
      out.push(
        cJsxAttr({
          name: "class",
          value: { kind: "expr", expr: cExpr({ text: classMergeExpr(authored, "props.class") }) },
        }),
      );
      classMerged = true;
      continue;
    }
    const name = rewriteAttrName(a.name, rules);
    if (a.value.kind === "Static") {
      const v = a.value.value;
      out.push(
        typeof v === "boolean"
          ? cJsxAttr({ name, value: { kind: "boolean" } })
          : cJsxAttr({ name, value: { kind: "static", text: String(v) } }),
      );
    } else {
      out.push(
        cJsxAttr({
          name,
          value: { kind: "expr", expr: cExpr({ text: rewriteExpr(a.value.expr, rules) }) },
        }),
      );
    }
  }

  // Root has no authored class but still inherits one — forward it.
  if (fallthrough && !classMerged) {
    out.push(
      cJsxAttr({
        name: "class",
        value: { kind: "expr", expr: cExpr({ text: classMergeExpr(null, "props.class") }) },
      }),
    );
  }

  for (const e of node.events) {
    // A `$bind:<prop>` on a component lowers to an `update:<prop>` event; emit it as the child's
    // `onUpdate<Prop>$` QRL callback prop rather than a (colon-bearing) DOM event name.
    const name = e.twoWayProp ? `${eventToCallbackProp(e.name)}$` : rewriteEventName(e.name, rules);
    out.push(
      cJsxAttr({
        name,
        value: {
          kind: "expr",
          expr: cExpr({ text: `$(${rewriteExpr(e.handler.expr, rules)})` }),
        },
      }),
    );
  }
  for (const r of node.refs) {
    out.push(
      cJsxAttr({
        name: "ref",
        value: { kind: "expr", expr: cExpr({ text: rewriteExpr(r.ref.expr, rules) }) },
      }),
    );
  }
  return out;
}

// The bare prop read for a named slot (no surrounding `{…}`): a node prop when unscoped, a function
// call when scoped, with the authored fallback via `?? <fallback>`. Used both as a JSX expression
// (`{namedSlotRead(…)}`) and as an attr-value fill, where the `{…}` comes from `name={…}` instead.
function namedSlotRead(
  node: Extract<IRNode, { kind: "SlotPlaceholder" }>,
  rules: RewriteRules,
): string {
  const argsStr =
    node.scopedArgs.length > 0
      ? node.scopedArgs.map((a) => rewriteExpr(a.expr, rules)).join(", ")
      : "";
  const read = argsStr ? `props.${node.name}?.(${argsStr})` : `props.${node.name}`;
  const fallback = node.fallback ? ` ?? (<>${emitNodeInline(node.fallback, rules)}</>)` : "";
  return `${read}${fallback}`;
}

function emitNode(node: IRNode, rules: RewriteRules): Code {
  switch (node.kind) {
    case "Element": {
      const attrs = jsxAttrs(node, rules);
      const children = node.children.map((c) => emitNode(c, rules));
      return cJsxElement({
        tag: node.tag,
        attrs,
        children,
        selfClose: children.length === 0,
        inline: childrenArePhrasing(node.children),
      });
    }
    case "ComponentInstance": {
      const tag = node.resolved?.name ?? node.reference.getText();
      const attrs = jsxAttrs(node, rules);
      // The default slot projects through `<Slot/>` (children); a named slot is consumed as a prop
      // (see the `SlotPlaceholder` case) — a node prop (`prefix={<>$</>}`) when unscoped, a function
      // prop when it takes args. A `<Tag.name>` child would never reach the consumer.
      const children: Code[] = [];
      for (const s of node.slots) {
        if (s.name === "default") {
          children.push(emitNode(s.body, rules));
        } else {
          // A re-projected slot (`prefix={<Slot name="x"/>}`) inlines to the bare `props.x` read; any
          // other body (an element/fragment) inlines as JSX. Either is a bare attr value — the `{…}`
          // comes from `name={…}` — so a named-slot body must NOT go through `emitNodeInline` (which
          // would brace it and double-wrap to `prefix={{props.x}}`).
          const body =
            s.body.kind === "SlotPlaceholder" && s.body.name !== "default"
              ? namedSlotRead(s.body, rules)
              : emitNodeInline(s.body, rules);
          const value =
            s.scopedParams.length > 0 ? `(${s.scopedParams.join(", ")}) => (${body})` : body;
          attrs.push(
            cJsxAttr({ name: s.name, value: { kind: "expr", expr: cExpr({ text: value }) } }),
          );
        }
      }
      return cJsxElement({ tag, attrs, children, selfClose: children.length === 0 });
    }
    case "Text":
      return cJsxText({ text: node.value });
    case "Expression":
      return cExpr({ text: `{${rewriteExpr(node.expr, rules)}}` });
    case "If": {
      // Fold statically-true/false tests (e.g. `hasSlot` → `true` on Qwik) so we never emit a
      // constant-condition ternary: a true branch becomes the terminal, false branches are dropped.
      const surviving: string[] = [];
      let unconditional: string | undefined;
      for (const b of node.branches) {
        const test = rewriteExpr(b.test.expr, rules);
        const folded = foldConstTest(test);
        if (folded === false) continue;
        const body = `(<>${emitNodeInline(b.body, rules)}</>)`;
        if (folded === true) {
          unconditional = body;
          break;
        }
        surviving.push(`${test} ? ${body}`);
      }
      const tail =
        unconditional ??
        (node.fallback ? `(<>${emitNodeInline(node.fallback, rules)}</>)` : "null");
      return cExpr({
        text: surviving.length > 0 ? `{${surviving.join(" : ")} : ${tail}}` : `{${tail}}`,
      });
    }
    case "For": {
      const params = node.indexBinding
        ? `(${node.itemBinding}, ${node.indexBinding})`
        : `(${node.itemBinding})`;
      return cExpr({
        text: `{${rewriteExpr(node.each.expr, rules)}.map(${params} => (<>${emitNodeInline(node.body, rules)}</>))}`,
      });
    }
    case "Switch": {
      const fallback = node.fallback ? `(<>${emitNodeInline(node.fallback, rules)}</>)` : "null";
      return cExpr({
        text: `{${node.cases.map((c) => `${rewriteExpr(c.test.expr, rules)} ? (<>${emitNodeInline(c.body, rules)}</>)`).join(" : ")} : ${fallback}}`,
      });
    }
    case "SlotPlaceholder": {
      // A named slot is consumed as a prop — a node prop (`{props.prefix}`) when unscoped, a function
      // prop (`{props.prefix?.(args)}`) when scoped — mirroring the fill. The default slot still
      // projects through Qwik's native `<Slot/>`: Qwik never populates `props.children`, so the old
      // `{props.children ?? …}` lowering would silently drop every projected child.
      if (node.name !== "default") {
        return cExpr({ text: `{${namedSlotRead(node, rules)}}` });
      }
      if (node.scopedArgs.length > 0) {
        // Qwik's `<Slot/>` can't receive scoped args. Best-effort: render the authored fallback
        // (default content, with its scope vars in scope); otherwise project without the args.
        return node.fallback
          ? emitNode(node.fallback, rules)
          : cJsxElement({ tag: "Slot", attrs: [], children: [], selfClose: true });
      }
      const fallbackChildren = node.fallback ? [emitNode(node.fallback, rules)] : [];
      return cJsxElement({
        tag: "Slot",
        attrs: [],
        children: fallbackChildren,
        selfClose: fallbackChildren.length === 0,
      });
    }
    case "Transition": {
      const attrs = [cJsxAttr({ name: "name", value: { kind: "static", text: node.name } })];
      if (node.appear) {
        attrs.push(cJsxAttr({ name: "appear", value: { kind: "boolean" } }));
      }
      return cJsxElement({
        tag: "__InkTransition",
        attrs,
        children: [emitNode(node.child, rules)],
        selfClose: false,
      });
    }
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

function emitNodeInline(node: IRNode, rules: RewriteRules): string {
  if (node.kind === "Text") {
    return `"${node.value}"`;
  }
  return inlineCode(emitNode(node, rules));
}

// Whether emitting `node` produces a Qwik `<Slot>` element (and therefore needs the `Slot` import).
// Mirrors the SlotPlaceholder emit: every slot lowers to `<Slot>` EXCEPT a scoped slot that has
// fallback, which renders that fallback inline instead (Qwik's `<Slot/>` can't carry scoped args).
function emitsQwikSlot(node: IRNode): boolean {
  switch (node.kind) {
    case "SlotPlaceholder":
      // Named slots are props now, not `<Slot>`; only the default slot projects through `<Slot/>`.
      if (node.name !== "default") return node.fallback ? emitsQwikSlot(node.fallback) : false;
      if (node.scopedArgs.length > 0 && node.fallback) return emitsQwikSlot(node.fallback);
      return true;
    case "Element":
    case "Fragment":
      return node.children.some(emitsQwikSlot);
    case "If":
      return (
        node.branches.some((b) => emitsQwikSlot(b.body)) ||
        (node.fallback ? emitsQwikSlot(node.fallback) : false)
      );
    case "For":
      return emitsQwikSlot(node.body);
    case "Switch":
      return (
        node.cases.some((c) => emitsQwikSlot(c.body)) ||
        (node.fallback ? emitsQwikSlot(node.fallback) : false)
      );
    case "ComponentInstance":
      return node.slots.some((s) => emitsQwikSlot(s.body));
    case "Transition":
      return emitsQwikSlot(node.child);
    default:
      return false;
  }
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

const QWIK_TRANSITION_HELPER = `const __InkTransition = component$((props: { name?: string; appear?: boolean; children?: any }) => {
  const name = props.name ?? "ink";
  const ref = useSignal<HTMLDivElement>();
  const show = useSignal(true);
  useVisibleTask$(({ track, cleanup }) => {
    track(() => props.children);
    const el = ref.value;
    if (!el) return;
    const active = !!props.children;
    if (active) {
      el.classList.add(name + "-enter-from", name + "-enter-active");
      requestAnimationFrame(() => { el.classList.remove(name + "-enter-from"); el.classList.add(name + "-enter-to"); });
      const done = () => { el.classList.remove(name + "-enter-active", name + "-enter-to"); };
      el.addEventListener("transitionend", done, { once: true });
    } else if (show.value) {
      el.classList.add(name + "-leave-from", name + "-leave-active");
      requestAnimationFrame(() => { el.classList.remove(name + "-leave-from"); el.classList.add(name + "-leave-to"); });
      const done = () => { el.classList.remove(name + "-leave-active", name + "-leave-to"); show.value = false; };
      el.addEventListener("transitionend", done, { once: true });
      const t = setTimeout(done, 1000);
      cleanup(() => { clearTimeout(t); el.removeEventListener("transitionend", done); });
    }
  });
  return show.value ? <div ref={ref} style={{ display: "contents" }}>{props.children}</div> : null;
});`;

// The `props` parameter is typed so each declared prop carries its resolved type; the object-form
// `{ color: "blue", size: Number }` resolves to `color?: string` / `size: number` via `typeText`,
// falling back to the authored `typeNode` and finally `unknown`. Intersecting with `Record<string,
// any>` keeps the spread `...__attrs` fallthrough valid.
/** Type fields for models (value prop + `onUpdate<Prop>$` QRL) and emitted-event QRL callbacks. */
function qwikModelEventTypeFields(component: IRComponent): string[] {
  const fields: string[] = [];
  for (const m of component.models) {
    const t = m.typeNode?.getText() ?? "unknown";
    fields.push(`${m.propName}?: ${t}`);
    fields.push(`${eventToCallbackProp(`update:${m.propName}`)}$?: QRL<(value: ${t}) => void>`);
  }
  for (const ev of component.events) {
    fields.push(`${eventToCallbackProp(ev.name)}$?: QRL<(...args: any[]) => void>`);
  }
  return fields;
}

function buildPropsTypeAnnotation(component: IRComponent): string {
  const emission = qwikModelEventTypeFields(component);
  // A prop-less component (no props and no model/event emission) takes an untyped `(props)` param.
  if (component.props.length === 0 && emission.length === 0) return "";
  const parts: string[] = [];
  if (component.propsTypeText) {
    parts.push(component.propsTypeText);
  } else if (component.props.length > 0) {
    const defs = component.props
      .map((p) => {
        const typeStr = p.typeText ?? p.typeNode?.getText() ?? "unknown";
        return `${p.name}${p.required ? "" : "?"}: ${typeStr}`;
      })
      .join("; ");
    parts.push(`{ ${defs} }`);
  }
  if (emission.length > 0) parts.push(`{ ${emission.join("; ")} }`);
  return `: ${parts.join(" & ")} & Record<string, any>`;
}

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  // Qwik has no runtime slot-presence API, so `hasSlot()` always returns true here (gated content
  // renders unconditionally); flag it so authors pair it with a CSS `:empty` collapse.
  if (component.primitives.some((p) => p.name === "hasSlot")) {
    ctx.diagnostics.push("INK0068", component.loc);
  }
  const setters = Object.fromEntries(component.state.map((s) => [s.setterName, s.name]));
  // Model getters read `props.<prop>`; model setters and `emit(…)` call `props.on…$?.()` QRL callbacks.
  const rules: RewriteRules = {
    ...ctx.rewrites,
    setters,
    ...callbackPropRules(component.models, component.emitName, "$"),
    reactiveReads: reactiveReadNames(component),
  };
  const body: Code[] = [];
  const qwikImports = ["component$", "useSignal", "useComputed$", "useVisibleTask$", "$"];
  if (component.models.length > 0 || component.events.length > 0) qwikImports.push("QRL");

  for (const c of component.consumes) {
    qwikImports.push("useContext");
    body.push(cStmt({ body: `const ${c.name} = useContext(${c.contextName}.id)`, span: c.loc }));
  }

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
  // Declare refs before effects/lifecycle tasks. A `useVisibleTask$` that reads `ref.value` is
  // extracted into its own QRL, and Qwik's optimizer captures lexical scope textually — an effect
  // emitted above the `const ref = useSignal(null)` it reads would resolve to an undeclared name at
  // runtime (`ReferenceError`). Refs init to `null` with no dependencies, so they hoist safely here.
  for (const r of component.refs) {
    body.push(
      cStmt({
        body: `const ${r.name} = useSignal${r.elementType ? `<${r.elementType} | null>` : ""}(null)`,
        span: r.loc,
      }),
    );
  }
  for (const e of component.effects) {
    body.push(cStmt({ body: `useVisibleTask$(${rewriteExpr(e.body, rules)})`, span: e.loc }));
  }
  for (const m of component.lifecycle.onMount) {
    body.push(cStmt({ body: `useVisibleTask$(${rewriteExpr(m.body, rules)})`, span: m.loc }));
  }
  for (const c of component.lifecycle.onCleanup) {
    body.push(
      cStmt({
        body: `useVisibleTask$(({ cleanup }) => cleanup(${rewriteExpr(c.body, rules)}))`,
        span: c.loc,
      }),
    );
  }
  for (const res of component.resources) {
    qwikImports.push("useTask$");
    // Lower the resource to reactive signals plus an async loader: `data`/`loading`/`error` become
    // `useSignal`s, and a `useTask$` runs the fetcher and writes the result back through `.value`.
    body.push(cStmt({ body: `const ${res.name} = useSignal(undefined)`, span: res.loc }));
    if (res.loadingName) {
      body.push(cStmt({ body: `const ${res.loadingName} = useSignal(true)`, span: res.loc }));
    }
    if (res.errorName) {
      body.push(cStmt({ body: `const ${res.errorName} = useSignal(undefined)`, span: res.loc }));
    }
    const fetcher = rewriteExpr(res.fetcher.expr, rules);
    const errorChain = res.errorName ? `.catch((e) => ${res.errorName}.value = e)` : "";
    const finallyChain = res.loadingName ? `.finally(() => ${res.loadingName}.value = false)` : "";
    body.push(
      cStmt({
        body: `useTask$(() => { (${fetcher})().then((d) => ${res.name}.value = d)${errorChain}${finallyChain}; })`,
        span: res.loc,
      }),
    );
  }
  // Provide after the signals/memos it reads are declared — a context value referencing a
  // `useSignal` above it would otherwise be a temporal-dead-zone access.
  for (const p of component.provides) {
    qwikImports.push("useContextProvider");
    const valueExpr = rewriteExpr(p.value.expr, rules);
    body.push(
      cStmt({ body: `useContextProvider(${p.contextName}.id, ${valueExpr})`, span: p.loc }),
    );
  }

  // Props with a default destructure into a local with that default applied; the render tree then
  // reads the local (via `propLocals`) so an omitted prop resolves to its default. Qwik reads
  // `props.x` by default, so the local read is the only place the default takes effect.
  const propsWithDefaults = component.props.filter((p) => p.defaultValue !== undefined);
  const propLocals = new Set(propsWithDefaults.map((p) => p.name));
  const propsTypeAnnotation = buildPropsTypeAnnotation(component);

  const fallthrough = rootAcceptsFallthrough(component);
  if (fallthrough) {
    const keys = new Set<string>();
    for (const slot of component.slots) keys.add(slot.name === "default" ? "children" : slot.name);
    for (const p of component.props) {
      keys.add(p.defaultValue ? `${p.name} = ${rewriteExpr(p.defaultValue.expr, rules)}` : p.name);
    }
    for (const m of component.models) {
      keys.add(m.propName);
      keys.add(`${eventToCallbackProp(`update:${m.propName}`)}$`);
    }
    for (const ev of component.events) keys.add(`${eventToCallbackProp(ev.name)}$`);
    const prefix = keys.size > 0 ? `${[...keys].join(", ")}, ` : "";
    body.push(cStmt({ body: `const { ${prefix}...${FALLTHROUGH_REST} } = props` }));
  } else if (propsWithDefaults.length > 0) {
    // No fallthrough rest binding to carry the defaults — destructure the default-bearing props on
    // their own so each local exists with its default applied.
    const defs = propsWithDefaults
      .map((p) => `${p.name} = ${rewriteExpr(p.defaultValue!.expr, rules)}`)
      .join(", ");
    body.push(cStmt({ body: `const { ${defs} } = props` }));
  }

  if (emitsQwikSlot(component.render)) qwikImports.push("Slot");

  const needsTransition = hasTransition(component.render);

  // Bare reads of a resource's `data`/`loading`/`error` in the template are reactive signal reads,
  // so the render tree resolves them through the target's reactiveRead (`.value` for Qwik).
  const resourceReads = new Set(
    component.resources.flatMap((r) => [r.name, r.loadingName, r.errorName].filter(Boolean)),
  ) as Set<string>;
  const renderRules: RewriteRules = { ...rules, reactiveBindings: resourceReads, propLocals };

  const renderTree = emitNode(component.render, renderRules);

  const styleImport =
    component.styles.length > 0 ? [cRaw({ text: `import "./${component.name}.css";` })] : [];

  const contextDefs: Code[] = [];
  for (const ctxDef of ctx.contexts) {
    qwikImports.push("createContextId");
    const defaultText = ctxDef.defaultValue
      ? rewriteExpr(ctxDef.defaultValue.expr, rules)
      : "undefined";
    const typeParam = ctxDef.typeText ? `<${ctxDef.typeText}>` : "";
    contextDefs.push(
      cStmt({
        body: `export const ${ctxDef.name} = { id: createContextId${typeParam}("${ctxDef.name}"), defaultValue: ${defaultText} }`,
      }),
    );
  }

  const file = cFile({
    flavor: "tsx",
    children: [
      cImport({
        module: "@qwik.dev/core",
        named: [...new Set(qwikImports)].map((i) => ({ imported: i })),
      }),
      ...emitComponentImports(ctx.componentImports, "", false),
      ...ctx.externalImports,
      ...styleImport,
      ...(ctx.typeDeclarations.length > 0 ? [cRaw({ text: "" }), ...ctx.typeDeclarations] : []),
      ...(contextDefs.length > 0 ? [cRaw({ text: "" }), ...contextDefs] : []),
      ...(needsTransition ? [cRaw({ text: "" }), cRaw({ text: QWIK_TRANSITION_HELPER })] : []),
      cRaw({ text: "" }),
      cStmt({
        body:
          // Models and events compile to `props.<prop>` reads and `props.on<Name>$` callbacks, so a
          // component declaring either needs the `props` param even with no plain props/slots/fallthrough
          // (e.g. a Fragment root, which never gains attribute fallthrough).
          component.props.length > 0 ||
          component.slots.length > 0 ||
          component.models.length > 0 ||
          component.events.length > 0 ||
          fallthrough
            ? `export const ${component.name} = component$((props${propsTypeAnnotation}) =>`
            : `export const ${component.name} = component$(() =>`,
      }),
      cRaw({ text: "{" }),
      cGroup({
        children: [
          ...body,
          cRaw({ text: "" }),
          cStmt({ body: "return (" }),
          unwrapRootExpr(renderTree),
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
