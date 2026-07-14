import type {
  Target,
  CodegenContext,
  CodeModule,
  RewriteRules,
  CollapseContext,
} from "../../context.ts";
import { angularConformance } from "./conformance.ts";
import type { Code } from "../../code-ir/nodes.ts";
import type { IRAttribute, IRComponent, IRElement, IRNode } from "../../../ir/render/nodes.ts";
import { cFile, cImport, cStmt, cRaw, cGroup } from "../../code-ir/builders.ts";
import { childrenArePhrasing } from "../../shared/phrasing.ts";
import {
  rewriteExpr,
  rewriteEventName,
  rewriteAttrName,
  extractKeyBody,
  reactiveReadNames,
  foldConstTest,
} from "../../shared/expr-rewrite.ts";
import { emitComponentImports } from "../../shared/component-imports.ts";
import { assertNever } from "../../../core/assert.ts";
import { walkRenderTree } from "../../../ir/render/visit.ts";
import { angularSelector, angularAttrSelector } from "./selector.ts";
import * as ts from "typescript";

/**
 * Angular event bindings are statements, not function expressions. Unwrap an authored arrow
 * handler `(e) => body` to its body, mapping the event param to `$event` (e.g.
 * `(input)="value.set($event.target.value)"`). Block bodies become `;`-separated statements.
 */
function angularEventExpr(expr: ts.Expression, rules: RewriteRules): string {
  if (!ts.isArrowFunction(expr)) return rewriteExpr(expr, rules);
  const param = expr.parameters[0];
  const r: RewriteRules =
    param && ts.isIdentifier(param.name)
      ? { ...rules, rename: { ...rules.rename, [param.name.text]: "$event" } }
      : rules;
  if (ts.isBlock(expr.body)) {
    return expr.body.statements
      .filter(ts.isExpressionStatement)
      .map((s) => rewriteExpr(s.expression, r))
      .join("; ");
  }
  return rewriteExpr(expr.body, r);
}

interface ReactiveProvideProp {
  /** The key on the provided context object. */
  readonly key: string;
  /** The component signal lifted into the DI factory and exposed via a getter/setter for `key`. */
  readonly signal: string;
}

/** Lowercase the first character (`FormContext` → `formContext`) for the injected provider field. */
function lowerFirst(name: string): string {
  return name.charAt(0).toLowerCase() + name.slice(1);
}

/** The local value names bound by forwarded external imports (e.g. styleframe recipes). */
function externalImportNames(externalImports: readonly Code[]): string[] {
  const names: string[] = [];
  for (const imp of externalImports) {
    if (imp.kind !== "CRaw") continue;
    const named = imp.text.match(/import\s*\{([^}]*)\}\s*from/);
    if (!named) continue;
    for (const entry of named[1]!.split(",")) {
      const trimmed = entry.trim();
      if (!trimmed || trimmed.startsWith("type ")) continue;
      names.push(trimmed.includes(" as ") ? trimmed.split(/\s+as\s+/)[1]!.trim() : trimmed);
    }
  }
  return names;
}

/**
 * Inspect a `provide(Ctx, value)` object literal. A property whose value is a bare component-signal
 * read (`{ disabled: disabled() }`) is reactive: its signal is lifted into the DI factory and
 * exposed via a getter/setter so the value stays live. Every other property is emitted verbatim.
 */
function analyzeProvide(
  valueExpr: ts.Expression,
  stateSignals: ReadonlySet<string>,
  rules: RewriteRules,
): { reactiveProps: ReactiveProvideProp[]; staticParts: string[] } {
  const reactiveProps: ReactiveProvideProp[] = [];
  const staticParts: string[] = [];
  if (ts.isObjectLiteralExpression(valueExpr)) {
    for (const prop of valueExpr.properties) {
      if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
        const init = prop.initializer;
        if (
          ts.isCallExpression(init) &&
          init.arguments.length === 0 &&
          ts.isIdentifier(init.expression) &&
          stateSignals.has(init.expression.text)
        ) {
          reactiveProps.push({ key: prop.name.text, signal: init.expression.text });
          continue;
        }
        staticParts.push(`${prop.name.text}: ${rewriteExpr(init, rules)}`);
      } else {
        staticParts.push(prop.getText());
      }
    }
  }
  return { reactiveProps, staticParts };
}

const REWRITES: RewriteRules = {
  reactiveRead: { kind: "preserve-call" },
  setterStyle: { kind: "method-call", method: "set" },
  // A ref is a `viewChild<ElementRef>` signal; a class-body read of an element ref unwraps to
  // `this.ref()?.nativeElement` (see `elementRefs` below) so imperative DOM writes land on the node.
  refAccess: { kind: "bare", unwrap: "nativeElement" },
  jsxAttrCasing: "html",
  eventNameCase: "camel",
  members: { props: { strip: true } },
  // Template expressions live inside double-quoted attribute bindings.
  stringQuote: "single",
  // Props are signal inputs, so a `props.x` read uses the call form `x()` / `this.x()`.
  propSignals: true,
  // Angular has no runtime slot-presence API: always render and let CSS `:empty` collapse the wrapper.
  hasSlotCheck: () => "true",
};

