# @inkline/plugin

Build-tool integration for [`@inkline/compiler`](../compiler/). Wraps the compiler in [`unplugin`](https://unplugin.unjs.io/) so the same source can produce Vite, webpack, Rollup, esbuild, Rspack, and Farm plugins.

## What it does

The factory in [`src/index.ts`](./src/index.ts) (`unpluginFactory`) registers a single transform that matches `*.ink.tsx` files and runs them through the compiler's incremental mode (`compileIncremental` from `@inkline/compiler`). Each bundler subpath ([`src/vite.ts`](./src/vite.ts), [`src/webpack.ts`](./src/webpack.ts), …) re-exports the same factory through unplugin's per-bundler adapter. The factory also carries two Vite-specific hooks: `configResolved` auto-detects the target from a co-installed framework plugin, and `handleHotUpdate` recompiles `.ink.tsx` files on HMR.

```ts
import { defineConfig } from "vite";
import inkline from "@inkline/plugin/vite";

export default defineConfig({
  plugins: [inkline({ target: "react" })],
});
```

## Public API

A single options shape ([`InklinePluginOptions`](./src/index.ts)):

| Option      | Type                     | Default | Notes                                                                                                                                                                                                            |
| ----------- | ------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`    | `TargetName`             | —       | **Required on every bundler except Vite**, where it is auto-detected from a co-installed framework plugin (react/solid/vue/svelte; falls back to `react`). Missing target elsewhere triggers a build-time error. |
| `sourceMap` | `boolean`                | `true`  | Inline V3 maps by default; `false` disables emission (`sourceMap: "none"`).                                                                                                                                      |
| `config`    | `Partial<InklineConfig>` | `{}`    | Inline compiler config, merged with defaults. The plugin does not load `inkline.config.ts` — pair with [`@inkline/config-loader`](../config-loader/) if needed.                                                  |

Entry points (from [`package.json`](./package.json) `exports`):

| Subpath       | Bundler                                       |
| ------------- | --------------------------------------------- |
| `.` (default) | Bundler-agnostic `unpluginFactory` (advanced) |
| `./vite`      | Vite ≥5                                       |
| `./webpack`   | webpack 4 / 5                                 |
| `./rollup`    | Rollup 3 / 4                                  |
| `./esbuild`   | esbuild                                       |
| `./rspack`    | Rspack ≥1                                     |
| `./farm`      | Farm ≥1                                       |

All bundler peer deps are **optional** ([`package.json`](./package.json) `peerDependenciesMeta`) so you only install the bundler you use.

## Build

Builds with [`unbuild`](https://github.com/unjs/unbuild), not `vp pack`. `pnpm dev` watches; the production build is currently triggered indirectly via `pnpm run build` at the workspace root (`vp run -r build`). If the build shape changes (multiple dist entries per bundler), update both [`package.json`](./package.json) `exports` and any tsconfig path mapping in consumers.

## Tests

Direct unit coverage lives in [`src/index.test.ts`](./src/index.test.ts) — `vp test` runs it, and [`vite.config.ts`](./vite.config.ts) enforces 100% line/branch/function/statement thresholds. The suite mocks `@inkline/compiler` and drives the factory directly: the transform handler (target resolution, source-map mode, main-file selection, diagnostic forwarding, incremental state threading), Vite `configResolved` target auto-detection and `handleHotUpdate`, the `enforce: "pre"` ordering guarantee, the `.ink.tsx`-only transform filter, and the six bundler adapter re-exports.

Because the compiler is mocked, the plugin↔compiler seam (real `GeneratedFile` / `files[target]` shape) is covered instead by the [`@inkline/compiler`](../compiler/) fixture suite (compile is the same code path) and by real consumers (the apps + ui/components build). Keep the mock boundary; add cases here for any new bundler-specific logic.

## See also

- [`core/compiler/AGENTS.md`](../compiler/AGENTS.md) — what the plugin delegates to.
- [`core/config-loader/AGENTS.md`](../config-loader/AGENTS.md) — for loading `inkline.config.ts` from a plugin consumer.
- [docs/architecture.md](../../docs/architecture.md) → "Compilation pipeline" — what happens inside the `transform` hook.
