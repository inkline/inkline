---
name: compiler-pipeline-internals
description: The Inkline compiler's end-to-end pipeline — parse → IR → analyze → per-target codegen → print — including the IR contracts, reactivity tracking, target rewrite rules, plugin hooks, the two compile paths, and known sharp edges. Use for any core/* work, or when reviewing it.
---

# Compiler pipeline internals

## The spine (one screen)

```
Counter.ink.tsx
   ▼ P1 program    TS program + checker; resolve sibling .ink.css/.ink.scss
   ▼ P2 parse      TS AST → IRModule; bind primitives (createSignal/Memo/Effect/Ref,
                   defineComponent/Model/Emits/Slot); parse JSX; scope analysis
   ▼ P3 lower      normalize IRComponent; <Show>→IRIf, <For>, <Switch>, <Slot>→
                   IRSlotPlaceholder, <Transition>→IRTransition; events, refs, $bind
   ▼ P4 analyze    reactivity graph, cycle detection, validation → AnalyzedModule
   ▼ P5 plugin ir:post     read-only inspection; plugins push diagnostics
   ▼ P6 emit       per target: IR → Code IR (7 emitters in codegen/targets/<name>/)
   ▼ P7 print      one printer serializes any Code tree → source text + V3 source maps
   ▼ P8 plugin code:post   per-target file transformation (return replacements)
```

Passes are `Pass<I, O>` units (`pipeline/types.ts`), driven by `pipeline/compile.ts` (`compile`, `compileIncremental`). Passes are pure on their inputs; mutable state lives only on `PassContext`.

## The IR (the architectural pivot)

- `IRModule { components, contexts, imports, sourceFile }` → `IRComponent` (props, slots, events, state, render tree, styles, runtime mode, target overrides).
- `IRNode` union: `IRElement | IRComponentInstance | IRText | IRExprNode | IRIf | IRFor | IRSwitch | IRSlotPlaceholder | IRFragment | IRTransition` (`ir/render/nodes.ts`; builders/visit/transform alongside).
- `IRExprNode` preserves the TS expression **verbatim** plus its `IRDependencySet`; codegen rewrites it per target.
- Reactivity: `SymbolTable` (`ir/reactivity.ts`); `SymbolId` = `componentId::kind::name@offset`; kinds `signal | memo | effect | prop | context | ref | slot`. Dependency sets record read symbols, member paths, and conditionality — this drives fine-grained per-target reactivity.
- IR is serializable (`ir/serialize.ts`) for on-disk caching by incremental builds; `IR_VERSION` is the schema version, backed by `ir/migration.ts`.

## Contracts that hold it together (name these before changing anything)

1. **`IR_VERSION` bumps on any breaking IR-node shape change** + a migration for serialized caches. Skipping the bump silently corrupts incremental builds.
2. **`SymbolTable` is frozen after P4.** No symbol minting inside emit functions — diagnostics and codegen rely on it.
3. **Per-pass purity** — never stash data on IR nodes between passes; use `PassContext`.
4. **Diagnostics never throw.** User errors surface as `Diagnostic` via `ctx.pushDiagnostic` (registry: `core/diagnostics/codes.ts`, INK0001–INK0120). The only throws are assert-style invariant violations = compiler bugs. Plugin exceptions become INK0090; a failed component's emit becomes INK0100 and others continue.
5. **A new IR node touches every target's emit** — silent omissions surface as missing output. New authoring primitives need P2 binding + P3 lowering or they pass through verbatim and break consumers.
6. **Emitted output has zero `@inkline/core` imports.** The runtime-free promise is the product.

## Targets and Code IR

A `Target` = `{ name, rewrites: RewriteRules, conformance?, emit(component, ctx) }`, registered in `codegen/registry.ts` `builtinRegistry`. Rewrite tables describe reactive-read style (React `strip-call`, Vue `field-access` → `.value`, Svelte direct), setter style, ref access, attr/event casing. Emit builds a **Code IR** tree, not strings: JSX flavor (React/Solid/Qwik: `CJsxElement`), template flavor (Vue/Svelte: `CTmplElement`/directives/mustache), string-template flavor (Angular/Astro: `CRaw` + `CScript`). One `print()` serializes everything; `loc: SourceLocation` threads through every node so source maps survive.

Per-target slot/transition emission: `<Slot>` → `props.children`/render props (React/Solid), `<slot>` (Vue/Svelte), `<ng-content select>` (Angular). `<Transition>` → native (Vue), directive (Svelte), `__InkTransition` wrapper (React/Solid/Qwik), CSS classes (Angular/Astro). `hasSlot` is a real check except Qwik/Angular (always `true`, INK0068 — hence the `:empty` CSS convention). Angular target specifics: kebab-case `ink-*` attribute selectors, a `klass` input merging forwarded classes onto the root, full `imports` declarations, host-collapse variants — native attrs must be declared as explicit base props (fallthrough breaks on wrapper/host-collapse variants).

## Testing (three layers + one hard rule)

Unit (next to source) · Codegen per target (`codegen/targets/<name>/index.test.ts` + `__tests__/`, hand-built-IR snapshots + fixture integration) · Scenario (`__fixtures__/scenarios.ts` — compile a fixture across **all 7**, mount each, assert equivalent DOM). **One test file per target, never a shared multi-target test** — no `ALL_TARGETS` loops, no importing another target's index; enforced by `testing/per-target-tests.test.ts`. Harnesses: `@inkline/compiler/testing` (IR-close) vs `@inkline/test-utils` (consumer-facing — prefer it outside the compiler). Bench: `pnpm bench` (tinybench, `scripts/bench.ts`, baseline comparison via `runBenchSuite`).

## The two compile paths (divergence is by design)

- **CLI path** (`inkline compile`, used by `ui/components`): globs `.ink.tsx`, writes per-target files into `targetOutDir` (`ui/<framework>/.inkline/`), generates configured barrels (`index.ts`=styled, `headless.ts`, `stories.ts` namespace) and per-framework story CSF via `@inkline/storybook/generator`. `--watch` recompiles on change.
- **Plugin path** (`@inkline/plugin`, unplugin factory): matches `*.ink.tsx` in the bundler's transform hook, runs `compileIncremental` for **one required `target`**, in-memory — no barrels, no stories, no config-file loading (pair with `@inkline/config-loader`).

Bugs that appear on one path only are expected — test the right path, and say which paths a change affects.

## Sharp edges & current gaps

- **`@inkline/plugin` has ZERO direct tests** — its coverage rides compiler fixtures and repo consumers. Highest-risk untested surface; leave coverage behind when touching it.
- **Stale dist**: consumers (CLI, Storybook, ui/components) use the compiler's `dist/` — `vp pack` in `core/compiler` after source edits, or you're testing yesterday's compiler.
- `core/core` has no tests by design (inert stubs); behavior is proven in compiler scenario tests.
- Coverage on `.ink.tsx` is remapped via `coverInkViaReact` (React-target execution + composed source maps); spans are coarse — a fully-exercised component can read below 100%. Never add `.ink.tsx` to `coverage.include` (v8's uncovered-files pass would `PARSE_ERROR`).
- `__fixtures__` are lint-exempt for `vp lint` but must compile lint-clean across targets in `lint.test.ts`; the Astro side has a known pre-existing parse-failure baseline (~74) — not regressions.
- v1 frontier (per README "v0 limitations", partially stale — trust `codegen/registry.ts`): component-ref forwarding (INK0070), scoped CSS/`<style>` blocks, async/Suspense/`createResource` runtime, plugin HMR, sub-expression source-map granularity. Angular/Qwik/Astro are **shipped**, whatever the README says.