// Angular's template parser only allows void (and custom/foreign) elements to self-close; a
// childless non-void element must emit an explicit closing tag.
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

// Native-element bindings that must stay Angular *property* bindings (`[name]="…"`). For these, a
// property binding already does the right thing when the value is nullish (`el.disabled = undefined`
// → not disabled; `el.value = undefined` → empty; `[style]="undefined"` → no inline style), and an
// *attribute* binding would be wrong: `[attr.disabled]="false"` renders `disabled="false"` (still
// disabled), `[attr.value]` sets the initial attribute not the live value, and `[attr.style]`
// bypasses Angular's dedicated style binding. Two groups: boolean/value-semantic props, and
// property-only/special bindings (`style`, `innerHTML`, …). Every OTHER dynamic attribute is emitted
// as `[attr.name]="(expr) ?? null"` so a nullish value omits it instead of stringifying to
// `"undefined"`/`"null"` (a property binding like `[id]="id()"` cannot omit — `el.id = undefined`
// reflects as `id="undefined"`).
//
// CAVEAT: also add any presence-only boolean attribute that is NOT a reflected DOM property (e.g.
// `autofocus`) if it's ever bound dynamically — `[attr.autofocus]="false ?? null"` renders
// `autofocus="false"`, which the browser still treats as present. None are bound today.
const KEEP_PROPERTY = new Set([
  "value",
  "checked",
  "selected",
  "disabled",
  "readonly",
  "required",
  "multiple",
  "hidden",
  "indeterminate",
  "open",
  "muted",
  "style",
  "innerHTML",
  "innerText",
  "textContent",
]);

/**
 * The class expression for a fallthrough root: the node's own class plus the `klass` input a
 * parent forwards (see the `klass` synthesis in `emit`). Angular template expressions cannot call
 * helpers like `filter`, so the merge is plain string concatenation guarded by a ternary.
 */
function mergedClassExpr(own: string | undefined, rules: RewriteRules): string {
  void rules;
  if (own === undefined) return "klass()";
  return `${own} + (klass() ? ' ' + klass() : '')`;
}

/** The node's own class attr as a template expression (`'badge'` for static, `(expr)` for dynamic). */
function ownClassExpr(
  a: { value: { kind: string; value?: unknown; expr?: ts.Expression } },
  rules: RewriteRules,
): string {
  if (a.value.kind === "Static") return `'${String(a.value.value)}'`;
  return `(${rewriteExpr(a.value.expr!, rules)})`;
}

/** Append a conditional class fragment: `base + (extra ? ' ' + extra : '')`, or just `base` if absent. */
function appendClass(base: string, extra: string | undefined): string {
  return extra === undefined ? base : `${base} + (${extra} ? ' ' + ${extra} : '')`;
}

/**
 * Collapse: true when `value` is solely a `props.X` read the styled wrapper didn't forward (its
 * `propArgs` entry is `null`), so the inlined host binding is omitted rather than bound to the
 * styled's same-named prop.
 */
function isUnforwardedProp(
  value: IRAttribute["value"],
  collapse: CollapseContext | undefined,
): boolean {
  if (!collapse?.propArgs || value.kind !== "Expression") return false;
  const e = value.expr;
  return (
    ts.isPropertyAccessExpression(e) &&
    ts.isIdentifier(e.expression) &&
    e.expression.text === "props" &&
    collapse.propArgs.get(e.name.text) === null
  );
}

/**
 * Map a headless component's root element to Angular `host: { … }` binding entries. Reuses the exact
 * attribute classification of `emitNode`'s Element case, rendered as host-binding keys so the native
 * host element (the attribute-selector variant) carries them directly with no wrapper: the class
 * merges with the parent-forwarded `klass()`, KEEP_PROPERTY attrs stay property bindings, every other
 * dynamic attr binds via `[attr.name]` (`?? null` so a nullish value omits it), statics become literal
 * host attributes, and root events become host event bindings.
 *
 * `recipeExpr` (set when a styled component collapses onto this root) is the styled's forwarded class
 * expression, merged between the root's own class and the inherited `klass()`.
 */
function headlessHostBindings(root: IRElement, rules: RewriteRules, recipeExpr?: string): string[] {
  // The render root is always a fallthrough root (markRootFallthrough marks every Element root), so
  // the class always merges the parent-forwarded `klass()`.
  const entries: string[] = [];
  let classBound = false;
  for (const a of root.attrs) {
    const name = rewriteAttrName(a.name, rules);
    if (name === "class") {
      classBound = true;
      const own = appendClass(ownClassExpr(a, rules), recipeExpr);
      entries.push(`'[class]': "${mergedClassExpr(own, rules)}"`);
      continue;
    }
    if (a.value.kind === "Static") {
      entries.push(`'${name}': '${a.value.value}'`);
      continue;
    }
    // Collapse: omit a binding that is solely a child prop the styled wrapper didn't forward, so it
    // doesn't leak onto the inlined host (see `CollapseContext.propArgs`).
    if (isUnforwardedProp(a.value, rules.collapse)) continue;
    const expr = rewriteExpr(a.value.expr, rules);
    entries.push(
      KEEP_PROPERTY.has(name) ? `'[${name}]': "${expr}"` : `'[attr.${name}]': "(${expr}) ?? null"`,
    );
  }
  if (!classBound) {
    entries.push(`'[class]': "${mergedClassExpr(recipeExpr, rules)}"`);
  }
  for (const e of root.events) {
    const evName = rewriteEventName(e.name, rules).replace(/^on/, "").toLowerCase();
    entries.push(`'(${evName})': "${angularEventExpr(e.handler.expr, rules)}"`);
  }
  return entries;
}

