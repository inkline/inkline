# @inkline/angular

The Angular output of Inkline's component compilation (standalone components).

## STOP — do not edit `src/` or `.inkline/` here

This package is **auto-generated**. To change a component, edit the corresponding `.ink.tsx` file in [`ui/components/src/components/`](../components/) and rebuild. See [`ui/components/AGENTS.md`](../components/AGENTS.md).

- `.inkline/` — compiled Angular standalone components (`@Component` + template + style files) written by [`inkline compile components`](../../tooling/cli/AGENTS.md). Never hand-edit.
- `src/index.ts` — re-exports `.inkline/index.ts`.
- `.styleframe/` — auto-generated styleframe artifacts. Never hand-edit.

## Public surface

From [`package.json`](./package.json) `exports`:

| Subpath          | Contents                 |
| ---------------- | ------------------------ |
| `.`              | All compiled components. |
| `./package.json` | The manifest.            |

**No `./css` export.** Angular components bundle their own styles per `@Component({ styleUrls: [...] })`. If a downstream tool needs an aggregated CSS file, it must build one from the per-component artifacts.

Peer dep: `@angular/core >= 17`.

## Storybook

Runs on **port 6010**. `pnpm storybook` here or `pnpm run storybook:angular` from the repo root. Uses `@analogjs/storybook-angular` (patched — see `patches/@analogjs__storybook-angular@2.5.1.patch`).

## Build

`vp build`. Output goes to `dist/`.

## Notable target behavior

The `<Transition>` IR node is **unwrapped** by the Angular target — the child element is emitted directly, with the transition class names left as `class="…"` attributes. Animation must be set up manually by the consumer. See [docs/architecture.md](../../docs/architecture.md) → "Where `<Slot>` and `<Transition>` live".

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md) — where to edit components.
- [docs/architecture.md](../../docs/architecture.md) → "Cross-framework strategy".
