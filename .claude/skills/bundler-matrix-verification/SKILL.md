---
name: bundler-matrix-verification
description: How to verify @inkline/plugin and @inkline/cli changes across the 6 bundler adapters and the two compile paths, including watch-mode scenarios and error-path checks. Use for any core/plugin or tooling/cli change and for QA of tooling claims.
---

# Bundler matrix verification

## The matrix

`@inkline/plugin` is one unplugin factory with **6 adapters**: `vite`, `webpack`, `rollup`, `esbuild`, `rspack`, `farm` — consumed as `@inkline/plugin/<bundler>` (or `inkline/plugin/<bundler>` via the barrel). All bundler peer deps are optional; consumers install only theirs. The factory registers a single transform matching `*.ink.tsx` that runs `compileIncremental` from `@inkline/compiler`.

Plugin options (`InklinePluginOptions`): `target` (**required**, no auto-detection — `undefined` is a build-time error), `sourceMap`, `config` (inline partial config; the plugin does **not** load `inkline.config.ts` — pair with `@inkline/config-loader`). It builds with **unbuild**, not `vp pack` — exports-map changes touch both `package.json` and consumer tsconfigs.

**Reality check: the plugin has ZERO direct tests today.** Its coverage rides the compiler fixture suite (same compile path) and repo consumers. Any plugin change should leave tests behind; building the matrix harness is a standing mission.

## "Works in Vite" is not done

| Change class                                     | Minimum verification                                                                   |
| ------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Factory core (transform wiring, filter, options) | Vite + webpack + one of Rollup/Rspack, fresh app builds per target                     |
| Incremental/cache behavior                       | Repeated builds + file edits; confirm `compileIncremental` reuses state, output stable |
| Source-map flag                                  | V3 map emitted/omitted per flag; mappings hit the `.ink.tsx` source                    |
| Adapter-specific subpath                         | That adapter + Vite as control                                                         |
| CLI compile / barrels / story generation         | `pnpm --filter @inkline/components build` + inspect `ui/*/.inkline/` + generated CSF   |
| `inkline init` / `add`                           | Fresh temp dir AND a messy existing project; re-run must be idempotent                 |

## The two paths (test the right one)

- **CLI path** — `inkline compile 'src/**/*.ink.tsx' --config inkline.config.ts`: config-loader → glob → compile per target → write `targetOutDir` (`.inkline/`) → barrels (`index`/`headless`/`stories` per config `barrels`) → story CSF via `@inkline/storybook/generator`. `--watch` recompiles on change; `--no-clean` preserves outputs; `--src-dir` controls path preservation; `--target` filters targets.
- **Plugin path** — bundler transform, in-memory, one target, no barrels/stories/config file.

Divergence is by design; a bug report must say which path. `inkline check` re-exposes compiler diagnostics without writing output — the cheap first probe.

## Error paths (must stay loud and typed)

- Missing `target` on the plugin → clear build-time error, not a silent no-op.
- Compiler diagnostics must surface through the bundler with file/loc (a swallowed INK error is a p1).
- CLI: unknown glob → helpful message; diagnostics formatted TTY-aware (`lib/diagnostics.ts`); writes atomic with source-map sidecars (`lib/writer.ts`).
- Config discovery is deliberately narrow: `inkline.config.{ts,js,mjs}` only — no rc files, no package.json field, no dotenv (`core/config-loader` disables them). Widening discovery is a decision, not a patch.

## Harnesses & consumers

- Compiler-side: `@inkline/compiler/testing` + `@inkline/test-utils` (compile/mount/conformance) — plugin transforms should get colocated tests that call the factory's transform directly.
- Live consumers that double as smoke tests: `ui/components` build (CLI path), per-framework Storybooks (consume `.inkline/` output), the e2e visual-parity suite.
- Remember stale dist: `vp pack` in `core/compiler` before verifying CLI/plugin behavior after compiler edits.
- Watch-mode scenarios once plugin HMR lands (v1 frontier): edit component → only affected module recompiles; edit `inkline.config.ts` → full reload; introduce a diagnostic then fix → dev server survives with correct output. Design tests for these now; don't let HMR ship untested.
