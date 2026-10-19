# @inkline/storybook-app

The **unified Storybook aggregator**. Runs on port 6100 and embeds the seven per-framework Storybooks (6006–6012) via [Storybook composition](https://storybook.js.org/docs/sharing/storybook-composition). One UI, every framework, side-by-side.

Private (`"private": true` in [`package.json`](./package.json)) — never published.

## Layout

```
apps/storybook/
├── .storybook/
│   ├── main.ts         # framework: @storybook/react-vite + refs to all 7 per-framework Storybooks
│   ├── manager.ts      # Workaround addon: clears a ref's loader once its story renders
│   └── preview.ts      # Aggregator-level preview parameters
├── stories/
│   └── Welcome.stories.ts   # Landing/welcome stories shown in the aggregator
├── wrangler.json       # the inkline-storybook Cloudflare Worker: dist/ as static assets
└── dist/               # storybook:build output (per CI)
```

## How composition works

[`.storybook/main.ts`](./.storybook/main.ts) declares one `refs` entry per framework:

```ts
const ref = (port: number, path: string) => (DEV ? `http://localhost:${port}` : path);

refs: {
  react: { title: "React", url: ref(6006, "./react") },
  vue:   { title: "Vue",   url: ref(6007, "./vue") },
  // … svelte (6008), solid (6009), angular (6010), qwik (6011), astro (6012)
}
```

- **In dev** (`pnpm storybook` here, or `pnpm run storybook` from the repo root), each `url` points to the corresponding framework's live Storybook on `localhost:<port>`.
- **In production** (built by `pnpm storybook:build`), each `url` resolves through the config surface below. By default it is a relative path, which only resolves when one host serves each framework's built `storybook-static` under that path. Each framework deploys to a Worker of its own instead (see [Deploy](#deploy)), so the deployed build sets the ref URLs below.

## Configuring production ref domains

The seven production ref URLs are configurable via environment variables read at **build time** (`pnpm storybook:build`). Resolution is per-framework, in precedence order:

1. `STORYBOOK_REF_<FRAMEWORK>` — a full per-framework override URL. `<FRAMEWORK>` is the upper-cased key: `STORYBOOK_REF_REACT`, `STORYBOOK_REF_VUE`, `STORYBOOK_REF_SVELTE`, `STORYBOOK_REF_SOLID`, `STORYBOOK_REF_ANGULAR`, `STORYBOOK_REF_QWIK`, `STORYBOOK_REF_ASTRO`.
2. `STORYBOOK_REF_BASE_URL` — a template with a `{framework}` placeholder applied to every framework at once.
3. **Default** — the framework's relative path (`./react`, `./vue`, …). This is today's behavior, unchanged when no env var is set.

```bash
# Point every framework at its own subdomain in one shot:
STORYBOOK_REF_BASE_URL="https://{framework}.storybook.inkline.io" pnpm storybook:build
#   → react → https://react.storybook.inkline.io, vue → https://vue.storybook.inkline.io, …

# Override a single framework (takes precedence over the template):
STORYBOOK_REF_BASE_URL="https://{framework}.storybook.inkline.io" \
STORYBOOK_REF_QWIK="https://qwik-canary.storybook.inkline.io" pnpm storybook:build
```

Dev URLs (`localhost:<port>`) are unaffected by these variables.

## The ref loader workaround

[`.storybook/manager.ts`](./.storybook/manager.ts) registers a small manager addon that marks a ref's preview as initialised once one of its stories renders. Without it, a ref's story sometimes stays under "Content is loading..." after it has rendered: Storybook's `updateRef` writes the whole refs map from a stale snapshot, so the ref's `previewInitialized` flag can be lost (seen in 10.4.4). Remove the file once Storybook fixes `updateRef` upstream.

## Deploy

Each Storybook has a Cloudflare Worker config of its own, for Workers Builds. A `wrangler.json` beside each `package.json` names the Worker and serves the built Storybook as static assets:

| Worker                      | Package          | Assets              |
| --------------------------- | ---------------- | ------------------- |
| `inkline-storybook`         | `apps/storybook` | `dist/`             |
| `inkline-storybook-react`   | `ui/react`       | `storybook-static/` |
| `inkline-storybook-vue`     | `ui/vue`         | `storybook-static/` |
| `inkline-storybook-svelte`  | `ui/svelte`      | `storybook-static/` |
| `inkline-storybook-solid`   | `ui/solid`       | `storybook-static/` |
| `inkline-storybook-angular` | `ui/angular`     | `storybook-static/` |
| `inkline-storybook-qwik`    | `ui/qwik`        | `storybook-static/` |
| `inkline-storybook-astro`   | `ui/astro`       | `storybook-static/` |

Build `inkline-storybook` with `pnpm run storybook:build`. A bare `storybook build` fails in Workers Builds: it runs outside a package script, so `node_modules/.bin` isn't on `PATH`.

Set `STORYBOOK_REF_BASE_URL` (or the per-framework `STORYBOOK_REF_<FRAMEWORK>`) as a build variable on `inkline-storybook`, pointing at the framework Workers. The default `./react` paths don't resolve there, because nothing serves `./react` under the composed Worker.

The composed Storybook reads each framework's `index.json` from that framework's Worker, which is another origin, so the browser needs a CORS header on it. The shared preset in [`tooling/storybook`](../../tooling/storybook/AGENTS.md) writes a `_headers` file into every framework's `storybook-static/`, which sends `Access-Control-Allow-Origin: *` on `/index.json`, `/stories.json` and `/metadata.json`. `*` is enough because the composer's build checks each ref's `iframe.html`, and the browser then reads the ref without credentials. A ref that was down while the composer built is read with credentials, which `*` doesn't allow, so rebuild `inkline-storybook` once every framework Worker is live.

A framework Worker builds its package and its dependencies before its Storybook (`pnpm --filter "@inkline/<framework>..." build && pnpm run storybook:build`), since `prestorybook` doesn't run before `storybook:build`. Each Worker's root directory, build and deploy commands and variables live in the Cloudflare dashboard, not in the repo.

## Running

```bash
pnpm run storybook    # from the repo root — runs all 7 frameworks + this aggregator
```

That root script orchestrates three concurrent processes (the `.ink.tsx` compiler in watch mode, the seven framework Storybooks, this aggregator) via `concurrently` and `wait-on tcp:6006 tcp:6007 …`. The aggregator only starts once all framework ports are listening.

To run just the aggregator (assuming framework Storybooks are already up):

```bash
pnpm --filter @inkline/storybook-app storybook
```

## Build

`pnpm storybook:build` runs `storybook build -o dist`. CI invokes this via [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) `build-storybook` job and uploads the `dist/` directory as an artifact.

## End-to-end visual tests

Cross-framework visual-parity tests (Playwright) live in their own package, [`testing/e2e`](../../testing/e2e/AGENTS.md). They boot this composition Storybook (`pnpm run storybook:test`) and pixel-diff every story across all seven frameworks against the React render. Run them with `pnpm --filter @inkline/e2e test:e2e`.

## When you change something here

- New welcome / landing story → add it under `stories/`. The aggregator only globs `stories/**/*.stories.ts`.
- New framework target → add an entry to the `frameworks` table in [`.storybook/main.ts`](./.storybook/main.ts) (key, title, a fresh port, and default relative `path`), and wire it into:
  - The root `package.json` `storybook:frameworks` and `storybook:app` scripts (in the `wait-on tcp:` list).
  - [`docs/contributing.md`](../../docs/contributing.md) → "Dev loops".
  - [`ui/<new-framework>/AGENTS.md`](../../ui/) (port assignment).

## Known rendering limitations

All seven framework Storybooks render their stories, both on the dev servers and in the static
builds their Workers deploy. Qwik and Angular need a workaround to get there, Astro's static build
has a limit and a workaround, and the composed Storybook has a workaround of its own:

- **Qwik.** Qwik's Vite plugin breaks the static build, so
  [`ui/qwik/.storybook/main.ts`](../../ui/qwik/.storybook/main.ts) patches it after the plugin
  runs: it flattens the `.inkline/**` chunk names that Rolldown rejects, and drops Vite 8's
  `native:import-analysis-build`, whose `__VITE_PRELOAD__` markers nothing replaces once Qwik's
  plugin has removed `vite:build-import-analysis`. A Qwik story mounts paused and
  resumes a moment later, so the visual-parity suite waits for `q:container="resumed"` before it
  takes a screenshot ([`testing/e2e/storybook.ts`](../../testing/e2e/storybook.ts)).
- **Angular.** A static build renders the compiled package in `ui/angular/dist`, not the source, so
  build the package first. [`ui/angular/.storybook/main.ts`](../../ui/angular/.storybook/main.ts)
  leaves Analog's build optimizer out of that build, because linking drops the class metadata that
  `@storybook/angular` reads to build a story's template. More in
  [`ui/angular/AGENTS.md`](../../ui/angular/AGENTS.md) → "Storybook". Styled components are also
  covered by `@angular/platform-server` SSR tests in
  [`@inkline/test-utils`](../../tooling/test-utils/).
- **Astro.** A static build prerenders each story from its meta component with the story's `args`,
  and ignores a story's `render`. So a story that only sets `args`, like
  `components-actions-button--disabled`, renders as it should, while a `render` story, like
  `components-actions-button--colors`, shows the same HTML as `--default`. That's
  `@storybook-astro/framework`'s limit, and no change here reaches it. The stories import their
  compiled `.astro` file so the static build prerenders them at all: see
  [`tooling/storybook/AGENTS.md`](../../tooling/storybook/AGENTS.md).
- **The composed Storybook.** A ref's story can stay under "Content is loading..." after it has
  rendered. The manager addon in [The ref loader workaround](#the-ref-loader-workaround) clears it.

## See also

- [`testing/e2e/AGENTS.md`](../../testing/e2e/AGENTS.md) — the Playwright visual-parity suite that drives this aggregator.
- [`tooling/storybook/AGENTS.md`](../../tooling/storybook/AGENTS.md) — the cross-framework story generator that produces the CSF files each composed Storybook reads.
- The seven `ui/<framework>/AGENTS.md` files — each notes its assigned port.
- [docs/contributing.md](../../docs/contributing.md) → "Dev loops" — the canonical command surface.
