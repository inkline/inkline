# Compiler Architecture Redesign — Handoff Plan

Package: `@inkline/compiler`
Scope: clean-room redesign of `packages/compiler/`. Free to break the public API. Full Code IR with source maps. Pluggable targets + plugin hooks. Stable `SymbolId`. Cross-target equivalence tests. Fix known bugs along the way.

This document is intended as a **complete implementation handoff**. Every interface is specified; every pass has an algorithm; every target has a conformance spec; every migration phase has acceptance criteria. The implementer should not have to invent design decisions.

> v4 expansion: full type signatures, complete diagnostic catalog, per-target conformance specs (all 4 targets), lower-transform algorithms, Code IR node definitions, plugin-runner semantics, test-harness signatures, CLI spec, migration acceptance criteria, decision log, glossary. Reviewed for internal consistency.

---

## Table of Contents

1. [Context](#1-context)
2. [Glossary](#2-glossary)
3. [Goals & Non-Goals](#3-goals--non-goals)
4. [Public API Surface](#4-public-api-surface)
5. [Pipeline Overview](#5-pipeline-overview)
6. [Type System & Core Contracts](#6-type-system--core-contracts)
7. [IR Render Tree Specification](#7-ir-render-tree-specification)
8. [Reactivity Model & SymbolId](#8-reactivity-model--symbolid)
9. [Pass Specifications](#9-pass-specifications)
10. [Lower Transformer Specifications](#10-lower-transformer-specifications)
11. [Analyze Pass Specification](#11-analyze-pass-specification)
12. [Code IR Specification](#12-code-ir-specification)
13. [Printer Specification](#13-printer-specification)
14. [Per-Target Conformance Specs](#14-per-target-conformance-specs)
15. [Plugin System](#15-plugin-system)
16. [Diagnostic Catalog](#16-diagnostic-catalog)
17. [Configuration](#17-configuration)
18. [CLI Specification](#18-cli-specification)
19. [Testing Infrastructure](#19-testing-infrastructure)
20. [Fixture Suite](#20-fixture-suite)
21. [CI Matrix](#21-ci-matrix)
22. [Performance Budgets](#22-performance-budgets)
23. [Migration Phases](#23-migration-phases)
24. [File Layout (Final)](#24-file-layout-final)
25. [Decision Log](#25-decision-log)
26. [Risk Register](#26-risk-register)
27. [Out-of-Scope & v1 Sketch](#27-out-of-scope--v1-sketch)
28. [Handoff Verification Checklist](#28-handoff-verification-checklist)

---

## 1. Context

`@inkline/compiler` compiles `.ink.tsx` (TSX with signal primitives `createSignal`, `createMemo`, `createEffect`, `createRef`, `defineComponent`, `onMount`, `onCleanup`, `untrack`, `batch`, `defineSlot`, and control-flow components `<Show>`, `<For>`, `<Switch>`, `<Match>`) to framework-native components for **React**, **Vue 3**, **Svelte 5**, **Solid**. `TargetName` reserves `angular`, `qwik`, `astro` for future targets. It works today — 7,500+ LOC source, ~2,500 LOC tests, 10 fixture components × 4 targets — but architecture blocks evolution.

The current pain points are catalogued in §25 (Decision Log) as the rationale for each redesign decision. The user has confirmed: **clean-room redesign, free to break the public API, full Code IR with source maps, fix bugs along the way, pluggable targets + plugin hooks, stable `SymbolId`, source maps + cross-target equivalence tests**.

The new design is a **chain of small, pure passes** operating on **immutable artifacts**. Targets emit a **Code IR** consumed by **one shared printer** that owns indentation and source maps. Reactivity is keyed by stable string `SymbolId`s, so IRs become plain data. Every layer is independently testable; every target's output is type-checked, linted, mounted, and behaviorally compared against the other three.

---

## 2. Glossary

| Term                       | Definition                                                                                                                                                        |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`.ink.tsx`**             | Source file: TSX + signal primitives + `defineComponent` call. The unit of input.                                                                                 |
| **Pass**                   | A pure function `(I, ctx) => O \| Promise<O>` with a name. Each pass produces a new immutable artifact from its input.                                            |
| **PassContext**            | The mutable-but-controlled scratch carried alongside passes: diagnostics, options, symbol table, registry view.                                                   |
| **Render IR**              | The component-internal tree representation: `IRNode` discriminated union (`Element`, `ComponentInstance`, `If`, `For`, `Switch`, etc.).                           |
| **IR** (without qualifier) | The full module representation: `IRModule` containing `IRComponent`s, each containing a Render IR tree plus decls.                                                |
| **Code IR**                | The post-render-IR representation produced by `emit` and consumed by `print`. `Code` discriminated union (`CFile`, `CJsxElement`, `CTmplElement`, `CStmt`, etc.). |
| **SymbolId**               | Opaque `string` identifier minted by `SymbolTable` from a `ts.Symbol` at declaration site. Stable across re-parses.                                               |
| **Lowering**               | An IR → IR transformation. Each one is an `IRTransformer`. Lowering converts source-level constructs (`<Show>`) into normalized IR (`IRIf`).                      |
| **Target**                 | A code generator for one framework. Implements `Target` interface. Registered in a `TargetRegistry`.                                                              |
| **Conformance Spec**       | Per-target declarative + functional rules that emitted code must satisfy. Includes rewrites, imports, lint/typecheck configs, mount harness, invariants.          |
| **Plugin**                 | User-provided code attached to `ir:post` and/or `code:post` hooks. Read-only `ir:post`; may rewrite files in `code:post`.                                         |
| **Diagnostic**             | A typed message produced during compilation. Has a stable code (`INK0xxx`), severity, location, message.                                                          |
| **Fixture**                | An `.ink.tsx` file in `__fixtures__/` exercising one or more language features.                                                                                   |
| **Scenario**               | A runtime test case for a fixture: props + event sequence + DOM assertions.                                                                                       |
| **Invariant**              | A property that must hold; checked by tests or by `assertNever` at compile time.                                                                                  |
| **`assertNever`**          | Helper `(x: never) => never` used in `default` branches of `switch (kind)` to make missing cases a TypeScript compile error.                                      |
| **Span**                   | A source-code byte range carried on Code IR nodes for source-map generation.                                                                                      |
| **SSR**                    | Server-side rendering, the mount mechanism for runtime equivalence tests.                                                                                         |

---

## 3. Goals & Non-Goals

### 3.1 Goals (v0)

- **Durable**: 6 passes with pinned `Pass<I, O>` contracts; deliberate public API.
- **Modular**: each pass independently runnable; targets pluggable at runtime; plugins through real hooks.
- **Less bug-prone**:
  - Immutable artifacts between passes.
  - `SymbolId` (string) instead of `ts.Symbol`.
  - One whitespace writer (the printer).
  - `assertNever` on every IR `switch`.
  - `Readonly` on every public type.
- **Testable**:
  - Per-pass unit tests.
  - IR golden snapshots.
  - Per-target emitted snapshots.
  - **Emitted code typechecks** against real framework types.
  - **Emitted code lints** with framework-official plugins.
  - **Runtime mount** in each framework's SSR with zero warnings.
  - **Cross-target DOM equivalence** under scripted scenarios.
  - Source-map accuracy.
- **Correctness floor**: zero lint warnings, zero TS errors, zero runtime warnings on every fixture × target.
- **Idiomatic floor**: emitted code matches the documented conformance spec — looks like what a senior dev in that framework would write.

### 3.2 Non-goals (deferred to v1+, see §27)

Cross-process IR caching · component-ref forwarding · `<style>` blocks · async/Suspense · server/client boundaries · Vite plugin (separate package) · sub-expression sourcemap granularity · `IRModule.version` migration framework · multi-file components.

---

## 4. Public API Surface

Final `src/index.ts`. Everything not listed here is private.

```ts
// ============ TOP-LEVEL ENTRY POINT ============
export { compile } from "./pipeline/compile.ts";
export type { CompileInput, CompileResult } from "./pipeline/compile.ts";

// ============ CONFIGURATION ============
export type { InklineConfig, ResolvedCompilerOptions, SourceMapMode } from "./core/options.ts";
export { defineConfig } from "./core/config.ts";

// ============ PIPELINE PRIMITIVES (advanced users) ============
export type { Pass, PassContext } from "./pipeline/types.ts";
export { pipe } from "./pipeline/types.ts";

// ============ DIAGNOSTICS ============
export type { Diagnostic, DiagnosticSeverity, DiagnosticCode } from "./core/diagnostics/codes.ts";
export { DIAGNOSTICS } from "./core/diagnostics/codes.ts";

// ============ IR — RENDER TREE TYPES ============
export type {
  IRNode,
  IRElement,
  IRComponentInstance,
  IRText,
  IRExprNode,
  IRIf,
  IRIfBranch,
  IRFor,
  IRSwitch,
  IRSwitchCase,
  IRSlotPlaceholder,
  IRFragment,
  IRAttribute,
  IRAttributeBinding,
  IRStaticValue,
  IREventBinding,
  IRRefBinding,
  IRSlotContent,
  IRProp,
  IRSlotDeclaration,
  IREventDeclaration,
  IRStateDeclaration,
  IRRefDeclaration,
  IRMemoDeclaration,
  IREffectDeclaration,
  IRLifecycle,
  IRSetupStatement,
  IRRefCategory,
  IREffectCleanup,
  IRComponent,
  IRTargetOverride,
  IRModule,
  PrimitiveName,
  PrimitiveUsage,
} from "./ir/render/nodes.ts";

// ============ IR — BUILDERS ============
export {
  createElement,
  createComponentInstance,
  createText,
  createExpr,
  createIf,
  createFor,
  createSwitch,
  createSlotPlaceholder,
  createFragment,
  createAttribute,
  createStaticValue,
} from "./ir/render/builders.ts";

// ============ IR — VISITORS ============
export type { IRVisitor } from "./ir/render/visit.ts";
export { walkRenderTree, walkNode } from "./ir/render/visit.ts";
export type { IRTransformer } from "./ir/render/transform.ts";
export { SKIP, transform, transformComponent } from "./ir/render/transform.ts";

// ============ IR — REACTIVITY ============
export type {
  SymbolId,
  IRReactiveKind,
  IRReactiveSymbol,
  IRDependency,
  IRDependencySet,
} from "./ir/reactivity.ts";
export { SymbolTable } from "./ir/reactivity.ts";

// ============ PLUGIN API ============
export type { Plugin, PluginHooks } from "./plugin/types.ts";
export { definePlugin } from "./plugin/types.ts";

// ============ TARGET API ============
export type {
  Target,
  TargetName,
  TargetConformanceSpec,
  RewriteRules,
  TargetRegistry,
  CodegenContext,
  TargetPlan,
  GeneratedFile,
  CodeModule,
} from "./codegen/context.ts";
export { defineTarget, createRegistry, builtinRegistry } from "./codegen/registry.ts";

// ============ CODE IR (target/plugin authors) ============
export type {
  Code,
  CFile,
  CScript,
  CImport,
  CStmt,
  CExpr,
  CRaw,
  CJsxElement,
  CJsxAttr,
  CJsxText,
  CTmplElement,
  CTmplDirective,
  CTmplAttr,
  CTmplText,
  CTmplMustache,
  CGroup,
  CIndent,
} from "./codegen/code-ir/nodes.ts";
export {
  /* builder functions: */
  cFile,
  cScript,
  cImport,
  cStmt,
  cExpr,
  cRaw,
  cJsxElement,
  cJsxAttr,
  cJsxText,
  cTmplElement,
  cTmplDirective,
  cTmplAttr,
  cTmplText,
  cTmplMustache,
  cGroup,
  cIndent,
} from "./codegen/code-ir/builders.ts";

// ============ BUILT-IN TARGETS ============
export { reactTarget } from "./codegen/targets/react/index.ts";
export { vueTarget } from "./codegen/targets/vue/index.ts";
export { svelteTarget } from "./codegen/targets/svelte/index.ts";
export { solidTarget } from "./codegen/targets/solid/index.ts";
```

Additional sub-path exports in `package.json` `exports`:

- `./testing` → `./dist/testing/index.mjs` (test harnesses for downstream targets/plugins).
- `./package.json`.

The CLI is wired via `package.json` `bin: { inkline: "./dist/bin/inkline.mjs" }`.

---

## 5. Pipeline Overview

```
                              CompileInput
                                   │
                  ┌────────────────┴────────────────┐
                  │  PassContext = {                │
                  │    diagnostics: DiagnosticCollector
                  │    options: ResolvedCompilerOptions
                  │    symbols: SymbolTable
                  │    registry: Readonly<RegistryView>
                  │  }                              │
                  └────────────────┬────────────────┘
                                   │
       ┌───────────────────────────┴───────────────────────────┐
       ▼                                                       │
  P1 program                                                   │
       │ TsProgramArtifact { program, sourceFile, checker }    │
       ▼                                                       │
  P2 parse                                                     │
       │ RawIRModule { fileName, components, imports,          │
       │   diagnostics? }                                      │
       │ — sub-steps in order:                                 │
       │   (a) bind-primitives: scan imports                   │
       │   (b) sites:    find defineComponent(...) calls       │
       │   For each site:                                      │
       │     (c) options:    static options object → decls     │
       │     (d) setup:      collect signals/memos/effects/refs│
       │     (e) jsx:        build render tree (no lowering)   │
       │     (f) deps:       walk all expressions for deps     │
       │       (SymbolId minting happens inline in (d))       │
       ▼                                                       │
  P3 lower                                                     │
       │ IRModule (Render IR normalized: <Show>→IRIf etc.)     │
       ▼                                                       │
  P4 analyze                                                   │
       │ AnalyzedModule { module, graphs: Map<id, ReactivityGraph> }│
       │ + diagnostics pushed (INK0010/0011/0020/0030/0050)    │
       │                                                       │
       │     ── plugin hook: ir:post (read-only)               │
       │                                                       │
       ▼                                                       │
  P5 emit-target  (looped per target)                          │
       │ CodeModule per component, per target                  │
       ▼                                                       │
  P6 print  (looped per CodeModule)                            │
       │ GeneratedFile { path, contents, sourceMap? }          │
       │                                                       │
       │     ── plugin hook: code:post (per target)            │
       │                                                       │
       └──────────────► CompileResult {                        │
                          module: AnalyzedModule,              │
                          files: Record<TargetName, GeneratedFile[]>,
                          diagnostics: Diagnostic[]            │
                        }                                      │
```

P1 is the only impure pass (TS host I/O). P2 sub-steps run sequentially with shared state in `PassContext` and a per-component scope object. P3–P6 are pure.

---

## 6. Type System & Core Contracts

### 6.1 `Pass<I, O>` and `PassContext`

```ts
// pipeline/types.ts
export interface Pass<I, O> {
  readonly name: string;
  run(input: I, ctx: PassContext): O | Promise<O>;
}

export interface PassContext {
  readonly diagnostics: DiagnosticCollector;
  readonly options: ResolvedCompilerOptions;
  readonly symbols: SymbolTable;
  readonly registry: Readonly<RegistryView>;
}

export function pipe<A, B>(p1: Pass<A, B>): Pass<A, B>;
export function pipe<A, B, C>(p1: Pass<A, B>, p2: Pass<B, C>): Pass<A, C>;
export function pipe<A, B, C, D>(p1: Pass<A, B>, p2: Pass<B, C>, p3: Pass<C, D>): Pass<A, D>;
// …overloads through arity-10
```

A `pipe`d pass awaits each step if its return is a `Promise`. `PassContext` is constructed once per `compile()` call and threaded through.

### 6.2 `DiagnosticCollector`

```ts
// core/diagnostics/collector.ts
export interface DiagnosticCollector {
  push<C extends DiagnosticCode>(code: C, loc: SourceLocation, params?: DiagnosticParams<C>): void;
  pushFrom(diags: readonly Diagnostic[]): void;
  freeze(): readonly Diagnostic[]; // returns Object.freeze'd snapshot
}
export function createDiagnosticCollector(): DiagnosticCollector;
```

`DiagnosticParams<C>` is derived from `DIAGNOSTICS[C].title` placeholder syntax (`{name}`). The implementation substitutes; a test asserts every code's placeholders are satisfied by callers.

### 6.3 `SymbolTable`

```ts
// ir/reactivity.ts
export class SymbolTable {
  /** Mint or return the SymbolId for a TS symbol declared at `loc`. */
  mint(args: {
    componentId: string;
    kind: IRReactiveKind;
    name: string;
    loc: SourceLocation;
    tsSymbol?: ts.Symbol;
  }): SymbolId;

  /** Resolve a ts.Symbol to a previously minted SymbolId, if any. */
  resolve(tsSymbol: ts.Symbol): SymbolId | undefined;

  /** Lookup by id. */
  get(id: SymbolId): IRReactiveSymbol | undefined;

  /** All symbols for a component. */
  forComponent(componentId: string): readonly IRReactiveSymbol[];

  /** Setter for a signal (or undefined). */
  setterOf(getterId: SymbolId): SymbolId | undefined;

  /** Frozen snapshot. */
  freeze(): void;
}
```

Minting rule: `componentId + "::" + kind + "::" + name + "@" + loc.offset`. Once `freeze()` is called, `mint` throws.

### 6.4 `ResolvedCompilerOptions`

```ts
// core/options.ts
export type SourceMapMode = "external" | "inline" | "none";

export interface ResolvedCompilerOptions {
  readonly targets: readonly TargetName[];
  readonly outDir: string; // default "dist"
  readonly sourceMap: SourceMapMode; // default "external"
  readonly targetOptions: Readonly<Partial<Record<TargetName, Readonly<Record<string, unknown>>>>>;
  readonly plugins: readonly Plugin[];
  readonly verbose: boolean; // controls console.warn from plugin runner
  readonly registry: TargetRegistry;
}

export function resolveOptions(userConfig: InklineConfig): ResolvedCompilerOptions;
```

`resolveOptions` validates and applies defaults. Unknown `targets` throw. Unknown `targetOptions` keys for known targets push `INK0080` (warning).

### 6.5 `SourceLocation` (preserved from existing)

```ts
// ir/types.ts (unchanged from current)
export interface SourceLocation {
  readonly file: string;
  readonly line: number; // 1-indexed
  readonly column: number; // 1-indexed
  readonly offset: number; // 0-indexed bytes
  readonly length: number;
}
export const UNKNOWN_LOCATION: SourceLocation;
```

### 6.6 `assertNever` and exhaustiveness

```ts
// core/assert.ts
export function assertNever(x: never): never {
  throw new Error(`Unhandled case: ${JSON.stringify(x)}`);
}
```

Every `switch (node.kind)` over an IR union ends with `default: return assertNever(node)`. Same for `Code` union, `IRReactiveKind`, `RewriteRules.reactiveRead.kind`, etc.

---

## 7. IR Render Tree Specification

The render IR is preserved structurally from the current implementation; only the symbol fields change (B-phase). Every node carries `loc: SourceLocation`.

### 7.1 Discriminated union

```ts
// ir/render/nodes.ts
export type IRNode =
  | IRElement
  | IRComponentInstance
  | IRText
  | IRExprNode
  | IRIf
  | IRFor
  | IRSwitch
  | IRSlotPlaceholder
  | IRFragment;
```

### 7.2 Element

```ts
export interface IRElement {
  readonly kind: "Element";
  readonly tag: string; // lowercase: "div", "button"
  readonly attrs: readonly IRAttribute[];
  readonly events: readonly IREventBinding[];
  readonly refs: readonly IRRefBinding[];
  readonly children: readonly IRNode[];
  /** True iff every attr value is Static AND every child is static recursively.
      Computed by 03-lower/static-mark.ts; builders default false. */
  readonly isStatic: boolean;
  readonly loc: SourceLocation;
}
```

### 7.3 Component Instance

```ts
export interface IRComponentInstance {
  readonly kind: "ComponentInstance";
  /** Identifier as written: <Button/> or <Foo.Bar/>. */
  readonly reference: ts.Identifier | ts.PropertyAccessExpression;
  readonly resolved?: { readonly module: string | null; readonly name: string };
  readonly attrs: readonly IRAttribute[];
  readonly events: readonly IREventBinding[];
  /** Refs on a component instance (rare; flagged INK0070 in v0, supported in v1). */
  readonly refs: readonly IRRefBinding[];
  readonly slots: readonly IRSlotContent[];
  readonly loc: SourceLocation;
}
```

After lowering, `<Show>`, `<For>`, `<Switch>`, `<Match>` no longer appear as `ComponentInstance`s. They become `IRIf`/`IRFor`/`IRSwitch`.

### 7.4 Text and Expression

```ts
export interface IRText {
  readonly kind: "Text";
  readonly value: string;
  readonly loc: SourceLocation;
}

export interface IRExprNode {
  readonly kind: "Expression";
  /** The original TS expression. NOT serializable; lives in memory only. */
  readonly expr: ts.Expression;
  readonly deps: IRDependencySet;
  readonly isReactive: boolean;
  /** "template" or "setup" — Vue uses this to decide ref auto-unwrap behavior. */
  readonly emissionContext: "template" | "setup";
  /** True iff dep extraction bailed (dynamic indexed signal access). */
  readonly isDynamic: boolean;
  readonly loc: SourceLocation;
}
```

Renamed from `IRExpressionNode` → `IRExprNode` (drops the "Expression" stutter that existed only to avoid a `ts.Expression` value collision; with `import type * as ts`, no collision occurs).

### 7.5 Control flow

```ts
export interface IRIf {
  readonly kind: "If";
  readonly branches: readonly IRIfBranch[]; // ordered; first matching wins
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}
export interface IRIfBranch {
  readonly test: IRExprNode;
  readonly body: IRNode;
}

export interface IRFor {
  readonly kind: "For";
  readonly each: IRExprNode; // post-call: `items()`
  readonly itemBinding: string;
  readonly indexBinding?: string;
  readonly key: IRExprNode; // synthesized to `itemBinding` if absent (+ INK0050)
  readonly body: IRNode;
  readonly loc: SourceLocation;
}

export interface IRSwitch {
  readonly kind: "Switch";
  readonly cases: readonly IRSwitchCase[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}
export interface IRSwitchCase {
  readonly test: IRExprNode;
  readonly body: IRNode;
}
```

### 7.6 Slot placeholder and Fragment

```ts
export interface IRSlotPlaceholder {
  readonly kind: "SlotPlaceholder";
  readonly name: string; // "default" if no name in source
  readonly scopedArgs: readonly IRExprNode[];
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}

export interface IRFragment {
  readonly kind: "Fragment";
  readonly children: readonly IRNode[];
  readonly loc: SourceLocation;
}
```

### 7.7 Attributes, events, refs

```ts
export type IRAttributeBinding = "normal" | "class" | "style" | "twoWay";

export interface IRAttribute {
  readonly name: string;
  readonly value: IRStaticValue | IRExprNode;
  readonly binding: IRAttributeBinding;
  readonly loc: SourceLocation;
}

export interface IRStaticValue {
  readonly kind: "Static";
  readonly value: string | number | boolean | null;
  readonly loc: SourceLocation;
}

export interface IREventBinding {
  readonly name: string; // camelCase: "onClick"
  readonly handler: IRExprNode;
  /** TS types of handler parameters, preserved for emission as `(e: MouseEvent) => …`. */
  readonly paramTypes?: readonly (ts.TypeNode | undefined)[];
  readonly loc: SourceLocation;
  /** True iff synthesized by 03-lower/two-way-binding.ts. Native-sugar targets drop them. */
  readonly synthesized?: boolean;
}

export interface IRRefBinding {
  readonly ref: IRExprNode;
  /** "element" (native DOM ref) or "component" (ref to a child component's imperative handle). */
  readonly category: IRRefCategory;
  readonly loc: SourceLocation;
}

export type IRRefCategory = "element" | "component";
```

### 7.8 Slot content (provided by a parent)

```ts
export interface IRSlotContent {
  readonly name: string;
  readonly body: IRNode;
  readonly scopedParams: readonly string[];
  readonly loc: SourceLocation;
}
```

### 7.9 Component-level decls

```ts
export interface IRProp {
  readonly name: string;
  readonly typeNode?: ts.TypeNode;
  readonly defaultValue?: IRExprNode;
  readonly required: boolean;
  readonly symbolId?: SymbolId;
  readonly loc: SourceLocation;
}

export interface IRSlotDeclaration {
  readonly name: string;
  readonly isScoped: boolean;
  readonly scopedProps: readonly IRProp[];
  readonly required: boolean;
  readonly fallback?: IRNode;
  readonly loc: SourceLocation;
}

export interface IREventDeclaration {
  readonly name: string;
  readonly payloadType?: ts.TypeNode;
  readonly loc: SourceLocation;
}

export interface IRStateDeclaration {
  readonly name: string;
  readonly setterName: string;
  readonly initial: IRExprNode;
  readonly typeNode?: ts.TypeNode;
  readonly symbolId: SymbolId;
  readonly setterSymbolId: SymbolId;
  readonly loc: SourceLocation;
}

export interface IRRefDeclaration {
  readonly name: string;
  readonly symbolId: SymbolId;
  readonly category: IRRefCategory;
  readonly elementType?: string; // "HTMLInputElement" etc.
  readonly loc: SourceLocation;
}

export interface IRMemoDeclaration {
  readonly name: string;
  readonly symbolId: SymbolId;
  readonly expr: IRExprNode;
  readonly loc: SourceLocation;
}

export type IREffectCleanup = "present" | "absent" | "unknown";

export interface IREffectDeclaration {
  readonly body: ts.Expression; // arrow function body
  readonly deps: IRDependencySet;
  readonly cleanup: IREffectCleanup;
  readonly isDynamic: boolean;
  readonly loc: SourceLocation;
}

export interface IRLifecycle {
  readonly onMount: readonly IREffectDeclaration[];
  readonly onCleanup: readonly IREffectDeclaration[];
}

export interface IRSetupStatement {
  readonly stmt: ts.Statement;
  readonly defines: readonly SymbolId[];
  readonly loc: SourceLocation;
}
```

### 7.10 IRComponent and IRModule

```ts
export interface IRComponent {
  readonly kind: "Component";
  readonly id: string; // `${fileName}#${name}`
  readonly name: string;
  readonly loc: SourceLocation;
  readonly props: readonly IRProp[];
  readonly slots: readonly IRSlotDeclaration[];
  readonly events: readonly IREventDeclaration[];
  readonly state: readonly IRStateDeclaration[];
  readonly refs: readonly IRRefDeclaration[];
  readonly memos: readonly IRMemoDeclaration[];
  readonly effects: readonly IREffectDeclaration[];
  readonly lifecycle: IRLifecycle;
  readonly setup: readonly IRSetupStatement[];
  readonly render: IRNode;
  readonly primitives: readonly PrimitiveUsage[];
  readonly targetOverrides: Readonly<Partial<Record<TargetName, IRTargetOverride>>>;
}

export interface IRTargetOverride {
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly render?: IRNode;
}

export interface IRModule {
  readonly fileName: string;
  readonly components: readonly IRComponent[];
  readonly imports: readonly ts.ImportDeclaration[];
  readonly sourceFile: ts.SourceFile; // non-serialized; for source-loc resolution
}
```

### 7.11 Builders contract

Every builder is a pure function. `createElement` does **not** infer `isStatic` (set to `false`; `static-mark.ts` recomputes). Builders accept partial inputs and fill defaults from frozen sentinels.

```ts
// ir/render/builders.ts
export function createElement(init: {
  tag: string;
  attrs?: readonly IRAttribute[];
  events?: readonly IREventBinding[];
  refs?: readonly IRRefBinding[];
  children?: readonly IRNode[];
  loc?: SourceLocation;
}): IRElement;
// …one per node kind
```

---

## 8. Reactivity Model & SymbolId

```ts
// ir/reactivity.ts
export type SymbolId = string & { readonly __brand: unique symbol };

export type IRReactiveKind = "signal" | "memo" | "effect" | "prop" | "context" | "ref";

export interface IRReactiveSymbol {
  readonly id: SymbolId;
  readonly kind: IRReactiveKind;
  readonly name: string;
  readonly setterId?: SymbolId;
  readonly loc: SourceLocation;
}

export interface IRDependency {
  readonly symbolId: SymbolId;
  readonly kind: IRReactiveKind;
  readonly name: string;
  readonly path: readonly string[]; // ["user", "name"] for props.user.name
  readonly conditional: boolean; // inside ternary/&&/||/??/optional-chain
}

export type IRDependencySet = readonly IRDependency[];

export const DYNAMIC_DEPS: IRDependencySet; // Object.freeze([])
export const STATIC_RESOLUTION: { deps: IRDependencySet; isReactive: false; isDynamic: false };
```

`SymbolId` is branded for type safety; cast at the minting site only.

---

## 9. Pass Specifications

Each pass has: **name**, **input**, **output**, **invariants**, **algorithm**, **diagnostics emitted**, **tests**.

### 9.1 P1 — `program`

**File:** `src/pipeline/passes/01-program.ts`
**Name:** `"program"`
**Input:** `CompileInput = { fileName: string; source: string } | { fileName: string; program: ts.Program }`
**Output:** `TsProgramArtifact = { program: ts.Program; sourceFile: ts.SourceFile; checker: ts.TypeChecker }`
**Invariants:** `sourceFile.fileName === input.fileName`. `checker` is from `program`.
**Algorithm:**

1. If input has `program`: return `{ program, sourceFile: program.getSourceFile(fileName), checker: program.getTypeChecker() }`.
2. Otherwise: synthesize via `createSingleFileProgram` (the existing helper, moved to `pipeline/passes/01-program.ts`). Compiler options: `{ jsx: Preserve, jsxImportSource: "@inkline/core", strict: false, moduleResolution: Bundler, target: ESNext, module: ESNext, allowJs: true }`.
   **Diagnostics:** none (TS errors are not surfaced as Inkline diagnostics; that's the user's TS pipeline's job).
   **Tests:** `01-program.test.ts` — given source `const x: number = "y"` returns a program whose `getSemanticDiagnostics()` has at least one entry (sanity check).

### 9.2 P2 — `parse`

**File:** `src/pipeline/passes/02-parse/index.ts`
**Name:** `"parse"`
**Input:** `TsProgramArtifact`
**Output:** `RawIRModule = IRModule` (post-symbolize; render tree may still contain `<Show>` etc. as `IRComponentInstance`)
**Invariants:**

- No mutation of input.
- After completion, every `IRExprNode.deps` is populated.
- Every `IRStateDeclaration.symbolId` etc. is a valid `SymbolId`.
- No `ts.Symbol` is reachable from any IR field other than `expr: ts.Expression` (the explicit in-memory side reference).
  **Algorithm (sub-steps run in order):**

1. **(a) bind-primitives** — Walk `sourceFile.statements`; for each `ts.ImportDeclaration` importing from `@inkline/core`, record local name → primitive in a `BindingTable`. Namespace imports → push `INK0001` diagnostic, skip.
2. **(b) sites** — Find all `defineComponent(...)` calls (top-level `VariableStatement` initializers or top-level `ExportAssignment.expression`). Produce `ComponentDefinitionSite[]`. Bad calls → INK0040/INK0041.
3. For each site, build a per-component scope (`BindingScope` mapping `ts.Symbol → SymbolId` via `SymbolTable`):
   - **(c) options** — If the call has a static options object as arg 0, walk its properties; for each known key (`name`, `props`, `slots`, `events`), produce IR decls. `component.name` taken from the LHS identifier if present, else from `options.name`.
   - **(d) setup** — Walk the setup callback's body statements. For each decl-introducing statement, **mint a `SymbolId` immediately** via `ctx.symbols.mint({componentId, kind, name, loc, tsSymbol})` and register in `BindingScope`:
     - `VariableStatement` init `createSignal(x)` → `IRStateDeclaration` (value+setter); mint two SymbolIds (`signal`, paired with setter via `setterId`); record getter↔setter in `SymbolTable`.
     - `VariableStatement` init `createMemo(() => x)` → `IRMemoDeclaration` (kind `"memo"`).
     - `VariableStatement` init `createRef<T>()` → `IRRefDeclaration` (kind `"ref"`); `category: "element"` by default; `03-lower/refs.ts` refines to `"component"` when needed.
     - `ExpressionStatement` call `createEffect(fn)` → `IREffectDeclaration` (no SymbolId; effects are leaves).
     - `ExpressionStatement` call `onMount(fn)` → push into `lifecycle.onMount`.
     - `ExpressionStatement` call `onCleanup(fn)` → push into `lifecycle.onCleanup`.
     - `ReturnStatement` → save expression as `renderExpr`.
     - Other → `IRSetupStatement` (pass-through; `defines` lists newly-minted SymbolIds).
     - **Dep extraction is NOT done here.** Expressions captured as `IRExprNode` with `deps: PLACEHOLDER_DEPS` sentinel.
   - **(e) jsx** — `parseJsxExpression(renderExpr, ctx)` produces the render IR tree:
     - `JsxElement` / `JsxSelfClosingElement` → `IRElement` (lowercase tag) or `IRComponentInstance` (capitalized or member-expression tag).
     - `JsxFragment` → `IRFragment`.
     - Other expressions in JSX braces → `IRExprNode`.
     - **No lowering of `<Show>`, `<For>`, `<Switch>`, ternary, `.map`** — those stay as `IRComponentInstance` / `IRExprNode` for `03-lower/`.
     - Attributes parsed via `attributes.ts`: classifies `ref=…` → `IRRefBinding`, `on*=…` → `IREventBinding`, `$bind:*=…` → `IRAttribute{binding:"twoWay"}`, `class=…` → `IRAttribute{binding:"class"}`, `style=…` → `IRAttribute{binding:"style"}`, namespaced (`xlink:href`) → `IRAttribute{binding:"normal"}`.
     - Expressions captured as `IRExprNode` with `deps: PLACEHOLDER_DEPS`.
   - **(f) deps** — Single unified walk over every `IRExprNode` in the component (memo expressions, prop defaults, render-tree expressions, effect bodies). Algorithm in §9.2.1. Uses the `BindingScope` populated in (d) to resolve `ts.Symbol → SymbolId`. Replaces `PLACEHOLDER_DEPS` with the resolved `IRDependencySet`.

Note: SymbolId minting and `ts.Symbol`-purging happen incrementally as decls are produced (d). There is no separate "symbolize" sub-step; it is a property of the decl-producing code in (d). The `tsSymbol` argument to `mint()` is the bridge — once minted, downstream code references only `symbolId`.

#### 9.2.1 Dep extraction algorithm (sub-step f)

```ts
function extractDeps(
  expr: ts.Expression,
  scope: BindingScope,
  checker: ts.TypeChecker,
): IRDepResolution {
  const deps: IRDependency[] = [];
  let isDynamic = false;
  let conditionalDepth = 0;

  function walk(node: ts.Node, conditional: boolean) {
    // function boundaries defer; callbacks not reactive
    if (ts.isFunctionLike(node)) return;

    if (ts.isCallExpression(node)) {
      const callee = node.expression;
      if (ts.isIdentifier(callee) && node.arguments.length === 0) {
        const sym = checker.getSymbolAtLocation(callee);
        const id = sym ? scope.resolveSymbolId(sym) : undefined;
        if (id && !scope.isStableSetter(id)) {
          deps.push({
            symbolId: id,
            kind: scope.kindOf(id),
            name: callee.text,
            path: [],
            conditional,
          });
        }
      }
    }

    if (ts.isPropertyAccessExpression(node) || ts.isElementAccessExpression(node)) {
      const chain = walkAccessChain(node);
      if (chain && chain.root) {
        const rootSym = checker.getSymbolAtLocation(chain.root);
        const id = rootSym ? scope.resolveSymbolId(rootSym) : undefined;
        if (id) {
          if (chain.dynamic) {
            isDynamic = true;
          } else {
            deps.push({
              symbolId: id,
              kind: scope.kindOf(id),
              name: chain.root.text,
              path: chain.path,
              conditional,
            });
          }
        }
      }
    }

    // detect conditional sub-branches
    if (ts.isConditionalExpression(node)) {
      walk(node.condition, conditional);
      walk(node.whenTrue, true);
      walk(node.whenFalse, true);
      return;
    }
    if (ts.isBinaryExpression(node) && isShortCircuitOp(node.operatorToken.kind)) {
      walk(node.left, conditional);
      walk(node.right, true);
      return;
    }
    if (ts.isPropertyAccessExpression(node) && node.questionDotToken) {
      walk(node.expression, conditional);
      // accessor itself is "conditional" for downstream reads
      return;
    }

    node.forEachChild((c) => walk(c, conditional));
  }

  walk(expr, false);
  const dedupe = dedupeByIdAndPath(deps); // last-write-wins on `conditional` (false beats true)
  return { deps: Object.freeze(dedupe), isReactive: dedupe.length > 0 || isDynamic, isDynamic };
}
```

`scope.isStableSetter(id)` checks if the id is a setter half of a signal (the React target excludes these from `useEffect` dep arrays).

**Diagnostics emitted by P2:**

- `INK0001` — namespace import of `@inkline/core`.
- `INK0040` — `defineComponent` call with no setup function. (new code)
- `INK0041` — `defineComponent` with non-static options arg.

**Tests:**

- `02-parse/bind-primitives.test.ts` — alias imports, namespace import diagnostic.
- `02-parse/sites.test.ts` — both `const X = defineComponent(...)` and `export default defineComponent(...)` shapes.
- `02-parse/setup.test.ts` — each primitive call produces the correct IR decl.
- `02-parse/jsx/*.test.ts` — JSX → IR shape preservation; **no** lowering.
- `02-parse/deps.test.ts` — including `LateSignal` regression (signal `b` declared after a memo that reads it).

### 9.3 P3 — `lower`

**File:** `src/pipeline/passes/03-lower/index.ts`
**Name:** `"lower"`
**Input:** `IRModule` (post-parse)
**Output:** `IRModule` (lowered)
**Algorithm:** Apply transformers in order, per component:

```ts
const lowerings = [slots, controlFlow, twoWayBinding, events, refs, keyWarnings, staticMark];
for (const c of input.components) {
  let component = c;
  for (const lowering of lowerings) component = lowering(component, ctx);
  out.push(component);
}
```

Each transformer is detailed in §10.

**Diagnostics:** INK0050 (missing key), INK0070 (unsupported component-ref forwarding).

**Tests:** `03-lower/<name>.test.ts` per transformer.

### 9.4 P4 — `analyze`

**File:** `src/pipeline/passes/04-analyze/index.ts`
**Name:** `"analyze"`
**Input:** `IRModule` (lowered)
**Output:** `AnalyzedModule = { module: IRModule; graphs: Readonly<Map<string, ReactivityGraph>> }`
**Algorithm:** For each component:

1. `buildReactivityGraph(component, ctx.symbols)` → `ReactivityGraph` (memo DAG + cycles + topo) — §11.1.
2. `validateComponent(component, ctx.diagnostics)` — §11.2.
3. `diagnoseCycles(component, graph, ctx.diagnostics)` — §11.3.

**Diagnostics:** INK0010, INK0011, INK0020, INK0030.

**Tests:** `04-analyze/graph.test.ts`, `04-analyze/validate.test.ts`.

### 9.5 P5 — `emit-target`

**File:** `src/codegen/emit-pass.ts`
**Name:** `"emit"`
**Input:** `{ module: AnalyzedModule; target: Target }`
**Output:** `CodeModule[]` (one per component)
**Algorithm:** For each component in `module.module.components`, invoke `target.emit(component, ctx)` → `CodeModule`.

**Diagnostics:** target-specific (pushed via `ctx.diagnostics`).

### 9.6 P6 — `print`

**File:** `src/codegen/print/printer.ts`
**Name:** `"print"`
**Input:** `CodeModule`
**Output:** `GeneratedFile`
**Algorithm:** Walk `CodeModule.root` recursively, emitting strings with structural indentation and source-map mappings — §13.

---

## 10. Lower Transformer Specifications

### 10.1 `slots.ts`

**Purpose:** Move JSX children and JSX-valued attrs of an `IRComponentInstance` into named slots.

**Algorithm:** `transform` over render tree; on enter `IRComponentInstance`:

1. Children → if no `IRSlotContent.name === "default"` already, create one with `body: childrenAsFragmentOrSingleNode`.
2. For each `IRAttribute` whose `value.kind === "Expression"` and whose `value.expr` is a JSX expression (`isJsxElement || isJsxSelfClosingElement || isJsxFragment`): remove from `attrs`; add as `IRSlotContent{name: attr.name, body: parseJsxToIR(attr.value.expr), scopedParams: []}`.

**Tests:** all 8 combinations of (children present/absent) × (named-slot attr present/absent) × (default slot already present/absent).

### 10.2 `control-flow.ts`

**Purpose:** Normalize source-level control flow into `IRIf` / `IRFor` / `IRSwitch`.

Three sub-transformers, applied in order:

#### a) `<Show>` lowering

On `IRComponentInstance` where `reference.text === "Show"`:

- Find attr `when` (required; else INK0060 "Show requires when prop").
- Find attr `fallback` (optional; if present, must be JSX → parse).
- Default slot body → `then`.
- Emit `IRIf { branches: [{test: when, body: then}], fallback }`.

#### b) Ternary / `&&` / `||` / `??` lowering

On `IRExprNode` whose `expr` is `ts.ConditionalExpression`:

- `cond ? whenTrue : whenFalse` → if both branches are JSX, lower to `IRIf{branches:[{test:cond, body:whenTrueIR}], fallback:whenFalseIR}`. Else: leave as `IRExprNode`.

On `IRExprNode` whose `expr` is `cond && jsx`: lower to `IRIf{branches:[{test:cond, body:jsxIR}]}`.

On `cond || jsx`: lower to `IRIf{branches:[{test: not(cond), body: jsxIR}]}`.

On `cond ?? jsx`: lower to `IRIf{branches:[{test: isNullish(cond), body: jsxIR}]}` — but this is rare in JSX context; mark `INK0061` as info if a `??` mixes JSX and non-JSX branches.

#### c) `<For>` / `.map()` lowering

On `IRComponentInstance` where `reference.text === "For"`:

- Find attr `each` (required; else INK0062).
- Default slot body must be a `() => …` arrow whose param is the item: extract `itemBinding`, optional `indexBinding`.
- Find `key` attr or look in the body for a `key={…}` attribute on the root element (existing heuristic at `jsx.ts:351-369`, now isolated). If none: `INK0050` warning; key defaults to `itemBinding`.
- Emit `IRFor { each, itemBinding, indexBinding, key, body }`.

On `IRExprNode` whose `expr` is `arr.map(fn)`:

- `fn` must be an arrow returning JSX. Extract `itemBinding`/`indexBinding` from params.
- Look for `key` attr on the root JSX element. If none: `INK0050`.
- Emit `IRFor { each: arrIR, itemBinding, indexBinding, key, body: parseJsxToIR(fnBody) }`.

#### d) `<Switch>` / `<Match>` lowering

On `IRComponentInstance` where `reference.text === "Switch"`:

- Slot children must be `<Match when={…}>…</Match>` instances.
- For each `Match`: extract `when` attr and default-slot body → `IRSwitchCase`.
- Optional `fallback` attr or non-Match child → `fallback`.
- Emit `IRSwitch { cases, fallback }`.

**Tests:** one fixture per branch; `MapInExpression.ink.tsx`, `NestedLoops.ink.tsx`, `SwitchTabs.ink.tsx`.

### 10.3 `two-way-binding.ts`

**Purpose:** Desugar `$bind:value={setter}` into `value={signal()} + onInput={(e) => setter(e.target.value)}`.

On any `IRElement.attrs` containing `IRAttribute{binding:"twoWay"}`:

1. Determine the value expression: if `value.expr` is an Identifier that resolves to a setter, the value getter is `setterToGetter.get(id)`; else, the value is the same expression as the binding (rare for `$bind:value`).
2. Determine the event name and value extraction by element type and attr name:
   - `<input type="checkbox">` `$bind:checked` → event `onChange`, value `e.target.checked`.
   - `<input>`/`<textarea>` `$bind:value` → event `onInput`, value `e.target.value`. (Number coercion when `type="number"`: emit `e.target.valueAsNumber`.)
   - `<select>` `$bind:value` → event `onChange`, value `e.target.value`.
3. Replace the `twoWay` attribute with a `normal` attribute (`name=value, binding="normal"`).
4. Append `IREventBinding{name: eventName, handler: arrow((e) => setter(extract)), synthesized: true}` to `events`.

Targets with native sugar (Vue, Svelte) re-elide the synthesized event during emit and use `v-model` / `bind:`.

**Tests:** `TwoWayCheckbox`, `TwoWayNumber`, generic `<input>` and `<select>` cases.

### 10.4 `events.ts`

**Purpose:** Canonicalize event-handler shape; capture handler param types.

On every `IREventBinding`:

1. Ensure `name` is camelCase (input from parser is already camelCase; this is defensive).
2. If `handler.expr` is `ts.ArrowFunction` or `ts.FunctionExpression`, extract `paramTypes` from each parameter (or `undefined` if untyped).
3. Pass through otherwise.

This is the only place that records param types; targets use them via `target.conformance.rewrites` to emit `(e: MouseEvent) => …` typings.

**Tests:** `TypedEvent.ink.tsx` — `(e: KeyboardEvent) => …`.

### 10.5 `refs.ts`

**Purpose:** Classify `IRRefBinding` as element-ref vs component-ref.

On every `IRRefBinding` (encountered via `walkRenderTree`):

- Identify the parent: `IRElement` → `category: "element"`. `IRComponentInstance` → `category: "component"` + push `INK0070` (unsupported).

For element-refs, look at the parent element's tag and infer `elementType` (e.g., `<input>` → `"HTMLInputElement"`). Update the `IRRefDeclaration.elementType` for the corresponding declaration (by symbol).

**Tests:** `ElementRef.ink.tsx`, `Diag_ComponentRef.ink.tsx` (new fixture for INK0070).

### 10.6 `key-warnings.ts`

**Purpose:** Emit `INK0050` if an `IRFor.key` was synthesized (defaulted to `itemBinding`).

Tracking: parser/lowering marks synthesized keys with a special `IRExprNode` flag (`syntheticKey: true` on `IRFor`). The transformer reads this and pushes the diagnostic.

(Alternative considered: detect by comparing `key.expr` text to `itemBinding`. Rejected — too fragile.)

### 10.7 `static-mark.ts`

**Purpose:** Bottom-up compute `IRElement.isStatic`.

Algorithm: post-order traversal via `IRTransformer.exit`:

- `IRElement` is static iff:
  - All `attrs[i].value.kind === "Static"` AND
  - All `events` empty AND
  - All `refs` empty AND
  - All `children` are `IRText` or `IRElement.isStatic === true` or `IRFragment` with all-static children.
- `IRFragment` static iff all children static (used recursively).
- All other kinds — not relevant for static-mark; isStatic only on `IRElement`.

Replace the node with a copy whose `isStatic` is the computed value.

**Tests:** `static-mark.test.ts` — various tree shapes verify bottom-up correctness.

---

## 11. Analyze Pass Specification

### 11.1 `graph.ts` — `buildReactivityGraph`

**Input:** `IRComponent`, `SymbolTable`
**Output:**

```ts
export interface ReactivityGraph {
  readonly dependencies: ReadonlyMap<SymbolId, ReadonlySet<SymbolId>>;
  readonly dependents: ReadonlyMap<SymbolId, ReadonlySet<SymbolId>>;
  readonly topo: readonly SymbolId[]; // memo ids in topological order
  readonly cycles: readonly (readonly SymbolId[])[]; // each cycle is a list of memo ids
}
```

Algorithm: Standard DFS over memo dependencies. Memos that depend on non-memo symbols treat those as leaves. Cycles detected via the standard recursion-stack approach.

### 11.2 `validate.ts` — `validateComponent`

For each `IRExprNode` reachable from the component (memo bodies, prop defaults, render-tree expressions): walk via `walkRenderTree` + a small helper for non-render expressions:

- `IREffectDeclaration` with `deps.length === 0 && !isDynamic` → `INK0010`.
- `IRMemoDeclaration` with `expr.deps.length === 0 && !expr.isDynamic` → `INK0011`.
- Any `IRExprNode` with `isDynamic` and `targets includes react` → `INK0020`.

### 11.3 `diagnoseCycles` (moved from `compile.ts`)

For each cycle in `graph.cycles`, build a "memoA -> memoB -> memoA" string and push `INK0030` with the component's location.

---

## 12. Code IR Specification

### 12.1 Discriminated union

```ts
// codegen/code-ir/nodes.ts
export type Code =
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
  | CIndent;

export interface CNodeBase {
  readonly kind: Code["kind"];
  readonly span?: SourceLocation;
  readonly hints?: readonly string[]; // printer hints (see §13.4)
}
```

### 12.2 Container nodes

```ts
export interface CFile extends CNodeBase {
  readonly kind: "CFile";
  readonly flavor: "js-jsx" | "sfc-vue" | "sfc-svelte" | "ts" | "tsx";
  readonly children: readonly Code[];
}

export interface CScript extends CNodeBase {
  readonly kind: "CScript";
  readonly lang: "ts" | "js";
  readonly setup: boolean; // Vue: <script setup>
  readonly children: readonly Code[]; // statements / declarations
}

export interface CImport extends CNodeBase {
  readonly kind: "CImport";
  readonly module: string;
  readonly defaultLocal?: string;
  readonly named?: readonly { readonly imported: string; readonly local?: string }[];
  readonly typeOnly?: boolean;
}

export interface CStmt extends CNodeBase {
  readonly kind: "CStmt";
  /** A printable statement. Either a raw string, or a wrapped CExpr that becomes "<expr>;". */
  readonly body: string | CExpr;
}

export interface CExpr extends CNodeBase {
  readonly kind: "CExpr";
  /** The expression as a string. The expression came from `expr-rewrite.ts` (one place). */
  readonly text: string;
}

export interface CRaw extends CNodeBase {
  readonly kind: "CRaw";
  /** Escape hatch: printer emits verbatim, including newlines. Use sparingly; prefer CStmt/CExpr. */
  readonly text: string;
}
```

### 12.3 JSX nodes (React, Solid)

```ts
export interface CJsxElement extends CNodeBase {
  readonly kind: "CJsxElement";
  readonly tag: string; // "div" or "Counter" or "Foo.Bar"
  readonly attrs: readonly CJsxAttr[];
  readonly children: readonly Code[];
  readonly selfClose: boolean;
}

export interface CJsxAttr extends CNodeBase {
  readonly kind: "CJsxAttr";
  readonly name: string;
  readonly value:
    | { readonly kind: "static"; readonly text: string } // class="x"
    | { readonly kind: "expr"; readonly expr: CExpr } // class={x}
    | { readonly kind: "boolean" }; // disabled
}

export interface CJsxText extends CNodeBase {
  readonly kind: "CJsxText";
  readonly text: string;
}
```

### 12.4 Template nodes (Vue `<template>`, Svelte)

```ts
export interface CTmplElement extends CNodeBase {
  readonly kind: "CTmplElement";
  readonly tag: string;
  readonly directives: readonly CTmplDirective[]; // v-if, v-for, on:click, bind:value
  readonly attrs: readonly CTmplAttr[];
  readonly children: readonly Code[];
  readonly selfClose: boolean;
}

export interface CTmplDirective extends CNodeBase {
  readonly kind: "CTmplDirective";
  readonly directive: string; // "if" | "else-if" | "else" | "for" | "model" | …
  readonly arg?: string; // e.g., on:click "click"
  readonly modifier?: readonly string[]; // .prevent, .stop, .number
  readonly expr?: CExpr; // for v-if condition etc.
}

export interface CTmplAttr extends CNodeBase {
  readonly kind: "CTmplAttr";
  readonly name: string;
  readonly value:
    | { readonly kind: "static"; readonly text: string }
    | { readonly kind: "expr"; readonly expr: CExpr };
}

export interface CTmplText extends CNodeBase {
  readonly kind: "CTmplText";
  readonly text: string;
}

export interface CTmplMustache extends CNodeBase {
  readonly kind: "CTmplMustache";
  readonly expr: CExpr;
}
```

### 12.5 Formatting nodes

```ts
export interface CGroup extends CNodeBase {
  readonly kind: "CGroup";
  readonly children: readonly Code[];
  /** If true, printer attempts to fit on one line; else breaks. */
  readonly fit?: boolean;
}

export interface CIndent extends CNodeBase {
  readonly kind: "CIndent";
  readonly children: readonly Code[];
}
```

### 12.6 Code IR invariants (enforced at print time)

- `CTmplElement.directives` may contain at most one of `if`/`else-if`/`else`.
- `CTmplElement.directives` `for` is mutually exclusive with `if` on the same element (Vue requires wrapping `<template v-for>` for combined; printer rejects illegal combo).
- `CJsxElement.selfClose` ⇒ `children.length === 0`.
- `CImport.named` and `CImport.defaultLocal` are not both absent.

Violations: printer pushes `INK0110` (internal compiler error) and returns whatever string it has.

---

## 13. Printer Specification

### 13.1 Algorithm

```ts
export interface PrintOptions {
  readonly indent: number; // default 2
  readonly newline: "\n" | "\r\n"; // default "\n"
  readonly sourceMap: SourceMapMode; // "external" | "inline" | "none"
}

export interface PrintResult {
  readonly code: string;
  readonly map?: string; // v3 source map JSON string
}

export function print(root: Code, opts?: Partial<PrintOptions>): PrintResult;
```

Internal state during print:

- `output: string[]` (joined at end)
- `currentLine: number`, `currentColumn: number`
- `currentIndent: number`
- `mappings: SourceMapBuilder`

For each `Code` node, the printer dispatches on `kind`:

- `CFile` — emit children with newlines between, no indentation change.
- `CScript` — emit `<script setup lang="ts">` or appropriate, indent children, close `</script>`.
- `CImport` — emit `import [{ named }] [defaultLocal] from "module";`.
- `CStmt` — emit `body` followed by `;` if `body` is a `CExpr`, plus newline.
- `CExpr` — emit `text` verbatim (text already came from `expr-rewrite.ts`).
- `CRaw` — emit `text` verbatim.
- `CJsxElement` — emit `<tag attrs>` … `</tag>` with indent.
- `CTmplElement` — same with template syntax.
- `CGroup` — try fitting on one line if `fit !== false`; else break.
- `CIndent` — increment `currentIndent` for children's lines, decrement after.

Whitespace is emitted **only here**. Every `writeLine()` call inserts `currentIndent` spaces. There is no `.trim()`.

### 13.2 Source-map generation

For each node with `span` defined, the printer calls `mappings.add(generatedLine, generatedColumn, span.file, span.line - 1, span.column - 1)` at the start of emitting that node's text.

Emit granularity v0: one mapping per `CExpr`, `CJsxElement` opening tag, `CTmplElement` opening tag, `CStmt`, `CImport`. v1 finer.

`mappings.toJSON()` produces a v3 source-map JSON string per the spec.

### 13.3 Format strategy

Simple line-based. `CGroup{fit:true}` printers attempt to fit on a single line (after building a buffer for the group); if the resulting line would exceed 100 columns, the group breaks at newlines. Otherwise everything is line-per-statement.

No Wadler/Prettier-class formatter in v0.

### 13.4 Printer hints

`hints` on `CNodeBase` are advisory strings: `"preserve-newline-before"`, `"preserve-newline-after"`, `"compact"`. The printer recognizes a fixed allow-list; unknown hints are ignored. Used sparingly — most layout comes from node structure.

---

## 14. Per-Target Conformance Specs

```ts
// codegen/context.ts
export interface TargetConformanceSpec {
  readonly rewrites: RewriteRules;
  readonly controlFlowImports: {
    readonly if?: { readonly module: string; readonly named?: readonly string[] };
    readonly for?: { readonly module: string; readonly named?: readonly string[] };
    readonly switch?: { readonly module: string; readonly named?: readonly string[] };
  };
  readonly lint: { readonly eslintConfig: string; readonly requiredPlugins: readonly string[] };
  readonly typecheck: { readonly tsconfig: string; readonly dtsImports: readonly string[] };
  readonly mount: { renderToString(file: GeneratedFile, props?: unknown): Promise<string> };
  readonly invariants: ReadonlyArray<(file: GeneratedFile) => Diagnostic[]>;
}
```

### 14.1 React

```ts
// codegen/targets/react/conformance.ts
export const reactConformance: TargetConformanceSpec = {
  rewrites: {
    reactiveRead: { kind: "strip-call" }, // count() → count
    setterStyle: { kind: "function-call" }, // setCount(x)
    refAccess: { kind: "field", field: "current" }, // ref.current
    jsxAttrCasing: "react", // className, htmlFor
    eventNameCase: "camel", // onClick
    templateContext: null,
    members: {
      props: { strip: true },
      slots: { strip: true, rename: { default: "children" } },
    },
  },
  controlFlowImports: {}, // React uses inline JSX expressions
  lint: {
    eslintConfig: "./tsconfigs/react.eslintrc.json",
    requiredPlugins: ["react", "react-hooks"],
  },
  typecheck: {
    tsconfig: "./tsconfigs/react.tsconfig.json",
    dtsImports: ["@types/react", "react"],
  },
  mount: { renderToString: reactRenderToString }, // from `react-dom/server`
  invariants: [
    requireFileExtension(".tsx"),
    requireImports("react", ["useState", "useEffect"], "conditional"),
    requireHookCallsAtTop,
    requireNoHookInsideConditional,
    requireDepArrayExcludesStableSetters,
  ],
};
```

Emitted shape:

```tsx
"use client";
import { useState, useEffect /* …only what we use… */ } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  const doubled = useMemo(() => count * 2, [count]);
  useEffect(() => {
    console.log("count is", count);
  }, [count]);
  return (
    <div>
      <p>{count}</p>
      <p>{doubled}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

### 14.2 Vue 3

```ts
export const vueConformance: TargetConformanceSpec = {
  rewrites: {
    reactiveRead: { kind: "strip-call" }, // count() → count (in <template>)
    // Note: in <script setup>, refs need .value
    // The emit decides templateContext per node.
    setterStyle: { kind: "field-assignment", field: "value" }, // count.value = x (script)
    refAccess: { kind: "bare" }, // refs are bare in template; useTemplateRef in script
    jsxAttrCasing: "html", // class, for
    eventNameCase: "kebab", // @click
    templateContext: "template", // overridden per-node by emit
    members: {
      props: { strip: true },
      slots: { strip: true, rename: { default: "default" } },
    },
  },
  controlFlowImports: {}, // Vue uses directives, no runtime imports needed
  lint: { eslintConfig: "./tsconfigs/vue.eslintrc.json", requiredPlugins: ["vue"] },
  typecheck: { tsconfig: "./tsconfigs/vue.tsconfig.json", dtsImports: ["vue"] },
  mount: { renderToString: vueRenderToString }, // from `@vue/server-renderer`
  invariants: [
    requireFileExtension(".vue"),
    requireScriptSetup,
    requireDefinePropsType,
    requireVForHasKey,
    requireVModelInsteadOfSynthesizedEvent,
  ],
};
```

Emitted shape:

```vue
<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";

const count = ref(0);
const doubled = computed(() => count.value * 2);
watchEffect(() => {
  console.log("count is", count.value);
});
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ doubled }}</p>
    <button @click="count = count + 1">+1</button>
  </div>
</template>
```

### 14.3 Svelte 5

```ts
export const svelteConformance: TargetConformanceSpec = {
  rewrites: {
    reactiveRead: { kind: "strip-call" }, // count() → count (runes auto-unwrap)
    setterStyle: { kind: "direct-assignment" }, // count = x
    refAccess: { kind: "bare" },
    jsxAttrCasing: "html",
    eventNameCase: "lower", // onclick
    templateContext: null,
    members: { props: { strip: true }, slots: { strip: true } },
  },
  controlFlowImports: {},
  lint: { eslintConfig: "./tsconfigs/svelte.eslintrc.json", requiredPlugins: ["svelte"] },
  typecheck: { tsconfig: "./tsconfigs/svelte.tsconfig.json", dtsImports: ["svelte"] },
  mount: { renderToString: svelteRenderToString }, // from `svelte/server`
  invariants: [
    requireFileExtension(".svelte"),
    requireStateUsesStateRune, // $state(...)
    requireMemoUsesDerivedRune, // $derived(...)
    requireEffectUsesEffectRune, // $effect(...)
    requireSlotsAreSnippets, // {#snippet ...}
    requireBindInsteadOfSynthesizedEvent, // bind:value over synthesized oninput
  ],
};
```

Emitted shape:

```svelte
<script lang="ts">
  let count = $state(0);
  let doubled = $derived(count * 2);
  $effect(() => { console.log("count is", count); });
</script>

<div>
  <p>{count}</p>
  <p>{doubled}</p>
  <button onclick={() => count = count + 1}>+1</button>
</div>
```

### 14.4 Solid

```ts
export const solidConformance: TargetConformanceSpec = {
  rewrites: {
    reactiveRead: { kind: "preserve-call" }, // count() stays count()
    setterStyle: { kind: "function-call" },
    refAccess: { kind: "bare" },
    jsxAttrCasing: "html", // Solid uses HTML casing in JSX (Solid quirk)
    eventNameCase: "lower", // onclick
    templateContext: null,
    members: { props: { strip: false } }, // Solid props.x — never strip
  },
  controlFlowImports: {
    if: { module: "solid-js", named: ["Show"] },
    for: { module: "solid-js", named: ["For"] },
    switch: { module: "solid-js", named: ["Switch", "Match"] },
  },
  lint: { eslintConfig: "./tsconfigs/solid.eslintrc.json", requiredPlugins: ["solid"] },
  typecheck: { tsconfig: "./tsconfigs/solid.tsconfig.json", dtsImports: ["solid-js"] },
  mount: { renderToString: solidRenderToString }, // from `solid-js/web`
  invariants: [
    requireFileExtension(".tsx"),
    requirePropsNotDestructured,
    requireReactiveReadsPreserveCall,
    requireControlFlowComponents, // <Show>/<For>/<Switch>
  ],
};
```

Emitted shape:

```tsx
import { createSignal, createMemo, createEffect } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);
  const doubled = createMemo(() => count() * 2);
  createEffect(() => {
    console.log("count is", count());
  });
  return (
    <div>
      <p>{count()}</p>
      <p>{doubled()}</p>
      <button onclick={() => setCount(count() + 1)}>+1</button>
    </div>
  );
}
```

### 14.5 Per-target tsconfigs

`codegen/targets/<t>/tsconfigs/<t>.tsconfig.json` (for emitted-code typecheck):

- **react**: `{ "compilerOptions": { "jsx": "react-jsx", "target": "ESNext", "moduleResolution": "Bundler", "strict": true, "noEmit": true, "types": ["@types/react"] }, "include": ["<emitted>/**/*.tsx"] }`
- **vue**: `{ "compilerOptions": { "target": "ESNext", "moduleResolution": "Bundler", "strict": true, "noEmit": true, "types": ["vue"] }, "include": ["<emitted>/**/*.vue"] }` (with `vue-tsc` instead of `tsc`).
- **svelte**: tsconfig + `svelte-check` invocation.
- **solid**: `{ "compilerOptions": { "jsx": "preserve", "jsxImportSource": "solid-js", "target": "ESNext", "moduleResolution": "Bundler", "strict": true, "noEmit": true, "types": ["solid-js"] }, "include": ["<emitted>/**/*.tsx"] }`

`codegen/targets/<t>/tsconfigs/<t>.eslintrc.json`: per framework standard recommended config.

---

## 15. Plugin System

### 15.1 Types

```ts
// plugin/types.ts
export interface Plugin {
  readonly name: string;
  readonly targets?: readonly TargetName[]; // undefined = all
  readonly hooks: PluginHooks;
}

export interface PluginHooks {
  /** Read-only inspection of analyzed IR. May push diagnostics. */
  "ir:post"?: (module: AnalyzedModule, ctx: PluginContext) => void | Promise<void>;
  /** Per-target post-codegen. May return replacement files. */
  "code:post"?: (
    target: TargetName,
    files: readonly GeneratedFile[],
    ctx: PluginContext,
  ) => void | readonly GeneratedFile[] | Promise<void | readonly GeneratedFile[]>;
}

export interface PluginContext {
  readonly pushDiagnostic: (d: Diagnostic) => void;
  readonly options: ResolvedCompilerOptions;
}

export function definePlugin(p: Plugin): Plugin;
```

### 15.2 Runner semantics

```ts
// plugin/runner.ts
export class PluginRunner {
  constructor(plugins: readonly Plugin[]);

  async invoke<H extends keyof PluginHooks>(
    hook: H,
    args: PluginHookArgs<H>,
    ctx: PluginContext,
  ): Promise<PluginHookReturn<H>>;
}
```

Semantics:

1. **Order:** registration order.
2. **Filter:** if `plugin.targets` is defined, the runner invokes only when the call is for one of those targets (`code:post` only).
3. **Async:** every invocation `await`ed.
4. **Error containment:** if a plugin throws:
   - Push `INK0090` with the plugin name and message.
   - If `options.verbose`, also `console.warn` with the stack trace.
   - For `ir:post`: continue with the next plugin; module unchanged.
   - For `code:post`: continue with the next plugin; files threaded from the **last successful** plugin (not the throwing one's partial output).
5. **Return value:** `code:post` may return `readonly GeneratedFile[]` to replace. `undefined`/`void` means "no change". The runner accumulates and threads.

### 15.3 Tests

`plugin/runner.test.ts`:

- Plugins run in order.
- `targets` filter excludes irrelevant plugins.
- Throwing plugin produces `INK0090`, others continue.
- Replacement files from `code:post` thread to next plugin.
- Async plugin awaited correctly.

---

## 16. Diagnostic Catalog

Complete catalog. Every code must appear here; the type system enforces it via `DiagnosticCode = keyof typeof DIAGNOSTICS`.

```ts
// core/diagnostics/codes.ts
export const DIAGNOSTICS = {
  // ── Parse phase (00xx) ─────────────────────────────────────────────
  INK0001: {
    severity: "error",
    title: "Namespace import of @inkline/core is not supported",
    help: "Use named imports: import { createSignal } from '@inkline/core'",
    url: "https://docs.inkline.dev/diagnostics/INK0001",
  },
  INK0040: {
    severity: "error",
    title: "defineComponent must have a setup function",
    help: "Pass a function as the last argument: defineComponent((props) => <…/>)",
    url: "https://docs.inkline.dev/diagnostics/INK0040",
  },
  INK0041: {
    severity: "error",
    title: "defineComponent options must be a static object literal",
    help: "Move dynamic options into the setup body",
    url: "https://docs.inkline.dev/diagnostics/INK0041",
  },

  // ── Analyze phase (01xx) ───────────────────────────────────────────
  INK0010: {
    severity: "warning",
    title: "Effect has no reactive dependencies; it runs once",
    help: "If intended, this is fine. Otherwise, read a signal inside the effect body",
    url: "https://docs.inkline.dev/diagnostics/INK0010",
  },
  INK0011: {
    severity: "warning",
    title: "Memo has no reactive dependencies; it never recomputes",
    help: "Replace with a plain const",
    url: "https://docs.inkline.dev/diagnostics/INK0011",
  },
  INK0020: {
    severity: "warning",
    title: "Dynamic reactive read prevents static dep tracking",
    help: "React falls back to recomputing on every render",
    targets: ["react"],
    url: "https://docs.inkline.dev/diagnostics/INK0020",
  },
  INK0030: {
    severity: "error",
    title: "createMemo cycle detected: {cycle}",
    help: "Break the cycle by introducing an intermediate signal",
    url: "https://docs.inkline.dev/diagnostics/INK0030",
  },

  // ── Lower phase (05xx) ─────────────────────────────────────────────
  INK0050: {
    severity: "warning",
    title: "Missing key in iteration",
    help: "Add key={item.id} or pass key prop to the iterated element",
    url: "https://docs.inkline.dev/diagnostics/INK0050",
  },
  INK0060: {
    severity: "error",
    title: "<Show> requires a 'when' prop",
    url: "https://docs.inkline.dev/diagnostics/INK0060",
  },
  INK0061: {
    severity: "info",
    title: "Nullish-coalescing (??) in JSX is ambiguous",
    url: "https://docs.inkline.dev/diagnostics/INK0061",
  },
  INK0062: {
    severity: "error",
    title: "<For> requires an 'each' prop",
    url: "https://docs.inkline.dev/diagnostics/INK0062",
  },
  INK0070: {
    severity: "error",
    title: "Component-ref forwarding is not yet supported",
    help: "Element refs are supported. Component refs are planned for v1.",
    url: "https://docs.inkline.dev/diagnostics/INK0070",
  },

  // ── Options / config (06xx-08xx) ───────────────────────────────────
  INK0080: {
    severity: "warning",
    title: "Unknown target option: {key}",
    url: "https://docs.inkline.dev/diagnostics/INK0080",
  },

  // ── Plugin (09xx) ──────────────────────────────────────────────────
  INK0090: {
    severity: "error",
    title: "Plugin '{name}' threw: {message}",
    url: "https://docs.inkline.dev/diagnostics/INK0090",
  },

  // ── Pipeline (10xx) ────────────────────────────────────────────────
  INK0100: {
    severity: "error",
    title: "Parse failure in component '{name}': {message}",
    help: "The component was skipped. Other components in the module still compile.",
    url: "https://docs.inkline.dev/diagnostics/INK0100",
  },
  INK0110: {
    severity: "error",
    title: "Internal compiler error: {message}",
    help: "Please file an issue with the source file attached.",
    url: "https://docs.inkline.dev/diagnostics/INK0110",
  },
} as const;

export type DiagnosticCode = keyof typeof DIAGNOSTICS;
export type DiagnosticParams<C extends DiagnosticCode> = ExtractPlaceholders<
  (typeof DIAGNOSTICS)[C]["title"]
>;
```

`ExtractPlaceholders` is a TS type-level utility extracting `{name}` placeholders from a string literal type. Callers must satisfy the placeholder set.

Tests:

- `codes.test.ts` — every code's `title` placeholder count matches `DiagnosticParams<C>`; every code is exercised by at least one test (fixture for source-level codes; unit test for runtime codes like INK0090/0100/0110).

---

## 17. Configuration

```ts
// core/config.ts
export function defineConfig(c: InklineConfig): InklineConfig {
  return c;
}

// Resolution: applies defaults, validates, throws on invalid.
// core/options.ts
export function resolveOptions(
  userConfig: Partial<InklineConfig> | undefined,
): ResolvedCompilerOptions;
```

```ts
export interface InklineConfig {
  readonly targets: readonly TargetName[];
  readonly outDir?: string;
  readonly sourceMap?: SourceMapMode;
  readonly targetOptions?: Partial<Record<TargetName, Record<string, unknown>>>;
  readonly plugins?: readonly Plugin[];
  readonly verbose?: boolean;
  readonly registry?: TargetRegistry;
}
```

Defaults:

- `outDir`: `"dist"`.
- `sourceMap`: `"external"`.
- `targetOptions`: `{}`.
- `plugins`: `[]`.
- `verbose`: `false`.
- `registry`: `builtinRegistry`.

Validation:

- `targets` non-empty, every entry in `ALL_TARGETS`.
- For every target, options whitelist comes from `target.defaultOptions` keys; unknown keys push `INK0080`.
- If `registry !== builtinRegistry`, must support every entry in `targets` (else throw).

---

## 18. CLI Specification

`bin/inkline.ts` compiles to `dist/bin/inkline.mjs`. `package.json`: `"bin": { "inkline": "./dist/bin/inkline.mjs" }`.

### 18.1 Commands

```
inkline build <glob> [options]
inkline diagnose <file> [options]
inkline version
inkline help [command]
```

### 18.2 Flags (`build`)

```
  --target <name>[,<name>...]  Comma-separated targets. Required.
  --out-dir <path>             Output directory. Default: dist.
  --source-map <mode>          external | inline | none. Default: external.
  --config <path>              Path to inkline.config.{ts,js,mjs}.
  --verbose                    Verbose plugin error logs.
  --watch                      Re-run on file changes (uses chokidar; v0 stretch).
```

### 18.3 Exit codes

- `0` — success, zero errors (warnings ok).
- `1` — compilation produced at least one error diagnostic.
- `2` — invalid CLI usage / config not found.
- `3` — internal error.

### 18.4 Output

- Per file emitted: writes `<outDir>/<target>/<componentName>.<ext>` and `.map` sibling if `sourceMap === "external"`.
- Diagnostics printed to stderr in the format:
  ```
  src/Counter.ink.tsx:5:12  warning  INK0010  Effect has no reactive dependencies; it runs once
    help: If intended, this is fine. Otherwise, read a signal inside the effect body
    docs: https://docs.inkline.dev/diagnostics/INK0010
  ```
- `--verbose` adds per-pass timing summary at the end.

### 18.5 Tests

`bin/inkline.test.ts`:

- `inkline build src/Counter.ink.tsx --target react` exits 0, writes `dist/react/Counter.tsx`.
- `inkline build <bad-file> --target react` exits 1 with diagnostic on stderr.
- `inkline diagnose <bad-file>` exits 1, no file written.
- Invalid `--target` exits 2.

---

## 19. Testing Infrastructure

All under `src/testing/`. Exported via `@inkline/compiler/testing` subpath.

### 19.1 `harness.ts`

```ts
export interface CompiledFixture {
  readonly ir: AnalyzedModule;
  readonly files: Readonly<Record<TargetName, readonly GeneratedFile[]>>;
  readonly diagnostics: readonly Diagnostic[];
}
export function compileFixture(
  name: string,
  targets?: readonly TargetName[],
): Promise<CompiledFixture>;
```

Reads `__fixtures__/${name}.ink.tsx`, runs full pipeline, returns artifacts.

### 19.2 `typecheck.ts`

```ts
export async function typecheckEmittedForTarget(
  target: TargetName,
  files: Iterable<GeneratedFile>,
): Promise<readonly Diagnostic[]>;
```

Writes files to a tempdir, invokes the per-target tsconfig (`tsc` for React/Solid, `vue-tsc` for Vue, `svelte-check` for Svelte) once over all files, parses output to diagnostics.

### 19.3 `lint.ts`

```ts
export async function lintEmittedForTarget(
  target: TargetName,
  files: Iterable<GeneratedFile>,
): Promise<readonly Diagnostic[]>;
```

One ESLint invocation per target with per-target config.

### 19.4 `mount.ts`

```ts
export interface MountResult {
  readonly html: string;
  readonly warnings: readonly string[];
}
export function mountForTarget(
  target: TargetName,
  file: GeneratedFile,
  props?: unknown,
): Promise<MountResult>;
```

Per-target SSR: `react-dom/server.renderToString`, `@vue/server-renderer.renderToString`, `svelte/server.render`, `solid-js/web.renderToString`. Captures `console.warn` calls.

### 19.5 `equivalence.ts`

```ts
export interface Scenario {
  readonly name: string;
  readonly props?: Readonly<Record<string, unknown>>;
  readonly events?: readonly EventStep[];
  readonly asserts: ScenarioAsserts;
}
export type EventStep = { readonly [type: string]: string }; // { click: "button" }
export interface ScenarioAsserts {
  readonly textOf?: Readonly<Record<string, string>>; // selector → expected text
  readonly htmlEquals?: string;
  readonly expectedDiagnostics?: readonly DiagnosticCode[];
}

export async function runScenarioAcrossTargets(
  fixtureName: string,
  scenario: Scenario,
): Promise<{
  readonly equivalent: boolean;
  readonly normalizedByTarget: Record<TargetName, string>;
}>;
```

Algorithm:

1. Compile fixture for all four targets.
2. Mount each in its SSR.
3. Apply events via happy-dom on each.
4. Normalize DOMs (sort attrs, strip whitespace between blocks).
5. Compare; return diff.

### 19.6 `sourcemap.ts`

```ts
export function expectMappingAt(
  file: GeneratedFile,
  line: number,
  column: number,
): {
  resolvesTo(expected: { originalLine: number; originalColumn: number; tolerance?: number }): void;
};
```

Uses `@jridgewell/trace-mapping` (vendored or dep).

### 19.7 `conformance.ts`

```ts
export function runConformanceInvariants(
  target: Target,
  file: GeneratedFile,
): readonly Diagnostic[];
```

Iterates `target.conformance.invariants`, accumulates returned diagnostics.

### 19.8 `coverage.ts`

```ts
export interface CoverageReport {
  readonly missingByTarget: Readonly<Record<TargetName, readonly IRNode["kind"][]>>;
  readonly allCovered: boolean;
}
export async function computeCoverage(fixtures: readonly string[]): Promise<CoverageReport>;
```

Algorithm: for each fixture, compile to each target, walk emitted Code IR (or render IR if available), record which `IRNode.kind`s were emitted. Failing gate: any target missing any kind.

### 19.9 `bench.ts`

Uses `tinybench`. Benchmarks the suite from §22. Compares against `.bench-baseline.json`; fails on >10% regression.

---

## 20. Fixture Suite

38 fixtures (see total below). Each `.ink.tsx` is paired with one entry in `__fixtures__/scenarios.ts`:

```ts
export const scenarios: Readonly<Record<string, readonly Scenario[]>> = {
  // existing 10
  Counter: [
    { name: "initial", asserts: { textOf: { "p:nth-of-type(1)": "0", "p:nth-of-type(2)": "0" } } },
    {
      name: "click+3",
      events: [{ click: "button" }, { click: "button" }, { click: "button" }],
      asserts: { textOf: { "p:nth-of-type(1)": "3", "p:nth-of-type(2)": "6" } },
    },
  ],
  Button: [
    /* … */
  ],
  Card: [
    /* … */
  ],
  Composite: [
    /* … */
  ],
  Conditional: [
    /* … */
  ],
  ForLoop: [
    /* … */
  ],
  FormField: [
    /* … */
  ],
  Lifecycle: [
    /* … */
  ],
  List: [
    /* … */
  ],
  SwitchTabs: [
    /* … */
  ],

  // reactivity (5)
  LateSignal: [
    /* regression for bug #1; just compiles + reads correct value */
  ],
  DiamondMemo: [
    /* … */
  ],
  ConditionalRead: [
    /* … */
  ],
  DynamicAccess: [{ name: "compiles", asserts: { expectedDiagnostics: ["INK0020"] } }],
  UntrackBoundary: [
    /* … */
  ],

  // render tree (6)
  NestedLoops: [
    /* … */
  ],
  NestedSlots: [
    /* … */
  ],
  ScopedSlot: [
    /* … */
  ],
  FragmentRoot: [
    /* … */
  ],
  MapInExpression: [
    /* … */
  ],
  TextWithSiblings: [
    /* … */
  ],

  // events/binding (4)
  TypedEvent: [
    /* … */
  ],
  EventModifier: [
    /* … */
  ],
  TwoWayCheckbox: [
    {
      name: "toggle",
      events: [{ click: "input" }],
      asserts: { textOf: { "[data-testid='label']": "true" } },
    },
  ],
  TwoWayNumber: [
    /* … */
  ],

  // components (4)
  PropDefaults: [
    /* … */
  ],
  RequiredProps: [
    /* … */
  ],
  OptionalSlot: [
    /* … */
  ],
  MultipleComponentsPerFile: [
    /* … */
  ],

  // refs (1)
  ElementRef: [
    /* … */
  ],

  // diagnostics-only (8)
  Diag_NamespaceImport: [{ name: "compiles", asserts: { expectedDiagnostics: ["INK0001"] } }],
  Diag_EmptyEffect: [{ name: "compiles", asserts: { expectedDiagnostics: ["INK0010"] } }],
  Diag_EmptyMemo: [{ name: "compiles", asserts: { expectedDiagnostics: ["INK0011"] } }],
  Diag_Cycle: [{ name: "compiles", asserts: { expectedDiagnostics: ["INK0030"] } }],
  Diag_MissingKey: [{ name: "compiles", asserts: { expectedDiagnostics: ["INK0050"] } }],
  Diag_ShowNoWhen: [{ name: "compiles", asserts: { expectedDiagnostics: ["INK0060"] } }],
  Diag_ForNoEach: [{ name: "compiles", asserts: { expectedDiagnostics: ["INK0062"] } }],
  Diag_ComponentRef: [{ name: "compiles", asserts: { expectedDiagnostics: ["INK0070"] } }],
};
```

Total: 10 existing + 25 feature + 8 diagnostic-only = **38 fixtures**. Diagnostic codes not covered by fixtures (INK0040/0041/0061/0080/0090/0100/0110) are exercised by unit tests in `02-parse/sites.test.ts`, `lower/control-flow.test.ts`, `core/options.test.ts`, `plugin/runner.test.ts`, and `pipeline/compile.test.ts` respectively.

Each new fixture file is < 30 lines of `.ink.tsx`; collectively ~900-1100 lines added.

---

## 21. CI Matrix

`vite.config.ts` tasks expose:

```
vp check               # format + lint + typecheck compiler source
vp test                # unit + snapshot + IR-snapshot + conformance + coverage + sourcemap
vp run test:emitted-typecheck   # tsc/vue-tsc/svelte-check per target
vp run test:emitted-lint        # eslint per target
vp run test:runtime             # mount + scenarios + DOM equivalence
vp run bench                    # perf budgets ±10%
vp run docs:diagnostics         # generate diagnostic markdown from codes.ts
```

CI runs all six in order; merge blocked on any red.

Gate semantics:

- `vp test` failing = code-level test red.
- `test:emitted-typecheck` failing = emitted code produced TS errors.
- `test:emitted-lint` failing = emitted code triggered an ESLint rule from the target's required-plugin set.
- `test:runtime` failing = mount produced a warning OR DOM-equivalence assertion failed.
- `bench` failing = regression >10% from `.bench-baseline.json`.

Baseline files: `.bench-baseline.json`, `__snapshots__/*.snap`, `__fixtures__/__snapshots__/*.ir.json`.

---

## 22. Performance Budgets

Measured by `testing/bench.ts`. Reference: typical contributor laptop (16-core, 32 GB).

| Benchmark                                                            | Budget   |
| -------------------------------------------------------------------- | -------- |
| Parse + lower + analyze, Composite fixture, cold                     | < 30 ms  |
| Parse + lower + analyze, Composite fixture, warm (TS program reused) | < 5 ms   |
| Emit + print, single component, single target                        | < 10 ms  |
| Full module compile (Composite, all 4 targets) cold                  | < 100 ms |
| IR for single component, JSON-serialized                             | < 100 KB |

CI fails on >10% regression from `main`'s `.bench-baseline.json`. Baseline updated on merge to `main`.

---

## 23. Migration Phases

Each commit keeps `vp check` and `vp test` green. Acceptance criteria explicit.

### Phase A — Foundations

**Scope:** Non-behavioral additions.

A1: `core/diagnostics/{collector,codes}.ts`, `core/options.ts`, `core/locations.ts`, `core/config.ts`, `core/assert.ts`.

- **Accept:** `vp test` green; new files unit-tested; old `Diagnostic` type re-exported from new location.

A2: `ir/render/transform.ts` (`IRTransformer`/`SKIP`/`transform`/`transformComponent`).

- **Accept:** `vp test` green; new file unit-tested; `assertNever` in default branches.

A3: `core/sourcemap.ts` (vendored v3 encoder or dep).

- **Accept:** unit tests covering `add` + `toJSON`.

A4: `codegen/code-ir/{nodes,builders,visit}.ts`. `codegen/print/printer.ts`.

- **Accept:** printer round-trips small Code IR fragments; unit tests.

### Phase B — Stable SymbolId

**Scope:** Introduce `SymbolId` alongside existing `ts.Symbol` fields.

B1: `ir/reactivity.ts` adds `SymbolId` + `SymbolTable`. Parallel `symbolId` on `IRStateDeclaration`/`IRMemoDeclaration`/`IRRefDeclaration`/`IRProp`. Both fields populated.

- **Accept:** existing tests still pass; new `SymbolTable` unit tests.

B2: `analyze/graph.ts` switched to use `SymbolId` keys; legacy `ts.Symbol` map removed.

- **Accept:** `graph.test.ts` green with `SymbolId`-based assertions.

### Phase C — Pluggable plumbing

C1: `pipeline/types.ts` (`Pass`, `PassContext`, `pipe`).

- **Accept:** unit tests cover `pipe` arity 1-5, async chaining.

C2: `plugin/runner.ts` + `plugin/types.ts` (re-exported from old location).

- **Accept:** runner tests per §15.3.

C3: `codegen/registry.ts` with `createRegistry`/`builtinRegistry`. Pre-register old targets delegating to existing emit functions.

- **Accept:** existing `targets/*.test.ts` still pass; registry tests for register/get/list and frozen-builtin enforcement.

### Phase D — Compile via pass

D1: Wrap old `parseModule` as `Pass<CompileInput, RawIRModule>`. `pipeline/compile.ts` calls pass-pipeline that internally uses old pipeline.

- **Accept:** `compile.test.ts` re-pointed to new entry, all assertions green.

### Phase E — Split parser/jsx.ts + extract lowerings

E1: `03-lower/control-flow.ts` (extract `lowerShow`/`lowerFor`/`lowerSwitch`/`tryLowerTernary`/`tryLowerMap` from `parser/jsx.ts`).

- **Accept:** `control-flow.test.ts` with isolated IR-fragment tests; existing fixture snapshots unchanged.

E2: `03-lower/slots.ts`, `two-way-binding.ts`, `key-warnings.ts`, `events.ts`, `refs.ts`.

- **Accept:** per-transformer test file each; fixture snapshots unchanged.

E3: `03-lower/static-mark.ts`. Update `createElement` builder to default `isStatic: false`.

- **Accept:** `static-mark.test.ts`; fixture snapshots unchanged.

E4: Split `parser/jsx.ts` into `02-parse/jsx/{element,component-instance,attributes,expressions}.ts`. Verify line-count: each new file < 250 lines.

- **Accept:** new test files per split; fixture snapshots unchanged.

### Phase F — Two-pass dep resolution within P2

F1: Move `extractDeps` to `02-parse/deps.ts` as the unified walker (algorithm §9.2.1). Remove dep-extraction calls from `setup.ts` and `jsx.ts`. IR carries `deps: PLACEHOLDER_DEPS` until step (f) runs.

- **Accept:** `deps.test.ts` with conditional-tracking tests; **`LateSignal.ink.tsx` regression goes green**.

### Phase G — Code IR codegen rollout

Order: **Solid → React → Svelte → Vue** (simplest first). For each target T:

G_T_1: Add `codegen/targets/T/conformance.ts`.

- **Accept:** conformance constant compiles; types match.

G_T_2: Add `codegen/targets/T/emit.ts` producing `CodeModule`.

- **Accept:** new emit's printed output matches the old snapshot for every fixture currently passing on T.

G_T_3: Replace the old `targets/T/index.ts` entry-point with delegation to new emit. Old file removed.

- **Accept:** snapshots unchanged; `targets/T/*.test.ts` files moved to `codegen/targets/T/*.test.ts`.

### Phase H — Registry flip + plugin wiring + error recovery

H1: `compile()` resolves targets via `ctx.registry.get(name)`. No more direct imports of target objects in `pipeline/compile.ts`.

H2: Plugin runner invoked at `ir:post` (after P4) and `code:post` (after P6 per target).

- **Accept:** integration tests with a no-op plugin (smoke), a diagnostic-pushing plugin, a file-replacing plugin, and a throwing plugin.

H3: Per-component try/catch in `compile()` with `INK0100` on failure and `componentStub(site)` fallback.

- **Accept:** `error-recovery.test.ts` with a fixture that intentionally fails parse mid-module; assertions: other components still emit; INK0100 present.

### Phase I — Verification matrix + new fixtures

I1: Land per-target tsconfig + ESLint config files in `codegen/targets/<t>/tsconfigs/`.

I2: `testing/{typecheck,lint,mount,equivalence,conformance,coverage,sourcemap,bench}.ts`.

- **Accept:** every harness has its own unit tests against a known-good fixture (Counter).

I3: Add the 25 new fixtures + `__fixtures__/scenarios.ts` index entries.

- **Accept:** every fixture compiles for every target; scenarios run; coverage gate green.

I4: Wire `vite.config.ts` tasks for `test:emitted-typecheck`, `test:emitted-lint`, `test:runtime`, `bench`. Add baseline files.

- **Accept:** all four tasks pass locally.

I5: Update `package.json` with new dev dependencies (block under `devDependencies`; pin major versions):

- Framework runtimes for SSR tests: `react@^19`, `react-dom@^19`, `@types/react@^19`, `vue@^3.4`, `@vue/server-renderer@^3.4`, `svelte@^5`, `solid-js@^1.8`.
- Framework typecheckers: `vue-tsc@^2`, `svelte-check@^4`.
- ESLint plugins: `eslint-plugin-react@^7`, `eslint-plugin-react-hooks@^5`, `eslint-plugin-vue@^9`, `eslint-plugin-svelte@^2`, `eslint-plugin-solid@^0.14`.
- DOM + bench: `happy-dom@^15`, `tinybench@^2`.
- Source-map tracing: `@jridgewell/trace-mapping@^0.3`.

Also update `package.json` for the public surface:

- `exports`: add `"./testing": "./dist/testing/index.mjs"` next to existing `"."` entry.
- `bin`: add `"inkline": "./dist/bin/inkline.mjs"`.
- `files`: ensure `dist` covers `bin/` and `testing/`.
- **Accept:** `vp install` succeeds; `npx inkline --help` runs from a sibling consumer.

### Phase J — CLI + cleanup

J1: `bin/inkline.ts` with commands per §18; build config to emit `dist/bin/inkline.mjs`.

- **Accept:** `bin/inkline.test.ts` green; manual smoke `inkline build src/Button.ink.tsx --target react`.

J2: Delete legacy files (all under old paths; new homes were established in earlier phases):

- `src/targets/print.ts` — replaced by `codegen/shared/expr-rewrite.ts` + `codegen/print/printer.ts`.
- `src/targets/index.ts` — replaced by `codegen/registry.ts`.
- `src/targets/{react,vue,svelte,solid}/` — replaced by `codegen/targets/<t>/`.
- `src/parser/` (entire directory) — replaced by `pipeline/passes/02-parse/`.
- `src/scope.ts` — replaced by per-component `BindingScope` (internal to `02-parse/`) and `SymbolTable` (in `ir/reactivity.ts`).
- `src/analyze/` (entire directory) — replaced by `pipeline/passes/04-analyze/`.
- `src/compile.ts` — replaced by `pipeline/compile.ts`.
- `src/plugin.ts` — split into `plugin/types.ts` + `plugin/runner.ts`.
- `src/primitives.ts` — moved to `core/primitives.ts`.

Then narrow `src/index.ts` exports to exactly the surface in §4.

- **Accept:** `vp check` + `vp test` green; build output paths unchanged where users care (e.g., `dist/index.mjs` still resolves).

J3: Add `packages/compiler/docs/` files: `architecture.md`, `adding-a-target.md`, `adding-a-lowering.md`, `adding-a-diagnostic.md`, `scope.md`.

- **Accept:** docs build via `vp run docs:diagnostics`.

### Phase parallelism

- A1–A4 independent.
- G's four targets independent of each other once A4 lands.
- F and G can overlap.
- B is the hard sequence point — every later phase depends on `SymbolId`.

### Backout strategy per phase

- Each phase corresponds to one PR (or a small group). If a phase is broken post-merge, revert via `git revert <merge-commit>`. Following phases were authored against the reverted state, so the implementer must rebase rather than fast-forward.
- Phase boundary acceptance criteria include green snapshots so revert is unambiguous.

Total: ~18 commits across ~10-12 PRs.

---

## 24. File Layout (Final)

```
packages/compiler/
├─ src/
│   ├─ index.ts                                  # public API (see §4)
│   ├─ bin/
│   │   └─ inkline.ts                            # CLI (see §18)
│   ├─ pipeline/
│   │   ├─ compile.ts                            # orchestrator
│   │   ├─ types.ts                              # Pass, PassContext, pipe
│   │   └─ passes/
│   │       ├─ 01-program.ts
│   │       ├─ 02-parse/
│   │       │   ├─ index.ts
│   │       │   ├─ bind-primitives.ts
│   │       │   ├─ sites.ts
│   │       │   ├─ options.ts
│   │       │   ├─ setup.ts
│   │       │   ├─ deps.ts
│   │       │   └─ jsx/
│   │       │       ├─ index.ts
│   │       │       ├─ element.ts
│   │       │       ├─ component-instance.ts
│   │       │       ├─ attributes.ts
│   │       │       └─ expressions.ts
│   │       ├─ 03-lower/
│   │       │   ├─ index.ts
│   │       │   ├─ slots.ts
│   │       │   ├─ control-flow.ts
│   │       │   ├─ two-way-binding.ts
│   │       │   ├─ events.ts
│   │       │   ├─ refs.ts
│   │       │   ├─ key-warnings.ts
│   │       │   └─ static-mark.ts
│   │       └─ 04-analyze/
│   │           ├─ index.ts
│   │           ├─ graph.ts
│   │           └─ validate.ts
│   ├─ ir/
│   │   ├─ types.ts
│   │   ├─ module.ts
│   │   ├─ reactivity.ts
│   │   └─ render/
│   │       ├─ nodes.ts
│   │       ├─ builders.ts
│   │       ├─ visit.ts
│   │       └─ transform.ts
│   ├─ codegen/
│   │   ├─ registry.ts
│   │   ├─ context.ts                            # types: Target, TargetPlan, CodegenContext, RewriteRules, etc.
│   │   ├─ emit-pass.ts                          # the P5 pass that calls target.emit()
│   │   ├─ code-ir/
│   │   │   ├─ nodes.ts
│   │   │   ├─ builders.ts
│   │   │   └─ visit.ts
│   │   ├─ print/
│   │   │   ├─ printer.ts
│   │   │   ├─ indent.ts
│   │   │   └─ format.ts
│   │   ├─ shared/
│   │   │   ├─ expr-rewrite.ts
│   │   │   ├─ scope.ts
│   │   │   └─ ts-print.ts
│   │   └─ targets/
│   │       ├─ react/
│   │       │   ├─ index.ts
│   │       │   ├─ conformance.ts
│   │       │   ├─ emit.ts
│   │       │   ├─ jsx.ts
│   │       │   └─ tsconfigs/
│   │       │       ├─ react.tsconfig.json
│   │       │       └─ react.eslintrc.json
│   │       ├─ solid/{index,conformance,emit,jsx}.ts + tsconfigs/
│   │       ├─ vue/{index,conformance,emit-script,emit-template}.ts + tsconfigs/
│   │       └─ svelte/{index,conformance,emit-script,emit-template}.ts + tsconfigs/
│   ├─ plugin/
│   │   ├─ types.ts
│   │   └─ runner.ts
│   ├─ core/
│   │   ├─ primitives.ts
│   │   ├─ locations.ts
│   │   ├─ assert.ts
│   │   ├─ config.ts
│   │   ├─ options.ts
│   │   ├─ sourcemap.ts
│   │   └─ diagnostics/
│   │       ├─ collector.ts
│   │       └─ codes.ts
│   ├─ testing/
│   │   ├─ index.ts                              # re-exports
│   │   ├─ harness.ts
│   │   ├─ typecheck.ts
│   │   ├─ lint.ts
│   │   ├─ mount.ts
│   │   ├─ equivalence.ts
│   │   ├─ sourcemap.ts
│   │   ├─ conformance.ts
│   │   ├─ coverage.ts
│   │   └─ bench.ts
│   └─ __fixtures__/
│       ├─ scenarios.ts
│       └─ *.ink.tsx                             # 38 files
├─ docs/
│   ├─ architecture.md
│   ├─ adding-a-target.md
│   ├─ adding-a-lowering.md
│   ├─ adding-a-diagnostic.md
│   └─ scope.md                                  # out-of-scope tracker
├─ vite.config.ts                                # tasks per §21
├─ package.json                                  # bin + exports subpath
├─ tsconfig.json
└─ README.md
```

---

## 25. Decision Log

For each design decision, the alternatives considered and why we rejected them.

### D1. 6 passes vs. one monolithic compile()

- **Choice:** 6 passes (program, parse, lower, analyze, emit-target, print).
- **Alternatives:** (a) keep monolithic; (b) more passes (10+).
- **Reasoning:** (a) loses isolation/testability; current pipeline already mutates IR across functions. (b) every extra pass is friction without behavior gain. 6 = minimum to keep parse, lower, analyze, emit, print clearly separated; sub-steps of parse fold inward (bind-primitives, deps, symbolize) since they share the same TS context.

### D2. SymbolId (string) vs. ts.Symbol identity

- **Choice:** `SymbolId` (branded string).
- **Alternatives:** (a) keep `ts.Symbol`; (b) use `number` (interned).
- **Reasoning:** (a) couples IR to one `ts.Program`; non-serializable; current pain point. (b) numbers are cheaper but lose human-readable debugging. Branded string + offset-based minting = stable + readable + serializable. `ts.Expression` references stay alongside, in memory only (v0 IR not promised serializable in full).

### D3. Code IR vs. string templates

- **Choice:** Code IR + shared printer.
- **Alternatives:** (a) string templates with placeholders; (b) per-target string-builders with shared helpers.
- **Reasoning:** (a) loses source-map fidelity and structural validation. (b) is the current design; ~40% per-target duplication, fragile indentation. Code IR puts indentation, source maps, and import management in one place; targets become structural translators.

### D4. Pluggable registry vs. static dispatch

- **Choice:** Mutable `TargetRegistry`, frozen `builtinRegistry`.
- **Alternatives:** (a) static `if/else` dispatch in compile; (b) global mutable registry.
- **Reasoning:** (a) adds friction for third-party targets and `inkline.config.ts` extensibility. (b) is a footgun (mutations escape test boundaries). Frozen builtin + `createRegistry()` instances strikes the balance.

### D5. `RewriteRules` as discriminated-union objects vs. string enums

- **Choice:** Discriminated-union objects (e.g., `reactiveRead: { kind: "strip-call" } | { kind: "field-access"; field: "value" }`).
- **Alternatives:** (a) string enums (`reactiveRead: "strip" | "keep" | "unwrap-value"`).
- **Reasoning:** Enums hide their behavior; discriminated unions carry parameters explicitly (e.g., what field to access for unwrap). Self-documenting; type-system enforces handling of all kinds via `assertNever`.

### D6. Per-component error recovery vs. fail-fast

- **Choice:** Per-component try/catch with INK0100.
- **Alternatives:** (a) throw on first error; (b) try/catch per pass.
- **Reasoning:** Editor-integration (LSP) wants partial results — a broken component shouldn't break sibling components. Per-component is the right granularity; per-pass is too fine (a broken parse can't yield a lowerable IR).

### D7. Plain functions vs. DSL for conformance invariants

- **Choice:** `invariants: ((file) => Diagnostic[])[]`.
- **Alternatives:** (a) tagged-union DSL (`{ kind: "containsImport"; module: string }`).
- **Reasoning:** DSL adds a fixed vocabulary; new invariant ⇒ new variant ⇒ new printer logic. Plain functions accept any check; common ones become exported helpers (`requireImports`, `requireFileExtension`, etc.).

### D8. Runtime mount required (not opt-in)

- **Choice:** Required in CI.
- **Alternatives:** (a) opt-in via flag; (b) optional, run nightly.
- **Reasoning:** Behavior equivalence is the only check that matches the spec "behaves the same across targets". Cost is bounded by §22 budgets and one tsc-per-target. CI runtime stays under ~5 min.

### D9. Two-pass deps inside P2 vs. separate pass

- **Choice:** Inside P2 as sub-step (f).
- **Alternatives:** (a) separate `resolve-deps` pass after P2.
- **Reasoning:** Separate pass adds a stage that has no purpose without the parse it follows. Folding it into P2 keeps the public phase count low and matches user mental model ("parse produces IR with deps").

### D10. v0 IR is in-memory only (not serializable)

- **Choice:** State explicitly.
- **Alternatives:** Pretend `IRModule` is serializable except `ts.Expression`.
- **Reasoning:** Half-serializability is a smell. v1 introduces raw-text storage + re-parse for cache hits, with its own tests. v0 is honest.

### D11. Vue last in Phase G

- **Choice:** Solid → React → Svelte → Vue.
- **Alternatives:** Any order.
- **Reasoning:** Vue has SFC + template + setup-vs-template context — the most subtle. Doing it last lets the Code IR and printer prove themselves on simpler targets first.

### D12. Coverage gate auto-derived

- **Choice:** `testing/coverage.ts` computes coverage from fixture runs.
- **Alternatives:** User-maintained matrix file.
- **Reasoning:** Maintained files drift. Auto-derived: add an IR kind, gate fails until a fixture exercises it. Zero ongoing maintenance.

---

## 26. Risk Register

| ID  | Risk                                                                                              | Probability | Impact | Mitigation                                                                                                                               | Trigger                                          |
| --- | ------------------------------------------------------------------------------------------------- | ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| R1  | Vue template emission produces invalid SFC under edge cases (scoped slots, mixed `v-if`/`v-for`)  | Medium      | High   | `CTmplElement` validates directive combinations at print time; Vue done last in Phase G; per-edge-case fixture (NestedSlots, ScopedSlot) | Snapshot churn during Vue phase                  |
| R2  | Svelte 5 rune semantics shift between minor versions                                              | Medium      | Medium | Pin `svelte@^5.0` in dev deps; conformance tests assert exact rune syntax; CI bump = one PR                                              | `svelte-check` failures on bump                  |
| R3  | Runtime equivalence tests inflate CI time beyond acceptable                                       | Medium      | Medium | Bench gate; `test:runtime` parallelized across targets; rerun-only-failed on retry                                                       | CI runtime > 8 min                               |
| R4  | Plugin error containment masks real bugs                                                          | Low         | Medium | INK0090 always emitted; `console.warn` gated on `--verbose`; integration test asserts buggy plugin produces diagnostic                   | Bug report: "my plugin did nothing"              |
| R5  | Source-map mapping at per-`CExpr` granularity misses identifier-level navigation                  | Low         | Low    | Documented v0 limitation; v1 sub-expression mapping planned                                                                              | User feedback                                    |
| R6  | Per-target tsconfig drifts from emitted code conventions                                          | Medium      | Medium | tsconfig lives next to emit code; bump checklist in `adding-a-target.md`                                                                 | Spurious typecheck failures after framework bump |
| R7  | Migration phase E breaks fixture snapshots mid-rollout                                            | Low         | High   | Each lowering preserves snapshot (extracted, not changed); fixture snapshots checked at every commit                                     | Snapshot diff in non-target commit               |
| R8  | `assertNever` blows up production due to a missed case                                            | Low         | High   | TS compile error catches the case at build time; runtime fallback emits INK0110 instead of throwing                                      | Production crash report                          |
| R9  | Two-way binding desugaring loses input-type-specific value extraction (number coercion, checkbox) | Medium      | Medium | Per-input-type fixtures (TwoWayCheckbox, TwoWayNumber); equivalence tests assert value type                                              | Runtime DOM diff                                 |
| R10 | `compile()` becomes async-leaky (plugins force async, callers expect sync)                        | Low         | Medium | Public signature is `Promise<CompileResult>` from day one; CLI uses `await`                                                              | Downstream library complaints                    |

---

## 27. Out-of-Scope & v1 Sketch

Each item links to a tracking issue and a v1 implementation hint.

### 27.1 Component-ref forwarding

- **v0**: parser produces `IRComponentInstance.refs: IRRefBinding[]` (newly added field; empty in most cases); `03-lower/refs.ts` sets `category: "component"` and pushes INK0070 for each. The IR shape is forward-compatible — only the emit phase is missing.
- **v1**: per-target emission — React: wrap child with `forwardRef` + `useImperativeHandle`; Vue: emit `defineExpose` block on the child + ref binding on parent; Svelte 5: `bind:this` + exported functions; Solid: `ref={ref}` calling pattern. Each target's emit grows a small block (~30 LOC); the test harness verifies bidirectional ref access.

### 27.2 `<style>` blocks / scoped CSS

- **v0**: not in IR.
- **v1**: add `IRStyleBlock { css: string; scoped: boolean; loc: SourceLocation }` to `IRComponent`; per-target emission — Vue: `<style scoped>` block; Svelte: `<style>` block (always scoped); React/Solid: CSS modules import. Requires a CSS parser pinned to `postcss` for scoping.

### 27.3 Server/client component boundaries

- **v0**: emits `'use client'` always for React.
- **v1**: `defineComponent({ runtime: "server" | "client" | "iso" })` option; per-target emission — React: emit `'use client'` only when explicitly client; Solid: split SSR/CSR emit; Astro: islands wrapper.

### 27.4 Async components / Suspense

- **v0**: not handled.
- **v1**: signal-based async primitive `createResource()`; per-target emission with framework's async-component pattern.

### 27.5 Vite plugin / HMR

- **v0**: separate package `@inkline/vite-plugin` consumes `compile()` output.
- **v1**: HMR boundary tracking via `IRComponent.id`; compiler exposes `compileIncremental(prev, changes)`.

### 27.6 Cross-process IR caching

- **v0**: in-memory only.
- **v1**: `IRExprNode` stores `raw: string` + `span` (in addition to `expr`); cache hit re-parses `raw` via a small TS scaffold; round-trip test suite.

### 27.7 Sub-expression source-map granularity

- **v0**: per-`CExpr` mapping.
- **v1**: `expr-rewrite.ts` emits `CExpr` subtrees with per-identifier spans; printer maps them.

### 27.8 IR migration framework

- **v0**: `IRModule.version` field deliberately absent.
- **v1**: introduce `version: number`; `migrate(module, fromVersion, toVersion)`; tests for every migration step.

### 27.9 New targets (Angular, Qwik, Astro)

- **v0**: reserved in `TargetName`.
- **v1+**: a new target = new directory under `codegen/targets/<name>/`, one conformance spec, one emit function, fixtures × scenarios re-used. The contributor doc `adding-a-target.md` is the gate.

### 27.10 Multi-file components

- **v0**: one `.ink.tsx` per component (multiple `defineComponent` in one file is allowed; the test `MultipleComponentsPerFile.ink.tsx` covers it).
- **v1**: split-file components (template/script/style siblings) introduce a virtual-file resolver in P1.

---

## 28. Handoff Verification Checklist

The implementer reads this section last. Marks each item when complete.

### 28.1 Pre-flight (before Phase A)

- [ ] Branch `claude/redesign-compiler-architecture-vJkmG` checked out.
- [ ] `vp install` passes locally.
- [ ] `vp test` baseline captured (test count, snapshot count).
- [ ] `vp run bench` baseline captured into `.bench-baseline.json`.

### 28.2 Per-phase acceptance

For each phase A–J:

- [ ] All "Accept" bullets in §23 satisfied.
- [ ] `vp check` green.
- [ ] `vp test` green.
- [ ] Snapshot count delta accounted for (new fixtures vs. removed targets).

### 28.3 Phase G per-target rollout

For each of Solid, React, Svelte, Vue:

- [ ] `codegen/targets/<t>/conformance.ts` present and complete.
- [ ] `codegen/targets/<t>/emit.ts` produces `CodeModule` matching old output for every fixture (snapshot diff: zero or expected-and-approved).
- [ ] `tsconfigs/<t>.tsconfig.json` + `.eslintrc.json` present.
- [ ] `test:emitted-typecheck` passes for `<t>`.
- [ ] `test:emitted-lint` passes for `<t>`.
- [ ] `test:runtime` passes for every fixture × `<t>`.
- [ ] Conformance invariants pass for every fixture.

### 28.4 Final acceptance (after Phase J)

- [ ] All 38 fixtures × 4 targets pass every CI gate.
- [ ] `vp run bench` within ±10% of pre-redesign baseline.
- [ ] `src/index.ts` exports exactly the surface in §4.
- [ ] Old files deleted (full list in §23 Phase J2): `src/targets/*`, `src/parser/*`, `src/scope.ts`, `src/analyze/*`, `src/compile.ts`, `src/plugin.ts`, `src/primitives.ts`.
- [ ] `docs/` files present (`architecture.md`, `adding-a-target.md`, `adding-a-lowering.md`, `adding-a-diagnostic.md`, `scope.md`).
- [ ] `vp run docs:diagnostics` generates current markdown for every code in §16.
- [ ] CLI works: `inkline build src/Counter.ink.tsx --target react,vue,svelte,solid` produces 4 files in `dist/`.
- [ ] Source-map round-trip: pick 5 random identifiers per (fixture, target); each maps back within ±1 column.

### 28.5 Sign-off

- [ ] Author marks plan complete.
- [ ] Reviewer audits `index.ts` exports against §4.
- [ ] Reviewer audits diagnostic catalog against `core/diagnostics/codes.ts`.
- [ ] Reviewer randomly samples 3 fixtures × 4 targets and verifies emitted code matches the conformance spec.
- [ ] Reviewer signs off on `docs/scope.md`'s out-of-scope list.

---

**End of plan.** This document is intended to be self-contained. If a reader cannot proceed with an item, the gap is a plan defect; please file it back to the author rather than guessing.
