# Conventions

Repo-wide conventions for code, tests, files, and commits. This document is a pointer to canonical sources wherever possible — when in doubt, check the config file referenced here rather than this page.

## Tooling

| Concern                   | Tool                        | Configured in                                                                                          |
| ------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------ |
| Package manager           | pnpm 11.x                   | [`package.json`](../package.json) `packageManager` field                                               |
| Node runtime              | Node ≥22.12.0               | [`package.json`](../package.json) `engines.node`                                                       |
| Workspace layout          | pnpm workspaces             | [`pnpm-workspace.yaml`](../pnpm-workspace.yaml)                                                        |
| Build / dev / test driver | Vite+ (`vp` CLI)            | per-package [`vite.config.ts`](../vite.config.ts) + root [`vite.config.ts`](../vite.config.ts)         |
| Linter                    | OXLint (via `vp lint`)      | root [`vite.config.ts`](../vite.config.ts) `lint` section                                              |
| Formatter                 | Oxfmt (via `vp fmt`)        | root [`vite.config.ts`](../vite.config.ts) `fmt` section                                               |
| Type checker              | `tsc` via `vp check`        | root [`tsconfig.json`](../tsconfig.json) + per-package extensions                                      |
| Test runner               | Vitest                      | per-package `vite.config.ts` `test` section                                                            |
| Versioning / publishing   | Changesets                  | [`.changeset/config.json`](../.changeset/config.json) — see [release-process.md](./release-process.md) |
| Doc tooling               | Storybook 10, per framework | [`tooling/storybook/`](../tooling/storybook/) + per-framework Storybook configs                        |

ESLint and Prettier are **not** used. Their config schemas appear in the catalog because some framework plugins (Vue, Svelte, Angular, Astro, Solid, Qwik) ship ESLint configs as transitive deps — we do not invoke them.

## Workspace layout

```
core/      authoring primitives, compiler, plugin, config loader, barrel
tooling/   CLI, Storybook integration, test utilities
testing/   end-to-end test packages (Playwright cross-framework visual parity)
ui/        single-source components + 7 generated framework packages
apps/      docs website + unified Storybook aggregator
```

See [`pnpm-workspace.yaml`](../pnpm-workspace.yaml) for the authoritative glob list and [AGENTS.md](../AGENTS.md) for orientation. A `tools/*` slot exists in the workspace globs but has no packages today.

## File naming

| Pattern          | Where                             | Meaning                                                                                                             |
| ---------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `*.ink.tsx`      | `ui/components/src/components/**` | Authored Inkline component. Compiles to all framework targets.                                                      |
| `*.test.ts`      | colocated next to source          | Vitest test for the adjacent module. Tests never live in a separate `tests/` directory.                             |
| `*.spec.ts`      | `testing/e2e/`                    | Playwright e2e specs (cross-framework visual parity). Not Vitest; run via `test:e2e`.                               |
| `__fixtures__/`  | `core/compiler/src/__fixtures__/` | Compiler fixtures (`.ink.tsx`) used by scenario tests. Excluded from lint by [`vite.config.ts`](../vite.config.ts). |
| `__snapshots__/` | colocated                         | Vitest snapshot files.                                                                                              |
| `.inkline/`      | `ui/<framework>/.inkline/`        | **Auto-generated** by the compiler. Never hand-edit.                                                                |
| `.styleframe/`   | `ui/<framework>/.styleframe/`     | **Auto-generated** style artifacts. Never hand-edit.                                                                |
| `dist/`          | per-package                       | Build output. Never hand-edit.                                                                                      |

## Test layout

Tests live next to their source as `<file>.test.ts`. Examples:

- [`core/compiler/src/pipeline/passes/03-lower/control-flow.test.ts`](../core/compiler/src/pipeline/passes/03-lower/) is colocated with `control-flow.ts`.
- [`core/compiler/src/codegen/targets/react/index.test.ts`](../core/compiler/src/codegen/targets/react/) is colocated with the React target's `index.ts` (each target owns its tests; cross-target codegen fixtures live in per-target `__tests__/` folders).

Run all tests with `vp run -r test` from the repo root; run a single package's tests with `vp test` inside that package. Coverage uses `@vitest/coverage-v8`.

**Exception — Playwright e2e.** The cross-framework visual-parity suite uses Playwright, not Vitest, and lives in its own package [`testing/e2e`](../testing/e2e/) (`*.spec.ts`). Run it with `pnpm --filter @inkline/e2e test:e2e` (a `test:e2e` script, deliberately not `test`), so the Vitest gate never collects it. See [`testing/e2e/AGENTS.md`](../testing/e2e/AGENTS.md).

## Code style

- TypeScript everywhere. No JavaScript source.
- `vp fmt` is authoritative — do not configure editor formatters that disagree. The `staged` hook ([`vite.config.ts`](../vite.config.ts)) runs `vp check --fix` on staged files.
- The lint config in [`vite.config.ts:lint`](../vite.config.ts) enables `typeAware: true, typeCheck: true`. Lint failures are CI-blocking.
- No `console.log` in shipped code (lint will catch it). Compiler diagnostics use the diagnostics pipeline ([`core/compiler/src/core/diagnostics/`](../core/compiler/src/core/diagnostics/)).
- Public APIs are explicitly typed at the boundary (no inferred return types on exported functions).

## Commit messages

Conventional commits with package-scoped names. Format:

```
<type>(<scope>): <subject>
```

| Type       | Use                                               |
| ---------- | ------------------------------------------------- |
| `feat`     | New user-facing capability or public API addition |
| `fix`      | Bug fix                                           |
| `refactor` | Internal restructure with no behavior change      |
| `docs`     | Documentation only                                |
| `test`     | Test additions / changes only                     |
| `chore`    | Tooling, configs, dependencies                    |
| `ci`       | CI workflow changes                               |

Common scopes: `compiler`, `core`, `cli`, `storybook`, `plugin`, `test-utils`, `components`, `react`, `vue`, `svelte`, `solid`, `angular`, `qwik`, `astro`, `ci`.

Recent examples to follow:

- `feat(compiler): add <Slot> JSX component and defineSlot for slot rendering`
- `feat(ci): expand CI workflow with granular jobs and app builds`
- `fix(ci): ignore auto-generated .styleframe files`

## Changesets

Any change that affects a published package's behavior, API, or types **requires a changeset**. Add one with `pnpm changeset` before opening a PR. See [release-process.md](./release-process.md) for the full flow and for which packages are excluded from publishing.

## Archived code

`.old/` contains the v0 codebase, kept for reference only. Do not link into it from docs, do not import from it, do not edit it.

## See also

- [contributing.md](./contributing.md) — dev workflow.
- [maintenance.md](./maintenance.md) — how we keep these conventions documented and current.