/**
 * The children-only template for a headless host variant: the root element's children emitted with
 * the same inline/whitespace decision as the Element case, so the body matches the wrapper variant's
 * exactly — only the surrounding root tag is gone (it became the host).
 */
function headlessTemplate(root: IRElement, rules: RewriteRules): string {
  const inline = childrenArePhrasing(root.children);
  return root.children.map((c) => emitNode(c, rules)).join(inline ? "" : "\n");
}

function emitNode(node: IRNode, rules: RewriteRules): string {
  switch (node.kind) {
    case "Element": {
      // A fallthrough root merges the parent-forwarded `klass()` into its own class.
      const fallthrough = node.acceptsAttrFallthrough === true;
      let classBound = false;
      const attrParts = node.attrs.map((a) => {
        const name = rewriteAttrName(a.name, rules);
        if (fallthrough && name === "class") {
          classBound = true;
          return `[class]="${mergedClassExpr(ownClassExpr(a, rules), rules)}"`;
        }
        if (a.value.kind === "Static") return `${name}="${a.value.value}"`;
        const expr = rewriteExpr(a.value.expr, rules);
        // Boolean/value-semantic props stay property bindings; every other dynamic attribute binds
        // via `[attr.name]` with `?? null` so a nullish value omits it (not `id="undefined"`).
        return KEEP_PROPERTY.has(name)
          ? `[${name}]="${expr}"`
          : `[attr.${name}]="(${expr}) ?? null"`;
      });
      if (fallthrough && !classBound) {
        attrParts.push(`[class]="${mergedClassExpr(undefined, rules)}"`);
      }
      const attrs = attrParts.join(" ");
      const events = node.events
        .map(
          (e) =>
            `(${rewriteEventName(e.name, rules).replace(/^on/, "").toLowerCase()})="${angularEventExpr(e.handler.expr, rules)}"`,
        )
        .join(" ");
      const refs = node.refs.map((r) => `#${rewriteExpr(r.ref.expr, rules)}`).join(" ");
      const attrStr = [attrs, events, refs].filter(Boolean).join(" ");
      // Phrasing (text + interpolation) is whitespace-significant; emit it inline so Angular's
      // whitespace collapsing can't alter the rendered text. Element children are collapsed by Angular
      // regardless, so they keep the readable multi-line formatting.
      const inline = childrenArePhrasing(node.children);
      const children = node.children.map((c) => emitNode(c, rules)).join(inline ? "" : "\n");
      if (node.children.length === 0) {
        // Only void elements may self-close in Angular templates; childless non-void elements
        // need an explicit closing tag (JIT rejects e.g. `<span … />`).
        return VOID_ELEMENTS.has(node.tag)
          ? `<${node.tag}${attrStr ? " " + attrStr : ""} />`
          : `<${node.tag}${attrStr ? " " + attrStr : ""}></${node.tag}>`;
      }
      const body = inline ? children : `\n${children}\n`;
      return `<${node.tag}${attrStr ? " " + attrStr : ""}>${body}</${node.tag}>`;
    }
    case "Text":
      return node.value;
    case "Expression":
      return `{{ ${rewriteExpr(node.expr, rules)} }}`;
    case "If": {
      // Fold statically-true/false tests (e.g. `hasSlot` → `true` on Angular) so we never emit a
      // constant `@if (true)`: a true branch renders unconditionally, false branches are dropped.
      let result = "";
      let started = false;
      for (const b of node.branches) {
        const test = rewriteExpr(b.test.expr, rules);
        const folded = foldConstTest(test);
        if (folded === false) continue;
        if (folded === true) {
          const body = emitNode(b.body, rules);
          return started ? `${result} @else {\n${body}\n}` : body;
        }
        const dir = started ? "@else if" : "@if";
        result += `${dir} (${test}) {\n${emitNode(b.body, rules)}\n}`;
        started = true;
      }
      // With at least one surviving `@if`, the fallback is the trailing `@else`; if every branch
      // folded away it renders unconditionally (a bare `@else` would have no `@if` to attach to).
      if (node.fallback) {
        result += started
          ? ` @else {\n${emitNode(node.fallback, rules)}\n}`
          : emitNode(node.fallback, rules);
      }
      return result;
    }
    case "For": {
      const idx = node.indexBinding ? `; let ${node.indexBinding} = $index` : "";
      return `@for (${node.itemBinding} of ${rewriteExpr(node.each.expr, rules)}; track ${extractKeyBody(node.key.expr, rules)}${idx}) {\n${emitNode(node.body, rules)}\n}`;
    }
    case "Switch": {
      // Angular @case matches by value against @switch; our cases are boolean conditions, so
      // emit @if/@else-if chains instead.
      let result = "";
      node.cases.forEach((c, i) => {
        const dir = i === 0 ? "@if" : "@else if";
        result += `${dir} (${rewriteExpr(c.test.expr, rules)}) {\n${emitNode(c.body, rules)}\n}`;
      });
      if (node.fallback) result += ` @else {\n${emitNode(node.fallback, rules)}\n}`;
      return result;
    }
    case "Fragment":
      return node.children.map((c) => emitNode(c, rules)).join("\n");
    case "ComponentInstance": {
      const localName = node.resolved?.name ?? node.reference.getText();
      // In a collapsed template a headless child renders as an attribute selector on its own root tag
      // (`<span ink-input-prefix-base>`, zero wrapper); otherwise as its element selector (`<ink-x>`).
      const collapseChild = rules.collapse?.children?.get(localName);
      const childRoot = collapseChild?.render.kind === "Element" ? collapseChild.render : undefined;
      const openTag = childRoot
        ? `${childRoot.tag} ${angularSelector(localName)}`
        : angularSelector(localName);
      const closeTag = childRoot ? childRoot.tag : angularSelector(localName);
      // Ivy always treats a `[class]` binding as a host class — it never reaches an input — so a
      // class passed to a compiled child travels through its synthesized `klass` input instead,
      // and the child's root element merges it (see the Element case above).
      const fallthrough = node.acceptsAttrFallthrough === true;
      let classBound = false;
      const ciParts: string[] = [];
      for (const a of node.attrs) {
        const name = rewriteAttrName(a.name, rules);
        if (name === "class") {
          classBound = true;
          const own = ownClassExpr(a, rules);
          ciParts.push(`[klass]="${fallthrough ? mergedClassExpr(own, rules) : own}"`);
          continue;
        }
        if (a.value.kind === "Static") ciParts.push(`${name}="${a.value.value}"`);
        else ciParts.push(`[${name}]="${rewriteExpr(a.value.expr, rules)}"`);
      }
      if (fallthrough && !classBound) {
        ciParts.push(`[klass]="${mergedClassExpr(undefined, rules)}"`);
      }
      for (const e of node.events) {
        // A `$bind:<prop>` lowers to `update:<prop>`; the child's `model()` exposes it as the
        // `<prop>Change` output. Otherwise a component `@Output()` name is camelCase with only its
        // leading character lowercased (`onValueChange` → `valueChange`), never the whole name.
        let evName: string;
        if (e.twoWayProp) {
          evName = `${e.twoWayProp}Change`;
        } else {
          const base = rewriteEventName(e.name, rules).replace(/^on/, "");
          evName = base.charAt(0).toLowerCase() + base.slice(1);
        }
        ciParts.push(`(${evName})="${angularEventExpr(e.handler.expr, rules)}"`);
      }
      const ciAttrStr = ciParts.join(" ");
      if (node.slots.length === 0) {
        // A collapsed attribute-child on a void element (`<input ink-x>`) must self-close — Angular
        // rejects `</input>`. Otherwise non-self-closing: Angular's JIT mishandles self-closed
        // component (element-selector) tags.
        if (childRoot && VOID_ELEMENTS.has(childRoot.tag)) {
          return `<${openTag}${ciAttrStr ? " " + ciAttrStr : ""} />`;
        }
        return `<${openTag}${ciAttrStr ? " " + ciAttrStr : ""}></${closeTag}>`;
      }
      const slotContent = node.slots
        .map((s) => {
          if (s.name === "default") return emitNode(s.body, rules);
          return `<ng-container slot="${s.name}">\n${emitNode(s.body, rules)}\n</ng-container>`;
        })
        .join("\n");
      return `<${openTag}${ciAttrStr ? " " + ciAttrStr : ""}>\n${slotContent}\n</${closeTag}>`;
    }
    case "Transition":
      return emitNode(node.child, rules);
    case "SlotPlaceholder":
      // Collapse: project the styled component's own slot body into the inlined headless root's slot.
      // Clear slotBodies for the substituted content so ITS slots still become `<ng-content>` for the
      // consumer (one level of projection, not infinite).
      if (rules.collapse?.slotBodies?.has(node.name)) {
        return emitNode(rules.collapse.slotBodies.get(node.name)!, {
          ...rules,
          collapse: { ...rules.collapse, slotBodies: undefined },
        });
      }
      // Angular has no scoped-slot mechanism: a slot with `args` can't receive per-row data from a
      // parent. Best-effort: render the authored fallback (the component's default content, whose
      // loop/scope variables are in scope here) so the component still renders standalone.
      if (node.scopedArgs.length > 0 && node.fallback) {
        return `<!-- scoped slot '${node.name}': args are not projectable in Angular; rendering default content -->\n${emitNode(node.fallback, rules)}`;
      }
      {
        // Non-self-closing `<ng-content>` (self-closing breaks JIT parsing of projected content and
        // sibling elements). The authored fallback renders as Angular's content-projection default
        // (supported from Angular 18), shown when nothing is projected.
        const select = node.name !== "default" ? ` select="[slot=${node.name}]"` : "";
        const fallback = node.fallback ? emitNode(node.fallback, rules) : "";
        return `<ng-content${select}>${fallback}</ng-content>`;
      }
    default:
      assertNever(node);
  }
}

