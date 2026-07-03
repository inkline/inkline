# @inkline/angular

The Angular output of Inkline's component compilation (standalone components).

## STOP — do not edit `src/` or `.inkline/` here

This package is **auto-generated**. To change a component, edit the corresponding `.ink.tsx` file in [`ui/components/src/components/`](../components/) and rebuild. See [`ui/components/AGENTS.md`](../components/AGENTS.md).

- `.inkline/` — compiled Angular standalone components (`@Component` with inline template + a per-component `.css` file imported as a side effect) + `index.ts`/`headless.ts`/`stories.ts` barrels written by [`inkline compile`](../../tooling/cli/AGENTS.md). Never hand-edit.
- `src/index.ts` — re-exports `.inkline/index.ts`.
- `.styleframe/` — auto-generated styleframe artifacts. Never hand-edit.

## Public surface

From [`package.json`](./package.json) `exports`:

| Subpath          | Contents                        |
| ---------------- | ------------------------------- |
| `.`              | All compiled styled components. |
| `./headless`     | The headless parts barrel.      |
| `./stories`      | The compiled stories barrel.    |
| `./package.json` | The manifest.                   |

**No `./css` export.** Each compiled component imports its own `.css` file as a side effect (`import "./IButton.css";`), so styles travel with the components through the consumer's bundler. If a downstream tool needs an aggregated CSS file, it must build one from the per-component artifacts.

Peer dep: `@angular/core >= 17`.

## Storybook

Runs on **port 6010**. `pnpm storybook` here or `pnpm run storybook:angular` from the repo root. Uses `@analogjs/storybook-angular` (the leftover `patches/@analogjs__storybook-angular@2.5.1.patch` is no longer applied since the 2.6.x bump).

## Build

`vp build`. Output goes to `dist/`.

## Notable target behavior

- **Attribute-selector headless parts + zero-wrapper collapse.** A component whose source declares `meta: { headless: true }` (all current components do) emits a second, attribute-selector `@Component` whose host is the root element itself — `button[ink-button-base]` renders the native element with no wrapper. A styled component whose root is a single headless part collapses onto that host, merging the recipe class. The element-selector `<ink-*>` wrapper (with `host: { style: 'display: contents' }`) is still emitted alongside (dual selector).
- The `<Transition>` IR node is **unwrapped** by the Angular target — the child element is emitted directly, with the transition class names left as `class="…"` attributes. Animation must be set up manually by the consumer. See [docs/architecture.md](../../docs/architecture.md) → "Where `<Slot>` and `<Transition>` live".

## See also

- [`ui/components/AGENTS.md`](../components/AGENTS.md) — where to edit components.
- [docs/architecture.md](../../docs/architecture.md) → "Cross-framework strategy".
