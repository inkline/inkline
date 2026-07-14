# Architecture

Inkline is a write-once, compile-everywhere component framework. A single `.ink.tsx` source compiles to idiomatic React, Vue 3, Svelte 5, Solid, Angular, Qwik, and Astro components. No runtime dependency on `@inkline/core` is emitted into the output.

This document explains how the compiler is structured and how components flow from authoring source to per-framework output. For practical authoring guidance, see [authoring-components.md](./authoring-components.md). For the compiler's public API surface, see [`core/compiler/README.md`](../core/compiler/README.md).

## High-level flow

```
.ink.tsx  ──parse──▶  IRModule  ──analyze──▶  AnalyzedModule  ──emit──▶  Code IR  ──print──▶  files
                      (language-agnostic)                     (per target)         (per target)
```

The IR is the architectural pivot. Parsing and analysis produce a target-agnostic representation; codegen rewrites it into a Code IR tailored to a target's syntax (JSX, Vue templates, Svelte syntax, …); the printer serializes Code IR to source text and optional source maps.

## Compilation pipeline

The pipeline is defined as composable `Pass<I, O>` units in [`core/compiler/src/pipeline/types.ts`](../core/compiler/src/pipeline/types.ts). The end-to-end driver lives in [`core/compiler/src/pipeline/compile.ts`](../core/compiler/src/pipeline/compile.ts).

| Pass                      | Location                                                                              | Responsibility                                                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1 — Program              | [`pipeline/passes/01-program.ts`](../core/compiler/src/pipeline/passes/01-program.ts) | Create the TypeScript program + checker + source file. Resolve sibling `.ink.css` / `.ink.scss` files for style merging.                                                                        |
| P2 — Parse                | [`pipeline/passes/02-parse/`](../core/compiler/src/pipeline/passes/02-parse/)         | Walk the TS AST → produce `IRModule`. Bind authoring primitives (`createSignal`, `createMemo`, `createEffect`, `createRef`, `defineComponent`), parse JSX, scope analysis.                      |
| P3 — Lower                | [`pipeline/passes/03-lower/`](../core/compiler/src/pipeline/passes/03-lower/)         | Normalize `IRComponent`. Lower control-flow JSX (`<Show>` → `IRIf`, `<For>`, `<Switch>`), `<Slot>` → `IRSlotPlaceholder`, `defineSlot` bindings, events, refs, two-way binding, static marking. |
| P4 — Analyze              | [`pipeline/passes/04-analyze/`](../core/compiler/src/pipeline/passes/04-analyze/)     | Reactivity analysis, cycle detection, dependency-graph construction, validation. Output: `AnalyzedModule`.                                                                                      |
| P5 — Plugin (`ir:post`)   | [`plugin/`](../core/compiler/src/plugin/)                                             | Read-only inspection of the analyzed module. Plugins may push diagnostics.                                                                                                                      |
| P6 — Emit                 | [`codegen/targets/<framework>/`](../core/compiler/src/codegen/targets/)               | Per target: walk the IR → produce Code IR for that framework's syntax.                                                                                                                          |
| P7 — Print                | [`codegen/print/printer.ts`](../core/compiler/src/codegen/print/printer.ts)           | Code IR → source text. Optionally emit V3 source maps.                                                                                                                                          |
| P8 — Plugin (`code:post`) | [`plugin/`](../core/compiler/src/plugin/)                                             | Per-target file transformation. Plugins return replacement files or void.                                                                                                                       |

Each pass is pure on its inputs; state lives in the `PassContext` that threads through the pipeline.

## Intermediate representation (IR)

The IR is the bridge between framework-agnostic semantics and per-framework syntax. The canonical shape is in [`core/compiler/src/ir/render/nodes.ts`](../core/compiler/src/ir/render/nodes.ts).

Key types:

