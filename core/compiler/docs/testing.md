# Testing Guide

## Overview

The compiler test suite spans the `__fixtures__` components and all 7 targets, using snapshot-based output validation to ensure correctness of emitted code for every target framework.

Coverage is not uniform across checks. Snapshot validation reaches all 7 targets; the emitted-output typecheck gate reaches react and solid only, and skips a quarantine list of known-failing fixtures within those two. See [Emitted-output typecheck coverage](#emitted-output-typecheck-coverage).

## Running tests

```bash
# Run all tests
vp test

# Run with coverage report
vp test --coverage

# Update snapshots after intentional output changes
vp test --update
```

## Test organization

### Unit tests

Co-located alongside source files as `<file>.test.ts`. Each module's tests live next to the implementation they cover.

### Per-target codegen tests

Each target owns its tests under `src/codegen/targets/<name>/` — there is no iteration over a target list:

- `<name>/index.test.ts` — **unit-emit tests**: construct synthetic IR nodes directly and snapshot the emitted output, for testing specific code-generation patterns in isolation without running the full pipeline. Shared helpers and canonical IR fixtures live in [`src/testing/codegen.ts`](../src/testing/codegen.ts) so every target emits identical IR and snapshots stay stable.
- `<name>/__tests__/*.test.ts` — **fixture-integration tests**: compile real `.ink.tsx` fixtures through the full pipeline (`compileTo` from the shared harness) and assert the generated code. `output-snapshots.test.ts` snapshots the complete output of every fixture for that target; the remaining feature files (`control-flow`, `events`, `slots`, …) pin specific real-world patterns.

### Conformance tests

Located at `src/testing/conformance.test.ts`. These tests verify that emitted code satisfies structural invariants (correct file extensions, required imports, framework-specific patterns).

## Fixtures

### Location

All fixture components live at `src/__fixtures__/*.ink.tsx`.

### Scenarios

Test scenarios are defined in `src/__fixtures__/scenarios.ts` with three assertion types:

- `textOf(selector)` -- assert the text content of a rendered element
- `htmlEquals(expected)` -- assert the full rendered HTML output
- `expectedDiagnostics` -- assert that specific diagnostics are emitted during compilation

### Categories

Fixtures are organized by feature area:

- **Original** -- Counter, Button, TodoList, and other foundational components
- **Reactivity** -- signals, memos, effects, computed values
- **Render tree** -- conditional rendering, lists, fragments, slots
- **Events/binding** -- event handlers, two-way binding, input elements
- **Components** -- component composition, children, props passing
- **Refs** -- element refs, component refs, forwarded refs
- **Diagnostics** -- components that intentionally trigger specific INK diagnostics
- **Common UI patterns** -- tabs, modals, forms, and real-world component patterns
- **v1 features** -- scoped CSS, server/client boundaries, resources, multi-file components

## Testing harnesses

The `@inkline/compiler/testing` module exports reusable harness functions:

### `compileFixture(name, targets)`

Compile a named fixture through the full pipeline for one or more targets. Returns the compiled output files and any diagnostics.

### `typecheckEmittedForTarget(conformance, files)`

Run a subprocess `tsc` against the emitted files using the target-specific tsconfig, and report the resulting diagnostics. A toolchain that cannot start — an empty, relative or missing `tsconfig` path, or a file set plain `tsc` cannot read — is reported as a failure, never as a pass.

This is the harness, not the gate. What the gate actually covers is in [Emitted-output typecheck coverage](#emitted-output-typecheck-coverage).

### `lintEmittedForTarget(conformance, files)`

Run eslint against the emitted files using the target-specific lint configuration. Verifies that emitted code passes lint rules.

### `mountForTarget(target, file, props?)`

SSR-render the emitted component using the framework's runtime (ReactDOMServer, Vue createSSRApp, etc.). Returns the rendered HTML string.

### `runScenarioAcrossTargets(fixture, targets, props?)`

Compile, mount, and compare rendered output across all specified targets. Verifies that the same fixture produces equivalent DOM output regardless of target framework.

### `runBenchSuite()` / `saveBaseline(results)`

Performance benchmarking using tinybench. Measures compilation throughput and saves baseline results for regression detection.

### `expectMappingAt(file, line, col)`

Assert that a source map contains a mapping at the specified original source position.

### `verifyIdentifierMappings(file, identifiers, tolerance?)`

Verify round-trip source-map accuracy for specific identifiers. Maps from original source to generated position and back, checking that the round-trip lands within the specified tolerance.

## Emitted-output typecheck coverage

The fixture sweep in [`src/testing/typecheck.test.ts`](../src/testing/typecheck.test.ts) compiles every `src/__fixtures__/*.ink.tsx` and runs `tsc` over the result — for **react and solid only**. Five of the seven targets have no emitted-output typecheck:

| Target  | Emits     | Swept | Why not                                                            |
| ------- | --------- | ----- | ------------------------------------------------------------------ |
| react   | `.tsx`    | yes   | —                                                                  |
| solid   | `.tsx`    | yes   | —                                                                  |
| vue     | `.vue`    | no    | single-file component; plain `tsc` cannot read it (`vue-tsc`)      |
| svelte  | `.svelte` | no    | single-file component; plain `tsc` cannot read it (`svelte-check`) |
| angular | `.ts`     | no    | declares `typecheck.tsconfig: ""`                                  |
| qwik    | `.tsx`    | no    | declares `typecheck.tsconfig: ""`                                  |
| astro   | `.astro`  | no    | declares `typecheck.tsconfig: ""`                                  |

Angular and qwik emit files `tsc` could read; they are outside the gate because their conformance spec declares no tsconfig, and a harness with no tsconfig fails rather than passes.

The vue and svelte gap is pinned by a test — `<target> emits only files plain tsc cannot read` — so it cannot widen silently into a target that quietly stops being checked.

### Quarantine

Within react and solid the sweep skips a list of known-failing `(fixture, target)` pairs, held in [`src/testing/typecheck-fixtures.ts`](../src/testing/typecheck-fixtures.ts). Entries are quarantine, not permission: each records the TypeScript codes it suppresses, and the suite fails an entry that has started passing, so the list can only shrink. **That file is the only home for the current count** — read it there rather than trusting a number quoted elsewhere. The burn-down is tracked as UXF-211.

### Where the decision lives

The gate's rationale, its receipts, and what was deliberately left open are recorded in [ADR-009](../../../docs/adrs/009-emitted-output-is-typechecked-by-a-subprocess-tsc.md). Two questions are open and undecided there, not here:

- **UXF-214** — whether to take on `vue-tsc` / `svelte-check` as dependencies so vue and svelte can be swept.
- **UXF-215** — whether `@inkline/compiler/testing` is a public surface at all; the target tsconfigs the harness needs are not published.

## Conformance invariants

Conformance specs define structural requirements for emitted code per target:

- `requireFileExtension(ext)` -- emitted file must use the specified extension (e.g., `.tsx`, `.vue`, `.svelte`)
- `requireContains(str)` -- emitted code must contain the specified string
- `requireNotContains(str)` -- emitted code must not contain the specified string
- `requireImports(module, names)` -- emitted code must import the specified names from the specified module
- `requirePropsNotDestructured` -- props object must not be destructured in the emitted code (required for Solid reactivity)
- `requireReactiveReadsPreserveCall` -- reactive signal reads must preserve their call syntax where required by the target

## Snapshot testing

### `<name>/index.test.ts`

Synthetic-IR emit snapshots — each captures the output of a specific code-generation pattern for that target.

### `<name>/__tests__/output-snapshots.test.ts`

Full real-fixture output — each captures the complete emitted file content for a fixture compiled to that target.

### Updating snapshots

When intentional changes to code generation cause snapshot failures:

```bash
# Update snapshots for one target
vp test src/codegen/targets/react --update

# Update every target's snapshots
vp test src/codegen/targets --update
```

## CI scripts

The following task scripts are available for CI and local validation:

```bash
# Type-check all emitted output against target tsconfigs
vp run test:emitted-typecheck

# Lint all emitted output against target eslint configs
vp run test:emitted-lint

# SSR-mount fixtures across targets and compare rendered output
vp run test:runtime

# Run performance benchmarks and compare against baseline
vp run bench
```

## Adding a fixture

1. Create a new `.ink.tsx` file in `src/__fixtures__/` (e.g., `MyComponent.ink.tsx`)
2. Add a scenario entry in `src/__fixtures__/scenarios.ts` with props, assertions, and expected diagnostics
3. Run `vp test --update` to generate initial snapshots for the new fixture
4. Review the generated snapshots to verify correct output for all targets
5. Commit the fixture, scenario, and snapshot files together
