# @inkline/cli

The `inkline` command-line interface. Wraps [`@inkline/compiler`](../../core/compiler/), [`@inkline/config-loader`](../../core/config-loader/), and [`@inkline/storybook`](../storybook/) into a single CLI used by both end users (`npx inkline …`) and internal build orchestration.

## Binary

- `bin/inkline.mjs` (the shipped binary) is a one-line shim: `await import("../dist/bin/inkline.mjs")`. The real entry is built from [`src/bin/`](./src/bin/) into `dist/bin/inkline.mjs` by `vp pack`.
- The same binary is re-exported by the [`inkline`](../../core/inkline/) barrel via its `bin` field. Both paths must keep behaving the same — see [`core/inkline/AGENTS.md`](../../core/inkline/AGENTS.md).

## Commands

All commands live in [`src/commands/`](./src/commands/) and are wired into the root command via [citty](https://github.com/unjs/citty).

| Command           | Source                                    | Purpose                                                                                                                                                                                                                                                  |
| ----------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inkline init`    | [`init.ts`](./src/commands/init.ts)       | Set up Inkline in an existing app: detect package manager/framework/bundler, run `styleframe init` + seed `styleframe.config.ts`, install deps, wire the build plugin. `--compiler` additionally scaffolds `inkline.config.ts` and an example component. |
| `inkline compile` | [`compile.ts`](./src/commands/compile.ts) | Compile `.ink.tsx` globs to target frameworks and generate per-target Storybook story files. Accepts `--src-dir` to set the source root for output path resolution (also `srcDir` in config).                                                            |
| `inkline check`   | [`check.ts`](./src/commands/check.ts)     | Run diagnostics without writing output: same globs and same config as `compile`, compiles with `sourceMap: "none"`, reports through the same [`report.ts`](./src/lib/report.ts) path, exits non-zero on any error.                                       |

`check` is the correctness gate for `compile`, so it must compile against the same program **and report the same findings from it**. Two pairings enforce that, and both have drifted before:

- **The option bag.** Both commands build theirs through [`buildCompileOptions`](./src/lib/compile-options.ts) and nowhere else — `sourceMap` is the single sanctioned divergence (`check` writes no output, so maps would be waste). A new `InklineConfig` field goes into that mapper, not into a command.
- **The reporting path.** Both print through [`createBuildReporter`](./src/lib/report.ts), at a level resolved by `resolveReportLevel` against the shared `DEFAULT_REPORT_LEVEL`, and close with `formatBuildSummary`. Anything that changes what reaches the terminal — a filter, a dedup rule, a summary field — goes into that module, never into a command's own loop. `check` printed `result.diagnostics` directly for two releases and silently fell behind `compile` on both dedup and reporting level.

[`commands/check.test.ts`](./src/commands/check.test.ts) fails if either pairing stops matching.

When adding a command:

1. Create `src/commands/<name>.ts` exporting a citty `defineCommand`.
2. Register it in the root command (see existing files for the wiring pattern).
3. Document it in [`core/compiler/README.md`](../../core/compiler/README.md) → "CLI" if user-facing, or only here if internal-only.
4. Add a test alongside the command (`<name>.test.ts`).

## Library utilities

[`src/lib/`](./src/lib/) holds reusable, non-command code shared across commands. Each module has co-located tests (except the two pure template modules).

| Module                                                               | Purpose                                                                              |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`add-build-plugin.ts`](./src/lib/add-build-plugin.ts)               | Wire the inkline plugin into a bundler config via magicast (used by `init`).         |
| [`barrel.ts`](./src/lib/barrel.ts)                                   | Generate framework-specific barrel files (re-export `index.ts`) for compiled output. |
| [`clean.ts`](./src/lib/clean.ts)                                     | Vet the directories `--clean` removes before any of them is removed (see below).     |
| [`common-prefix.ts`](./src/lib/common-prefix.ts)                     | Longest-common-prefix helper for input glob → output path resolution.                |
| [`compile-options.ts`](./src/lib/compile-options.ts)                 | The one config → `compile()` options mapping, shared by `compile` and `check`.       |
| [`config.ts`](./src/lib/config.ts)                                   | Bridge to [`@inkline/config-loader`](../../core/config-loader/) with CLI defaults.   |
| [`detect-bundler.ts`](./src/lib/detect-bundler.ts)                   | Detect the project's bundler config file (used by `init`).                           |
| [`detect-framework.ts`](./src/lib/detect-framework.ts)               | Detect the project's framework(s) from its dependencies (used by `init`).            |
| [`detect-package-manager.ts`](./src/lib/detect-package-manager.ts)   | Detect the package manager from lockfiles (used by `init`).                          |
| [`diagnostics.ts`](./src/lib/diagnostics.ts)                         | Format compiler diagnostics for terminal output (TTY-aware, color, code links).      |
| [`errors.ts`](./src/lib/errors.ts)                                   | Exit-code constants and config-error reporting (see "Exit codes" below).             |
| [`glob.ts`](./src/lib/glob.ts)                                       | Input-file globbing.                                                                 |
| [`inkline-config-template.ts`](./src/lib/inkline-config-template.ts) | `inkline.config.ts` + example-component templates for `init --compiler`.             |
| [`report.ts`](./src/lib/report.ts)                                   | Per-build diagnostic policy: level filter, deduplication, counts, summary line.      |
| [`styleframe-config.ts`](./src/lib/styleframe-config.ts)             | The `styleframe.config.ts` template seeded by `init`.                                |
| [`writer.ts`](./src/lib/writer.ts)                                   | Atomic file writes with source-map sidecar support.                                  |

These are internal — no `exports` map entry. If you find yourself importing from `lib/` outside the CLI, lift the utility into a more appropriate package first.

## `--clean` deletes; treat every path it is handed as hostile

`--clean` defaults to **on** and its removal is `rmSync(dir, { recursive: true, force: true })`, which does not ask twice. `dir` comes from `resolveTargetDir` — a user string from `outDir` or `targetOutDir` — and `""` and `"/"` are perfectly valid `z.string()` values, so no schema change can catch them. `targetOutDir: { react: "" }` resolved to the working directory and deleted a user's sources, README and config before the command failed on its own missing input.

Every candidate is therefore vetted by [`lib/clean.ts`](./src/lib/clean.ts) **before the first removal**, in two tiers:

1. **Hard floor, no opt-out** — the filesystem root, the working directory, or any ancestor of it.
2. **The output tree must be a sane place and the target must be in it**, applied only to derived `outDir/<target>` paths. The same floor is applied to the resolved `outDir` itself, because containment is self-validating for a path built as `outDir/<target>`; without it `outDir: "/"` cleans `/react` while `outDir: ""`, whose target resolves to the identical `/react`, is refused. `outDir` may still _be_ the working directory (`outDir: "."`); it may not be the root or sit above the project. An explicit `targetOutDir` entry is exempt from this tier and still cleans normally, because an absolute per-target override is a documented feature that [`ui/components/inkline.config.ts`](../../ui/components/inkline.config.ts) relies on. It is never exempt from tier 1.

**Every comparison is made on real paths, never on `resolve()`d strings.** A guard decided on spelling only guards a directory under the one name `process.cwd()` happens to report, and macOS hands out a second name by default — `/tmp` → `/private/tmp`, `/var` → `/private/var` — so `targetOutDir: { react: "/tmp/proj" }` walked past a floor that refuses the identical `/private/tmp/proj`. `toRealPath` canonicalises with `realpathSync.native` (on-disk case, so `/Users/x/Proj` and `/users/x/proj` compare equal) and, because the target directory does not exist on a first build, walks up to the nearest ancestor that resolves and re-appends the remainder instead of throwing `ENOENT`. The paths handed back for removal are the lexical ones: `rmSync` on a symlinked target should unlink the link, while the verdict is reached on what it points at.

Three properties are load-bearing and each has a test that fails if it is lost: the check runs over **all** targets before **any** `rmSync`, so a bad third target cannot cost the user the first two; a refusal is a message plus `EXIT_USAGE_ERROR`, never a silent skip — a `--clean` that quietly declined to clean resurfaces later as stale output nobody can explain; and the comparison follows symlinks. The regression tests live in [`bin/inkline.test.ts`](./src/bin/) and [`lib/clean.test.ts`](./src/lib/), build real directories and **deliberate symlinks** rather than synthetic path strings, run the CLI from a throwaway working directory, and assert the canary survives _and_ the exit is non-zero; asserting only the canary passes for the wrong reason.

`report.ts` decides _which_ diagnostics are printed; `diagnostics.ts` decides _how_ one is rendered. The reporter must never build a message itself — it calls `formatDiagnostic` and passes the caller's source text through, so a change to the rendering (code frames, relative paths, color) reaches every path that prints a diagnostic.

## Exit codes

Defined once in [`lib/errors.ts`](./src/lib/errors.ts); never write a bare number.

| Constant             | Code | Meaning                                                                        |
| -------------------- | ---- | ------------------------------------------------------------------------------ |
| —                    | `0`  | Success.                                                                       |
| `EXIT_COMPILE_ERROR` | `1`  | The compile ran and reported at least one `error` diagnostic.                  |
| `EXIT_USAGE_ERROR`   | `2`  | The CLI never got that far: unusable config, or no files matched the patterns. |

`EXIT_COMPILE_ERROR` is decided from every diagnostic the compile produced, before the reporting level filters any out and before [`report.ts`](./src/lib/report.ts) collapses duplicates — what a build prints may change; what it returns must not.

User-input failures must never surface a stack trace. `resolveOptions` throws `InklineConfigError` carrying a catalog `Diagnostic`; commands validate up front (before `--clean` deletes anything) and hand the error to `reportConfigError`, which formats it and sets `EXIT_USAGE_ERROR`. The stack is printed only under `--verbose`. Anything `reportConfigError` returns `false` for is a real crash — rethrow it.

## Build

`vp pack` (one-shot) / `vp pack --watch` (dev). Output goes to `dist/` including `dist/bin/inkline.mjs` which the shipped `bin/inkline.mjs` shim imports.

## Tests

Co-located `*.test.ts` (e.g. [`commands/init.test.ts`](./src/commands/), [`lib/barrel.test.ts`](./src/lib/)). Vitest. Run with `vp test` from this package.

## See also

- [`core/compiler/README.md`](../../core/compiler/README.md) "CLI" — user-facing command reference. Keep in sync.
- [`core/compiler/AGENTS.md`](../../core/compiler/AGENTS.md) — the compiler that backs every command.
- [`tooling/storybook/AGENTS.md`](../storybook/AGENTS.md) — story generator invoked by `inkline compile`.
