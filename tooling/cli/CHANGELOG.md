# @inkline/cli

## 0.1.0

### Minor Changes

- 5231f00: feat(cli): report `inkline check` diagnostics through the build's reporting path

  `inkline check` documents itself as reporting "exactly the diagnostics the build would report", and
  for two releases it did not. It printed `result.diagnostics` straight to the terminal while
  `inkline compile` moved on without it: deduplication landed on the build path only, and so did
  `--report-level` / `reportLevel`. A project that set `reportLevel: "error"` got a quiet build and an
  unchanged, noisier check, and a finding raised by three targets printed three times in one command
  and once in the other.

  `check` now resolves its level through the same `flag ?? config ?? default` chain, prints through the
  same reporter, and closes with the same summary line. `--report-level` is accepted on `check` as
  well — the summary tells you to re-run with it, so it has to exist there.

  **This changes what `inkline check` prints.** Three differences, all in the direction of the build:
  - `info` notes are withheld by default, as they are on `compile`. `--report-level info` (or
    `reportLevel: "info"`) prints exactly what `check` printed before.
  - A finding raised at one position by several targets, or seen in several files, prints once.
  - A summary line closes the run, naming anything the level withheld:

  ```
  $ inkline check "src/**/*.ink.tsx"
  Checked 67 files in 0.31s — 0 errors, 0 warnings, 0 notes (12 notes withheld at --report-level warning; re-run with --report-level info to list)
  ```

  Exit codes are unchanged, and an error still fails the check whether or not it was printed: the
  status is decided before the level and the dedup apply, so a quieter check never becomes a passing
  one. If you parse `check`'s output, or rely on it listing notices, pass `--report-level info`.

- 993fa28: feat(cli): make the diagnostic report level configurable with `--report-level`

  The reporting floor was a hardcoded constant: `info` on a one-shot `inkline compile` and `warning`
  under `--watch`. A project that wanted a quieter CI build, or a developer who wanted to see the `info`
  notices the watch loop withholds, had no way to say so.

  `--report-level <error|warning|info>` and a `reportLevel` config key now set it, resolving
  `flag ?? config ?? default` exactly as `--target`, `--src-dir` and `--out-dir` do. A level reports
  itself and everything above it, so `warning` withholds notes. Both defaults are unchanged — `info`
  one-shot, `warning` under `--watch` — and the flag governs the watch loop too, which previously read
  the constant directly and so ignored it. An unusable value is reported as `INK0087`, a formatted
  diagnostic with help and a docs URL on the same path as a misspelled `--target`, and it is refused
  rather than coerced to the default; it is refused before `--clean` deletes anything.

  The summary line no longer under-reports what the level hid. `0 notes` cannot be told apart from
  "there were none", so withheld findings are named along with the level that hid them and the flag that
  reveals them:

  ```
  $ inkline compile "src/**/*.ink.tsx" --report-level warning
  Compiled 67 files in 0.45s — 0 errors, 0 warnings, 0 notes (12 notes withheld at --report-level warning; re-run with --report-level info to list)
  ```

  `Compiled N files` also now counts files that compiled without an error rather than files the glob
  matched, so a build with one failing file out of five no longer claims to have compiled all five
  directly below the error it printed. A clean build's output is byte-identical to before.

- 993fa28: feat(cli): default the report level to `warning` in one-shot builds

  `inkline compile` reported from `info` unless `--watch` was passed, so every build printed every
  `info` notice. On this repo's own `ui/components` that is 12 notes on a build with 0 errors and 0
  warnings. Notes of that kind are target-invariant advisories — `INK0045` tells you a fact about the
  Astro target, not about the edit you just made — so a CI log filled with them trains people to skip
  the compiler's output, which is where errors and warnings also live.

  Both modes now default to `warning`. `--report-level info` (or `reportLevel: "info"` in
  `inkline.config.ts`) reports exactly what a one-shot build printed before, byte for byte.

  Nothing else changes. Errors and warnings print as they always did, and the exit code is decided
  before the level applies, so a quieter build never becomes a passing one:

  ```
  $ inkline compile "src/**/*.ink.tsx"
  Compiled 67 files in 0.28s — 0 errors, 0 warnings, 0 notes (12 notes withheld at --report-level warning; re-run with --report-level info to list)
  ```

  If you verify a build by reading its notices — checking for the expected `INK0045`/`INK0068` on a new
  component, for instance — add `--report-level info`. Without it a quiet build no longer proves the
  notices you got are the ones you expected.

