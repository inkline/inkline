# ADR-007: `apps/website` ships as a fully static site on Vercel

Date: 2026-08-08 · Status: Accepted
Deciders: Release/infra · Informed by: internal tracker UXF-170, UXF-158 (gap audit items 5 and 6)
Supersedes: — · Superseded by: —

## Context

`apps/website` had **no deploy path at all** — no `vercel.json`, no `Dockerfile`, no `nixpacks.toml`,
no `.env.example`. The reference implementation, styleframe `apps/docs`, ships all four and runs the
Nuxt **node-server** output behind Nixpacks. Copying that set wholesale was the obvious move and is
the one this ADR declines.

**The host was never actually open.** inkline already runs on Vercel, verified 2026-08-08:
`www.inkline.io` and `storybook.inkline.io` both answer with `server: Vercel`, and three Vercel
projects are wired to this repo through the GitHub integration, posting checks on every PR
(`inkline-io-next-storybook` → `apps/storybook`, `inkline-io-next-storybook-react` → `ui/react`,
`inkline-io-next-storybook-vue` → `ui/vue`). So the real question was not "which host" but "which
Nitro preset on the host we are already on."

**What each mode actually emits**, measured on this app at `@uxfront/layer-docs@0.2.1`, not inferred:

| artifact                         | `nuxt build` (node-server) | `nuxt generate` (static) |
| -------------------------------- | -------------------------- | ------------------------ |
| `index.html`, 4 docs pages       | prerendered file           | prerendered file         |
| `llms.txt`, `llms-full.txt`      | prerendered file           | prerendered file         |
| `/raw/**.md` (4 agent endpoints) | prerendered file           | prerendered file         |
| `robots.txt`                     | runtime handler            | **static file**          |
| `sitemap.xml`                    | runtime handler            | **static file**          |
| `200.html`, `404.html`           | **absent**                 | static file              |

This corrects the gap audit, which recorded that plain `build` emits none of the sitemap/robots/llms
set. It emits most of it: `llms.txt`, `llms-full.txt` and the `/raw/**.md` endpoints are prerendered
under both modes. The genuine delta is four files — `robots.txt`, `sitemap.xml`, `200.html`,
`404.html` — plus two behaviours that only exist with a running Nitro:

1. `/raw/<path>.md` for any path **not** prerendered at build time. Nothing in the app links to
   `/raw/*`, and the content set is fully known at build time, so today this is reachable only by
   typing a URL that does not correspond to a page.
2. The layer's `/` → `/llms.txt` content negotiation
   (`server/plugins/llms-redirect.ts`), which fires on Nitro's `request` hook.

