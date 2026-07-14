import type { Code } from "./code-ir/nodes.ts";
import type { IRComponent, IRContextDefinition, IRNode } from "../ir/render/nodes.ts";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import type { DiagnosticCollector } from "../core/diagnostics/collector.ts";
import type { ResolvedCompilerOptions } from "../core/options.ts";
import type { SymbolTable } from "../ir/reactivity.ts";

export type TargetName = "react" | "solid" | "vue" | "svelte" | "angular" | "qwik" | "astro";

export const ALL_TARGETS: readonly TargetName[] = Object.freeze([
  "react",
  "solid",
  "vue",
  "svelte",
  "angular",
  "qwik",
  "astro",
]);

export type ReactiveReadKind =
  | { readonly kind: "strip-call" }
  | { readonly kind: "preserve-call" }
  | { readonly kind: "field-access"; readonly field: string };

export type SetterStyleKind =
  | { readonly kind: "function-call" }
  | { readonly kind: "field-assignment"; readonly field: string }
  | { readonly kind: "direct-assignment" }
  | { readonly kind: "method-call"; readonly method: string };

export type RefAccessKind =
  | { readonly kind: "field"; readonly field: string }
  // `bare` reads the ref variable directly. `unwrap`, when set, appends `?.<unwrap>` to a class-body
  // (`selfPrefix`) read of an *element* ref — Angular's `viewChild<ElementRef>` signal returns the
  // ElementRef wrapper, so `ref.current` must unwrap to `this.ref()?.nativeElement` to reach the DOM
  // node. Gated by {@link RewriteRules.elementRefs} so component refs keep the raw wrapper.
  | { readonly kind: "bare"; readonly unwrap?: string };

export interface MemberRewriteRules {
  /**
   * `strip` rewrites `props.x` → `x` (targets that destructure props). `whole`, when set,
   * rewrites a bare `props` reference to this expression — used by targets that destructure
   * `props` and therefore have no `props` binding for whole-object references (e.g. Svelte
   * reconstructs `{ name, ...rest }`).
   */
  readonly props?: { readonly strip: boolean; readonly whole?: string };
  readonly slots?: { readonly strip: boolean; readonly rename?: Readonly<Record<string, string>> };
}

