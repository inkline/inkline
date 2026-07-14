# inkline (barrel package)

The user-facing umbrella package: a single `pnpm add inkline` gives consumers the authoring API, the compiler, the build plugins, the CLI, and per-framework component bundles via subpath imports.

This is the **public API surface** for end users. Treat the `exports` map in [`package.json`](./package.json) as the contract — subpath changes are breaking changes.

## Subpath map

| Subpath                                                                     | Re-exports                              | Source                                           |
| --------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------ |
| `.`                                                                         | `@inkline/core` (authoring API)         | [`src/index.ts`](./src/index.ts)                 |
| `./cli`                                                                     | `@inkline/cli`                          | [`src/cli.ts`](./src/cli.ts)                     |
| `./compiler`                                                                | `@inkline/compiler`                     | [`src/compiler.ts`](./src/compiler.ts)           |
| `./config-loader`                                                           | `@inkline/config-loader`                | [`src/config-loader.ts`](./src/config-loader.ts) |
| `./plugin/vite` … `./plugin/farm`                                           | `@inkline/plugin/<bundler>` (6 entries) | [`src/plugin/`](./src/plugin/)                   |
| `./react`, `./vue`, `./svelte`, `./solid`, `./angular`, `./qwik`, `./astro` | `@inkline/<framework>`                  | [`src/<framework>.ts`](./src/)                   |

The framework subpaths are listed as **optional** peer deps in [`package.json`](./package.json) `peerDependenciesMeta` so end users only install the framework packages they use.

The root entry (`src/index.ts`) is literally `export * from "@inkline/core";` — the bare `import { … } from "inkline"` gives consumers the authoring primitives. Compiler, plugin, and framework code is opt-in via subpath.

## CLI binary

`bin/inkline.mjs` is shipped via [`package.json`](./package.json) `bin`. It is a thin re-export of `@inkline/cli`'s binary so end users can run `npx inkline compile …` directly. Keep this file behavior in sync with [`tooling/cli/bin/inkline.mjs`](../../tooling/cli/) — see [`tooling/cli/AGENTS.md`](../../tooling/cli/AGENTS.md).

## Build

`vp pack`. Produces one entry per `exports` subpath under `dist/` (`.mjs`, `.cjs`, `.d.mts`). Adding or removing a subpath requires:

1. Update `exports` in [`package.json`](./package.json).
2. Add/remove the matching `src/<name>.ts` file.
3. Update the corresponding `peerDependencies` + `peerDependenciesMeta` if it's framework-gated.
4. Bump the major version via a changeset if the change removes or renames an existing subpath.

## Tests

None in this package. The barrel forwards to upstream packages whose own test suites are authoritative. If you find yourself wanting to test a barrel re-export, the right fix is usually to test the underlying package instead.

## See also

- [docs/release-process.md](../../docs/release-process.md) — versioning. Subpath stability is the dominant SemVer concern for this package.
- [`tooling/cli/AGENTS.md`](../../tooling/cli/AGENTS.md) — CLI behavior.
- The per-framework AGENTS.md under [`ui/`](../../ui/) — what `inkline/<framework>` exports per framework.
