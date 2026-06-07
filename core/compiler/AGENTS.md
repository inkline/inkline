# @inkline/compiler

The TSX → multi-framework compiler. Takes `.ink.tsx` source and emits idiomatic React, Vue, Svelte, Solid, Angular, Qwik, and Astro components via a typed IR.

**This file is for contributors editing the compiler.** For external usage (CLI, API, configuration), see [`README.md`](./README.md) — that's the canonical user-facing doc, kept up to date alongside this one.

For the cross-cutting architectural picture (pipeline shape, IR design, target strategy), see [docs/architecture.md](../../docs/architecture.md).

## Source map

```
src/
├── index.ts                # Public API barrel — exports everything below
├── pipeline/               # The compilation pipeline
│   ├── compile.ts          # End-to-end driver (compile, compileIncremental)
│   ├── incremental.ts      # Incremental state machine
│   ├── types.ts            # Pass<I, O>, PassContext, pipe()
│   └── passes/
│       ├── 01-program.ts   # TS program + checker + sibling-style resolution
│       ├── 02-parse/       # TS AST → IRModule; primitive binding; JSX parse
│       ├── 03-lower/       # Normalize IRComponent; lower Show/For/Switch/Slot/Transition
│       └── 04-analyze/     # Reactivity graph, cycle detection, validation
├── ir/                     # Intermediate representation
│   ├── render/
│   │   ├── nodes.ts        # IRNode union + IR_VERSION
│   │   ├── builders.ts     # createElement, createIf, createFor, …
│   │   ├── visit.ts        # walkRenderTree, walkNode, IRVisitor
│   │   └── transform.ts    # transform, transformComponent, SKIP sentinel
│   ├── reactivity.ts       # SymbolTable, IRReactiveSymbol, IRDependency
│   ├── serialize.ts        # IR ↔ JSON for caching
│   └── migration.ts        # IRMigration framework (when IR_VERSION bumps)
├── codegen/                # Per-target emission
│   ├── context.ts          # Target, RewriteRules, CodegenContext
│   ├── registry.ts         # builtinRegistry, createRegistry, defineTarget
│   ├── targets/
│   │   ├── {react,solid,qwik}/      # JSX emitters
│   │   ├── {vue,svelte}/            # Template emitters
│   │   ├── {angular,astro}/         # String-template emitters
│   │   └── <name>/{index.test.ts, __tests__/}  # per-target unit-emit + fixture-integration tests
│   ├── code-ir/            # Syntax-agnostic Code IR (CFile, CJsxElement, CTmplElement, …)
│   ├── shared/             # Expression rewriting, component imports
│   └── print/printer.ts    # Code IR → source text + V3 source maps
├── core/
│   ├── options.ts          # InklineConfig, ResolvedCompilerOptions
│   ├── config.ts           # defineConfig
│   └── diagnostics/codes.ts  # Canonical diagnostic registry (INK0001–INK0100)
├── plugin/types.ts         # Plugin, PluginHooks, definePlugin
├── testing/index.ts        # Reusable test harnesses (compileFixture, mountForTarget, …)
└── __fixtures__/           # .ink.tsx fixtures + scenarios.ts (DOM assertions)
```

## Key invariants

- **`IR_VERSION`** ([`ir/render/nodes.ts`](./src/ir/render/nodes.ts)) is the schema version for serialized IR. Bump it whenever you make a breaking change to any IR node shape; add a migration in [`ir/migration.ts`](./src/ir/migration.ts).
- **`SymbolTable` is frozen after P4.** No new symbols can be minted after analysis completes ([`ir/reactivity.ts`](./src/ir/reactivity.ts)). Diagnostics and codegen rely on this — do not mint inside emit functions.
- **Per-pass purity.** Passes are pure on their inputs; mutable state lives only on the `PassContext`. Do not stash data on IR nodes between passes.
- **Diagnostics never throw.** Errors surface as `Diagnostic` records via `ctx.pushDiagnostic`. The only allowed throw is `assert`-style invariant violations (which indicate compiler bugs, not user errors).

## Diagnostics

The canonical registry is in [`src/core/diagnostics/codes.ts`](./src/core/diagnostics/codes.ts). The current range is INK0001–INK0100 grouped by category (imports, reactivity, control flow, refs, plugins, emit). When adding a new diagnostic:

