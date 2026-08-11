# API Reference

Type reference for `@inkline/compiler`.

The package ships **three entry points, and the import path is the support tier.** There is no
separate stability annotation to look up — if you know where a symbol imports from, you know what it
promises.

| Import path                 | What lives there                                                                         | Stability                                                                         |
| --------------------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `@inkline/compiler`         | Compiling, configuring, selecting targets, reading diagnostics, authoring plugins.       | **Stable.** Follows semver.                                                       |
| `@inkline/compiler/ir`      | The render IR a plugin inspects: node types, builders, visitors, transforms, reactivity. | **Supported, scoped to plugin authoring.** Tracks `IR_VERSION`.                   |
| `@inkline/compiler/codegen` | Code IR, the `Target` contract, the printer, the built-in targets.                       | **Unstable. No semver guarantee** — may change in any release, including a patch. |

Every section below opens with the path its symbols import from. Sections are grouped so that the
tier never changes mid-section.

The rationale for the split is recorded in [ADR-002](../../../docs/adrs/002-compiler-export-surface-tiers.md).

## Sections by tier

**`@inkline/compiler` — stable**
[1. Compilation](#1-compilation) ·
[2. Configuration](#2-configuration) ·
[3. Target selection](#3-target-selection) ·
[4. Plugin API](#4-plugin-api) ·
[5. Diagnostics](#5-diagnostics)

**`@inkline/compiler/ir` — plugin-author API**
[6. IR types](#6-ir-types) ·
[7. IR migration and serialization](#7-ir-migration-and-serialization) ·
[8. IR builders](#8-ir-builders) ·
[9. IR visitors and transforms](#9-ir-visitors-and-transforms) ·
[10. Reactivity](#10-reactivity) ·
[11. Pipeline primitives](#11-pipeline-primitives)

**`@inkline/compiler/codegen` — unstable**
[12. Target API](#12-target-api) ·
[13. Code IR](#13-code-ir) ·
[14. Printer](#14-printer) ·
[15. Built-in targets](#15-built-in-targets)

**Appendix**
[A. Types referenced but not exported](#a-types-referenced-but-not-exported)

---

## 1. Compilation

> **Import from `@inkline/compiler`.** Stable.

### `compile(input, config?)`

Compile a single `.ink.tsx` source file to one or more framework targets.

```ts
function compile(input: CompileInput, config?: Partial<InklineConfig>): Promise<CompileResult>;
```

### `compileIncremental(state, inputs, config?)`

Compile multiple files incrementally, skipping unchanged sources based on content hashing.

```ts
function compileIncremental(
  state: IncrementalState,
  inputs: readonly CompileInput[],
  config?: Partial<InklineConfig>,
): Promise<IncrementalCompileResult>;
```

### `createIncrementalState()`

Create an empty incremental compilation state to pass to `compileIncremental`.

```ts
function createIncrementalState(): IncrementalState;
```

### `seedIncrementalState(seeds)`

Adopt work already done by plain `compile()` calls into an `IncrementalState`, so the first
`compileIncremental` pass can skip those files instead of recompiling them.

```ts
function seedIncrementalState(seeds: readonly IncrementalSeed[]): IncrementalState;

interface IncrementalSeed {
  readonly fileName: string;
  readonly source: string;
  readonly result: CompileResult;
}
```

### `CompileInput`

```ts
type CompileInput =
  | { readonly fileName: string; readonly source: string }
  | { readonly fileName: string; readonly program: ts.Program };
```

Pass `source` for single-file compilation (the compiler creates a TypeScript program internally), or pass an existing `ts.Program` for integration with a larger project.

### `CompileResult`

```ts
interface CompileResult {
  readonly module?: AnalyzedModule;
  readonly files: Readonly<Partial<Record<TargetName, readonly GeneratedFile[]>>>;
  readonly diagnostics: readonly Diagnostic[];
}
```

### `AnalyzedModule`

The IR after analysis (pipeline pass P4), paired with the per-component reactivity graphs built
during that pass. This is what the `ir:post` plugin hook receives — see [§4](#4-plugin-api).

```ts
interface AnalyzedModule {
  readonly module: IRModule;
  readonly graphs: ReadonlyMap<string, ReactivityGraph>; // keyed by IRComponent.id
}
```

`IRModule` and `ReactivityGraph` import from `@inkline/compiler/ir` — see [§6](#6-ir-types) and
[§10](#10-reactivity).

### `IncrementalState`

```ts
interface IncrementalState {
  readonly sourceHashes: ReadonlyMap<string, string>;
  readonly results: ReadonlyMap<string, CompileResult>;
}
```

### `IncrementalCompileResult`

```ts
interface IncrementalCompileResult {
  readonly files: Readonly<Partial<Record<TargetName, readonly GeneratedFile[]>>>;
  readonly diagnostics: readonly Diagnostic[];
  readonly nextState: IncrementalState;
  readonly changed: readonly string[];
  readonly skipped: readonly string[];
}
```

### `GeneratedFile`

```ts
interface GeneratedFile {
  readonly path: string;
  readonly contents: string;
  readonly sourceMap?: string;
}
```

Also re-exported from `@inkline/compiler/codegen`, so a target implementation needs one import
rather than two.

---

## 2. Configuration

> **Import from `@inkline/compiler`.** Stable.

### `defineConfig(c)`

Identity helper for type-safe configuration. Returns the config object unchanged.

```ts
function defineConfig(c: InklineConfig): InklineConfig;
```

### `InklineConfig`

```ts
interface InklineConfig {
  readonly targets: readonly TargetName[];
  readonly srcDir?: string;
  readonly outDir?: string; // default: "dist"
  readonly targetOutDir?: Partial<Record<TargetName, string>>;
  readonly sourceMap?: SourceMapMode; // default: "external"
  readonly targetOptions?: Partial<Record<TargetName, Record<string, unknown>>>;
  readonly plugins?: readonly Plugin[];
  readonly verbose?: boolean; // default: false
  readonly registry?: TargetRegistry; // default: builtinRegistry
  readonly barrels?: readonly BarrelGroup[];
  readonly tsconfig?: string;
}
```

- `barrels` is consumed by `@inkline/cli` only; the compiler pipeline ignores it. When omitted, the
  CLI writes a single `index.ts` barrel containing every non-story component.
- `tsconfig` points at a `tsconfig.json` whose ambient declarations are loaded into the per-file
  TypeScript program, so `import type` from generated modules resolves during prop analysis.
  Inkline's own compiler options (`jsx`, `jsxImportSource`, …) are always forced on top.
- `registry` is typed as `TargetRegistry`, which imports from `@inkline/compiler/codegen`
  ([§12](#12-target-api)). You only need to name that type if you are building a registry; passing
  `builtinRegistry` needs no import beyond the root.

### `BarrelGroup`

Declarative description of a generated re-export barrel. Components are routed to a barrel by
matching a directory segment of their source path (`components/<name>/<match>/…`), so the same
source can be split into multiple per-category entry points.

```ts
interface BarrelGroup {
  readonly file: string; // output file, relative to each target's output root (e.g. "headless.ts")
  readonly match: string; // path segment that assigns a file to this barrel; "" matches any non-story dir
  readonly mode?: "named" | "namespace"; // default: "named"
}
```

### `ResolvedCompilerOptions`

The config after validation and defaulting.

```ts
interface ResolvedCompilerOptions {
  readonly targets: readonly TargetName[];
  readonly srcDir?: string;
  readonly outDir: string;
  readonly targetOutDir: Readonly<Partial<Record<TargetName, string>>>;
  readonly sourceMap: SourceMapMode;
  readonly targetOptions: Readonly<Partial<Record<TargetName, Readonly<Record<string, unknown>>>>>;
  readonly plugins: readonly Plugin[];
  readonly verbose: boolean;
  readonly registry: TargetRegistry;
  readonly tsconfig?: string;
}
```

### `resolveOptions(userConfig)`

Validate a user config and apply defaults. `compile` calls this itself; call it directly when tooling needs to reject a bad config before acting on it (creating or cleaning output directories). Throws `InklineConfigError` on an unusable config.

```ts
function resolveOptions(userConfig: Partial<InklineConfig> | undefined): ResolvedCompilerOptions;
```

### `SourceMapMode`

```ts
type SourceMapMode = "external" | "inline" | "none";
```

---

## 3. Target selection

> **Import from `@inkline/compiler`.** Stable.

_Naming and selecting_ a target is stable. _Implementing_ one is not — the `Target` contract and the
Code IR you write it against live at `@inkline/compiler/codegen` and are unstable
([§12](#12-target-api)).

### `TargetName`

A closed union. Custom target names do not typecheck, and `resolveOptions` rejects any name outside
`ALL_TARGETS` (diagnostic `INK0085`) before consulting a registry.

```ts
type TargetName = "react" | "solid" | "vue" | "svelte" | "angular" | "qwik" | "astro";
```

### `ALL_TARGETS`

```ts
const ALL_TARGETS: readonly TargetName[];
```

### `builtinRegistry`

The registry holding all seven built-in targets. Used as the default for `InklineConfig.registry`.

```ts
const builtinRegistry: TargetRegistry;
```

`TargetName`, `ALL_TARGETS`, and `builtinRegistry` are also re-exported from
`@inkline/compiler/codegen`, so a target implementation needs one import rather than two.

### `angularSelector(componentName)`

The Angular element selector for a compiled component. Exported for tooling that instantiates
compiled components by tag (e.g. the Storybook story generator).

```ts
function angularSelector(componentName: string): string;
```

`IBadge` → `ink-badge` · `IInputControlBase` → `ink-input-control-base` · `Label` → `ink-label`.

### `suggestClosest(input, candidates)`

The candidate closest to `input`, or `undefined` when nothing is close enough to be worth
suggesting. The threshold scales with input length and a transposition counts as one edit, so
`"reakt"` and `"raect"` both suggest `"react"` while `"nuxt"` suggests nothing.

```ts
function suggestClosest(input: string, candidates: readonly string[]): string | undefined;
```

Exported for the same reason as `createDiagnosticCollector` ([§5](#5-diagnostics)): tooling that
names an unknown target of its own — the CLI, validating `targets` in a config file — has to reach
the same verdict `resolveOptions` reaches for `--target`, and "did you mean" is only credible if one
implementation answers for every input path. The distance function behind it is deliberately not
exported: the threshold is the judgement call, and a caller supplying its own stops matching the
compiler.

---

## 4. Plugin API

> **Import from `@inkline/compiler`.** Stable.

Plugins are a genuinely open extension point: `config.plugins` is honoured and `Plugin.name` is a
free string. The IR types a plugin inspects import from `@inkline/compiler/ir`
([§6](#6-ir-types)–[§11](#11-pipeline-primitives)).

### `Plugin`

```ts
interface Plugin {
  readonly name: string;
  readonly targets?: readonly TargetName[];
  readonly hooks: PluginHooks;
}
```

### `PluginHooks`

```ts
interface PluginHooks {
  "ir:post"?: (module: AnalyzedModule, ctx: PluginContext) => void | Promise<void>;
  "code:post"?: (
    target: TargetName,
    files: readonly GeneratedFile[],
    ctx: PluginContext,
  ) => void | readonly GeneratedFile[] | Promise<void | readonly GeneratedFile[]>;
}
```

- `ir:post` runs after analysis (P4), before codegen. Use it to inspect the analyzed IR module.
- `code:post` runs after codegen and printing for each target. Return a modified `GeneratedFile[]` to replace the output.

### `PluginContext`

```ts
interface PluginContext {
  readonly pushDiagnostic: (d: Diagnostic) => void;
  readonly options: ResolvedCompilerOptions;
}
```

### `definePlugin(p)`

Identity helper for type-safe plugin definitions.

```ts
function definePlugin(p: Plugin): Plugin;
```

### Writing an `ir:post` hook

The hook is handed an `AnalyzedModule` whose `.graphs` is a `ReadonlyMap<string, ReactivityGraph>`.
`ReactivityGraph` imports from `@inkline/compiler/ir` — this is the type that closes the gap the
`/ir` tier exists for. Before the tier split it was not exported at all, so the parameter below could
only be typed `unknown` or left to inference.

```ts
import { definePlugin } from "@inkline/compiler";
import type { ReactivityGraph, SymbolId } from "@inkline/compiler/ir";

/** Report the widest fan-out in each component: the symbol the most things depend on. */
const reportFanOut = definePlugin({
  name: "report-fan-out",
  hooks: {
    "ir:post"(analyzed, ctx) {
      if (!ctx.options.verbose) return;

      for (const component of analyzed.module.components) {
        // Nameable: `graphs` is keyed by `IRComponent.id`.
        const graph: ReactivityGraph | undefined = analyzed.graphs.get(component.id);
        if (!graph) continue;

        let widest: SymbolId | undefined;
        let widestCount = 0;
        for (const [symbol, dependents] of graph.dependents) {
          if (dependents.size <= widestCount) continue;
          widest = symbol;
          widestCount = dependents.size;
        }

        if (widest) {
          console.log(`${component.name}: ${widest} has ${widestCount} dependent(s)`);
        }
      }
    },
  },
});
```

Two things to know before you write one of these:

- **`SymbolId` is fully qualified**, not the author's variable name — it looks like
  `src/Counter.ink.tsx#Counter::memo::doubled@108`. Print it for debugging; do not put it in a
  user-facing message unshortened.
- **`DiagnosticCode` is a closed union** of the built-in catalog (see
  [§5](#5-diagnostics)). A plugin cannot invent a code — `ctx.pushDiagnostic` requires an existing
  one, so pick the catalog entry that matches your condition rather than minting `INK9999`.

---

## 5. Diagnostics

> **Import from `@inkline/compiler`.** Stable.

### `Diagnostic`

```ts
interface Diagnostic {
  readonly code: DiagnosticCode;
  readonly severity: DiagnosticSeverity;
  readonly title: string;
  readonly help?: string;
  readonly url: string;
  readonly loc: SourceLocation;
}
```

### `DiagnosticSeverity`

```ts
type DiagnosticSeverity = "error" | "warning" | "info";
```

### `DiagnosticCode`

```ts
type DiagnosticCode = keyof typeof DIAGNOSTICS;
```

### `DIAGNOSTICS`

Constant map of every diagnostic code to its `severity`, `title`, `help`, and `url`. Every code
carries help text — the catalog test asserts it over `Object.keys(DIAGNOSTICS)`. Placeholders in
both `title` and `help` are interpolated when the diagnostic is created.

```ts
const DIAGNOSTICS: Readonly<Record<string, { severity; title; help; url }>>;
```

For the full, always-current table of codes, run `pnpm docs:diagnostics` in `core/compiler`. It
generates the table from [`src/core/diagnostics/codes.ts`](../src/core/diagnostics/codes.ts), the
single source of truth. The [README's Diagnostics section](../README.md#diagnostics) lists the codes
authors hit most often.

### `meetsLevel(severity, level)`

True when `severity` is at or above the minimum reporting `level`, using the ordering
`info < warning < error`. Use it to filter a diagnostic list to a configured reporting threshold.

```ts
function meetsLevel(severity: DiagnosticSeverity, level: DiagnosticSeverity): boolean;
```

### `createDiagnosticCollector()`

Exported so tooling that reports its own diagnostics (e.g. the CLI's config validation) emits the
same catalog-resolved shape the compiler does, instead of hand-building `Diagnostic` objects.
`push` is typed per code: a code with no placeholders takes no params, and a code with placeholders
requires exactly its own.

```ts
function createDiagnosticCollector(): DiagnosticCollector;

interface DiagnosticCollector {
  push<C extends DiagnosticCode>(code: C, loc: SourceLocation, ...params): void;
  pushFrom(diags: readonly Diagnostic[]): void;
  freeze(): readonly Diagnostic[]; // further pushes throw
}
```

### `SourceLocation`

Every `Diagnostic` and every IR node carries one.

```ts
interface SourceLocation {
  readonly file: string;
  readonly line: number;
  readonly column: number;
  readonly offset: number;
  readonly length: number;
}
```

Also re-exported from `@inkline/compiler/ir`, so an IR consumer annotating `node.loc` needs one
import rather than two.

### `InklineConfigError`

Thrown by `resolveOptions` (and therefore by `compile`) when the config itself is unusable — no target, an unknown target, a target the registry cannot serve. It carries a fully formed `Diagnostic` so callers can render it through the same formatter as pipeline diagnostics instead of printing a stack trace through compiler internals.

```ts
class InklineConfigError extends Error {
  readonly diagnostic: Diagnostic;
}

function isInklineConfigError(error: unknown): error is InklineConfigError;
```

---

## 6. IR types

> **Import from `@inkline/compiler/ir`.** Supported, scoped to plugin authoring.

The Intermediate Representation is the data model between parsing and code generation. All IR types
are deeply readonly.

This tier is supported, but it tracks the IR rather than the package: `IR_VERSION` and the migration
registry ([§7](#7-ir-migration-and-serialization)) exist because the IR shape does change between
versions.

### Render nodes

Discriminated union on the `kind` field:

```ts
type IRNode =
  | IRElement
  | IRComponentInstance
  | IRText
  | IRExprNode
  | IRIf
  | IRFor
  | IRSwitch
  | IRTransition
  | IRSlotPlaceholder
  | IRFragment;
```

> `IRTransition` is a member of the union but is **not currently exported** from any entry point —
> see [Appendix A](#a-types-referenced-but-not-exported). Its shape is documented below so a `kind:
"Transition"` case in your visitor is not a mystery.

#### `IRElement`

```ts
interface IRElement {
  readonly kind: "Element";
  readonly tag: string;
  readonly attrs: readonly IRAttribute[];
  readonly events: readonly IREventBinding[];
  readonly refs: readonly IRRefBinding[];
  readonly children: readonly IRNode[];
  readonly isStatic: boolean;
  readonly acceptsAttrFallthrough?: boolean;
  readonly preserveWhitespace?: boolean;
  readonly loc: SourceLocation;
}
```

- `acceptsAttrFallthrough` — true when this is the component's root and inherits the parent's fallthrough attributes.
- `preserveWhitespace` — true for a whitespace-sensitive element (`pre`/`textarea`/`script`/`style`) and every descendant element parsed under one.

#### `IRComponentInstance`

```ts
interface IRComponentInstance {
  readonly kind: "ComponentInstance";
  readonly reference: ts.Identifier | ts.PropertyAccessExpression;
  readonly resolved?: { readonly module: string | null; readonly name: string };
  readonly attrs: readonly IRAttribute[];
  readonly events: readonly IREventBinding[];
  readonly refs: readonly IRRefBinding[];
  readonly slots: readonly IRSlotContent[];
  readonly acceptsAttrFallthrough?: boolean;
  readonly loc: SourceLocation;
}
```

#### `IRText`

```ts
interface IRText {
  readonly kind: "Text";
  readonly value: string;
  readonly preserveWhitespace?: boolean;
  readonly loc: SourceLocation;
}
```

#### `IRExprNode`

```ts
interface IRExprNode {
  readonly kind: "Expression";
  readonly expr: ts.Expression;
  readonly raw?: string;
  readonly deps: IRDependencySet;
  readonly isReactive: boolean;
  readonly emissionContext: "template" | "setup";
  readonly isDynamic: boolean;
  readonly loc: SourceLocation;
}
```

#### `IRIf`

```ts
interface IRIf {
  readonly kind: "If";
  readonly branches: readonly IRIfBranch[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}

interface IRIfBranch {
  readonly test: IRExprNode;
  readonly body: IRNode;
}
```

#### `IRFor`

```ts
interface IRFor {
  readonly kind: "For";
  readonly each: IRExprNode;
  readonly itemBinding: string;
  readonly indexBinding?: string;
  readonly key: IRExprNode;
  readonly syntheticKey?: boolean;
  readonly body: IRNode;
  readonly loc: SourceLocation;
}
```

#### `IRSwitch`

```ts
interface IRSwitch {
  readonly kind: "Switch";
  readonly cases: readonly IRSwitchCase[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}

interface IRSwitchCase {
  readonly test: IRExprNode;
  readonly body: IRNode;
}
```

#### `IRTransition`

Not exported — see [Appendix A](#a-types-referenced-but-not-exported).

```ts
interface IRTransition {
  readonly kind: "Transition";
  readonly name: string; // default: "ink"
  readonly appear: boolean;
  readonly child: IRNode;
  readonly loc: SourceLocation;
}
```

#### `IRSlotPlaceholder`

```ts
interface IRSlotPlaceholder {
  readonly kind: "SlotPlaceholder";
  readonly name: string;
  readonly scopedArgs: readonly IRExprNode[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}
```

#### `IRFragment`

```ts
interface IRFragment {
  readonly kind: "Fragment";
  readonly children: readonly IRNode[];
  readonly loc: SourceLocation;
}
```

### Attributes, events, refs

#### `IRAttribute`

```ts
interface IRAttribute {
  readonly name: string;
  readonly value: IRStaticValue | IRExprNode;
  readonly binding: IRAttributeBinding;
  readonly loc: SourceLocation;
}

type IRAttributeBinding = "normal" | "class" | "style" | "twoWay";
```

#### `IRStaticValue`

```ts
interface IRStaticValue {
  readonly kind: "Static";
  readonly value: string | number | boolean | null;
  readonly loc: SourceLocation;
}
```

#### `IREventBinding`

```ts
interface IREventBinding {
  readonly name: string;
  readonly handler: IRExprNode;
  readonly paramTypes?: readonly (ts.TypeNode | undefined)[];
  readonly synthesized?: boolean;
  readonly twoWayProp?: string;
  readonly loc: SourceLocation;
}
```

`twoWayProp` is set on the synthesized `update:<prop>` event a `$bind:<prop>` on a component
instance lowers to. It names the bound prop so native-two-way targets (Vue `v-model:<prop>`, Svelte
`bind:<prop>`, Angular `[(<prop>)]`) can re-collapse the event with its paired value attribute,
while callback-prop targets derive `onUpdate<Prop>` from it.

#### `IRRefBinding`

```ts
interface IRRefBinding {
  readonly ref: IRExprNode;
  readonly category: IRRefCategory;
  readonly loc: SourceLocation;
}

type IRRefCategory = "element" | "component";
```

#### `IRSlotContent`

```ts
interface IRSlotContent {
  readonly name: string;
  readonly body: IRNode;
  readonly scopedParams: readonly string[];
  readonly loc: SourceLocation;
}
```

### Declarations

#### `IRProp`

```ts
interface IRProp {
  readonly name: string;
  readonly typeNode?: ts.TypeNode;
  readonly typeText?: string;
  readonly defaultValue?: IRExprNode;
  readonly required: boolean;
  readonly symbolId?: SymbolId;
  readonly loc: SourceLocation;
}
```

`typeText` is a resolved type string used when there is no `typeNode` to print — e.g. an
object-form prop declaration (`{ size: Number }` → `"number"`) whose type is inferred from a
constructor reference or a default-value literal.

#### `IRSlotDeclaration`

```ts
interface IRSlotDeclaration {
  readonly name: string;
  readonly isScoped: boolean;
  readonly scopedProps: readonly IRProp[];
  readonly required: boolean;
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}
```

#### `IREventDeclaration`

```ts
interface IREventDeclaration {
  readonly name: string;
  readonly payloadType?: ts.TypeNode;
  readonly loc: SourceLocation;
}
```

#### `IRStateDeclaration`

```ts
interface IRStateDeclaration {
  readonly name: string;
  readonly setterName: string;
  readonly initial: IRExprNode;
  readonly typeNode?: ts.TypeNode;
  readonly symbolId: SymbolId;
  readonly setterSymbolId: SymbolId;
  readonly loc: SourceLocation;
}
```

#### `IRRefDeclaration`

```ts
interface IRRefDeclaration {
  readonly name: string;
  readonly symbolId: SymbolId;
  readonly category: IRRefCategory;
  readonly elementType?: string;
  readonly loc: SourceLocation;
}
```

#### `IRMemoDeclaration`

```ts
interface IRMemoDeclaration {
  readonly name: string;
  readonly symbolId: SymbolId;
  readonly expr: IRExprNode;
  readonly loc: SourceLocation;
}
```

#### `IREffectDeclaration`

```ts
interface IREffectDeclaration {
  readonly body: ts.Expression;
  readonly deps: IRDependencySet;
  readonly cleanup: IREffectCleanup;
  readonly isDynamic: boolean;
  readonly loc: SourceLocation;
}

type IREffectCleanup = "present" | "absent" | "unknown";
```

#### `IRResourceDeclaration`

```ts
interface IRResourceDeclaration {
  readonly name: string;
  readonly fetcher: IRExprNode;
  readonly source?: IRExprNode;
  readonly symbolId: SymbolId;
  readonly loadingName?: string;
  readonly errorName?: string;
  readonly refetchName?: string;
  readonly loc: SourceLocation;
}
```

The meta accessor names are present only when the author actually destructured them
(`[data, { loading, error: err }]` → `loadingName: "loading"`, `errorName: "err"`,
`refetchName: undefined`). Targets emit only the metas that are bound, so an undestructured
`refetch` never becomes an unused variable.

#### `IRLifecycle`

```ts
interface IRLifecycle {
  readonly onMount: readonly IREffectDeclaration[];
  readonly onCleanup: readonly IREffectDeclaration[];
}
```

#### `IRSetupStatement`

```ts
interface IRSetupStatement {
  readonly stmt: ts.Statement;
  readonly defines: readonly string[]; // identifier names this statement declares
  readonly loc: SourceLocation;
}
```

#### `IRStyleBlock`

```ts
interface IRStyleBlock {
  readonly css: string;
  readonly scoped: boolean;
  readonly lang: "css" | "scss" | "less";
  readonly loc: SourceLocation;
}
```

#### `IRTargetOverride`

```ts
interface IRTargetOverride {
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly render?: IRNode;
}
```

#### `IRRuntimeMode`

```ts
type IRRuntimeMode = "client" | "server" | "iso";
```

### Component

#### `IRComponent`

The top-level component node produced by the parser and consumed by code generators.

```ts
interface IRComponent {
  readonly kind: "Component";
  readonly id: string;
  readonly name: string;
  readonly loc: SourceLocation;
  readonly props: readonly IRProp[];
  readonly propsTypeText?: string;
  readonly slots: readonly IRSlotDeclaration[];
  readonly events: readonly IREventDeclaration[];
  readonly models: readonly IRModelDeclaration[];
  readonly emitName?: string;
  readonly state: readonly IRStateDeclaration[];
  readonly refs: readonly IRRefDeclaration[];
  readonly memos: readonly IRMemoDeclaration[];
  readonly effects: readonly IREffectDeclaration[];
  readonly resources: readonly IRResourceDeclaration[];
  readonly provides: readonly IRProvideDeclaration[];
  readonly consumes: readonly IRConsumeDeclaration[];
  readonly lifecycle: IRLifecycle;
  readonly setup: readonly IRSetupStatement[];
  readonly render: IRNode;
  readonly primitives: readonly PrimitiveUsage[];
  readonly expose?: readonly string[];
  readonly styles: readonly IRStyleBlock[];
  readonly runtime: IRRuntimeMode;
  readonly meta?: { readonly headless?: boolean };
  readonly targetOverrides: Readonly<Partial<Record<TargetName, IRTargetOverride>>>;
  readonly slotBindings?: ReadonlyMap<string, string>;
}
```

- `emitName` is the local name bound to the `defineEmits()` result, so codegen can rewrite `emit(name, …)` calls.
- `meta.headless` marks a behavior-only component whose single static-element root the Angular target extracts as the host. Absent means not headless.
- `TargetName` imports from `@inkline/compiler`.
- `IRModelDeclaration`, `IRProvideDeclaration`, and `IRConsumeDeclaration` are **not currently exported** — see [Appendix A](#a-types-referenced-but-not-exported).

### Module

#### `IRModule`

```ts
interface IRModule {
  readonly version: number;
  readonly fileName: string;
  readonly components: readonly IRComponent[];
  readonly contexts: readonly IRContextDefinition[];
  readonly imports: readonly ts.ImportDeclaration[];
  readonly sourceFile: ts.SourceFile;
}
```

`IRContextDefinition` is **not currently exported** — see [Appendix A](#a-types-referenced-but-not-exported).

### Constants

```ts
const IR_VERSION = 3;

type PrimitiveName =
  | "createSignal"
  | "createMemo"
  | "createEffect"
  | "createRef"
  | "createResource"
  | "createContext"
  | "provide"
  | "useContext"
  | "defineComponent"
  | "onMount"
  | "onCleanup"
  | "untrack"
  | "batch"
  | "defineSlot"
  | "defineModel"
  | "defineEmits"
  | "hasSlot";

interface PrimitiveUsage {
  readonly name: PrimitiveName;
  readonly localName: string;
}
```

---

## 7. IR migration and serialization

> **Import from `@inkline/compiler/ir`.** Supported, scoped to plugin authoring.

### `migrate(module, target?)`

Forward-only IR version migration. Applies registered migrations sequentially from the module's current version to the target version (defaults to `IR_VERSION`). Throws if no migration path exists or if a downgrade is attempted.

```ts
function migrate(module: IRModule, target?: number): IRModule;
```

### `registerMigration(m)`

Register a custom migration step. Migrations are sorted by `from` version after registration.

```ts
function registerMigration(m: IRMigration): void;

interface IRMigration {
  readonly from: number;
  readonly to: number;
  migrate(module: IRModule): IRModule;
}
```

### `serializeModule(module)`

JSON-safe serialization. Strips `ts.SourceFile`, `ts.ImportDeclaration`, and other TS AST nodes, converting `IRExprNode.expr` to its raw text representation.

```ts
function serializeModule(module: IRModule): string;
```

### `deserializeModule(json)`

Rehydrate a serialized module. Reconstructs `ts.Expression` nodes from their raw text using a synthetic source file.

```ts
function deserializeModule(json: string): IRModule;
```

---

## 8. IR builders

> **Import from `@inkline/compiler/ir`.** Supported, scoped to plugin authoring.

Factory functions that create IR render nodes with sensible defaults. All accept an `init` object,
default `loc` to `UNKNOWN_LOCATION`, and return a readonly IR node.

```ts
function createElement(init: {
  tag: string;
  attrs?: readonly IRAttribute[];
  events?: readonly IREventBinding[];
  refs?: readonly IRRefBinding[];
  children?: readonly IRNode[];
  acceptsAttrFallthrough?: boolean;
  loc?: SourceLocation;
}): IRElement;

function createComponentInstance(init: {
  reference: ts.Identifier | ts.PropertyAccessExpression;
  resolved?: { readonly module: string | null; readonly name: string };
  attrs?: readonly IRAttribute[];
  events?: readonly IREventBinding[];
  refs?: readonly IRRefBinding[];
  slots?: readonly IRSlotContent[];
  acceptsAttrFallthrough?: boolean;
  loc?: SourceLocation;
}): IRComponentInstance;

function createText(init: { value: string; loc?: SourceLocation }): IRText;

function createExpr(init: {
  expr: ts.Expression;
  deps?: IRDependencySet;
  isReactive?: boolean; // default: false
  emissionContext?: "template" | "setup"; // default: "template"
  isDynamic?: boolean; // default: false
  loc?: SourceLocation;
}): IRExprNode;

function createIf(init: {
  branches: readonly IRIfBranch[];
  fallback?: IRNode;
  loc?: SourceLocation;
}): IRIf;

function createFor(init: {
  each: IRExprNode;
  itemBinding: string;
  indexBinding?: string;
  key: IRExprNode;
  body: IRNode;
  loc?: SourceLocation;
}): IRFor;

function createSwitch(init: {
  cases: readonly IRSwitchCase[];
  fallback?: IRNode;
  loc?: SourceLocation;
}): IRSwitch;

function createSlotPlaceholder(init: {
  name?: string; // default: "default"
  scopedArgs?: readonly IRExprNode[];
  fallback?: IRNode;
  loc?: SourceLocation;
}): IRSlotPlaceholder;

function createFragment(init: { children: readonly IRNode[]; loc?: SourceLocation }): IRFragment;

function createAttribute(init: {
  name: string;
  value: IRStaticValue | IRExprNode;
  binding?: IRAttributeBinding; // default: "normal"
  loc?: SourceLocation;
}): IRAttribute;

function createStaticValue(init: {
  value: string | number | boolean | null;
  loc?: SourceLocation;
}): IRStaticValue;
```

There is no exported builder for `IRTransition`; `createTransition` exists in the source but is not
re-exported — see [Appendix A](#a-types-referenced-but-not-exported).

---

## 9. IR visitors and transforms

> **Import from `@inkline/compiler/ir`.** Supported, scoped to plugin authoring.

### `walkRenderTree(root, visitor)`

Depth-first walk of the render tree. Calls `enter` before descending into children and `exit` after. Return `false` from `enter` to skip the subtree.

```ts
function walkRenderTree(root: IRNode, visitor: IRVisitor): void;

function walkNode(node: IRNode, visitor: IRVisitor, parent?: IRNode): void;

interface IRVisitor {
  enter?: (node: IRNode, parent?: IRNode) => void | false;
  exit?: (node: IRNode, parent?: IRNode) => void;
}
```

### `transform(root, transformer)`

Immutable structural transform. Returns a new tree where nodes returned from `enter`/`exit` replace the original. Return `SKIP` from `enter` to leave a subtree unchanged.

```ts
function transform(root: IRNode, transformer: IRTransformer): IRNode;

function transformComponent(component: IRComponent, transformer: IRTransformer): IRComponent;

interface IRTransformer {
  enter?: (node: IRNode, parent?: IRNode) => IRNode | typeof SKIP | void;
  exit?: (node: IRNode, parent?: IRNode) => IRNode | void;
}

const SKIP: unique symbol;
```

---

## 10. Reactivity

> **Import from `@inkline/compiler/ir`.** Supported, scoped to plugin authoring.

### `SymbolId`

Branded string type for unique reactive symbol identifiers.

```ts
type SymbolId = string & { readonly __brand: unique symbol };
```

### `IRReactiveKind`

```ts
type IRReactiveKind = "signal" | "memo" | "effect" | "prop" | "context" | "ref" | "slot";
```

### `IRReactiveSymbol`

```ts
interface IRReactiveSymbol {
  readonly id: SymbolId;
  readonly kind: IRReactiveKind;
  readonly name: string;
  readonly setterId?: SymbolId;
  readonly loc: SourceLocation;
}
```

### `IRDependency`

```ts
interface IRDependency {
  readonly symbolId: SymbolId;
  readonly kind: IRReactiveKind;
  readonly name: string;
  readonly path: readonly string[];
  readonly conditional: boolean;
}
```

### `IRDependencySet`

```ts
type IRDependencySet = readonly IRDependency[];
```

### `SymbolTable`

Mutable during compilation, frozen after analysis. Tracks reactive symbols per component, links getters to setters, and resolves TypeScript symbols to `SymbolId`.

```ts
class SymbolTable {
  mint(args: {
    componentId: string;
    kind: IRReactiveKind;
    name: string;
    loc: SourceLocation;
    tsSymbol?: ts.Symbol;
  }): SymbolId;

  linkSetter(getterId: SymbolId, setterId: SymbolId): void;
  resolve(tsSymbol: ts.Symbol): SymbolId | undefined;
  get(id: SymbolId): IRReactiveSymbol | undefined;
  forComponent(componentId: string): readonly IRReactiveSymbol[];
  setterOf(getterId: SymbolId): SymbolId | undefined;
  freeze(): void;
}
```

`mint` throws on a frozen table or a duplicate id.

### `ReactivityGraph`

The memo dependency graph built for one component during analysis, in topological order, with any
cycles it found. `AnalyzedModule.graphs` is a `ReadonlyMap<string, ReactivityGraph>` keyed by
`IRComponent.id` — this is the type an `ir:post` plugin hook is handed. See
[§4](#writing-an-irpost-hook) for a worked example.

```ts
interface ReactivityGraph {
  readonly dependencies: ReadonlyMap<SymbolId, ReadonlySet<SymbolId>>;
  readonly dependents: ReadonlyMap<SymbolId, ReadonlySet<SymbolId>>;
  readonly topo: readonly SymbolId[];
  readonly cycles: readonly (readonly SymbolId[])[];
}
```

---

## 11. Pipeline primitives

> **Import from `@inkline/compiler/ir`.** Supported, scoped to plugin authoring.

A `Pass` is a step over the IR, so the pass primitives sit with the IR rather than at the root,
where they were indistinguishable from the entry points.

```ts
interface Pass<I, O> {
  readonly name: string;
  run(input: I, ctx: PassContext): O | Promise<O>;
}

interface PassContext {
  readonly diagnostics: DiagnosticCollector;
  readonly options: ResolvedCompilerOptions;
  readonly symbols: SymbolTable;
  readonly registry: Readonly<TargetRegistry>;
}

// Overloaded for 1–8 passes; each pass's output type must match the next one's input.
function pipe<A, B>(p1: Pass<A, B>): Pass<A, B>;
```

`DiagnosticCollector` and `ResolvedCompilerOptions` import from `@inkline/compiler`;
`TargetRegistry` imports from `@inkline/compiler/codegen`.

---

## 12. Target API

> **Import from `@inkline/compiler/codegen`.**
>
> ⚠️ **Unstable. No semver guarantee — this surface may change in any release, including a patch.**
>
> Why: `TargetName` is a closed union of the seven built-in targets and `Target.name` is a
> `TargetName`, so an external `defineTarget({ name: "lit" })` cannot typecheck. It also cannot run
> — `resolveOptions` rejects any target outside `ALL_TARGETS` (diagnostic `INK0085`) before it
> consults a custom registry. These names are usable today only from inside this repository. They
> ship at a subpath so in-repo target work has a real import path, and so the root entry point is
> not filled with an API no external author can call. The tier is marked in `package.json` under
> `inkline.unstableExports`. Opening the extension point is a separate design decision.

For a walkthrough of writing a target, see [`adding-a-target.md`](./adding-a-target.md).

### `Target`

```ts
interface Target {
  readonly name: TargetName;
  readonly rewrites: RewriteRules;
  readonly conformance?: TargetConformanceSpec;
  readonly defaultOptions?: Readonly<Record<string, unknown>>;
  emit(component: IRComponent, ctx: CodegenContext): CodeModule;
}
```

`IRComponent` imports from `@inkline/compiler/ir`; `TargetName` from `@inkline/compiler` (also
re-exported here).

### `TargetPlan`

A lightweight subset of `Target` used during planning, before full codegen is needed.

```ts
type TargetPlan = Pick<Target, "name" | "rewrites"> & {
  readonly conformance?: TargetConformanceSpec;
};
```

### `RewriteRules`

Controls how the shared expression rewriter transforms reactive reads, setters, refs, attribute
casing, and event naming for each target.

```ts
interface RewriteRules {
  readonly reactiveRead: ReactiveReadKind;
  readonly setterStyle: SetterStyleKind;
  readonly refAccess: RefAccessKind;
  readonly jsxAttrCasing: "react" | "html";
  readonly eventNameCase: "camel" | "kebab" | "lower";
  readonly members?: MemberRewriteRules;
  // …plus roughly a dozen optional, target-specific fields.
}
```

Those five required fields plus `members` are the stable core. The optional fields — `selfPrefix`,
`setters`, `rename`, `reactiveBindings`, `reactiveReads`, `elementRefs`, `propLocals`,
`propSignals`, `providedSignals`, `stringQuote`, `modelReads`, `modelSetters`, `emit`,
`hasSlotCheck`, `collapse` — are added and reshaped as individual targets need them, which is the
main reason this tier is unstable. Each is documented at its declaration in
[`src/codegen/context.ts`](../src/codegen/context.ts); read that rather than a copy that will drift.

`ReactiveReadKind`, `SetterStyleKind`, and `RefAccessKind` are **not exported** — see
[Appendix A](#a-types-referenced-but-not-exported).

### `MemberRewriteRules`

```ts
interface MemberRewriteRules {
  readonly props?: { readonly strip: boolean; readonly whole?: string };
  readonly slots?: { readonly strip: boolean; readonly rename?: Readonly<Record<string, string>> };
}
```

`props.strip` rewrites `props.x` → `x` (targets that destructure props). `props.whole`, when set,
rewrites a bare `props` reference to this expression — used by targets that destructure `props` and
therefore have no `props` binding for whole-object references (e.g. Svelte reconstructs
`{ name, ...rest }`).

### `TargetConformanceSpec`

```ts
interface TargetConformanceSpec {
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

interface ControlFlowImportSpec {
  readonly module: string;
  readonly named?: readonly string[];
}
```

### `TargetRegistry`

```ts
interface TargetRegistry {
  get(name: TargetName): Target | undefined;
  has(name: TargetName): boolean;
  list(): readonly TargetName[];
}
```

### `CodegenContext`

Passed to `Target.emit()` with everything a target needs to emit one component.

```ts
interface CodegenContext {
  readonly diagnostics: DiagnosticCollector;
  readonly options: ResolvedCompilerOptions;
  readonly symbols: SymbolTable;
  readonly rewrites: RewriteRules;
  readonly contexts: readonly IRContextDefinition[];
  readonly externalImports: readonly Code[];
  readonly componentImports: readonly ComponentImport[];
  readonly typeDeclarations: readonly Code[];
  readonly headlessRegistry?: ReadonlyMap<string, IRComponent>;
}
```

`headlessRegistry` carries the lowered IR of imported `meta.headless` siblings, indexed by component
name, so the Angular target can inline a headless child's root when a styled component collapses
onto it. It is empty unless a component in the module is headless with a `ComponentInstance` root.

`ComponentImport` and `IRContextDefinition` are **not exported** — see
[Appendix A](#a-types-referenced-but-not-exported).

### `CodeModule`

```ts
interface CodeModule {
  readonly componentName: string;
  readonly root: Code;
  readonly fileName: string;
}
```

### Target functions

```ts
function defineTarget(t: Target): Target;
function createRegistry(): MutableTargetRegistry;
```

`MutableTargetRegistry` (the return type of `createRegistry`, adding `register(target: Target): void`
to `TargetRegistry`) is **not exported** — see [Appendix A](#a-types-referenced-but-not-exported).

---

## 13. Code IR

> **Import from `@inkline/compiler/codegen`.** ⚠️ Unstable — see the warning in [§12](#12-target-api).

The Code IR is the output-side intermediate representation that target `emit()` functions produce.
The printer converts Code IR trees into final source text.

### `Code` (discriminated union)

```ts
type Code =
  | CFile
  | CScript
  | CImport
  | CStmt
  | CExpr
  | CRaw
  | CJsxElement
  | CJsxAttr
  | CJsxText
  | CTmplElement
  | CTmplDirective
  | CTmplAttr
  | CTmplText
  | CTmplMustache
  | CGroup
  | CIndent
  | CStyle;
```

All Code IR nodes extend a common base (**not exported** — see
[Appendix A](#a-types-referenced-but-not-exported)):

```ts
interface CNodeBase {
  readonly kind: Code["kind"];
  readonly span?: SourceLocation;
  readonly hints?: readonly string[];
}
```

### Container nodes

#### `CFile`

Top-level container. `flavor` controls syntax mode.

```ts
interface CFile extends CNodeBase {
  readonly kind: "CFile";
  readonly flavor: "js-jsx" | "sfc-vue" | "sfc-svelte" | "ts" | "tsx";
  readonly children: readonly Code[];
}
```

#### `CScript`

SFC script block (Vue, Svelte).

```ts
interface CScript extends CNodeBase {
  readonly kind: "CScript";
  readonly lang: "ts" | "js";
  readonly setup: boolean;
  readonly children: readonly Code[];
}
```

#### `CImport`

```ts
interface CImport extends CNodeBase {
  readonly kind: "CImport";
  readonly module: string;
  readonly defaultLocal?: string;
  readonly named?: readonly { readonly imported: string; readonly local?: string }[];
  readonly typeOnly?: boolean;
}
```

#### `CStmt`

```ts
interface CStmt extends CNodeBase {
  readonly kind: "CStmt";
  readonly body: string | CExpr;
}
```

#### `CExpr`

```ts
interface CExpr extends CNodeBase {
  readonly kind: "CExpr";
  readonly text: string;
}
```

#### `CRaw`

Raw text passed through to output unchanged.

```ts
interface CRaw extends CNodeBase {
  readonly kind: "CRaw";
  readonly text: string;
}
```

### JSX nodes (React, Solid, Qwik)

#### `CJsxElement`

```ts
interface CJsxElement extends CNodeBase {
  readonly kind: "CJsxElement";
  readonly tag: string;
  readonly attrs: readonly CJsxAttr[];
  readonly children: readonly Code[];
  readonly selfClose: boolean;
  readonly inline?: boolean; // emit children with no formatting whitespace
}
```

#### `CJsxAttr`

```ts
interface CJsxAttr extends CNodeBase {
  readonly kind: "CJsxAttr";
  readonly name: string;
  readonly value:
    | { readonly kind: "static"; readonly text: string }
    | { readonly kind: "expr"; readonly expr: CExpr }
    | { readonly kind: "boolean" };
}
```

#### `CJsxText`

```ts
interface CJsxText extends CNodeBase {
  readonly kind: "CJsxText";
  readonly text: string;
}
```

### Template nodes (Vue, Svelte)

#### `CTmplElement`

```ts
interface CTmplElement extends CNodeBase {
  readonly kind: "CTmplElement";
  readonly tag: string;
  readonly directives: readonly CTmplDirective[];
  readonly attrs: readonly CTmplAttr[];
  readonly children: readonly Code[];
  readonly selfClose: boolean;
  readonly inline?: boolean; // emit children with no formatting whitespace
}
```

#### `CTmplDirective`

```ts
interface CTmplDirective extends CNodeBase {
  readonly kind: "CTmplDirective";
  readonly directive: string;
  readonly arg?: string;
  readonly modifier?: readonly string[];
  readonly expr?: CExpr;
}
```

#### `CTmplAttr`

```ts
interface CTmplAttr extends CNodeBase {
  readonly kind: "CTmplAttr";
  readonly name: string;
  readonly value:
    | { readonly kind: "static"; readonly text: string }
    | { readonly kind: "expr"; readonly expr: CExpr }
    | { readonly kind: "spread"; readonly expr: CExpr };
}
```

#### `CTmplText`

```ts
interface CTmplText extends CNodeBase {
  readonly kind: "CTmplText";
  readonly text: string;
}
```

#### `CTmplMustache`

```ts
interface CTmplMustache extends CNodeBase {
  readonly kind: "CTmplMustache";
  readonly expr: CExpr;
}
```

### Formatting nodes

#### `CGroup`

```ts
interface CGroup extends CNodeBase {
  readonly kind: "CGroup";
  readonly children: readonly Code[];
  readonly fit?: boolean;
}
```

#### `CIndent`

```ts
interface CIndent extends CNodeBase {
  readonly kind: "CIndent";
  readonly children: readonly Code[];
}
```

### Style node

#### `CStyle`

```ts
interface CStyle extends CNodeBase {
  readonly kind: "CStyle";
  readonly css: string;
  readonly scoped: boolean;
}
```

### Code IR builders

Factory functions that create Code IR nodes. All accept an `init` object.

```ts
function cFile(init: {
  flavor: CFile["flavor"];
  children: readonly Code[];
  span?: SourceLocation;
}): CFile;
function cScript(init: {
  lang?: "ts" | "js"; // default: "ts"
  setup?: boolean; // default: false
  children: readonly Code[];
  span?: SourceLocation;
}): CScript;
function cImport(init: {
  module: string;
  defaultLocal?: string;
  named?: readonly { readonly imported: string; readonly local?: string }[];
  typeOnly?: boolean;
  span?: SourceLocation;
}): CImport;
function cStmt(init: { body: string | CExpr; span?: SourceLocation }): CStmt;
function cExpr(init: { text: string; span?: SourceLocation }): CExpr;
function cRaw(init: { text: string; span?: SourceLocation }): CRaw;
function cJsxElement(init: {
  tag: string;
  attrs?: readonly CJsxAttr[];
  children?: readonly Code[];
  selfClose?: boolean;
  inline?: boolean;
  span?: SourceLocation;
}): CJsxElement;
function cJsxAttr(init: {
  name: string;
  value: CJsxAttr["value"];
  span?: SourceLocation;
}): CJsxAttr;
function cJsxText(init: { text: string; span?: SourceLocation }): CJsxText;
function cTmplElement(init: {
  tag: string;
  directives?: readonly CTmplDirective[];
  attrs?: readonly CTmplAttr[];
  children?: readonly Code[];
  selfClose?: boolean;
  inline?: boolean;
  span?: SourceLocation;
}): CTmplElement;
function cTmplDirective(init: {
  directive: string;
  arg?: string;
  modifier?: readonly string[];
  expr?: CExpr;
  span?: SourceLocation;
}): CTmplDirective;
function cTmplAttr(init: {
  name: string;
  value: CTmplAttr["value"];
  span?: SourceLocation;
}): CTmplAttr;
function cTmplText(init: { text: string; span?: SourceLocation }): CTmplText;
function cTmplMustache(init: { expr: CExpr; span?: SourceLocation }): CTmplMustache;
function cGroup(init: { children: readonly Code[]; fit?: boolean; span?: SourceLocation }): CGroup;
function cIndent(init: { children: readonly Code[]; span?: SourceLocation }): CIndent;
function cStyle(init: { css: string; scoped: boolean; span?: SourceLocation }): CStyle;
```

---

## 14. Printer

> **Import from `@inkline/compiler/codegen`.** ⚠️ Unstable — see the warning in [§12](#12-target-api).

### `print(root, opts?)`

Convert a Code IR tree to a source string with optional source map generation.

```ts
function print(root: Code, opts?: Partial<PrintOptions>): PrintResult;
```

### `PrintOptions`

```ts
interface PrintOptions {
  readonly indent: number; // default: 2
  readonly newline: "\n" | "\r\n"; // default: "\n"
  readonly sourceMap: SourceMapMode; // default: "none"
  readonly file?: string;
}
```

### `PrintResult`

```ts
interface PrintResult {
  readonly code: string;
  readonly map?: string; // present when sourceMap is not "none"
}
```

---

## 15. Built-in targets

> **Import from `@inkline/compiler/codegen`.** ⚠️ Unstable — see the warning in [§12](#12-target-api).

Seven `Target` values ship with the compiler. To _select_ a target you do not need these — pass a
`TargetName` in `InklineConfig.targets` and let `builtinRegistry` resolve it ([§3](#3-target-selection)).
Import the values themselves only to build a custom registry.

| Export          | Target  | Style          |
| --------------- | ------- | -------------- |
| `reactTarget`   | React   | JSX            |
| `solidTarget`   | Solid   | JSX            |
| `qwikTarget`    | Qwik    | JSX            |
| `vueTarget`     | Vue     | SFC (template) |
| `svelteTarget`  | Svelte  | SFC (template) |
| `angularTarget` | Angular | Template-based |
| `astroTarget`   | Astro   | Meta-target    |

---

## A. Types referenced but not exported

The types below appear in the signatures of exported symbols but are **not importable from any entry
point**. They are documented above so the exported types they appear in are readable; you cannot
name them in your own code, and TypeScript's structural typing is the only way to satisfy them.

None of these were exported before the tier split either — this is pre-existing, not a regression
from it. It is the same class of gap that `ReactivityGraph` was exported to close
([§10](#10-reactivity)), and tracked as follow-up work.

| Type                                                   | Declared in                    | Reachable through                                          |
| ------------------------------------------------------ | ------------------------------ | ---------------------------------------------------------- |
| `IRTransition`                                         | `src/ir/render/nodes.ts`       | the `IRNode` union                                         |
| `IRModelDeclaration`                                   | `src/ir/render/nodes.ts`       | `IRComponent.models`                                       |
| `IRProvideDeclaration`, `IRConsumeDeclaration`         | `src/ir/render/nodes.ts`       | `IRComponent.provides` / `.consumes`                       |
| `IRContextDefinition`                                  | `src/ir/render/nodes.ts`       | `IRModule.contexts`, `CodegenContext.contexts`             |
| `ReactiveReadKind`, `SetterStyleKind`, `RefAccessKind` | `src/codegen/context.ts`       | `RewriteRules`                                             |
| `ComponentImport`, `CollapseContext`                   | `src/codegen/context.ts`       | `CodegenContext.componentImports`, `RewriteRules.collapse` |
| `MutableTargetRegistry`                                | `src/codegen/registry.ts`      | the return type of `createRegistry()`                      |
| `CNodeBase`                                            | `src/codegen/code-ir/nodes.ts` | every Code IR node                                         |

`createTransition`, the builder for `IRTransition`, is likewise declared in
`src/ir/render/builders.ts` but not re-exported from `@inkline/compiler/ir`.
