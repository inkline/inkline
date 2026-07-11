---
name: bundler-matrix-verification
description: How to verify @styleframe/plugin changes across all 9 bundler adapters, including the HMR test scenarios, dts checks, and error-path tests. Use for any tooling/plugin change and for QA of plugin claims.
---

# Bundler matrix verification

## The matrix

`@styleframe/plugin` is one unplugin factory with **9 adapters**: `vite`, `webpack`, `rollup`, `esbuild`, `rspack`, `farm`, `nuxt`, `astro`, `bun` (yes, bun — older docs omit it). Consumers import `styleframe/plugin/<bundler>` (default exports). Nuxt and Astro are wrappers with extra integration (Nuxt writes tsconfig `paths` for Vue).

**"Works in Vite" is not done.** Rule of thumb per change class:

| Change                                                              | Minimum verification                                                                                                                            |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| unplugin factory core (`plugin/index.ts`, loaders, virtual modules) | Vite + Webpack + one of Rspack/Rollup, plus Nuxt (wrapper)                                                                                      |
| HMR / dev-server logic                                              | Vite dev + Nuxt dev (different server models)                                                                                                   |
| scanner wiring                                                      | Vite with `scanner.content` globs + incremental file-change test                                                                                |
| dts generation                                                      | fresh app: check `.styleframe/styleframe.d.ts` + `shims.d.ts`; Vue app specifically (needs tsconfig `paths`); non-Vue resolves from shims alone |
| adapter-specific file                                               | that adapter + Vite as control                                                                                                                  |

## HMR scenarios to exercise (the strategy table is code, test it as behavior)

1. Edit `styleframe.config.ts` → full reload, graph rebuild, styles correct.
2. Edit a `*.styleframe.ts` → selective invalidation; dependent files reload; unrelated cached.
3. Edit a content file (template with `_utility:value` classes) → CSS-only incremental update; new utility appears.
4. Edit a shared non-styleframe composable imported by styleframe files → BFS invalidation reaches dependents.
5. Add / delete a `*.styleframe.ts` → graph rebuild; export appears/disappears from `virtual:styleframe`.
6. Introduce an error then fix it → rollback kept the server alive; recovery is clean.

## Error paths (must stay loud and typed)

- Two files exporting the same name → `ExportCollisionError`.
- Circular imports between styleframe files → `CircularDependencyError` (fix: share via non-styleframe module).
- Extension face requested outside a `*.styleframe.ts` → consumer face returned (by design, verify no instance leak).
- Unmatched utility classes → warning listing them (typos aren't silent).

## Tree-shaking & minification checks (build mode)

- Recipe tree-shake: import one recipe → CSS contains only its utilities; namespace/dynamic import → ALL recipes + warning.
- Minify: `ShorteningMap` consistency — shortened class in emitted CSS === shortened class in transformed app source === runtime output. Snapshot one recipe end-to-end.
- CLI vs plugin divergence is by design (CLI: no scan/treeshake). Don't chase phantom bugs across paths.

## Harnesses

- `tooling/plugin` colocated unit tests.
- `apps/playground` — live dev sandbox (`pnpm dev:playground`).
- `testing/integration` — the real gate: builds all packages → packs `.tgz` → scaffolds a fresh Vite+Vue+TS app → `styleframe init` with tarball overrides → `vite build` → Playwright asserts computed styles (see `adversarial-qa`).
- `styleframe init` must stay idempotent (re-run on existing project = no-op) — magicast patches Vite/Nuxt configs; verify both detection paths when touching init.
