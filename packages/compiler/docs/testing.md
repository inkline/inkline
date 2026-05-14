# Testing Guide

## Overview

The compiler test suite contains 560 tests across 56 fixtures and 7 targets, using snapshot-based output validation to ensure correctness of emitted code for every target framework.

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

### Emit tests

Located at `src/codegen/targets/emit.test.ts`. These tests construct synthetic IR nodes directly and snapshot the emitted output for each target. Useful for testing specific code generation patterns in isolation without running the full pipeline.

### Output validation tests

Located at `src/codegen/targets/output-validation.test.ts`. These tests compile real fixture components through the full 6-pass pipeline and snapshot the complete output for every target. Contains 106 snapshots covering all fixture and target combinations.

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

Run `tsc` against the emitted files using the target-specific tsconfig. Verifies that emitted code is type-safe.

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

## Conformance invariants

Conformance specs define structural requirements for emitted code per target:

- `requireFileExtension(ext)` -- emitted file must use the specified extension (e.g., `.tsx`, `.vue`, `.svelte`)
- `requireContains(str)` -- emitted code must contain the specified string
- `requireNotContains(str)` -- emitted code must not contain the specified string
- `requireImports(module, names)` -- emitted code must import the specified names from the specified module
- `requirePropsNotDestructured` -- props object must not be destructured in the emitted code (required for Solid reactivity)
- `requireReactiveReadsPreserveCall` -- reactive signal reads must preserve their call syntax where required by the target

## Snapshot testing

### emit.test.ts

Contains 18 snapshots for synthetic IR emit tests. Each snapshot captures the output of a specific code generation pattern for a specific target.

### output-validation.test.ts

Contains 88 snapshots for real fixture output. Each snapshot captures the full emitted file content for a fixture compiled to a specific target.

### Updating snapshots

When intentional changes to code generation cause snapshot failures:

```bash
# Update snapshots for a specific test file
vp test src/codegen/targets/emit.test.ts --update

# Update snapshots for output validation
vp test src/codegen/targets/output-validation.test.ts --update
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
