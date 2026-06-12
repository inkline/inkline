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
import {
  rewriteExpr,
  rewriteEventName,
  rewriteAttrName,
  eventToCallbackProp,
  callbackPropRules,
  reactiveReadNames,
} from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import {
  FALLTHROUGH_REST,
  classMergeExpr,
  rootAcceptsFallthrough,
} from "../../shared/fallthrough.ts";
import { assertNever } from "../../../core/assert.ts";

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "preserve-call" },
  setterStyle: { kind: "function-call" },
  refAccess: { kind: "bare" },
  jsxAttrCasing: "html",
  eventNameCase: "lower",
  members: { props: { strip: false } },
  // Slots are plain props (default → `children`); filled iff non-null. Parenthesized for safe composition.
  hasSlotCheck: (name) => `(props.${name === "default" ? "children" : name} != null)`,
};

// ── Shared attr / event / ref helpers ──────────────────────────────

function jsxAttrs(
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
    // `onUpdate<Prop>` callback prop rather than a (colon-bearing) DOM event name.
    const name = e.twoWayProp
      ? eventToCallbackProp(e.name)
      : rewriteEventName(e.name, rules, isComponent);
    out.push(
      cJsxAttr({
        name,
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
      const attrs = jsxAttrs(node, rules, true);
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
    case "SlotPlaceholder": {
      if (node.scopedArgs.length > 0) {
        const argsStr = node.scopedArgs.map((a) => rewriteExpr(a.expr, rules)).join(", ");
        return node.fallback
          ? cExpr({
              text: `{props.${node.name}?.(${argsStr}) ?? ${inlineNode(node.fallback, rules)}}`,
            })
          : cExpr({ text: `{props.${node.name}?.(${argsStr})}` });
      }
      // The unscoped default slot is delivered through Solid's native `children` prop.
      const propName = node.name === "default" ? "children" : node.name;
      return node.fallback
        ? cExpr({ text: `{props.${propName} ?? ${inlineNode(node.fallback, rules)}}` })
        : cExpr({ text: `{props.${propName}}` });
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

function inlineNode(node: IRNode, rules: RewriteRules): string {
  if (node.kind === "Text") {
    return `"${node.value}"`;
  }
  if (node.kind === "Expression") {
    return rewriteExpr(node.expr, rules);
  }
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
    case "Transition":
      collectCFImports(node.child, out);
      break;
    case "Text":
    case "Expression":
    case "SlotPlaceholder":
      break;
    default:
      assertNever(node);
  }
}

// ── Transition helper ──────────────────────────────────────────────

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

const SOLID_TRANSITION_HELPER = `function __InkTransition(props: { name?: string; appear?: boolean; children?: any }) {
  let ref: HTMLDivElement | undefined;
  const name = () => props.name ?? "ink";
  const [show, setShow] = createSignal(!!props.children);
  let prevChildren = props.children;
  let mounted = false;
  createEffect(() => {
    const active = !!props.children;
    const el = ref;
    if (!el) return;
    if (active) {
      prevChildren = props.children;
      if (!show()) setShow(true);
      if (!mounted && !props.appear) { mounted = true; return; }
      mounted = true;
      el.classList.add(name() + "-enter-from", name() + "-enter-active");
      requestAnimationFrame(() => { el.classList.remove(name() + "-enter-from"); el.classList.add(name() + "-enter-to"); });
      const done = () => { el.classList.remove(name() + "-enter-active", name() + "-enter-to"); el.removeEventListener("transitionend", done); };
      el.addEventListener("transitionend", done, { once: true });
    } else if (show()) {
      el.classList.add(name() + "-leave-from", name() + "-leave-active");
      requestAnimationFrame(() => { el.classList.remove(name() + "-leave-from"); el.classList.add(name() + "-leave-to"); });
      const done = () => { el.classList.remove(name() + "-leave-active", name() + "-leave-to"); el.removeEventListener("transitionend", done); setShow(false); };
      el.addEventListener("transitionend", done, { once: true });
      const t = setTimeout(done, 1000);
      onCleanup(() => { clearTimeout(t); el.removeEventListener("transitionend", done); });
    }
  });
  return <Show when={show()}><div ref={(el) => ref = el} style={{ display: "contents" }}>{props.children ?? prevChildren}</div></Show>;
}`;

// ── Emit entry point ───────────────────────────────────────────────

function buildSolidPropsType(component: IRComponent): string {
  const parts: string[] = [];

  if (component.propsTypeText) {
    parts.push(component.propsTypeText);
  } else if (component.props.length > 0) {
    const defs = component.props
      .map((p) => {
        const opt = p.required ? "" : "?";
        const typeText = p.typeText ?? p.typeNode?.getText();
        const type = typeText ? `: ${typeText}` : "";
        return `${p.name}${opt}${type}`;
      })
      .join("; ");
    parts.push(`{ ${defs} }`);
  }

  const slotFields: string[] = [];
  for (const slot of component.slots) {
    if (slot.isScoped) {
      slotFields.push(`${slot.name}?: (...args: any[]) => any`);
    } else {
      const fieldName = slot.name === "default" ? "children" : slot.name;
      slotFields.push(`${fieldName}?: any`);
    }
  }
  if (slotFields.length > 0) {
    parts.push(`{ ${slotFields.join("; ")} }`);
  }

  const emissionFields = modelEventTypeFields(component);
  if (emissionFields.length > 0) {
    parts.push(`{ ${emissionFields.join("; ")} }`);
  }

  if (rootAcceptsFallthrough(component)) {
    parts.push("JSX.HTMLAttributes<HTMLElement>");
  }

  if (parts.length === 0) return "Record<string, never>";
  return parts.join(" & ");
}

/** Type fields for a component's models (value prop + update callback) and emitted-event callbacks. */
function modelEventTypeFields(component: IRComponent): string[] {
  const fields: string[] = [];
  for (const m of component.models) {
    const t = m.typeNode?.getText() ?? "unknown";
    fields.push(`${m.propName}?: ${t}`);
    fields.push(`${eventToCallbackProp(`update:${m.propName}`)}?: (value: ${t}) => void`);
  }
  for (const ev of component.events) {
    fields.push(`${eventToCallbackProp(ev.name)}?: (...args: any[]) => void`);
  }
  return fields;
}

/** Keys to keep out of the fallthrough rest (declared props + slot props + model/callback names). */
function fallthroughRestKeys(component: IRComponent): string[] {
  const names = new Set<string>();
  for (const slot of component.slots) {
    // The unscoped default slot lives on `children`, not `default`.
    names.add(slot.name === "default" && !slot.isScoped ? "children" : slot.name);
  }
  for (const p of component.props) names.add(p.name);
  for (const m of component.models) {
    names.add(m.propName);
    names.add(eventToCallbackProp(`update:${m.propName}`));
  }
  for (const ev of component.events) names.add(eventToCallbackProp(ev.name));
  return [...names];
}

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  // Model getters read `props.<prop>`, model setters and `emit(…)` call `props.on…?.()` callbacks.
  const rules: RewriteRules = {
    ...ctx.rewrites,
    ...callbackPropRules(component.models, component.emitName),
    reactiveReads: reactiveReadNames(component),
  };
  const body: Code[] = [];
  const solidImports: string[] = [];

  // Apply prop defaults via Solid's mergeProps so `props.x` resolves to the default when omitted.
  // The merged result is bound to a fresh `const props` (the parameter is renamed `_props`) so the
  // defaulted keys narrow to non-optional types, while the rest of the body keeps reading `props.x`.
  const propDefaults = component.props.filter((p) => p.defaultValue !== undefined);
  if (propDefaults.length > 0) {
    solidImports.push("mergeProps");
    const entries = propDefaults
      .map((p) => `${p.name}: ${rewriteExpr(p.defaultValue!.expr, rules)}`)
      .join(", ");
    body.push(cStmt({ body: `const props = mergeProps({ ${entries} }, _props)` }));
  }

  for (const c of component.consumes) {
    solidImports.push("useContext");
    body.push(cStmt({ body: `const ${c.name} = useContext(${c.contextName})`, span: c.loc }));
  }

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
  // Lower each resource to reactive signals (data/loading/error) plus a fire-and-forget loader that
  // runs the fetcher and updates them — the universal "manual fetch with loading/error state"
  // pattern in idiomatic Solid. The template reads the signals as calls (see reactiveBindings below).
  for (const res of component.resources) {
    solidImports.push("createSignal");
    // Setter names are derived from each binding (`set${Capitalized}`, leading underscores from
    // unused-marked names like `_error` stripped) so multiple resources never collide on `setData`.
    const setterFor = (name: string) =>
      `set${name.replace(/^_+/, "").replace(/^./, (c) => c.toUpperCase())}`;
    const dataSetter = setterFor(res.name);
    body.push(
      cStmt({
        body: `const [${res.name}, ${dataSetter}] = createSignal(undefined)`,
        span: res.loc,
      }),
    );
    let loadingSetter: string | undefined;
    if (res.loadingName) {
      loadingSetter = setterFor(res.loadingName);
      body.push(
        cStmt({
          body: `const [${res.loadingName}, ${loadingSetter}] = createSignal(true)`,
          span: res.loc,
        }),
      );
    }
    let errorSetter: string | undefined;
    if (res.errorName) {
      errorSetter = setterFor(res.errorName);
      body.push(
        cStmt({
          body: `const [${res.errorName}, ${errorSetter}] = createSignal(undefined)`,
          span: res.loc,
        }),
      );
    }
    const fetcher = rewriteExpr(res.fetcher.expr, rules);
    const onError = errorSetter ? `.catch(${errorSetter})` : "";
    const onFinally = loadingSetter ? `.finally(() => ${loadingSetter}(false))` : "";
    body.push(
      cStmt({ body: `;(${fetcher})().then(${dataSetter})${onError}${onFinally}`, span: res.loc }),
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

  const fallthrough = rootAcceptsFallthrough(component);
  if (fallthrough) {
    solidImports.push("splitProps");
    const keys = fallthroughRestKeys(component)
      .map((k) => JSON.stringify(k))
      .join(", ");
    body.push(cStmt({ body: `const [, ${FALLTHROUGH_REST}] = splitProps(props, [${keys}])` }));
  }

  const needsTransition = hasTransition(component.render);
  if (needsTransition) {
    solidImports.push("createSignal", "createEffect", "onCleanup", "Show");
  }

  collectCFImports(component.render, solidImports);

  const styleImport =
    component.styles.length > 0 ? [cRaw({ text: `import "./${component.name}.css";` })] : [];

  // Solid signals are read as calls, so the render tree must read each resource binding as `data()`.
  // Build the set of bound resource names and spread it into the render rules (reactiveRead is
  // preserve-call). Only the render tree needs this — the body declarations above read nothing.
  const resourceReads = new Set(
    component.resources.flatMap((r) =>
      [r.name, r.loadingName, r.errorName].filter((n): n is string => n !== undefined),
    ),
  );
  const renderRules: RewriteRules = { ...rules, reactiveBindings: resourceReads };

  let renderTree = emitNode(component.render, renderRules);

  for (const p of component.provides) {
    const valueExpr = rewriteExpr(p.value.expr, renderRules);
    renderTree = cJsxElement({
      tag: `${p.contextName}.Provider`,
      attrs: [
        cJsxAttr({
          name: "value",
          value: { kind: "expr", expr: cExpr({ text: valueExpr }) },
        }),
      ],
      children: [renderTree],
      selfClose: false,
    });
  }

  const contextDefs: Code[] = [];
  for (const ctxDef of ctx.contexts) {
    solidImports.push("createContext");
    const defaultText = ctxDef.defaultValue
      ? rewriteExpr(ctxDef.defaultValue.expr, rules)
      : "undefined";
    const typeParam = ctxDef.typeText ? `<${ctxDef.typeText}>` : "";
    contextDefs.push(
      cStmt({ body: `export const ${ctxDef.name} = createContext${typeParam}(${defaultText})` }),
    );
  }

  const unique = [...new Set(solidImports)];
  const imports: Code[] =
    unique.length > 0
      ? [cImport({ module: "solid-js", named: unique.map((i) => ({ imported: i })) })]
      : [];
  if (fallthrough) {
    imports.push(cImport({ module: "solid-js", named: [{ imported: "JSX" }], typeOnly: true }));
  }

  const file = cFile({
    flavor: "tsx",
    children: [
      ...imports,
      ...emitComponentImports(ctx.componentImports, "", true),
      ...ctx.externalImports,
      ...styleImport,
      ...(ctx.typeDeclarations.length > 0 ? [cRaw({ text: "" }), ...ctx.typeDeclarations] : []),
      ...contextDefs,
      ...(needsTransition ? [cRaw({ text: "" }), cRaw({ text: SOLID_TRANSITION_HELPER })] : []),
      cRaw({ text: "" }),
      cStmt({
        body: `export default function ${component.name}(${propDefaults.length > 0 ? "_props" : "props"}: ${buildSolidPropsType(component)})`,
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
