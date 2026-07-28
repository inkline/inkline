---
"@inkline/compiler": minor
---

feat(compiler): ship the documented `@inkline/compiler/testing` subpath

The README, `docs/testing.md`, `docs/architecture.md` and `docs/scope.md` all pointed at
`@inkline/compiler/testing`, but `package.json` only exported `.` and `./package.json`, so the
import failed with `ERR_PACKAGE_PATH_NOT_EXPORTED` for every consumer of the published package.
`src/testing/index.ts` is now a second build entry with a matching `./testing` export condition,
and the fixtures it reads at runtime (`src/__fixtures__/`) ship with the package so
`compileFixture` and `scenarios` work outside the repo.

The framework runtimes and lint tools the harnesses use (`react`, `react-dom`, `vue`,
`@vue/server-renderer`, `solid-js`, `svelte`, `eslint`, `oxlint`, `tinybench`) are declared as
**optional peer dependencies** rather than bundled — without that the published tarball grew from
328 kB to 7.3 MB. `runBenchSuite` now loads `tinybench` lazily so the subpath still imports when
it is not installed. Install only the peers for the harnesses you actually call.

No source file imported the subpath, so the gap was invisible in CI. A packaging test now packs a
tarball, resolves `@inkline/compiler/testing` through Node's exports algorithm and compiles a
fixture through it, failing if the build entry or the export condition goes missing.