- ed4a4f0: feat(cli): print each advisory once per source location and close the build with a summary

  Build-invariant advisories are pushed once per codegen target with the component's own location, so
  compiling for both Angular and Qwik printed the byte-identical `INK0068` line twice for a single
  `hasSlot()` call site. `inkline compile` now reports a finding once per
  `(code, file, line, column, title)`: one thing to fix, one line of output. The same code at a
  different position — or saying something different at the same position, as `INK0090` and `INK0100`
  do — is a different finding and still prints. Deduplication spans the whole build rather than a
  single file.

  Every one-shot compile now ends with a summary of what it did:

  ```
  $ inkline compile "src/**/*.ink.tsx" --config inkline.config.ts
  …
  Compiled 67 files in 0.32s — 0 errors, 0 warnings, 12 notes
  ```

  Exit codes are unchanged: `0` clean, `1` when the compile reported errors, `2` for unusable input
  (which produces no summary, because no build ran). The exit status is computed before filtering and
  deduplication, so neither can hide a failure. `--watch` keeps its per-rebuild reporting and its
  `warning` floor.

- b495727: Extract compiler and storybook CLIs into a unified `@inkline/cli` package using citty. Create `@inkline/config-loader` package backed by c12 v4 for loading `inkline.config.ts` files. Add `@inkline/storybook/generator` export path.
- 65c9f94: fix(cli): report an invalid or missing target as a diagnostic instead of a raw throw

  `inkline compile --target reakt` used to fail with `Error: Unknown target: "reakt"` and a stack
  trace through bundled compiler internals, which told the author nothing about their config. The same
  class of failure had three separate raw throws — two in `resolveOptions`, one in `compile` for a
  target the registry cannot serve.

  All three now go through the diagnostic catalog as `INK0084` (no target specified), `INK0085`
  (unknown target) and `INK0086` (target absent from the registry), thrown as a new
  `InklineConfigError` that carries a fully formed `Diagnostic`. The registry check moved into
  `resolveOptions`, so there is one validation point for every entry path.

  ```
  $ inkline compile "src/**/*.ink.tsx" --target reakt
  error  INK0085  Unknown target "reakt"
      help: Did you mean "react"? Available targets: react, solid, vue, svelte, angular, qwik, astro.
      docs: https://docs.inkline.dev/diagnostics/INK0085
  ```

  The CLI exits `2` for unusable input (`1` remains "the compile ran and reported errors") and prints
  the underlying stack only under `--verbose`. Targets are validated before `--clean` deletes output
  directories, so a typo in one of several targets no longer wipes the others' output.

  Also fixes a latent bug: placeholders in a diagnostic's `help` text were never interpolated, so
  `INK0121` leaked a literal `{name}` to users. `help` is now interpolated alongside `title`, and
  `DiagnosticParams<C>` extracts required params from both.

  New public exports from `@inkline/compiler`: `resolveOptions`, `InklineConfigError`,
  `isInklineConfigError`.

- f5e3055: Stop the CLI on a config value of the wrong type instead of crashing on it a few lines later.

  Config validation reported a wrong-typed value as a warning and handed the config to the command
  unchanged, so `targets: "react"` printed a correct `INK0083` diagnostic and then died with
  `TypeError: fileConfig.targets?.join is not a function`. The value was never usable — the diagnostic
  just arrived before the crash rather than instead of it.

  `INK0083` (invalid config value) is now an `error`, and `loadInklineConfig` returns
  `{ config, valid }`. `check` and `compile` stop at the boundary with exit code `2` when `valid` is
  `false`, before any consumer reads a field — in `compile`, notably before `--clean` removes output
  directories named by a `targetOutDir` that failed validation. A wrong-typed `targets` never reached
  the delete (`resolveTargets` threw first); a wrong-typed `targetOutDir` did, cleaning the targets
  ahead of the bad entry before throwing on it.

  Fixing this at the load boundary covers every consumer at once. `targets.join`, `barrels.filter`
  and `srcDir.endsWith` were three instances of the same assumption — that a validated config's fields
  hold their declared types — and hardening them one at a time would have left the next field to be
  found by a user.

  Unknown _keys_ remain non-fatal, and now consistently so, at every depth and under either shape
  zod reports them in: a key nested inside a value (`barrels[0].extra`) and a key of a record-typed
  field (`targetOutDir.preact`, `targetOptions.preact`) are both reported as `INK0081` by their full
  path rather than as an invalid value, so neither inherits the new fatal severity. A leftover entry
  for a target you no longer build is still ignored. `INK0081`/`INK0082` are otherwise unchanged.

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

