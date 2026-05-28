# @inkline/config-loader

Thin wrapper around [c12](https://github.com/unjs/c12) for loading `inkline.config.ts` / `.js` / `.mjs`. Consumed by [`@inkline/cli`](../../tooling/cli/) and any tool that needs to resolve a project's Inkline config.

## Public API

Two exports from [`src/index.ts`](./src/index.ts):

| Export            | Signature                                      | Purpose                                                                                      |
| ----------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `loadConfig<T>`   | `(options) → Promise<{ config, configFile? }>` | Find and load the config file. Returns the merged config + the resolved path (when present). |
| `defineConfig<T>` | `(config) → config`                            | Identity helper for type inference in user `inkline.config.ts`.                              |

`LoadConfigOptions<T>`:

- `name` — config file base name. Default `"inkline"` (so the loader looks for `inkline.config.ts`, `.js`, `.mjs`, …).
- `cwd` — search directory. Default `process.cwd()`.
- `configFile` — explicit path, bypasses name-based search.
- `defaults` — merged under the loaded config.

## What it intentionally does NOT do

c12 supports several discovery mechanisms we explicitly disable in [`src/index.ts`](./src/index.ts):

- `rcFile: false` — no `.inklinerc`.
- `globalRc: false` — no `~/.inklinerc`.
- `packageJson: false` — no `"inkline"` field in `package.json`.
- `dotenv: false` — no env-driven overrides.

Only `inkline.config.{ts,js,mjs}` is honored. Adding new discovery surfaces is a deliberate decision — update [README](../compiler/README.md) "Configuration" and [docs/conventions.md](../../docs/conventions.md) if you change this.

## Build

`vp pack`. Single entry: `dist/index.mjs` + `dist/index.d.mts`.

## Tests

[`src/index.test.ts`](./src/index.test.ts) covers happy paths and the disabled discovery surfaces. Keep these — they're the regression net for the deliberate decisions above.

## See also

- [`core/compiler/README.md`](../compiler/README.md) "Configuration" — user-facing config options.
- [`tooling/cli/AGENTS.md`](../../tooling/cli/AGENTS.md) — primary consumer.