export interface RewriteRules {
  readonly reactiveRead: ReactiveReadKind;
  readonly setterStyle: SetterStyleKind;
  readonly refAccess: RefAccessKind;
  readonly jsxAttrCasing: "react" | "html";
  readonly eventNameCase: "camel" | "kebab" | "lower";
  readonly members?: MemberRewriteRules;
  /**
   * Prefix component-member references (`props.x`, reactive reads `x()`) with `this.`.
   * Used by class-based targets (Angular) when emitting class-body expressions
   * (memos/effects), where members are accessed via `this`, unlike the template.
   */
  readonly selfPrefix?: boolean;
  /**
   * Map of setter name → state name (e.g. `setCount` → `count`). A call to a known setter
   * is rewritten per {@link setterStyle} (e.g. `count.value = …`, `count = …`, `count.set(…)`).
   */
  readonly setters?: Readonly<Record<string, string>>;
  /** Rename bare identifiers (e.g. an event-handler param `e` → `$event` for Angular bindings). */
  readonly rename?: Readonly<Record<string, string>>;
  /**
   * Identifiers that hold a reactive *value* read by its bare name (e.g. a `createResource`
   * `data`/`loading`/`error`, typed as a plain value, not an accessor). A bare read of one of
   * these is rewritten per {@link reactiveRead} — `data` → `data` (React/Vue/Svelte), `data()`
   * (Solid/Angular), or `data.value` (Qwik) — so each framework's read convention is honoured even
   * though the authored read has no call syntax.
   */
  readonly reactiveBindings?: ReadonlySet<string>;
  /**
   * Identifiers that, read as a zero-arg call `foo()`, are reactive accessor reads (signal / memo /
   * model getters) and so follow {@link reactiveRead}. A zero-arg call to any name NOT in this set
   * (e.g. an imported styleframe recipe `inputAppendRecipe()`) is a plain function call and keeps
   * its call syntax. Built per-component from the IR's known reactive bindings; mirrors how
   * {@link setters} gates the write side.
   */
  readonly reactiveReads?: ReadonlySet<string>;
  /**
   * Names of refs bound to a DOM element (`<input ref={x}>`). A class-body read of one of these
   * (`ref.current`) is unwrapped per {@link RefAccessKind} `unwrap` (Angular:
   * `this.ref()?.nativeElement`); a ref on a component instance (absent here) keeps the raw signal
   * read. Angular-only.
   */
  readonly elementRefs?: ReadonlySet<string>;
  /**
   * Prop names that are destructured into a local with a default applied (e.g. React's
   * `const { color = "blue", ...__attrs } = props`). A read `props.color` is rewritten to the
   * bare local `color` so the destructured default takes effect. Only set by targets that keep
   * `props.x` reads (no global {@link MemberRewriteRules.props} strip) yet still want defaults
   * applied via destructuring.
   */
  readonly propLocals?: ReadonlySet<string>;
  /**
   * Props are emitted as Angular signal inputs (`color = input<T>()`), so a `props.x` read must use
   * the call form: `this.color()` in a class body, `color()` in the template. Without it `props.x`
   * reads a plain field, which a `computed`/`effect` cannot track. Angular-only.
   */
  readonly propSignals?: boolean;
  /**
   * Signals that have been lifted into a DI-provided context object (Angular). A read `disabled()`
   * becomes `<field>.<prop>` and a setter call `setDisabled(v)` becomes `<field>.<prop> = v`, where
   * the field is the injected context and the prop is a reactive getter/setter over the lifted
   * signal. Lets a component provide a context value derived from its own state and still read/write
   * that state, since Angular cannot evaluate instance state in `@Component` provider metadata.
   */
  readonly providedSignals?: ReadonlyMap<string, { readonly field: string; readonly prop: string }>;
  /**
   * Quote style for string literals in emitted expressions. Angular templates embed expressions
   * in double-quoted attributes, so string literals must use single quotes (`'a'`).
   */
  readonly stringQuote?: "single" | "double";
  /**
   * Model getter local → its read expression (e.g. `value` → `props.value`). A model getter read
   * `value()` resolves to the bound prop rather than the target's generic reactive read. Set only by
   * callback-prop targets (React/Solid/Qwik); native-two-way targets (Vue/Svelte/Angular/Astro) read a
   * model exactly like a signal via {@link reactiveRead}.
   */
  readonly modelReads?: ReadonlyMap<string, string>;
  /**
   * Model setter local → its callback-prop name (e.g. `setValue` → `onUpdateValue`, with a `$` suffix
   * for Qwik QRLs). A call `setValue(v)` becomes `props.<callback>?.(v)`. Callback-prop targets only;
   * native-two-way targets route model setters through {@link setters}.
   */
  readonly modelSetters?: ReadonlyMap<string, string>;
  /**
   * How to rewrite an `emit(name, …args)` call. `callback-prop` emits
   * `props.<on+Pascal(name)+suffix>?.(…)`, `angular-output` emits `<name>.emit(…)` (with `this.` in a
   * class body), `noop` emits `undefined` (static targets). Vue keeps `emit(…)` verbatim and sets no rule.
   */
  readonly emit?: {
    readonly local: string;
    readonly style: "callback-prop" | "angular-output" | "noop";
    readonly suffix?: string;
    /** Access prefix for a callback-prop emit (`props.` for React/Solid/Qwik, `""` for Svelte). */
    readonly propsAccess?: string;
  };
  /**
   * Lowers a `hasSlot("name")` call to the target's slot-presence check. Each target maps the slot
   * name to the runtime read it generates for that slot — `props.renderX != null` (React),
   * `props.x != null` (Solid), `xSnippet != null` (Svelte), `!!$slots.x` (Vue),
   * `Astro.slots.has("x")` (Astro) — or `true` where slot presence isn't observable at runtime
   * (Qwik/Angular), so gated content always renders and CSS `:empty` collapses the empty wrapper.
   */
  readonly hasSlotCheck?: (slotName: string) => string;
  /**
   * Angular collapse only: when a styled `meta.headless` component inlines its headless child's root
   * as the host, this carries the data to bind that inlined root against the styled wrapper (forwarded
   * prop args, projected slot bodies, nested headless siblings) — see {@link CollapseContext}. Absent
   * for every other target and for non-collapsed emission.
   */
  readonly collapse?: CollapseContext;
}

