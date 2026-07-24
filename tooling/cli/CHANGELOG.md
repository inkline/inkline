# @inkline/cli

## 0.1.0

### Minor Changes

- b495727: Extract compiler and storybook CLIs into a unified `@inkline/cli` package using citty. Create `@inkline/config-loader` package backed by c12 v4 for loading `inkline.config.ts` files. Add `@inkline/storybook/generator` export path.
- af4684d: feat(cli,compiler): configurable per-category barrels

  `inkline.config.ts` gains an optional `barrels` field — a list of `BarrelGroup`
  (`{ file, match, mode? }`) describing which generated re-export barrel each compiled file
  belongs to. Files are routed to a barrel by matching a directory segment of their source path
  (`components/<name>/<match>/…`), so a single source tree can be split into multiple per-category
  entry points instead of one flat `index.ts`.
  - `mode: "named"` (default) emits target-aware per-component exports, sourced from compiled components.
  - `mode: "namespace"` emits `export * as <Name>Stories from …`, sourced from the generated
    `*.stories.ts` modules (whose named exports otherwise collide across components).

  When `barrels` is omitted the CLI keeps its previous behaviour: a single `index.ts` re-exporting
  every non-story component. `BarrelGroup` is exported from `@inkline/compiler`; the compiler pipeline
  ignores the field (it is consumed by the CLI only).

### Patch Changes

- a86ba6d: feat(compiler): resolve ambient module types via a `tsconfig` config option

  Add a generic `tsconfig` option to the Inkline config. When set, the compiler loads
  that tsconfig's ambient type-declaration files (`*.d.ts` from its `include`/`files`)
  into the per-file TypeScript program, so `import type` from virtual modules (e.g.
  `virtual:styleframe`) resolves during prop analysis — letting recipe styling props be
  enumerated as real component props. Inkline's own compiler options (jsx,
  jsxImportSource, …) are always forced on top; the per-file program model (and Vite
  plugin compatibility) is preserved. The CLI forwards the option from `inkline.config.ts`.

- af4684d: fix(cli): exclude story files from the generated barrel

  `inkline compile` re-exported every compiled non-CSS file from each target's
  `.inkline/index.ts`, including story render variants under `components/<name>/stories/`
  (e.g. `colors`, `sizes`). Multiple components share those generic variant names, so the
  barrel emitted duplicate exports and the build failed with `Duplicated export`.

  Story variants are now skipped when collecting barrel entries (via a new `isStoryRelDir`
  guard) in both the one-shot and watch compile paths. They are still compiled and written to
  `.inkline/` — the generated Storybook `.stories.ts` import them by relative path — they are
  just no longer re-exported from the package barrel.

- c12188d: Reclassify the Astro two-way-binding notice (INK0045) from `warning` to `info`, and add a diagnostics reporting level (`meetsLevel`). The CLI dev/watch loop (`inkline compile --watch`) now reports `warning` and above, so INK0045 stays quiet during development while genuine warnings still surface; it still prints on a one-shot `inkline compile` and on `inkline check`.
- Updated dependencies [78ea062]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [cb27b40]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [407c744]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [287b326]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [b495727]
- Updated dependencies [a86ba6d]
- Updated dependencies [c12188d]
- Updated dependencies [af4684d]
- Updated dependencies [a86ba6d]
- Updated dependencies [287b326]
- Updated dependencies [c12188d]
- Updated dependencies [01a5207]
- Updated dependencies [a86ba6d]
- Updated dependencies [d0c2ef8]
- Updated dependencies [a86ba6d]
- Updated dependencies [420229e]
- Updated dependencies [a161934]
- Updated dependencies [a86ba6d]
- Updated dependencies [1b07d5f]
- Updated dependencies [a86ba6d]
- Updated dependencies [49c624f]
- Updated dependencies [a86ba6d]
- Updated dependencies [c12188d]
- Updated dependencies [fcc2bf4]
- Updated dependencies [a86ba6d]
- Updated dependencies [af4684d]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [3a61a4b]
- Updated dependencies [78ea062]
- Updated dependencies [c12188d]
- Updated dependencies [c12188d]
- Updated dependencies [a86ba6d]
- Updated dependencies [c12188d]
- Updated dependencies [0688298]
- Updated dependencies [a86ba6d]
  - @inkline/compiler@0.1.0
  - @inkline/config-loader@0.1.0
  - @inkline/storybook@0.0.1
