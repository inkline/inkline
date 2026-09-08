# website

The documentation and marketing site for Inkline. Private (`"private": true` in [`package.json`](./package.json)) — never published to npm. Deployed as a fully prerendered static site on Vercel, with zero serverless functions — see [ADR-007](../../docs/adrs/007-website-ships-as-a-static-site.md) and [`vercel.json`](./vercel.json).

A Nuxt 4 + Nuxt Content app that **extends** the published [`@uxfront/layer-docs`](https://www.npmjs.com/package/@uxfront/layer-docs) layer. The theme supplies the shell (layout, left-nav, TOC, search, dark mode, mobile menu, i18n, content components); this app supplies only Inkline's brand, its section topology, and its markdown.

## Layout

```
apps/website/
├── nuxt.config.ts          # extends ["@uxfront/layer-docs"], css, site, llms, routeRules
├── content.config.ts       # defineDocsCollections([...DOCS_SECTIONS])
├── tsconfig.json           # Nuxt project references
├── app/
│   ├── app.config.ts       # brand fields, header links, docsTheme.frameworks (7)
│   ├── assets/css/main.css # Inkline palette + --ui-primary; imports theme base CSS
│   └── constants/
│       └── sections.ts     # DOCS_SECTIONS — the nav/content topology
└── content/
    ├── index.md
    ├── _compiler/          # parked, unrouted — compiler pages awaiting /compiler
    └── docs/
        ├── 01.getting-started/  # 00.index, 01.installation, 02.first-component,
        │                        # 03.theming, 04.framework-support
        └── 03.components/01.button.md
```

## Shared vs. local

- **From the theme (do NOT copy or edit here):** layout, search, i18n, navigation, config/routing modules, `BrowserFrame` / `Video` / `FrameworkSwitcher` / `StorybookEmbed` content components, OG image templates, base CSS, Nuxt presets. If a build needs a theme change, flag it upstream — do not fork the package into this app.
- **Local to this app:** brand fields in `app/app.config.ts`, palette in `app/assets/css/main.css` (`--ui-primary`), the `DOCS_SECTIONS` topology + `content.config.ts`, and all markdown under `content/`.

## Multi-framework component examples

Component pages show the same story compiled for every framework via the theme's generalized `FrameworkSwitcher`. The tab list is declared once in `app/app.config.ts` under `docsTheme.frameworks` (react, vue, svelte, solid, angular, qwik, astro) and read by the switcher.

Each tab embeds that framework's deployed Storybook story through the theme's `StorybookEmbed` component (ADR-002 option (b) — embed live stories, not committed code snippets):

```md
::framework-switcher
#react
:storybook-embed{framework="react" story="components-actions-button--default" title="React"}
#vue
:storybook-embed{framework="vue" story="components-actions-button--default" title="Vue"}
::
```

`StorybookEmbed` builds its iframe `src` from `runtimeConfig.public.storybookBaseUrl`. The layer leaves that empty — the host is a consumer fact — so `nuxt.config.ts` sets the convention `https://{framework}.storybook.inkline.io`, overridable at build time via `NUXT_PUBLIC_STORYBOOK_BASE_URL`. There is no canonical deployed Storybook host committed yet — see "Known gaps".

The embed mounts its iframe only once it nears the viewport, reserves its height up front (zero layout shift), and grows to fit the story. Auto-height and colour-mode sync need the `@uxfront/layer-docs/storybook` bridge installed on the Storybook side; without it the embed holds its default height and keeps its own theme — degraded, not broken. See "Known gaps".

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

`generate` is the build that ships. `build` (node-server) is a local convenience only — it does not emit `robots.txt`, `sitemap.xml`, `200.html` or `404.html`, all of which the deploy needs.

## Deploy

Vercel, fully static. `vercel.json` sets `NITRO_PRESET=vercel_static`, which writes the Build Output API bundle to `.vercel/output` — `static/` only, no `functions/`. Copy `.env.example` to `.env` for local dev; every `NUXT_PUBLIC_*` is baked into the HTML at build time, so changing one on Vercel requires a rebuild, not a restart.

The layer's `/` → `/llms.txt` content negotiation is a Nitro server plugin and cannot run here. It is re-expressed as edge rules in `nitro.vercel.config.routes` in [`nuxt.config.ts`](./nuxt.config.ts) — **not** in `vercel.json`, whose `routes`/`redirects` Vercel ignores once `.vercel/output/config.json` exists. Any future server-only behaviour the layer ships needs the same treatment or it silently no-ops; ADR-007 records this as a standing cost.

## Conventions

- `typescript` is pinned to `catalog:ts6` here: `@vue/compiler-sfc` breaks under the default TS7 catalog, so the docs app holds back to TS6.
- `@uxfront/layer-docs` is covered by the `@uxfront/*` glob in the root `pnpm-workspace.yaml` `minimumReleaseAgeExclude` — the package was published recently and would otherwise trip pnpm's 24h supply-chain guard on install.
- Content lives under `content/docs/<NN.section>/<NN.page>.md`; the numeric prefixes drive order and are stripped from the route. Sections must match `DOCS_SECTIONS` in `app/constants/sections.ts`.
- Only document real, shipped components. The Button page mirrors `ui/components`'s `IButton` stories (story ids under `Components/Actions/Button`).
- OG images come from the layer, which registers `nuxt-og-image` itself. `nuxt-og-image`, `satori` and `@resvg/resvg-js` are therefore non-optional peers this app installs; without the rasteriser every card prerenders as `renderer.createImage error` and emits nothing. The card accent is resolved to a literal at build time by following `--ui-primary` to `--color-purple` in `app/assets/css/main.css` — satori has no CSS cascade, so a custom property would render as nothing.

## Known gaps

- **Storybook host:** no deployed Storybook URL is committed anywhere in the repo (Storybook deploy is out of scope per `apps/storybook/AGENTS.md`; CI only uploads artifacts). The embeds point at the documented `https://{framework}.storybook.inkline.io` convention and are overridable via env. When a real host lands, set `NUXT_PUBLIC_STORYBOOK_BASE_URL` (or update `runtimeConfig.public.storybookBaseUrl` in `nuxt.config.ts`).
- **Storybook bridge not installed:** the per-framework Storybooks under `ui/*` do not yet call `installDocsEmbedPreviewBridge` from `@uxfront/layer-docs/storybook`, so embeds hold their default height and do not follow the page's colour mode. Worth doing alongside the Storybook deploy above — both halves are useless until a host exists.

## See also

- [docs/contributing.md](../../docs/contributing.md) — repo-wide dev loops.
- [`@uxfront/layer-docs`](https://www.npmjs.com/package/@uxfront/layer-docs) — the extended docs layer.
