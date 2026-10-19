# @inkline/astro

The Astro output of Inkline's component compilation.

## STOP — do not edit `src/` or `.inkline/` here

This package is **auto-generated**. To change a component, edit the corresponding `.ink.tsx` file in [`ui/components/src/components/`](../components/) and rebuild. See [`ui/components/AGENTS.md`](../components/AGENTS.md).

- `.inkline/` — compiled `.astro` components + `index.ts`/`headless.ts`/`stories.ts` barrels written by [`inkline compile`](../../tooling/cli/AGENTS.md). Never hand-edit.
- `src/index.ts` — re-exports `.inkline/index.ts`.
- `src/css.ts` — entry of the CSS-only `vp build` that runs before `vp pack` (which never runs Vite plugins). Its extracted stylesheet is copied to `dist/index.css`, what `./css` resolves to.
- `.styleframe/` — auto-generated styleframe artifacts. Never hand-edit.

## Public surface

From [`package.json`](./package.json) `exports`:

| Subpath          | Contents                                     |
| ---------------- | -------------------------------------------- |
| `.`              | All compiled styled components (with types). |
| `./headless`     | The headless parts barrel.                   |
| `./stories`      | The compiled stories barrel.                 |
| `./css`          | Compiled CSS bundle.                         |
| `./package.json` | The manifest.                                |

Peer dep: `astro >= 4`.

## Storybook

Runs on **port 6012**. `pnpm storybook` here or `pnpm run storybook:astro` from the repo root. Uses [`@storybook-astro/framework`](https://www.npmjs.com/package/@storybook-astro/framework).

The static build is public, so [`.storybook/main.ts`](./.storybook/main.ts) keeps the build host's absolute paths out of `storybook-static`. It turns off Astro's dev toolbar, because the framework prerenders the stories through a Vite dev server, where the toolbar adds `data-astro-source-file` to every element. A build-only Vite plugin then strips the repo root from each component's `moduleId` in the client chunks. After `pnpm storybook:build`, `grep -rlF "$PWD" ui/astro/storybook-static` from the repo root finds nothing.

## Build

`vp pack` (not `vp build` — unique to this package today). Output goes to `dist/`.

## Notable target behavior

The `<Transition>` IR node is **unwrapped** by the Astro target — the child element is emitted directly with class names but no runtime. Astro is largely static; transitions need framework-level JS to animate, which this output does not ship. See [docs/architecture.md](../../docs/architecture.md) → "Where `<Slot>` and `<Transition>` live".

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md) — where to edit components.
- [docs/architecture.md](../../docs/architecture.md) → "Cross-framework strategy".