- `IRModule` — a parsed file: `{ components, contexts, imports, sourceFile }`.
- `IRComponent` — a single component definition: props, slots, events, state, render tree, styles, authoring meta (`meta.headless` drives Angular attribute-selector emission), runtime mode, target overrides.
- `IRNode` — the render-tree discriminated union: `IRElement | IRComponentInstance | IRText | IRExprNode | IRIf | IRFor | IRSwitch | IRSlotPlaceholder | IRFragment | IRTransition`.
- `IRExprNode` — a single TypeScript expression plus its computed reactive `IRDependencySet`. The expression is preserved verbatim; codegen rewrites it per-target.
- `IR_VERSION` — schema version. Bumped on breaking IR changes; backed by [`ir/migration.ts`](../core/compiler/src/ir/migration.ts) for serialized IR upgrades.

Reactivity is tracked via a `SymbolTable` in [`ir/reactivity.ts`](../core/compiler/src/ir/reactivity.ts). Symbols carry a stable `SymbolId` (format: `componentId::kind::name@offset`) and an `IRReactiveKind` (`signal | memo | effect | prop | context | ref | slot`). Each expression's `IRDependencySet` records which symbols it reads, the member access path, and whether the read is conditional. This drives per-target fine-grained reactivity.

The IR is serializable ([`ir/serialize.ts`](../core/compiler/src/ir/serialize.ts)) so analyzed modules can be cached on disk and reloaded by incremental builds.

## Cross-framework strategy

A single IR feeds many targets. A `Target` ([`codegen/context.ts`](../core/compiler/src/codegen/context.ts)) is small:

```ts
interface Target {
  readonly name: TargetName;
  readonly rewrites: RewriteRules;
  readonly conformance?: TargetConformanceSpec;
  emit(component: IRComponent, ctx: CodegenContext): CodeModule;
}
```

The built-in targets are registered in [`codegen/registry.ts`](../core/compiler/src/codegen/registry.ts) under `builtinRegistry`. Each target lives in its own directory under [`codegen/targets/`](../core/compiler/src/codegen/targets/) and ships a `RewriteRules` table that specifies how to rewrite expressions, attributes, events, and refs for its framework. Examples:

- React: `reactiveRead: strip-call` (`count()` → `count`), `setterStyle: function-call`, `refAccess: { field: "current" }`, camelCase attrs.
- Vue: `reactiveRead: field-access` (`count()` → `count.value`), field-assignment setters, kebab-case attrs/events.
- Svelte: direct variable access (no wrapping), runes for state.

A new framework target = a new `Target` + an `emit` function. Parsing, analysis, and the IR are reused unchanged.

Angular gets one extra mechanism: a component marked `meta: { headless: true }` whose root is a single static element emits a **second attribute-selector `@Component`** (e.g. `button[ink-button-base]`) whose host _is_ the root element, and a styled component over such a headless child **collapses** onto that host — recipe classes merge onto the real root element with zero wrapper. Remaining `ink-*` element-selector hosts render with `host: { style: 'display: contents' }` so they lay out transparently. The other six targets are unaffected.

### Code IR

`emit` does not write strings directly. Instead, each target builds a `Code` tree ([`codegen/code-ir/nodes.ts`](../core/compiler/src/codegen/code-ir/nodes.ts)) that models the target's syntax flavor:

- JSX-emitting targets (React, Solid, Qwik) build `CJsxElement` / `CJsxAttr` nodes.
- Template-emitting targets (Vue, Svelte) build `CTmplElement` / `CTmplDirective` / `CTmplMustache` nodes.
- String-template targets (Angular, Astro) emit `CRaw` blocks alongside `CScript` for the component class.

The single `print()` function in [`codegen/print/printer.ts`](../core/compiler/src/codegen/print/printer.ts) walks any `Code` tree and produces formatted source text with optional V3 source maps. Source-location data threads through every IR and Code node via `loc: SourceLocation` so mappings survive the pipeline.

### Where `<Slot>` and `<Transition>` live

Both are authoring-time JSX components from `@inkline/core` that the compiler lowers to dedicated IR shapes during P3:

- `<Slot>` → `IRSlotPlaceholder`. Combined with `defineSlot` bindings to support scoped slots. Per-target emission: `props.children` / named render props (React, Solid), `<slot>` (Vue, Svelte), `<ng-content select="…">` (Angular).
- `<Transition>` → `IRTransition`. Wraps a single conditional element. Per-target emission: native `<Transition>` (Vue), `transition:` directive (Svelte), `<__InkTransition>` runtime wrapper (React, Solid, Qwik), unwrapped child + CSS classes (Angular, Astro).

