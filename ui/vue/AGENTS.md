# @inkline/vue

The Vue 3 output of Inkline's component compilation.

## STOP — do not edit `src/` or `.inkline/` here

This package is **auto-generated**. To change a component, edit the corresponding `.ink.tsx` file in [`ui/components/src/components/`](../components/) and rebuild. See [`ui/components/AGENTS.md`](../components/AGENTS.md).

- `.inkline/` — compiled Vue SFCs (`<script setup>` + Composition API) + `index.ts`/`headless.ts`/`stories.ts` barrels written by [`inkline compile`](../../tooling/cli/AGENTS.md). Never hand-edit.
- `src/index.ts` — re-exports `.inkline/index.ts`. Do not extend with hand-written code.
- `.styleframe/` — auto-generated styleframe artifacts. Never hand-edit.

## Public surface

From [`package.json`](./package.json) `exports`:

| Subpath          | Contents                        |
| ---------------- | ------------------------------- |
| `.`              | All compiled styled components. |
| `./headless`     | The headless parts barrel.      |
| `./stories`      | The compiled stories barrel.    |
| `./css`          | Compiled CSS bundle.            |
| `./package.json` | The manifest.                   |

Peer dep: `vue >= 3`.

## Storybook

Runs on **port 6007**. `pnpm storybook` here or `pnpm run storybook:vue` from the repo root.

## Build

`vp build`. Output goes to `dist/`.

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md) — where to edit components.
- [docs/architecture.md](../../docs/architecture.md) → "Cross-framework strategy".
