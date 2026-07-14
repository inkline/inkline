# Inkline

A write-once, compile-everywhere component framework. Author UI components in `.ink.tsx` using a signal-based reactivity model; the compiler emits idiomatic React, Vue 3, Svelte 5, Solid, Angular, Qwik, and Astro output. No runtime dependency on `@inkline/core` is shipped.

This file is the entry point for any LLM agent or new contributor working in the repo. Read it first, then descend to the nearest `AGENTS.md` for the area you're editing.

## Quick start

```bash
vp install              # install + configure git hooks
vp run ready            # build + check + test (mirrors the CI gate)
vp run dev              # start the docs website (alias for `vp run website#dev`)
pnpm run storybook      # run all 7 framework Storybooks side-by-side
```

Run `vp env doctor` if anything about the toolchain looks wrong, and `vp help` for the full command list. Vite+ docs: [viteplus.dev/guide/](https://viteplus.dev/guide/).

## Repository map

```
core/        @inkline/core (authoring primitives), @inkline/compiler,
             @inkline/plugin (unplugin), @inkline/config-loader, inkline (barrel)
tooling/     @inkline/cli, @inkline/storybook, @inkline/test-utils,
             @inkline/agents-check (docs link-integrity test)
testing/     @inkline/e2e (Playwright cross-framework visual-parity tests)
ui/          @inkline/components (single source of truth) + 7 framework output packages
apps/        website (docs site), storybook (unified aggregator for all 7 frameworks)
docs/        architecture, conventions, contributing, release-process, authoring, maintenance
.changeset/  pending changesets — one markdown file per upcoming change
.github/     CI + changesets workflows, issue/PR templates, community health files
.old/        archived v0 codebase — read-only reference, do not edit or link into
```

Workspace globs live in [`pnpm-workspace.yaml`](./pnpm-workspace.yaml). Dependency layering and the IR-centric architecture are explained in [docs/architecture.md](./docs/architecture.md).

## Where to look next

Per package — descend to the `AGENTS.md` nearest the file you're editing (LLM tools resolve nearest-wins):

| Package                                                                                                        | When to look                                                             |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`core/core/AGENTS.md`](./core/core/AGENTS.md)                                                                 | Authoring primitives, JSX runtime                                        |
| [`core/compiler/AGENTS.md`](./core/compiler/AGENTS.md)                                                         | Pipeline, IR, codegen, plugin hooks                                      |
| [`core/plugin/AGENTS.md`](./core/plugin/AGENTS.md)                                                             | Bundler integration (Vite, webpack, Rollup, esbuild, Rspack, Farm)       |
| [`core/config-loader/AGENTS.md`](./core/config-loader/AGENTS.md)                                               | `inkline.config.ts` loading                                              |
| [`core/inkline/AGENTS.md`](./core/inkline/AGENTS.md)                                                           | The public `inkline` barrel package                                      |
| [`tooling/cli/AGENTS.md`](./tooling/cli/AGENTS.md)                                                             | `inkline compile`, `inkline check`, `inkline init`, `inkline add`        |
| [`tooling/storybook/AGENTS.md`](./tooling/storybook/AGENTS.md)                                                 | Story authoring + per-target story generation                            |
| [`tooling/test-utils/AGENTS.md`](./tooling/test-utils/AGENTS.md)                                               | Cross-target test harnesses                                              |
| [`ui/components/AGENTS.md`](./ui/components/AGENTS.md)                                                         | **Where you author components** — the single source for all 7 frameworks |
| [`ui/react/AGENTS.md`](./ui/react/AGENTS.md) and the six siblings                                              | Per-framework output packages — generated, do not hand-edit              |
| [`apps/storybook/AGENTS.md`](./apps/storybook/AGENTS.md), [`apps/website/AGENTS.md`](./apps/website/AGENTS.md) | The two consumer apps                                                    |
| [`testing/e2e/AGENTS.md`](./testing/e2e/AGENTS.md)                                                             | Playwright cross-framework visual-parity tests                           |

Per topic — read the relevant `docs/`:

| Doc                                                            | When to read                                                       |
| -------------------------------------------------------------- | ------------------------------------------------------------------ |
| [docs/architecture.md](./docs/architecture.md)                 | How `.ink.tsx` becomes 7 framework outputs (pipeline, IR, codegen) |
| [docs/authoring-components.md](./docs/authoring-components.md) | How to add or modify a component                                   |
| [docs/conventions.md](./docs/conventions.md)                   | Code, file, test, commit conventions                               |
| [docs/contributing.md](./docs/contributing.md)                 | Dev workflow, before-PR checklist, CI gate                         |
| [docs/release-process.md](./docs/release-process.md)           | Changesets + npm publish flow                                      |
| [docs/maintenance.md](./docs/maintenance.md)                   | How we keep docs from drifting                                     |

For the user-facing language reference (primitives, control flow, options), the canonical source is [`core/compiler/README.md`](./core/compiler/README.md).

## Cross-cutting conventions

These apply everywhere. Package-level `AGENTS.md` files repeat them only when consequential.

- **Tooling**: pnpm 11, Node ≥22.12, Vite+ (`vp` CLI). OXLint via `vp lint`; Oxfmt via `vp fmt`. **Not ESLint, not Prettier.**
- **Tests**: colocated as `<file>.test.ts`. Vitest. Never in a separate `tests/` folder.
- **Commits**: conventional commits with package scope — `feat(compiler): …`, `fix(ci): …`. See [docs/conventions.md](./docs/conventions.md) → "Commit messages".
- **Changesets**: every change to a published package needs one (`pnpm changeset`). See [docs/release-process.md](./docs/release-process.md).
- **Generated directories — never hand-edit**: `ui/<framework>/.inkline/`, `ui/<framework>/.styleframe/`, all `dist/`, `coverage/`, `storybook-static/`.
- **Archived directory — never touch**: `.old/` is the v0 codebase, kept for reference only.
- **Doc freshness**: if your change touches public API, build flow, conventions, or the directory shape, update the relevant `AGENTS.md` / `docs/*.md`. See [docs/maintenance.md](./docs/maintenance.md).

## Tooling reference

The block below is auto-managed by Vite+. Do not edit between the `<!--VITE PLUS START/END-->` markers.

<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->
