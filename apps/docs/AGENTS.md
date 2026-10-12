# website

The documentation and marketing site for Inkline. Private (`"private": true` in [`package.json`](./package.json)), so it's never published to npm. It deploys to Vercel as a fully prerendered static site with zero serverless functions: see [ADR-007](../../docs/adrs/007-website-ships-as-a-static-site.md) and [`vercel.json`](./vercel.json).

The site is a copy of the [Open Components](https://github.com/uxfront-com/open-components) site shell, on the same published packages: [`@uxfront/layer-ui`](https://www.npmjs.com/package/@uxfront/layer-ui) for the homepage kit, [`@uxfront/layer-docs`](https://www.npmjs.com/package/@uxfront/layer-docs) for the docs theme (Docus plus a framework switcher), [`@uxfront/ui`](https://www.npmjs.com/package/@uxfront/ui) for the homepage components and [`@uxfront/scene`](https://www.npmjs.com/package/@uxfront/scene) for its WebGL scene. This app supplies Inkline's brand, its homepage and its markdown.

## Layout

```
apps/website/
├── nuxt.config.ts            # extends layer-ui + layer-docs, site URL, redirects, Vercel edge rules
├── app/
│   ├── app.vue               # mounts Docus under /docs, the homepage everywhere else
│   ├── app.config.ts         # GitHub links, docsTheme (frameworks, wordmark, byline), ui colours
│   ├── app.css               # Inkline's purple scale and --ui-primary, Tailwind @source lines
│   ├── error.vue             # UxErrorPage
│   ├── pages/index.vue       # the homepage: UxSite, UxHeader, UxHero, UxChapter, UxFinale
│   ├── components/
│   │   ├── app/              # AppHeaderCTA, AppHeaderBody: the docs header's links;
│   │   │                     # VersionSelect (<AppVersionSelect>): the version select
│   │   └── content/          # StorybookEmbed, BrowserFrame: the embed port
│   ├── composables/useHeaderLinks.ts
│   ├── data/site.ts          # DOCS_URL, GITHUB_URL
│   ├── data/versions.ts      # VERSIONS: v5 (this site), v4, v3, v2
│   └── lib/storybookEmbed.ts # the embed's URL and message helpers
├── server/
│   ├── routes/sitemap.xml.ts # the homepage, then the docs pages
│   ├── middleware/raw-markdown.ts  # /raw/<path>.md from each page's source
│   └── lib/                  # headers, docs, raw
├── test/                     # brand palette, embed helpers, versions; site.build.test.ts after generate
└── content/
    ├── _compiler/            # parked, unrouted: compiler pages awaiting /compiler
    └── docs/
        ├── 01.getting-started/  # .navigation.yml, 00.index, 01.installation,
        │                        # 02.first-component, 03.theming, 04.framework-support
        └── 03.components/       # .navigation.yml, 01.button
```

## Shared and local

- **From the packages (don't copy or edit here):** Docus's header, sidebar, search, table of contents, colour mode, llms.txt, robots.txt and OG images; the layer's `FrameworkSwitcher`, Framework select and header wordmark; the homepage components and the scene. If a build needs a package change, flag it upstream rather than forking the package into this app.
- **Copied from Open Components:** `app/app.vue`, `app/error.vue`, the header overrides in `app/components/app/`, `useHeaderLinks`, `server/`, and the generic parts of `nuxt.config.ts` and `app/app.config.ts`. Keep them close to the source, so a fix there carries over.
- **Local to this app:** the brand (`app/app.config.ts`, `app/app.css`), the homepage, the embed port, the Vercel rules and all markdown under `content/`.

## Docs content

Docus renders `content/docs/` at `/docs`. The numeric prefixes order the sidebar and are stripped from the URL: `01.getting-started/01.installation.md` is served at `/docs/getting-started/installation`, and `00.index.md` at `/docs/getting-started`. Each section folder has a `.navigation.yml` with its sidebar title and icon. There is no section registry: a section shows once its folder holds a page.

## Multi-framework examples

The reader picks a framework once, in the Framework select above the sidebar (in the header's menu below 768px), and every `::framework-switcher` on the site shows that framework's slot. The seven frameworks, in Inkline's order, are `docsTheme.frameworks` in `app/app.config.ts`.

The Button page embeds each framework's Storybook story inside its slot, through `StorybookEmbed`:

```md
::framework-switcher
#react
:storybook-embed{framework="react" story="components-actions-button--default" title="React"}
#vue
:storybook-embed{framework="vue" story="components-actions-button--default" title="Vue"}
::
```

`@uxfront/layer-docs` dropped `StorybookEmbed` in 0.5.0, so this app carries a port of the 0.4.1 component: `app/components/content/StorybookEmbed.vue`, its helpers in `app/lib/storybookEmbed.ts`, and `BrowserFrame.vue`, a stand-in for the frame 0.7.1 and Docus no longer ship. The embed builds its iframe `src` from `runtimeConfig.public.storybookBaseUrl`, which `nuxt.config.ts` sets to `https://{framework}.storybook.inkline.io` and `NUXT_PUBLIC_STORYBOOK_BASE_URL` overrides at build time. It mounts the iframe only once it nears the viewport and reserves its height up front, so the page doesn't shift.

## Version select

Both headers have a Version select that shows v5, this site, and lists the older docs sites: v4, v3 and v2, each at `https://v<n>.inkline.io/`. The list is `app/data/versions.ts`, and `app/components/app/VersionSelect.vue` renders it on Nuxt UI's `USelect`. Nuxt names it `AppVersionSelect`, after its folder. It sits in the homepage's `UxHeader` actions, in the docs header beside the links (`AppHeaderCTA`), and in the docs header's menu below 768px, under the Framework select (`AppHeaderBody`).

Picking a version opens its site in the same tab. Only a click, or Enter or Space on an option, picks one: the arrow keys move through the open list without leaving the page. Keep it off a native `<select>`, which fires `change` on each arrow key on Windows and Linux.

The homepage paints before Tailwind loads, so `app/pages/index.vue` styles the trigger like its header links. Those rules are unlayered and win over Nuxt UI's, whose text colour follows the docs' colour mode. The open list follows that colour mode, light or dark.

## Running

```bash
pnpm --filter website dev   # nuxt dev with HMR
```

## Build

```bash
pnpm --filter website generate     # static prerender → .output/public
pnpm --filter website test         # source tests: the brand palette, the embed helpers, the versions
pnpm --filter website test:build   # after generate: the files the deploy needs, the Version select, no assistant
```

`generate` is the build that ships, and it fails on any page that doesn't prerender (`nitro.prerender.failOnError`). `build` (node-server) is a local convenience only: it emits no `robots.txt`, `200.html` or `404.html`, all of which the deploy needs.

## Deploy

Vercel, fully static. `vercel.json` sets `NITRO_PRESET=vercel_static`, which writes the Build Output API bundle to `.vercel/output`: `static/` only, no `functions/`. Copy `.env.example` to `.env` for local work. Every `NUXT_PUBLIC_*` value is baked into the HTML at build time, so changing one on Vercel takes a rebuild, not a restart.

Docus's server features have nothing to run on here, so they're off: `mcp.enabled: false` and `docus.assistant.enabled: false`, which also keeps the assistant's button out of the docs header when the build can reach an AI gateway (`VERCEL_OIDC_TOKEN`). A `nitro:config` hook drops the assistant's endpoint from the public runtime config, where Docus writes it even when it's off.

The `/` → `/llms.txt` negotiation for agents and curl is two edge rules in `nitro.vercel.config.routes` in [`nuxt.config.ts`](./nuxt.config.ts), not in `vercel.json`, whose `routes` and `redirects` Vercel ignores once `.vercel/output/config.json` exists. On Vercel builds, Docus now writes the same negotiation as rewrites to `/llms.txt` and `/raw/<path>.md` ahead of those two rules. Any other server-only behaviour needs the same treatment or it does nothing; ADR-007 records this as a standing cost.

## Conventions

- `typescript` is pinned to `catalog:ts6` here: `@vue/compiler-sfc` breaks under the default TS7 catalog.
- Every `@uxfront/*` version is covered by the `@uxfront/*` glob in the root `pnpm-workspace.yaml` `minimumReleaseAgeExclude`, since they're often published days before this app takes them.
- The root `"@nuxt/vite-builder>vite"` override gives the Nuxt builder upstream vite rather than vite-plus. Keep its range on the vite line `@nuxt/vite-builder` declares for the Nuxt in the lockfile.
- `buildDir` is pinned to `.nuxt` in `nuxt.config.ts`. Nuxt 4.6 otherwise moves `build` and `generate` to `node_modules/.cache/nuxt`, where the root type check can't see Nitro's auto-imports.
- `ui.colors.primary: "purple"` resolves onto the purple scale in `app/app.css`, based on the brand mark's `#863bff`. Keep the two in step.
- Only document real, shipped components. The Button page mirrors `ui/components`'s `IButton` stories (story ids under `Components/Actions/Button`).

## Known gaps

- **Storybook host:** no deployed Storybook URL is committed anywhere in the repo (Storybook deploy is out of scope per `apps/storybook/AGENTS.md`, and CI only uploads artifacts). The embeds point at the `https://{framework}.storybook.inkline.io` convention until a host lands; then set `NUXT_PUBLIC_STORYBOOK_BASE_URL` or update `runtimeConfig.public.storybookBaseUrl`.
- **Storybook bridge:** auto-height and colour-mode sync need the Storybook to answer the messages in `app/lib/storybookEmbed.ts`. The bridge that did that, `@uxfront/layer-docs/storybook`, went away with 0.5.0, and the Storybooks under `ui/*` never installed it, so embeds hold their default height and their own theme.
- **Agent discovery on a static host:** the lockfile holds Docus 5.13.0. Docus 5.14 adds `nuxt-agent-discovery` and a prerendered `/openapi.json` that describes each page's Markdown twin and the MCP endpoint, which is off here. Only what's prerendered survives on a static host, and its server routes are inert, so check what both claim when Docus is bumped.

## See also

- [docs/contributing.md](../../docs/contributing.md): repo-wide dev loops.
- [`@uxfront/layer-docs`](https://www.npmjs.com/package/@uxfront/layer-docs): the docs layer.
