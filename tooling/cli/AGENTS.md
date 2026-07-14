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
| `inkline add`     | [`add.ts`](./src/commands/add.ts)         | Add a component to an existing project. Currently a stub — prints "not yet implemented".                                                                                                                                                                 |
| `inkline compile` | [`compile.ts`](./src/commands/compile.ts) | Compile `.ink.tsx` globs to target frameworks and generate per-target Storybook story files. Accepts `--src-dir` to set the source root for output path resolution (also `srcDir` in config).                                                            |
| `inkline check`   | [`check.ts`](./src/commands/check.ts)     | Run diagnostics without writing output: compiles with `sourceMap: "none"`, prints formatted diagnostics, exits non-zero on any error.                                                                                                                    |

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
| [`common-prefix.ts`](./src/lib/common-prefix.ts)                     | Longest-common-prefix helper for input glob → output path resolution.                |
| [`config.ts`](./src/lib/config.ts)                                   | Bridge to [`@inkline/config-loader`](../../core/config-loader/) with CLI defaults.   |
| [`detect-bundler.ts`](./src/lib/detect-bundler.ts)                   | Detect the project's bundler config file (used by `init`).                           |
| [`detect-framework.ts`](./src/lib/detect-framework.ts)               | Detect the project's framework(s) from its dependencies (used by `init`).            |
| [`detect-package-manager.ts`](./src/lib/detect-package-manager.ts)   | Detect the package manager from lockfiles (used by `init`).                          |
| [`diagnostics.ts`](./src/lib/diagnostics.ts)                         | Format compiler diagnostics for terminal output (TTY-aware, color, code links).      |
| [`glob.ts`](./src/lib/glob.ts)                                       | Input-file globbing.                                                                 |
| [`inkline-config-template.ts`](./src/lib/inkline-config-template.ts) | `inkline.config.ts` + example-component templates for `init --compiler`.             |
| [`styleframe-config.ts`](./src/lib/styleframe-config.ts)             | The `styleframe.config.ts` template seeded by `init`.                                |
| [`writer.ts`](./src/lib/writer.ts)                                   | Atomic file writes with source-map sidecar support.                                  |

These are internal — no `exports` map entry. If you find yourself importing from `lib/` outside the CLI, lift the utility into a more appropriate package first.

## Build

`vp pack` (one-shot) / `vp pack --watch` (dev). Output goes to `dist/` including `dist/bin/inkline.mjs` which the shipped `bin/inkline.mjs` shim imports.

## Tests

Co-located `*.test.ts` (e.g. [`commands/init.test.ts`](./src/commands/), [`lib/barrel.test.ts`](./src/lib/)). Vitest. Run with `vp test` from this package.

## See also

- [`core/compiler/README.md`](../../core/compiler/README.md) "CLI" — user-facing command reference. Keep in sync.
- [`core/compiler/AGENTS.md`](../../core/compiler/AGENTS.md) — the compiler that backs every command.
- [`tooling/storybook/AGENTS.md`](../storybook/AGENTS.md) — story generator invoked by `inkline compile`.