1. Pick the next code in the correct category band.
2. Add an entry to `DIAGNOSTICS` with title, severity, and a documentation URL placeholder.
3. Push it via `ctx.pushDiagnostic({ code, severity, …, loc })` from the relevant pass.
4. Update the table in [`README.md`](./README.md) "Diagnostics" until the auto-generator is wired into the build (see [`scripts/gen-diagnostics.ts`](./scripts/gen-diagnostics.ts) — runnable via `pnpm docs:diagnostics`).

## How to…

### Add a new pass

Create the pass in [`src/pipeline/passes/`](./src/pipeline/passes/). It must implement `Pass<I, O>` from [`pipeline/types.ts`](./src/pipeline/types.ts). Insert it into the pipe chain in [`pipeline/compile.ts`](./src/pipeline/compile.ts) at the right slot — most new passes belong between P3 (lower) and P4 (analyze).

### Add a new diagnostic

See "Diagnostics" above.

### Add a new target

Read [`codegen/targets/react/index.ts`](./src/codegen/targets/react/index.ts) as the template. Build a `Target` with `RewriteRules` + `emit(component, ctx)`. Register it in [`codegen/registry.ts`](./src/codegen/registry.ts) `builtinRegistry`. Add `__fixtures__`-driven scenario coverage. (A dedicated `docs/adding-a-target.md` walkthrough is referenced from [README.md](./README.md) "Custom Targets" but not yet written.)

### Add a new IR node

Add the discriminated case to `IRNode` in [`ir/render/nodes.ts`](./src/ir/render/nodes.ts). Add a builder in [`ir/render/builders.ts`](./src/ir/render/builders.ts) and visitor handling in [`ir/render/visit.ts`](./src/ir/render/visit.ts). Update every target's `emit` to handle the new node — silent omissions will show up as missing output. Bump `IR_VERSION` and add a migration if the change is not backwards-compatible.

### Add a plugin hook

Hooks are listed in [`plugin/types.ts`](./src/plugin/types.ts) `PluginHooks`. Currently `ir:post` and `code:post`. Adding a new hook requires:

1. Add the hook signature to `PluginHooks`.
2. Invoke it at the right pipeline stage in [`pipeline/compile.ts`](./src/pipeline/compile.ts).
3. Wrap the call so plugin exceptions become `INK0090` diagnostics rather than throws.

## Tests

Co-located `*.test.ts` per [conventions](../../docs/conventions.md). Three layers:

| Layer                   | Where                                                        | What it asserts                                                                                                                                                                                                                                                        |
| ----------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit                    | next to the file under test                                  | Single-function behavior.                                                                                                                                                                                                                                              |
| Codegen (per target)    | `codegen/targets/<name>/index.test.ts` + `<name>/__tests__/` | Per-target output: hand-built-IR snapshots (`index.test.ts`) + real-fixture integration (`__tests__/`). Shared helpers in [`testing/codegen.ts`](./src/testing/codegen.ts) keep IR identical across targets so snapshots stay stable. No iteration over a target list. |
| Scenario (cross-target) | [`__fixtures__/scenarios.ts`](./src/__fixtures__/)           | Compile a fixture across all 7 targets, mount each, assert equivalent DOM behavior.                                                                                                                                                                                    |

Run from this package: `vp test`. Run the full repo: `vp run -r test`. The bench script ([`scripts/bench.ts`](./scripts/bench.ts)) drives `tinybench` and is invoked via `pnpm bench`.

## Build

`vp pack` produces a single ESM bundle (`dist/index.mjs`) + types (`dist/index.d.mts`). `vp pack --watch` for incremental rebuild during development.

The compiler ships **no runtime code** for components — it is library code consumed by the CLI ([`@inkline/cli`](../../tooling/cli/)), the build plugin ([`@inkline/plugin`](../plugin/)), and end users calling `compile()` programmatically.

## See also

- [`README.md`](./README.md) — product/usage documentation. Update alongside any change to the public API listed in [`src/index.ts`](./src/index.ts).
- [docs/architecture.md](../../docs/architecture.md) — the pipeline + IR + targets at a higher altitude.
- [docs/maintenance.md](../../docs/maintenance.md) → "Cross-references" — which docs to update when changing things here.