function emit(component: IRComponent, ctx: CodegenContext): CodeModule {
  // Angular has no runtime slot-presence API, so `hasSlot()` always returns true here (gated content
  // renders unconditionally); flag it so authors pair it with a CSS `:empty` collapse.
  if (component.primitives.some((p) => p.name === "hasSlot")) {
    ctx.diagnostics.push("INK0068", component.loc);
  }
  // A model is a writable signal (`model()`); its setter `setValue(v)` → `value.set(v)`. `emit("x", …)`
  // calls the matching `@Output()` emitter: `this.x.emit(…)` (class body) / `x.emit(…)` (template).
  const setters = Object.fromEntries([
    ...component.state.map((s) => [s.setterName, s.name]),
    ...component.models.map((m) => [m.setterName, m.name]),
  ]);
  const emitRule = component.emitName
    ? ({ local: component.emitName, style: "angular-output" } as const)
    : undefined;
  // Refs bound to a DOM element (`<input ref={x}>`) must unwrap to `this.x()?.nativeElement` in
  // class-body reads (see REWRITES.refAccess); a ref on a component instance keeps the raw `viewChild`
  // signal read. The render tree is the authoritative element-vs-component signal here — the ref
  // declaration's `category` is populated by an earlier pass that misses component-instance refs.
  const elementRefNames = new Set<string>();
  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind === "Element") {
        for (const r of node.refs) elementRefNames.add(r.ref.expr.getText());
      }
    },
  });

  const baseRules: RewriteRules = {
    ...ctx.rewrites,
    setters,
    emit: emitRule,
    reactiveReads: reactiveReadNames(component),
    elementRefs: elementRefNames,
  };
  const stateSignals = new Set(component.state.map((s) => s.name));

  // Resolve context provides up front: a value derived from a component signal lifts that signal
  // into the DI factory (Angular can't read instance state in provider metadata). The lifted signal
  // is reachable to the rest of the component as `<field>.<prop>` (see providedSignals below).
  const providedSignals = new Map<string, { field: string; prop: string }>();
  const providerEntries: string[] = [];
  const providerInjectFields: string[] = [];
  const initialOf = (signal: string): string => {
    const s = component.state.find((st) => st.name === signal);
    return s ? rewriteExpr(s.initial.expr, baseRules) : "undefined";
  };
  for (const p of component.provides) {
    const { reactiveProps, staticParts } = analyzeProvide(p.value.expr, stateSignals, baseRules);
    if (reactiveProps.length === 0) {
      providerEntries.push(
        `{ provide: ${p.contextName}.key, useValue: ${rewriteExpr(p.value.expr, baseRules)} }`,
      );
      continue;
    }
    const field = lowerFirst(p.contextName);
    const signalDecls = reactiveProps
      .map((r) => `const ${r.signal} = signal(${initialOf(r.signal)});`)
      .join(" ");
    const members = [
      ...reactiveProps.map(
        (r) => `get ${r.key}() { return ${r.signal}(); }, set ${r.key}(v) { ${r.signal}.set(v); }`,
      ),
      ...staticParts,
    ];
    providerEntries.push(
      `{ provide: ${p.contextName}.key, useFactory: () => { ${signalDecls} return { ${members.join(", ")} }; } }`,
    );
    providerInjectFields.push(`${field} = inject(${p.contextName}.key)`);
    for (const r of reactiveProps) providedSignals.set(r.signal, { field, prop: r.key });
  }

  const rules: RewriteRules = { ...baseRules, providedSignals };
  // Class-body expressions (memos, effects, state initializers) access component members via
  // `this.`, unlike the template which uses bare names. A whole-`props` reference reconstructs
  // the declared props as `{ name: this.name(), … }` (signal inputs read in call form).
  const propsWhole = `{ ${component.props.map((p) => `${p.name}: this.${p.name}()`).join(", ")} }`;
  const bodyRules: RewriteRules = {
    ...rules,
    selfPrefix: true,
    members: {
      ...rules.members,
      props: { strip: rules.members?.props?.strip ?? true, whole: propsWhole },
    },
  };
  const body: Code[] = [];
  const angularImports = ["Component", "signal", "computed", "effect"];

  // Angular templates resolve identifiers against the component instance, so module-level imports
  // referenced by the template (styleframe recipes called inline, e.g. `inputPrefixRecipe({…})`)
  // must be re-exposed as class fields. The field initializer's RHS resolves to the module import.
  for (const name of externalImportNames(ctx.externalImports)) {
    body.push(cStmt({ body: `${name} = ${name}` }));
  }

  // Scan the render tree once: instances the standalone `imports` must declare, and whether any
  // fallthrough root exists (which needs the synthesized `klass` input below).
  const instanceNames = new Set<string>();
  let hasFallthroughRoot = false;
  walkRenderTree(component.render, {
    enter(node) {
      if (node.kind === "ComponentInstance") {
        instanceNames.add(node.resolved?.name ?? node.reference.getText());
      }
      if (
        (node.kind === "ComponentInstance" || node.kind === "Element") &&
        node.acceptsAttrFallthrough === true
      ) {
        hasFallthroughRoot = true;
      }
    },
  });

  // The class a parent forwards (Vue-style attribute fallthrough). Ivy never routes `[class]`
  // bindings to inputs, so the forwarded class travels through this dedicated input and the root
  // element merges it with its own class.
  if (hasFallthroughRoot) {
    angularImports.push("input");
    body.push(cStmt({ body: `klass = input<string>()` }));
  }

  for (const c of component.consumes) {
    angularImports.push("inject");
    body.push(cStmt({ body: `${c.name} = inject(${c.contextName}.key)`, span: c.loc }));
  }
  for (const f of providerInjectFields) {
    angularImports.push("inject");
    body.push(cStmt({ body: f }));
  }

  for (const s of component.state) {
    if (providedSignals.has(s.name)) continue; // lifted into the DI factory above
    body.push(
      cStmt({ body: `${s.name} = signal(${rewriteExpr(s.initial.expr, bodyRules)})`, span: s.loc }),
    );
  }
  for (const m of component.memos) {
    body.push(
      cStmt({
        body: `${m.name} = computed(() => ${rewriteExpr(m.expr.expr, bodyRules)})`,
        span: m.loc,
      }),
    );
  }
  // Effects and lifecycle run from a single constructor (a class can only have one).
  const ctorStmts: string[] = [];
  for (const e of component.effects) ctorStmts.push(`effect(${rewriteExpr(e.body, bodyRules)})`);
  for (const m of component.lifecycle.onMount) {
    angularImports.push("afterNextRender");
    ctorStmts.push(`afterNextRender(${rewriteExpr(m.body, bodyRules)})`);
  }
  for (const c of component.lifecycle.onCleanup) {
    angularImports.push("inject", "DestroyRef");
    ctorStmts.push(`inject(DestroyRef).onDestroy(${rewriteExpr(c.body, bodyRules)})`);
  }
  // Lower each resource to reactive signal state plus an async loader that runs the fetcher and
  // writes the result into those signals — the universal "manual fetch with loading/error state"
  // pattern, expressed with Angular signals. The loader runs from the consolidated constructor.
  for (const res of component.resources) {
    body.push(cStmt({ body: `${res.name} = signal(undefined)`, span: res.loc }));
    if (res.loadingName) body.push(cStmt({ body: `${res.loadingName} = signal(true)` }));
    if (res.errorName) body.push(cStmt({ body: `${res.errorName} = signal(undefined)` }));
    let loader = `(${rewriteExpr(res.fetcher.expr, bodyRules)})().then((d) => this.${res.name}.set(d))`;
    if (res.errorName) loader += `.catch((e) => this.${res.errorName}.set(e))`;
    if (res.loadingName) loader += `.finally(() => this.${res.loadingName}.set(false))`;
    ctorStmts.push(loader);
  }
  if (ctorStmts.length > 0) {
    body.push(cStmt({ body: `constructor() { ${ctorStmts.join("; ")} }` }));
  }
  for (const r of component.refs) {
    angularImports.push("viewChild", "ElementRef");
    body.push(
      cStmt({
        body: `${r.name} = viewChild<ElementRef>('${r.name}')`,
        span: r.loc,
      }),
    );
  }
  if (component.props.length > 0) {
    // Props are signal inputs so memos/effects/templates react to them. Reads use the call form
    // (`this.color()` / `color()`), wired via the `propSignals` rewrite rule.
    angularImports.push("input");
    for (const p of component.props) {
      const typeText = p.typeText ?? p.typeNode?.getText();
      const generic = typeText ? `<${typeText}>` : "";
      if (p.defaultValue) {
        // A default seeds the input's initial value: `color = input<string>('blue')`.
        body.push(
          cStmt({
            body: `${p.name} = input${generic}(${rewriteExpr(p.defaultValue.expr, bodyRules)})`,
            span: p.loc,
          }),
        );
      } else if (p.required) {
        body.push(cStmt({ body: `${p.name} = input.required${generic}()`, span: p.loc }));
      } else {
        body.push(cStmt({ body: `${p.name} = input${generic}()`, span: p.loc }));
      }
    }
  }

  // Models are writable signals (an input + a `<prop>Change` output); the field reads in call form
  // (`value()`) and writes via `value.set(v)`. An aliased name maps the field to its public prop.
  if (component.models.length > 0) {
    angularImports.push("model");
    for (const m of component.models) {
      const generic = m.typeNode ? `<${m.typeNode.getText()}>` : "";
      const opts =
        m.name !== m.propName ? `undefined, { alias: ${JSON.stringify(m.propName)} }` : "";
      body.push(cStmt({ body: `${m.name} = model${generic}(${opts})`, span: m.loc }));
    }
  }
  // Custom events become `@Output()` emitters; `emit("x", …)` → `this.x.emit(…)`.
  if (component.events.length > 0) {
    angularImports.push("output");
    for (const ev of component.events) {
      const generic = ev.payloadType ? `<${ev.payloadType.getText()}>` : "";
      body.push(cStmt({ body: `${ev.name} = output${generic}()`, span: ev.loc }));
    }
  }

  // Bare template reads of a resource's data/loading/error follow Angular's reactiveRead
  // (preserve-call) so they emit as `data()`/`loading()`. Only the template needs this — the
  // class-body declaration rules above must keep emitting the bare field names.
  const resourceReads = new Set(
    component.resources.flatMap((r) =>
      [r.name, r.loadingName, r.errorName].filter((n): n is string => n !== undefined),
    ),
  );
  const templateRules: RewriteRules = { ...rules, reactiveBindings: resourceReads };
  const template = emitNode(component.render, templateRules);
  const styleImport =
    component.styles.length > 0 ? [cRaw({ text: `import "./${component.name}.css";` })] : [];

  const contextDefs: Code[] = [];
  for (const ctxDef of ctx.contexts) {
    angularImports.push("InjectionToken");
    const defaultText = ctxDef.defaultValue
      ? rewriteExpr(ctxDef.defaultValue.expr, rules)
      : "undefined";
    const typeParam = ctxDef.typeText ? `<${ctxDef.typeText}>` : "";
    contextDefs.push(
      cStmt({
        body: `export const ${ctxDef.name} = { key: new InjectionToken${typeParam}("${ctxDef.name}"), defaultValue: ${defaultText} }`,
      }),
    );
  }

  const providersStr =
    providerEntries.length > 0 ? `, providers: [${providerEntries.join(", ")}]` : "";

  // Standalone components must declare every component they instantiate — both cross-file imports
  // and same-file siblings (which compile to their own `.component.ts` modules and are imported
  // here so the `imports: [...]` reference resolves).
  const importedLocals = ctx.componentImports
    .map((i) => i.localName)
    .filter((n): n is string => Boolean(n));
  const sameFileChildren = [...instanceNames].filter(
    (n) => !importedLocals.includes(n) && n !== component.name,
  );
  const importNames = [...importedLocals, ...sameFileChildren];
  const importsStr = importNames.length > 0 ? `, imports: [${importNames.join(", ")}]` : "";
  const sameFileImports = sameFileChildren.map((n) =>
    cRaw({ text: `import { ${n}Component as ${n} } from "./${n}.component";` }),
  );

  // Escape a template body for embedding in the `@Component({ template: `…` })` backticks.
  const escTemplate = (t: string) => t.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
  const classBody = () => [cRaw({ text: "{" }), cGroup({ children: body }), cRaw({ text: "}" })];

  // The element-selector component (`<ink-x>`, a `display: contents` wrapper). Unchanged for every
  // component — the backward-compatible form.
  const classBlocks: Code[] = [
    cRaw({
      text: `@Component({ standalone: true, selector: '${angularSelector(component.name)}', host: { style: 'display: contents' }${importsStr}${providersStr}, template: \`${escTemplate(template)}\` })`,
    }),
    cStmt({ body: `export class ${component.name}Component` }),
    ...classBody(),
  ];

  // A headless component additionally emits an attribute-selector variant whose single static-element
  // root IS the Angular host (`<button ink-button>`, zero wrapper). The element-selector wrapper above
  // is kept (dual selector). `imports` is passed through only for direct extraction — a collapsed host
  // inlines its child and instantiates nothing.
  const pushHostVariant = (
    selector: string,
    hostStr: string,
    tmpl: string,
    imports: string,
  ): void => {
    classBlocks.push(
      cRaw({ text: "" }),
      cRaw({
        text: `@Component({ standalone: true, selector: '${selector}', ${hostStr}${imports}${providersStr}, template: \`${escTemplate(tmpl)}\` })`,
      }),
      cStmt({ body: `export class ${component.name}HostComponent` }),
      ...classBody(),
    );
  };

  // Extra imports a collapsed host variant needs for the nested headless children it instantiates as
  // attribute-selector directives (their `HostComponent` variants).
  const extraImports: Code[] = [];

  if (component.meta?.headless) {
    const root = component.render;
    if (root.kind === "Element") {
      // Direct extraction: the root element becomes the host; its children become the template.
      pushHostVariant(
        angularAttrSelector(component.name, root.tag),
        `host: { ${headlessHostBindings(root, templateRules).join(", ")} }`,
        headlessTemplate(root, templateRules),
        importsStr,
      );
    } else if (root.kind === "ComponentInstance") {
      // Collapse: the styled root renders a single headless child (resolved from the registry). Inline
      // that child's root as the host — its host bindings with the styled's recipe class merged in,
      // plus the child's own selector as a static host attribute (`ink-button-base`). The styled's slot
      // bodies project into the inlined child's slots, and nested headless siblings in that content
      // render as attribute-selector children (zero wrapper), each importing its `HostComponent`.
      const childName = root.resolved?.name ?? root.reference.getText();
      const child = ctx.headlessRegistry?.get(childName);
      if (child && child.render.kind === "Element") {
        const childRoot = child.render;
        // The child's host bindings/events reference the child's own model setters (e.g.
        // `setOpen(...)` from `defineModel("open")`); map those names onto the same model so they
        // emit against the merged component, which declares that model under the styled binding.
        const childSetters = Object.fromEntries(child.models.map((m) => [m.setterName, m.name]));
        const collapse: CollapseContext = {
          children: ctx.headlessRegistry,
          slotBodies: new Map(root.slots.map((s) => [s.name, s.body] as const)),
        };
        const collapseRules: RewriteRules = {
          ...templateRules,
          setters: { ...templateRules.setters, ...childSetters },
          collapse,
        };
        const classAttr = root.attrs.find(
          (a) => rewriteAttrName(a.name, collapseRules) === "class",
        );
        const recipeExpr = classAttr ? ownClassExpr(classAttr, collapseRules) : undefined;
        // Bind the inlined host's own attrs against the styled instance's actual arguments: map each
        // of the child's props to what the wrapper forwarded (or the child's default), or `null` when
        // the wrapper passed nothing — so an unforwarded child-root prop is omitted rather than
        // resolving to the styled component's same-named prop. `class`/two-way args are handled
        // separately (recipeExpr / childSetters), and `propArgs` lives only on the host ruleset; the
        // projected slot content keeps rewriting in the styled namespace via `collapseRules`.
        const propArgs = new Map<string, string | null>();
        for (const a of root.attrs) {
          if (a.binding === "class" || a.binding === "twoWay") continue;
          const argExpr =
            a.value.kind === "Static"
              ? typeof a.value.value === "string"
                ? `'${a.value.value}'`
                : String(a.value.value)
              : rewriteExpr(a.value.expr, collapseRules);
          propArgs.set(a.name, argExpr);
        }
        for (const p of child.props) {
          if (propArgs.has(p.name)) continue;
          propArgs.set(
            p.name,
            p.defaultValue ? rewriteExpr(p.defaultValue.expr, collapseRules) : null,
          );
        }
        const hostRules: RewriteRules = { ...collapseRules, collapse: { ...collapse, propArgs } };
        const hostEntries = headlessHostBindings(childRoot, hostRules, recipeExpr);
        hostEntries.push(`'${angularSelector(child.name)}': ''`);

        // The collapsed template instantiates the styled's slot-content headless siblings as
        // attribute directives; declare + import their `HostComponent` variants.
        const nested = new Set<string>();
        for (const s of root.slots) {
          walkRenderTree(s.body, {
            enter(n) {
              if (n.kind !== "ComponentInstance") return;
              const nm = n.resolved?.name ?? n.reference.getText();
              if (ctx.headlessRegistry?.get(nm)?.render.kind === "Element") nested.add(nm);
            },
          });
        }
        for (const nm of nested) {
          const imp = ctx.componentImports.find((i) => i.localName === nm);
          const path = imp ? `${imp.relativePath}.component` : `./${nm}.component`;
          extraImports.push(cRaw({ text: `import { ${nm}HostComponent } from "${path}";` }));
        }
        const nestedImports =
          nested.size > 0
            ? `, imports: [${[...nested].map((n) => `${n}HostComponent`).join(", ")}]`
            : "";
        pushHostVariant(
          angularAttrSelector(component.name, childRoot.tag),
          `host: { ${hostEntries.join(", ")} }`,
          headlessTemplate(childRoot, collapseRules),
          nestedImports,
        );
      } else {
        ctx.diagnostics.push("INK0111", component.loc, { name: component.name });
      }
    } else {
      ctx.diagnostics.push("INK0111", component.loc, { name: component.name });
    }
  }

  const file = cFile({
    flavor: "ts",
    children: [
      cImport({
        module: "@angular/core",
        named: [...new Set(angularImports)].map((i) => ({ imported: i })),
      }),
      ...emitComponentImports(ctx.componentImports, ".component", false, "Component"),
      ...sameFileImports,
      ...extraImports,
      ...ctx.externalImports,
      ...styleImport,
      ...(ctx.typeDeclarations.length > 0 ? [cRaw({ text: "" }), ...ctx.typeDeclarations] : []),
      ...(contextDefs.length > 0 ? [cRaw({ text: "" }), ...contextDefs] : []),
      cRaw({ text: "" }),
      ...classBlocks,
    ],
  });

  return { componentName: component.name, root: file, fileName: `${component.name}.component.ts` };
}

export const angular: Target = {
  name: "angular",
  rewrites: REWRITES,
  conformance: angularConformance,
  emit,
};
export default angular;