/**
 * Angular collapse only: the data for inlining a `meta.headless` child's render as the host of the
 * styled component collapsing onto it. The styled wrapper and its single headless child are merged
 * into one `@Component`; this binds the child's root against the wrapper's actual arguments rather
 * than the wrapper's same-named props.
 */
export interface CollapseContext {
  /**
   * Nested `meta.headless` siblings (by local name → resolved component) the collapsed template
   * renders as attribute-selector children — `<span ink-input-prefix-base>` rather than
   * `<ink-input-prefix-base>` — so nested parts are zero-wrapper too. Their root tag comes from the
   * resolved component.
   */
  readonly children?: ReadonlyMap<string, IRComponent>;
  /**
   * Slot content (by name) the inlined headless root's `<Slot>` renders instead of an `<ng-content>`
   * (the styled wrapper's own slot body). One level of projection: cleared while emitting that
   * substituted content so its inner slots still become `<ng-content>` for the consumer.
   */
  readonly slotBodies?: ReadonlyMap<string, IRNode>;
  /**
   * Set only on the ruleset used for the inlined host's OWN bindings: the child's prop name → the
   * already-rewritten expression the styled wrapper passed for it, or `null` when the wrapper forwards
   * nothing (the binding is omitted, or degrades to `undefined` inside a larger expression). Absent on
   * the template ruleset so projected slot content keeps rewriting in the styled namespace.
   */
  readonly propArgs?: ReadonlyMap<string, string | null>;
}

export interface ComponentImport {
  readonly localName: string;
  readonly componentName: string;
  readonly relativePath: string;
  readonly namedTypeImports?: readonly string[];
}

export interface CodegenContext {
  readonly diagnostics: DiagnosticCollector;
  readonly options: ResolvedCompilerOptions;
  readonly symbols: SymbolTable;
  readonly rewrites: RewriteRules;
  readonly contexts: readonly IRContextDefinition[];
  readonly externalImports: readonly Code[];
  readonly componentImports: readonly ComponentImport[];
  readonly typeDeclarations: readonly Code[];
  /**
   * Lowered IR of imported `meta.headless` siblings, indexed by component name. Lets the Angular
   * target inline a headless child's root host bindings + template when a styled component collapses
   * onto it (zero-wrapper). Empty unless a component in the module is headless with a
   * `ComponentInstance` root, since building it re-parses the imported sibling files.
   */
  readonly headlessRegistry?: ReadonlyMap<string, IRComponent>;
}

export interface CodeModule {
  readonly componentName: string;
  readonly root: Code;
  readonly fileName: string;
}

export interface ControlFlowImportSpec {
  readonly module: string;
  readonly named?: readonly string[];
}

export interface TargetConformanceSpec {
  readonly controlFlowImports: {
    readonly if?: ControlFlowImportSpec;
    readonly for?: ControlFlowImportSpec;
    readonly switch?: ControlFlowImportSpec;
  };
  readonly lint:
    | { readonly tool: "oxlint"; readonly config: string }
    | { readonly tool: "eslint"; readonly config: string };
  readonly typecheck: {
    readonly tsconfig: string;
    readonly dtsImports: readonly string[];
  };
  readonly invariants: ReadonlyArray<(file: GeneratedFile) => readonly Diagnostic[]>;
}

export interface Target {
  readonly name: TargetName;
  readonly rewrites: RewriteRules;
  readonly conformance?: TargetConformanceSpec;
  readonly defaultOptions?: Readonly<Record<string, unknown>>;
  emit(component: IRComponent, ctx: CodegenContext): CodeModule;
}

export type TargetPlan = Pick<Target, "name" | "rewrites"> & {
  readonly conformance?: TargetConformanceSpec;
};

export interface TargetRegistry {
  get(name: TargetName): Target | undefined;
  has(name: TargetName): boolean;
  list(): readonly TargetName[];
}

export interface GeneratedFile {
  readonly path: string;
  readonly contents: string;
  readonly sourceMap?: string;
}
