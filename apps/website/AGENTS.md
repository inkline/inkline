# website

The documentation and marketing site for Inkline. Private (`"private": true` in [`package.json`](./package.json)) — never published to npm. Deployed as a static site (deploy target out of scope here).

A Nuxt 4 + Nuxt Content app that **extends** the published [`@uxfront/docs-theme`](https://www.npmjs.com/package/@uxfront/docs-theme) layer. The theme supplies the shell (layout, left-nav, TOC, search, dark mode, mobile menu, i18n, content components); this app supplies only Inkline's brand, its section topology, and its markdown.

## Layout

```
apps/website/
├── nuxt.config.ts          # extends ["@uxfront/docs-theme"], css, site, llms, routeRules
├── content.config.ts       # defineDocsCollections([...DOCS_SECTIONS])
├── tsconfig.json           # Nuxt project references
├── app/
│   ├── app.config.ts       # brand fields, header links, docsTheme.frameworks (7)
│   ├── assets/css/main.css # Inkline palette + --ui-primary; imports theme base CSS
│   ├── constants/
│   │   ├── sections.ts      # DOCS_SECTIONS — the nav/content topology
│   │   └── storybook.ts     # per-framework Storybook base-URL helpers
│   └── components/content/
│       └── StorybookEmbed.vue  # local MDC component: per-tab Storybook iframe
└── content/
    ├── index.md
    └── docs/
        ├── 01.getting-started/01.installation.md
        ├── 02.guide/01.architecture.md
        └── 03.components/01.button.md
```

## Shared vs. local

- **From the theme (do NOT copy or edit here):** layout, search, i18n, navigation, config/routing modules, `BrowserFrame` / `Video` / `FrameworkSwitcher` content components, base CSS, Nuxt presets. If a build needs a theme change, flag it upstream — do not fork the package into this app.
- **Local to this app:** brand fields in `app/app.config.ts`, palette in `app/assets/css/main.css` (`--ui-primary`), the `DOCS_SECTIONS` topology + `content.config.ts`, all markdown under `content/`, and Inkline-specific demo components (`StorybookEmbed.vue`).

## Multi-framework component examples

Component pages show the same story compiled for every framework via the theme's generalized `FrameworkSwitcher`. The tab list is declared once in `app/app.config.ts` under `docsTheme.frameworks` (react, vue, svelte, solid, angular, qwik, astro) and read by the switcher.

Each tab embeds that framework's deployed Storybook story through the local `StorybookEmbed` component (ADR-002 option (b) — embed live stories, not committed code snippets):

```md
::framework-switcher
#react
:storybook-embed{framework="react" story="components-actions-button--default" title="React"}
#vue
:storybook-embed{framework="vue" story="components-actions-button--default" title="Vue"}
::
```

`StorybookEmbed` builds its iframe `src` from `storybook.ts`. The base URL follows the convention `https://{framework}.storybook.inkline.io` and is overridable at runtime via `NUXT_PUBLIC_STORYBOOK_BASE_URL`. There is no canonical deployed Storybook host committed yet — see "Known gaps".

## Running

```bash
pnpm --filter website dev   # nuxt dev with HMR
```

## Build

```bash
pnpm --filter website generate   # static prerender (nitro) → .output/public
pnpm --filter website build      # server build
pnpm --filter website preview    # serve the built output locally
```

The acceptance gate for this app is a clean `nitro prerender`: `nuxt generate` must finish with no errors.

## Conventions

- `typescript` is pinned to `catalog:ts6` here: `@vue/compiler-sfc` breaks under the default TS7 catalog, so the docs app holds back to TS6.
- `@uxfront/docs-theme` is listed in the root `pnpm-workspace.yaml` `minimumReleaseAgeExclude` — the package was published recently and would otherwise trip pnpm's 24h supply-chain guard on install.
- Content lives under `content/docs/<NN.section>/<NN.page>.md`; the numeric prefixes drive order and are stripped from the route. Sections must match `DOCS_SECTIONS` in `app/constants/sections.ts`.
- Only document real, shipped components. The Button page mirrors `ui/components`'s `IButton` stories (story ids under `Components/Actions/Button`).

## Known gaps

- **Storybook host:** no deployed Storybook URL is committed anywhere in the repo (Storybook deploy is out of scope per `apps/storybook/AGENTS.md`; CI only uploads artifacts). The embeds point at the documented `https://{framework}.storybook.inkline.io` convention and are overridable via env. When a real host lands, set `NUXT_PUBLIC_STORYBOOK_BASE_URL` (or update `STORYBOOK_BASE_URL_TEMPLATE` in `app/constants/storybook.ts`).

## See also

- [docs/contributing.md](../../docs/contributing.md) — repo-wide dev loops.
- [`@uxfront/docs-theme`](https://www.npmjs.com/package/@uxfront/docs-theme) — the extended docs layer.
