# @inkline/test-utils

Cross-target testing harnesses: compile a `.ink.tsx` source, mount it under each framework's runtime, assert HTML equivalence, run conformance checks. Used by [`@inkline/compiler`](../../core/compiler/) internal tests and by [`ui/components/`](../../ui/components/).

## Public API

All exports from [`src/index.ts`](./src/index.ts):

| Group       | Exports                                                                                                                                                                                                            | Purpose                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Compile     | `compileComponent`, `compileSource`, `ComponentTestResult`, `CompileComponentOptions` ([`compile.ts`](./src/compile.ts))                                                                                           | Resolve and compile a `.ink.tsx` file or string for one or more targets.                                                                             |
| Assertions  | `expectCompilationSuccess`, `expectDiagnostics`, `expectNoDiagnostics`, `expectCorrectFileExtensions`, `expectOutputContains`, `expectOutputNotContains`, `expectImports` ([`assertions.ts`](./src/assertions.ts)) | Vitest-friendly assertions over compiler output and diagnostics.                                                                                     |
| Conformance | `assertConformance` ([`conformance.ts`](./src/conformance.ts))                                                                                                                                                     | Run the per-target conformance specs (typecheck + lint the emitted code) declared in [`@inkline/compiler`](../../core/compiler/) targets.            |
| Snapshot    | `snapshotOutput` ([`snapshot.ts`](./src/snapshot.ts))                                                                                                                                                              | Vitest snapshot wrapper that normalizes generated output (line endings, trailing whitespace).                                                        |
| Equivalence | `assertHtmlEquivalence`, `mountComponent`, `EquivalenceOptions`, `EquivalenceResult` ([`equivalence.ts`](./src/equivalence.ts))                                                                                    | Mount the compiled component across multiple targets and assert that the rendered HTML matches.                                                      |
| Mount       | `isMountable`, `mountForTarget`, `MountResult` ([`mount.ts`](./src/mount.ts))                                                                                                                                      | Per-target SSR/CSR mount entry.                                                                                                                      |
| Coverage    | `coverInkViaReact`, `CoverResult` ([`coverage.ts`](./src/coverage.ts))                                                                                                                                             | Drive a component through the React target so V8 coverage remaps execution back onto the authored `.ink.tsx`. No-op unless a coverage run is active. |
| Normalize   | `normalizeHtml` ([`normalize.ts`](./src/normalize.ts))                                                                                                                                                             | Whitespace-and-attribute-order-insensitive HTML comparison.                                                                                          |
| Resolve     | `resolveComponent` ([`resolve.ts`](./src/resolve.ts))                                                                                                                                                              | Locate a compiled component on disk by name.                                                                                                         |
| Re-exports  | `TargetName`, `GeneratedFile`, `Diagnostic`                                                                                                                                                                        | Re-exported from `@inkline/compiler` so consumers can stay on a single import.                                                                       |

When changing the API surface, update [conventions.md](../../docs/conventions.md) "Test layout" only if the change affects _how_ tests are organized; per-function changes go in changesets.

## Peer-dependency story

All framework runtimes (`react`, `react-dom`, `vue`, `@vue/server-renderer`, `solid-js`, `svelte`, and the four `@angular/*` packages — `compiler`, `core`, `platform-browser`, `platform-server`) are **optional** peer deps ([`package.json`](./package.json) `peerDependenciesMeta`). Tests that exercise a specific framework will fail to mount if its runtime isn't installed — that's intentional. Consumers install only the framework they test.

`vitest` is a non-optional peer dep — `assertHtmlEquivalence` and friends are written against Vitest matchers.

## Build

`vp pack`. Single entry (`dist/index.mjs` + types). The package re-exports a flat surface — there are no subpath entries today.

## Tests

This package's own coverage:

- [`compile.test.ts`](./src/compile.test.ts)
- [`assertions.test.ts`](./src/assertions.test.ts)
- [`conformance.test.ts`](./src/conformance.test.ts)
- [`snapshot.test.ts`](./src/snapshot.test.ts)
- [`coverage.test.ts`](./src/coverage.test.ts)
- [`angular-mount.test.ts`](./src/angular-mount.test.ts) — real-DOM Angular SSR verification of the mount path

Together they protect the harnesses from drift. Equivalence paths and the non-Angular mounts are exercised indirectly via consumers (compiler scenario suite, component tests in `ui/components/`).

## Real `.ink.tsx` coverage

`coverInkViaReact` ([`coverage.ts`](./src/coverage.ts)) is how the authored `.ink.tsx` sources get genuine V8 line/branch coverage even though they are never imported as modules. It compiles the component to React, transpiles that to ESM, **composes the compiler's `react.tsx → .ink.tsx` map with the transpile's `js → react.tsx` map** into one inlined `js → .ink.tsx` map, then renders the module in-worker so Vitest's V8 provider remaps the execution onto the source. Consumers wire it behind their behavioral mount — e.g. `ui/components` calls it inside `mountStyledOnAngular`, so every Angular SSR test contributes React coverage with no per-test setup. It can never fail a behavioral test (render errors surface as `warnings`) and is a no-op unless a coverage run is active.

## Relation to `@inkline/compiler/testing`

Both this package and the [`testing` subpath of `@inkline/compiler`](../../core/compiler/src/testing/) expose test helpers. The compiler's own version stays close to the IR (it imports internal compiler modules); this package is the **consumer-facing** version (depends only on the compiler's public API) and is what shipped tests in `ui/components/` and external consumers should use. When adding a new helper, prefer this package unless it requires compiler internals.

## See also

- [`core/compiler/AGENTS.md`](../../core/compiler/AGENTS.md) → "Tests" — how the compiler itself uses its testing module.
- [docs/authoring-components.md](../../docs/authoring-components.md) → "Testing" — recipes for writing component tests.
- [docs/conventions.md](../../docs/conventions.md) → "Test layout".
