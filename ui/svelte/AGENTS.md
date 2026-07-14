# @inkline/svelte

The Svelte 5 output of Inkline's component compilation.

## STOP — do not edit `src/` or `.inkline/` here

This package is **auto-generated**. To change a component, edit the corresponding `.ink.tsx` file in [`ui/components/src/components/`](../components/) and rebuild. See [`ui/components/AGENTS.md`](../components/AGENTS.md).

- `.inkline/` — compiled `.svelte` components using runes (`$state`, `$derived`, `$effect`) + `index.ts`/`headless.ts`/`stories.ts` barrels written by [`inkline compile`](../../tooling/cli/AGENTS.md). Never hand-edit.
- `src/index.ts` — re-exports `.inkline/index.ts`.
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

Peer dep: `svelte >= 5`.

## Storybook

Runs on **port 6008**. `pnpm storybook` here or `pnpm run storybook:svelte` from the repo root.

## Build

`vp build`. Output goes to `dist/`.

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md) — where to edit components.
- [docs/architecture.md](../../docs/architecture.md) → "Cross-framework strategy".