**The cost of keeping a server, priced on Vercel.** Building with `NITRO_PRESET=vercel` produced
**41 MB across 11 serverless functions** — `__fallback`, `__nuxt_error`, `robots.txt`, `sitemap.xml`,
`raw`, `[lang]`, `_ipx` and more — each a 36 MB copy of the same Nitro bundle, each embedding two
native binaries: `better-sqlite3` (Nuxt Content's database driver) and `sharp`. `NITRO_PRESET=vercel_static`
produced **4.8 MB and zero functions**: 8.5× smaller, with no native module in the request path.

Native SQLite inside a serverless function is the fragile part. It is the configuration Nuxt Content
warns about for serverless targets, and it exists here to serve a docs site with **zero request-time
data** — every byte is derivable from markdown in the repo at build time.

**The steelman for node-server, which is real.** styleframe already runs it, so a second mode means
two deploy shapes across two repos, and the `@uxfront/layer-docs` maintainers write server code (the
`llms-redirect` plugin's own docblock says "we deploy the node-server output"). Divergence means the
layer can ship a runtime feature that silently no-ops for inkline. That risk is accepted below, with
a revisit trigger, because the alternative is paying for a runtime that this site's content model
does not need.

## Decision

`apps/website` deploys as a **fully static, prerendered site on Vercel**, built with
`nuxt generate` under `NITRO_PRESET=vercel_static`. No `Dockerfile` and no `nixpacks.toml` are added
— they describe a container runtime this app will not have.

Landed with it:

- **`apps/website/vercel.json`** — `framework: nuxtjs`, install and build commands run from the
  monorepo root so pnpm resolves the single root lockfile.
- **`apps/website/.env.example`** — the `NUXT_PUBLIC_*` surface, documenting that in static mode
  these are **build-time** values baked into the prerendered HTML, not runtime configuration.
- **`nitro.vercel.config.routes` in `nuxt.config.ts`** — restores the `/` → `/llms.txt` content
  negotiation as two Build Output API edge rules, matching `Accept: text/markdown` and `curl/*`.
  These must live in `nuxt.config.ts`: once `.vercel/output/config.json` exists, Vercel ignores
  `vercel.json`'s own `routes`/`redirects` entirely.
- **CI** — `build-website` now runs `generate` and uploads `.output/public`. It previously ran
  `build` and uploaded `apps/website/dist`, a symlink only `generate` creates, so the artifact was
  empty.

The sitemap/robots/llms gap in the audit is closed **by this decision**, not by separate work: all
four files fall out of `generate`.

## Consequences

**Good.**

- Zero serverless functions, so zero cold starts, zero function invocations to pay for, and no
  native `better-sqlite3` or `sharp` in the request path. The whole site is CDN-cacheable.
- A broken deploy cannot be a runtime failure. If the content is wrong the build fails; nothing that
  passed the build can fail in production for a request-shaped reason.
- `robots.txt`, `sitemap.xml` and `404.html` are files in the artifact, greppable in CI, and
  identical in preview and production — not the output of a handler that could behave differently
  per environment.
- Rollback is a Vercel instant rollback to a previous immutable static deployment. Nothing to drain,
  no state to reconcile.
- The deploy artifact is inspectable before it ships: `.vercel/output/static` is exactly what serves.

**Bad.**

- **The layer can ship server behaviour that silently no-ops here.** `llms-redirect.ts` is already an
  instance; we caught it and replaced it with edge rules, but the next one will not announce itself.
  Nothing in CI detects "the layer added a server route and inkline is static." That is a standing
  divergence cost between this app and styleframe, paid on every layer upgrade.
- **`/raw/<path>.md` is now closed-world.** Only prerendered paths resolve; anything else 404s. If a
  future consumer expects to construct those URLs for arbitrary content paths, this decision breaks
  it, and the fix is a mode change rather than a config tweak.
- **Build time grows with page count and every deploy is a full rebuild.** At the audit's 4 content
  files this is 4 seconds for 22 routes. At styleframe's 200 files it is minutes, and there is no
  incremental path without moving to ISR — which means functions, which means reopening this ADR.
- **Two deploy shapes across two repos.** styleframe on node-server, inkline on static. Anyone
  debugging "why does it work there and not here" now has one more axis to check, and the shared
  layer's docs describe the other one.
- **Content search depends on the client-side SQLite WASM path**, not a server query. That is Nuxt
  Content's supported static mode and it works, but it ships the content index to the browser — a
  payload that grows with the corpus and has no server-side fallback to degrade to.

**Neutral.**

- `apps/website/AGENTS.md` already described the app as "Deployed as a static site (deploy target out
  of scope here)." This ADR makes that stated intent real and names the target; it does not reverse a
  prior decision.
- `posthog-js` stays uninstalled and analytics stays off. Static vs node-server does not bear on it —
  the layer's plugin is client-side either way.

## Revisit triggers

Written now, before the first deploy:

- **The docs need any request-time data** — auth, a form endpoint, per-user content, or a search
  backend that cannot ship its index to the client. That is the boundary this decision is drawn at,
  and crossing it is a supersede, not an exception.
- **A full rebuild exceeds ~10 minutes**, or the content corpus passes roughly 500 pages. Then the
  "every deploy is a full rebuild" cost above has arrived and ISR/hybrid rendering needs pricing.
- **`@uxfront/layer-docs` ships a second server-only feature** that matters to inkline. One
  (`llms-redirect`) was worth an edge-rule workaround; a pattern of them means the layer assumes a
  runtime and inkline should stop fighting that.
- **Vercel stops being inkline's host.** The static artifact is portable to any static host, but the
  `nitro.vercel.config` edge rules are not, and they would need re-expressing.
