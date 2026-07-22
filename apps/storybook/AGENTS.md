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
const ref = (port: number, path: string) => (DEV ? `http://localhost:${port}` : path);

refs: {
  react: { title: "React", url: ref(6006, "./react") },
  vue:   { title: "Vue",   url: ref(6007, "./vue") },
  // … svelte (6008), solid (6009), angular (6010), qwik (6011), astro (6012)
}
```

- **In dev** (`pnpm storybook` here, or `pnpm run storybook` from the repo root), each `url` points to the corresponding framework's live Storybook on `localhost:<port>`.
- **In production** (built by `pnpm storybook:build`), each `url` resolves through the config surface below. By default it is a relative path — the deployment is expected to host each framework's built `storybook-static` under that path. CI uploads them as separate artifacts; the deploy step (out of scope here) stitches them together.

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

As of 2026-06, six of the seven framework Storybooks render styled components (ones that
compose other components and pull classes from a `virtual:styleframe` recipe) correctly:
**React, Vue, Solid, Svelte, Astro, Angular**. One has an outstanding gap:

- **Qwik** — the Qwik output is correct (components compile to resumable `componentQrl`s and
  their QRL segments serve over HTTP), but `storybook-framework-qwik` (a canary build) on
  Qwik 2.0-beta resumes an empty container. This is an upstream Storybook↔Qwik integration
  issue, not a codegen problem.

### Qwik interactive-behaviour verification boundary (INK-31)

The empty-container resume failure above has a second consequence: **Qwik event handlers do
not run in any of our harnesses.** An emitted `$()` handler that closes over local scope
(e.g. a control's `checked()` / `setChecked` / `props`) must be extracted by the Qwik
optimizer into a lazy-loadable chunk and wired up on resume — Qwik forbids inlining a QRL
whose captured values are not importable, `const`, and serialisable, so `sync$` is not an
option for these handlers. When resume fails, the handler QRL is never bound to a served
chunk and Qwik falls back to writing the raw closure into an inline `onchange` attribute,
which an anonymous scope-capturing arrow cannot legally be — the parser rejects it with
`Function statements require a function name`, and no handler fires.

Neither runtime harness closes this gap today:

- **Unit SSR mount** ([`tooling/test-utils/src/mount.ts`](../../tooling/test-utils/src/mount.ts))
  deliberately omits Qwik from its mountable targets — there is no stable Qwik-SSR-in-Node
  path.
- **Visual-parity e2e** ([`testing/e2e`](../../testing/e2e/AGENTS.md)) hits the same port-6011
  canary and only _tolerates_ the broken resume (`storybook.ts` `waitForStoryReady` waits for
  `q:container="resumed"`, then captures whatever is there). It is also the wrong oracle for
  behaviour: it pixel-diffs against React, and a correct read-only _reject_ produces zero
  visual delta — indistinguishable from "no handler ran." Only an observable _toggle_ would
  register, and only if resume fired.

**Standing boundary: Qwik interactive behaviour is verified at the codegen layer only —
codegen assertions plus documented QRL semantics — until upstream Storybook↔Qwik resume
lands.** Closing it requires a _behaviour_-asserting e2e (role locator +
`await expect(checkbox).toBeChecked()` after a click, not a screenshot), which still gates on
that same upstream fix. The other six targets are runtime-verified via the SSR mount harness.

Angular styled rendering was fixed by the Angular-target redesign — kebab-case `ink-*`
selectors, a `klass` input that merges a forwarded class onto each component's own root, and
full `imports` declaration. Styled components are verified by `@angular/platform-server` SSR
tests in [`@inkline/test-utils`](../../tooling/test-utils/).

## See also

- [`testing/e2e/AGENTS.md`](../../testing/e2e/AGENTS.md) — the Playwright visual-parity suite that drives this aggregator.
- [`tooling/storybook/AGENTS.md`](../../tooling/storybook/AGENTS.md) — the cross-framework story generator that produces the CSF files each composed Storybook reads.
- The seven `ui/<framework>/AGENTS.md` files — each notes its assigned port.
- [docs/contributing.md](../../docs/contributing.md) → "Dev loops" — the canonical command surface.
