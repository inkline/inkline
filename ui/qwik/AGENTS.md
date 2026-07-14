# @inkline/qwik

The Qwik output of Inkline's component compilation.

## STOP — do not edit `src/` or `.inkline/` here

This package is **auto-generated**. To change a component, edit the corresponding `.ink.tsx` file in [`ui/components/src/components/`](../components/) and rebuild. See [`ui/components/AGENTS.md`](../components/AGENTS.md).

- `.inkline/` — compiled Qwik components + `index.ts`/`headless.ts`/`stories.ts` barrels written by [`inkline compile`](../../tooling/cli/AGENTS.md). Never hand-edit.
- `src/index.ts` — re-exports `.inkline/index.ts` (with sibling `src/headless.ts` and `src/stories.ts`).
- `.styleframe/` — auto-generated styleframe artifacts. Never hand-edit.

## Public surface

From [`package.json`](./package.json) `exports`:

| Subpath          | Contents                                                        |
| ---------------- | --------------------------------------------------------------- |
| `.`              | All compiled styled components. Entry is `dist/index.qwik.mjs`. |
| `./headless`     | The headless parts barrel (`dist/headless.qwik.mjs`).           |
| `./stories`      | The compiled stories barrel (`dist/stories.qwik.mjs`).          |
| `./package.json` | The manifest.                                                   |

[`package.json`](./package.json) also declares a top-level `"qwik": "./dist/index.qwik.mjs"` field, picked up by Qwik tooling for lazy resumability.

Peer dep: `@qwik.dev/core >= 2.0.0-beta.0`.

## Storybook

Runs on **port 6011**. `pnpm storybook` here or `pnpm run storybook:qwik` from the repo root. Uses [`storybook-framework-qwik`](https://www.npmjs.com/package/storybook-framework-qwik) (a canary build pinned via the catalog in [`pnpm-workspace.yaml`](../../pnpm-workspace.yaml)).

## Build

`vp build`. Output goes to `dist/` (`index.qwik.mjs`, `headless.qwik.mjs`, `stories.qwik.mjs`).

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md) — where to edit components.
- [docs/architecture.md](../../docs/architecture.md) → "Cross-framework strategy".