Cross-framework parity is asserted by fixture scenarios — see "Testing" below.

## Plugin system

Plugins implement the `Plugin` interface from [`plugin/types.ts`](../core/compiler/src/plugin/types.ts) and register two optional hooks:

- `ir:post` — fires after P4. Read-only inspection of `AnalyzedModule`. Plugins push diagnostics via `ctx.pushDiagnostic`.
- `code:post` — fires after P7 per target. Plugins receive the emitted files and may return replacements.

Plugin exceptions are caught and surfaced as `INK0090` diagnostics; subsequent plugins continue running. The full diagnostic table lives in [`core/diagnostics/codes.ts`](../core/compiler/src/core/diagnostics/codes.ts) (the canonical source — duplicates in docs are eventually-consistent).

## Build output

[`@inkline/compiler`](../core/compiler/) ships a single ESM bundle (`dist/index.mjs`) plus type definitions (`dist/index.d.mts`). It is library code: per-target output is produced at compile time via `compile()` calls, not bundled in.

The build is driven by Vite+ (see the per-package `vite.config.ts`). Type definitions are produced with `tsgo`.

## Dependency layering

```
       ┌────────────────────────────────────────────────┐
       │ inkline (barrel: subpath re-exports)           │
       └────────────────────────────────────────────────┘
                              ▲
       ┌────────────────────────────────────────────────┐
       │ @inkline/{react,vue,svelte,solid,angular,      │
       │ qwik,astro}  ◀── auto-generated from compiler  │
       └────────────────────────────────────────────────┘
                              ▲
       ┌────────────────────────────────────────────────┐
       │ @inkline/components (single-source .ink.tsx)   │
       └────────────────────────────────────────────────┘
                              ▲
       ┌────────────────────────────────────────────────┐
       │ @inkline/{cli,plugin,test-utils}               │
       │ @inkline/storybook                             │
       └────────────────────────────────────────────────┘
                              ▲
       ┌────────────────────────────────────────────────┐
       │ @inkline/compiler                              │
       └────────────────────────────────────────────────┘
                              ▲
       ┌────────────────────────────────────────────────┐
       │ @inkline/core (authoring primitives)           │
       │ @inkline/config-loader (c12)                   │
       └────────────────────────────────────────────────┘
```

The framework output packages (`@inkline/react` etc.) hold **generated code** in `ui/<framework>/.inkline/`. Source-of-truth changes happen in `ui/components/` and propagate to all targets on rebuild.

## Testing

The compiler is tested at three levels, all using Vitest with co-located `*.test.ts` files.

- **Unit** — per-pass tests next to the pass source (e.g. [`pipeline/passes/03-lower/control-flow.test.ts`](../core/compiler/src/pipeline/passes/03-lower/)).
- **Codegen** — per-target snapshot and conformance tests under [`codegen/targets/`](../core/compiler/src/codegen/targets/).
- **Scenarios** — fixture-driven cross-target equivalence. Fixtures live in [`core/compiler/src/__fixtures__/`](../core/compiler/src/__fixtures__/); scenarios assert DOM equivalence across all 7 targets after compile + mount.

Above the compiler sits a fourth level: **visual parity (e2e)** — [`testing/e2e`](../testing/e2e/) is a Playwright suite that boots the composition Storybook and pixel-diffs every story across all 7 frameworks against the React baseline (`pnpm run test:e2e`; a non-blocking, sharded CI job). See [`testing/e2e/AGENTS.md`](../testing/e2e/AGENTS.md).

The reusable harnesses (`compileFixture`, `mountForTarget`, `runScenarioAcrossTargets`, `typecheckEmittedForTarget`, `lintEmittedForTarget`, …) are exposed from [`@inkline/compiler/testing`](../core/compiler/src/testing/index.ts) and from [`@inkline/test-utils`](../tooling/test-utils/) for use in other packages.

## See also

- [`core/compiler/README.md`](../core/compiler/README.md) — product/usage documentation; primary user-facing entry point.
- [authoring-components.md](./authoring-components.md) — contributor guide for adding components.
- [conventions.md](./conventions.md) — repo-wide conventions.
