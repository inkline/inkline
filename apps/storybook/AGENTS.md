# @inkline/storybook-app

The **unified Storybook aggregator**. Runs on port 6100 and embeds the seven per-framework Storybooks (6006–6012) via [Storybook composition](https://storybook.js.org/docs/sharing/storybook-composition). One UI, every framework, side-by-side.

Private (`"private": true` in [`package.json`](./package.json)) — never published.

## Layout

```
apps/storybook/
├── .storybook/
│   ├── main.ts         # framework: @storybook/react-vite + refs to all 7 per-framework Storybooks
│   └── preview.ts      # Aggregator-level preview parameters
├── stories/
│   └── Welcome.stories.ts   # Landing/welcome stories shown in the aggregator
└── dist/               # storybook:build output (per CI)
```

## How composition works

[`.storybook/main.ts`](./.storybook/main.ts) declares one `refs` entry per framework:

```ts
refs: {
  react:   { title: "React",   url: DEV ? "http://localhost:6006" : "./react" },
  vue:     { title: "Vue",     url: DEV ? "http://localhost:6007" : "./vue" },
  // … svelte (6008), solid (6009), angular (6010), qwik (6011), astro (6012)
}
```

- **In dev** (`pnpm storybook` here, or `pnpm run storybook` from the repo root), each `url` points to the corresponding framework's live Storybook on `localhost:<port>`.
- **In production** (built by `pnpm storybook:build`), each `url` is a relative path — the deployment is expected to host each framework's built `storybook-static` under that path. CI uploads them as separate artifacts; the deploy step (out of scope here) stitches them together.

## Running

```bash
pnpm run storybook    # from the repo root — runs all 7 frameworks + this aggregator
```

That root script orchestrates four concurrent processes (compile, story-generate, framework Storybooks, this aggregator) via `concurrently` and `wait-on tcp:6006 tcp:6007 …`. The aggregator only starts once all framework ports are listening.

To run just the aggregator (assuming framework Storybooks are already up):

```bash
pnpm --filter @inkline/storybook-app storybook
```

## Build

`pnpm storybook:build` runs `storybook build -o dist`. CI invokes this via [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) `build-storybook` job and uploads the `dist/` directory as an artifact.

## When you change something here

- New welcome / landing story → add it under `stories/`. The aggregator only globs `stories/**/*.stories.ts`.
- New framework target → add a `refs` entry in [`.storybook/main.ts`](./.storybook/main.ts), pick a fresh port, and wire it into:
  - The root `package.json` `storybook:frameworks` and `storybook:app` scripts (in the `wait-on tcp:` list).
  - [`docs/contributing.md`](../../docs/contributing.md) → "Dev loops".
  - [`ui/<new-framework>/AGENTS.md`](../../ui/) (port assignment).

## Known rendering limitations

As of 2026-06, six of the seven framework Storybooks render styled components (ones that
compose other components and pull classes from a `virtual:styleframe` recipe) correctly:
**React, Vue, Solid, Svelte, Astro, Angular**. One has an outstanding gap:

- **Qwik** — the Qwik output is correct (components compile to resumable `componentQrl`s and
  their QRL segments serve over HTTP), but `storybook-framework-qwik` (a canary build) on
  Qwik 2.0-beta resumes an empty container. This is an upstream Storybook↔Qwik integration
  issue, not a codegen problem.

Angular styled rendering was fixed by the Angular-target redesign — kebab-case `ink-*`
selectors, a `klass` input that merges a forwarded class onto each component's own root, and
full `imports` declaration. Styled components are verified by `@angular/platform-server` SSR
tests in [`@inkline/test-utils`](../../tooling/test-utils/).

## See also

- [`tooling/storybook/AGENTS.md`](../../tooling/storybook/AGENTS.md) — the cross-framework story generator that produces the CSF files each composed Storybook reads.
- The seven `ui/<framework>/AGENTS.md` files — each notes its assigned port.
- [docs/contributing.md](../../docs/contributing.md) → "Dev loops" — the canonical command surface.
