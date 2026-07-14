# @inkline/react

The React output of Inkline's component compilation.

## STOP — do not edit `src/` or `.inkline/` here

This package is **auto-generated**. To change a component, edit the corresponding `.ink.tsx` file in [`ui/components/src/components/`](../components/) and rebuild. See [`ui/components/AGENTS.md`](../components/AGENTS.md).

- `.inkline/` — compiled React components + `index.ts`/`headless.ts`/`stories.ts` barrels written by [`inkline compile`](../../tooling/cli/AGENTS.md). Never hand-edit.
- `src/index.ts` — a single line: `export * from "../.inkline/index.ts";`. Re-exports the generated output. Do not extend it with hand-written code; if you need a manual override, route it through `ui/components/` so all seven frameworks stay in sync.
- `.styleframe/` — auto-generated styleframe artifacts. Never hand-edit.

## Public surface

From [`package.json`](./package.json) `exports`:

| Subpath          | Contents                                                           |
| ---------------- | ------------------------------------------------------------------ |
| `.`              | Re-export of `.inkline/index.ts` — all compiled styled components. |
| `./headless`     | The headless parts barrel.                                         |
| `./stories`      | The compiled stories barrel.                                       |
| `./css`          | Compiled CSS bundle.                                               |
| `./package.json` | The manifest.                                                      |

Peer dep: `react >= 18`.

## Storybook

Runs on **port 6006**. Use `pnpm storybook` here or `pnpm run storybook:react` from the repo root (the latter co-runs the `.ink.tsx` compiler in watch mode).

The `prestorybook` script runs `inkline compile` for the React target so the latest authoring source is reflected before Storybook starts.

## Build

`vp build`. Output goes to `dist/` (JS + CSS).

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md) — where to actually edit components.
- [docs/architecture.md](../../docs/architecture.md) → "Cross-framework strategy" — how the React-specific output is produced.
