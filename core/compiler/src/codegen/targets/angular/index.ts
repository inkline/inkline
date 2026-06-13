import type { Target, CodegenContext, CodeModule, RewriteRules } from "../../context.ts";
import { angularConformance } from "./conformance.ts";
import type { Code } from "../../code-ir/nodes.ts";
import type { IRComponent, IRNode } from "../../../ir/render/nodes.ts";
import { cFile, cImport, cStmt, cRaw, cGroup } from "../../code-ir/builders.ts";
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
import { angularSelector } from "./selector.ts";
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
  refAccess: { kind: "bare" },
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
        return `[${name}]="${rewriteExpr(a.value.expr, rules)}"`;
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
      const children = node.children.map((c) => emitNode(c, rules)).join("\n");
      if (node.children.length === 0) {
        // Only void elements may self-close in Angular templates; childless non-void elements
        // need an explicit closing tag (JIT rejects e.g. `<span … />`).
        return VOID_ELEMENTS.has(node.tag)
          ? `<${node.tag}${attrStr ? " " + attrStr : ""} />`
          : `<${node.tag}${attrStr ? " " + attrStr : ""}></${node.tag}>`;
      }
      return `<${node.tag}${attrStr ? " " + attrStr : ""}>\n${children}\n</${node.tag}>`;
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
      if (node.fallback) result += ` @else {\n${emitNode(node.fallback, rules)}\n}`;
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
      const tag = angularSelector(localName);
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
        // Non-self-closing: Angular's template parser mishandles self-closed component tags in JIT.
        return `<${tag}${ciAttrStr ? " " + ciAttrStr : ""}></${tag}>`;
      }
      const slotContent = node.slots
        .map((s) => {
          if (s.name === "default") return emitNode(s.body, rules);
          return `<ng-container slot="${s.name}">\n${emitNode(s.body, rules)}\n</ng-container>`;
        })
        .join("\n");
      return `<${tag}${ciAttrStr ? " " + ciAttrStr : ""}>\n${slotContent}\n</${tag}>`;
    }
    case "Transition":
      return emitNode(node.child, rules);
    case "SlotPlaceholder":
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
  const baseRules: RewriteRules = {
    ...ctx.rewrites,
    setters,
    emit: emitRule,
    reactiveReads: reactiveReadNames(component),
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

  const file = cFile({
    flavor: "ts",
    children: [
      cImport({
        module: "@angular/core",
        named: [...new Set(angularImports)].map((i) => ({ imported: i })),
      }),
      ...emitComponentImports(ctx.componentImports, ".component", false, "Component"),
      ...sameFileImports,
      ...ctx.externalImports,
      ...styleImport,
      ...(ctx.typeDeclarations.length > 0 ? [cRaw({ text: "" }), ...ctx.typeDeclarations] : []),
      ...(contextDefs.length > 0 ? [cRaw({ text: "" }), ...contextDefs] : []),
      cRaw({ text: "" }),
      cRaw({
        text: `@Component({ standalone: true, selector: '${angularSelector(component.name)}'${importsStr}${providersStr}, template: \`${template.replace(/`/g, "\\`").replace(/\$\{/g, "\\${")}\` })`,
      }),
      cStmt({ body: `export class ${component.name}Component` }),
      cRaw({ text: "{" }),
      cGroup({ children: body }),
      cRaw({ text: "}" }),
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