- c3891ce: feat(cli): render a source frame and relative paths in diagnostics

  A diagnostic used to be a single line naming an absolute path, which put a ~140-character prefix on
  every line of output and never showed the code it was complaining about. `SourceLocation` already
  carried `offset` and `length` alongside line/column — enough to slice the source and underline the
  exact span — and nothing used them.

  `formatDiagnostic` now prints a `rustc`-style code frame under the header and makes the path
  relative to the invocation directory:

  ```
  $ inkline check src/Menu.ink.tsx
  src/Menu.ink.tsx:8:7  error  INK0060  <Show> requires a 'when' prop
    8 |       <Show>
      |       ^^^^^^
      help: Pass the condition as a prop: <Show when={visible()}>…</Show>. …
      docs: https://docs.inkline.dev/diagnostics/INK0060
  ```

  The formatter stays pure — the source text is a second argument, never an `fs` read — so the `check`
  and `compile` commands pass the text they already hold, and callers with no source (config-time
  failures) get the previous one-line output unchanged. The line number is derived from `offset` so
  the gutter can never disagree with the slice it labels; a span crossing a line boundary is clamped
  to the end of its first line; tabs are preserved in the caret padding so alignment survives any tab
  width. A path is kept absolute when climbing out of the tree with `../..` would be the longer read.

  Separately, the 7 catalog codes that shipped with `help: undefined` — `INK0060`, `INK0061`,
  `INK0062`, `INK0065`, `INK0066`, `INK0080`, `INK0090` — now carry help text containing a corrected
  example rather than a restatement of the title. A catalog test asserts non-empty `help` over
  `Object.keys(DIAGNOSTICS)` so the gap cannot reopen as codes are added. `INK0090` was building its
  diagnostic by hand and bypassing the catalog's `help` and interpolation; it now goes through
  `createDiagnostic` like every other code.

- 94a1e47: fix(cli): unregister the unimplemented `add` command

  `inkline add` was listed in `inkline --help` as "Add a component to your project", then printed
  `inkline add is not yet implemented.` and exited `0`. A `--help` listing is a claim of capability,
  and exiting `0` from a no-op means no script or CI step could detect that nothing happened.

  The command is unregistered until the real feature exists. `inkline --help` now advertises
  `compile`, `check` and `init` only, and `inkline add IButton` is rejected by citty as an unknown
  command — usage is printed and the process exits non-zero.

  ```
  $ inkline add IButton
  Unknown command add
  ```

- 8480e72: Validate `inkline.config.*` at load time instead of silently ignoring what it does not understand.

  `defineConfig` is an identity function and nothing checked the loaded config at runtime, so a
  misspelled key such as `sourceMaps` (plural) or `plugns`, and a value of the wrong type, were both
  silent no-ops with exit code 0. `@inkline/cli` now parses the loaded config against a zod schema and
  reports the failures through the diagnostic catalog:
  - `INK0081` — unknown config key.
  - `INK0082` — unknown config key within a small edit distance of a real one, including the suggested
    spelling (`sourceMaps` → `sourceMap`).
  - `INK0083` — value of the wrong type, naming the path and what was expected.

  All three are warnings. The config is used exactly as loaded — nothing is coerced or dropped — and
  the exit code is unchanged.

  The schema lives in `@inkline/cli`, the only place a config file is read, so `@inkline/compiler`
  keeps its hand-written `InklineConfig` type and its zero runtime dependencies. A compile-time
  assertion ties the schema's key set to `keyof InklineConfig`, so the two cannot drift.

  New exports from `@inkline/compiler`: `createDiagnosticCollector` (with its `DiagnosticCollector`
  type) and `ALL_TARGETS`.

### Patch Changes

- e205cc7: `inkline check` now accepts the same inputs and honours the same config as `inkline compile`.

  `check` takes a glob pattern instead of a single file, and a pattern that matches nothing prints
  `no files matched the given patterns` and exits `2` instead of throwing a raw `ENOENT` stack trace.

  Both commands now build their compiler options through one shared mapping, closing four ways `check`
  could pass while `compile` failed: `tsconfig` (ambient `.d.ts` type files were never loaded, so
  `check` ran against a weaker TypeScript program), `targetOptions` (unknown target option keys went
  unreported and codegen ran with defaults), `verbose`, and `outDir`/`srcDir`/`targetOutDir` as seen by
  plugins. `sourceMap` remains the one intentional difference — `check` writes no output.

  `check` no longer silently falls back to `react,solid,vue,svelte` when no targets are configured; it
  reports INK0084 and exits `2`, matching `compile`.

- 141b284: fix(cli): give `compile --out-dir` precedence over the config file's `outDir`

  `inkline compile --out-dir <path>` was ignored whenever a config file set `outDir`: the resolution
  order was config-first, and the flag also carried a citty `default: "dist"` that made it impossible
  to tell "flag omitted" from "flag passed as dist". In practice the flag did nothing for any project
  with a config file. It now resolves flag > config > `dist`, matching `--target`, `--src-dir` and
  `--source-map`.

  Behaviour change: a project that relied on the config value winning over an explicitly passed
  `--out-dir` will now write to the flag's path. Remove the flag from that invocation to keep the
  previous output location. A per-target `targetOutDir` entry in the config is unchanged and still
  overrides both for the targets it names.

- 6623fec: fix(cli): let the config file's `sourceMap` take effect, and `--no-verbose` override a config `verbose`

  A config file's `sourceMap` was silently ignored. `--source-map` carried a citty `default: "external"`,
  which made `args["source-map"]` permanently defined, so the `flag ?? config ?? "external"` chain could
  never reach the config branch — the same defect that was fixed for `--out-dir`, one line down. Removing
  the citty default lets the chain work as written: `--source-map` still wins, a config `sourceMap` now
  applies when the flag is omitted, and `external` remains the documented fallback.

  `--verbose` on both `compile` and `check` had the boolean form of the same problem. With `default: false`,
  an omitted flag and an explicit `--no-verbose` both arrived as `false`, so a config `verbose: true` could
  not be switched off from the command line. The flag now declares no default and resolves
  `flag ?? config ?? false`.

  Behaviour change: a project whose config sets `sourceMap` was previously getting `external` regardless;
  it now gets what the config asks for. Projects that relied on the ignored value being overridden should
  pass `--source-map external` explicitly. `--clean` and `--watch` keep their citty defaults — they have no
  config counterpart, so the default is the whole resolution rather than a shadow over one.

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
- 04a1350: Make `inkline compile --watch` inherit the initial build and report every rebuild with a duration.

  The watcher started from an empty incremental state, so the first save after startup recompiled
  every file — repeating the full build that had just finished. It now inherits the initial pass:
  on a 67-file project the first edit rebuilds 1 file and skips 66 instead of rebuilding all 67.

  Rebuilds also always print now, including a save that does not change the file's bytes (previously
  silent, making a live watcher indistinguishable from a dead one), and every rebuild line carries
  elapsed milliseconds:

  ```
  Rebuilt 1 file(s), skipped 66 in 31ms
  No changes, 67 file(s) up to date in 23ms
  ```

  `@inkline/compiler` gains `seedIncrementalState(seeds)` and the `IncrementalSeed` type, for adopting
  results from a plain `compile()` pass into an `IncrementalState`. Additive — nothing else changes.

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
- Updated dependencies [7958f10]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [a86ba6d]
- Updated dependencies [993fa28]
- Updated dependencies [b495727]
- Updated dependencies [65c9f94]
- Updated dependencies [3b8b6c2]
- Updated dependencies [3b7f439]
- Updated dependencies [a86ba6d]
- Updated dependencies [c12188d]
- Updated dependencies [f5e3055]
- Updated dependencies [af4684d]
- Updated dependencies [a86ba6d]
- Updated dependencies [c3891ce]
- Updated dependencies [af6996e]
- Updated dependencies [287b326]
- Updated dependencies [c12188d]
- Updated dependencies [17b446a]
- Updated dependencies [58fcc23]
- Updated dependencies [01a5207]
- Updated dependencies [0cbb9a6]
- Updated dependencies [a86ba6d]
- Updated dependencies [5e56c04]
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
- Updated dependencies [8480e72]
- Updated dependencies [04a1350]
- Updated dependencies [a86ba6d]
  - @inkline/compiler@0.1.0
  - @inkline/config-loader@0.1.0
  - @inkline/storybook@0.0.1
