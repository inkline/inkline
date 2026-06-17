# @inkline/e2e

Cross-framework **visual-parity** end-to-end tests (Playwright). Verifies that every Storybook story
renders **the same across all seven framework outputs** (React, Vue, Svelte, Solid, Angular, Qwik,
Astro) — the core Inkline promise that one `.ink.tsx` source compiles to identical UI everywhere.

Private (`"private": true`) — never published.

## How it works

- Playwright's `webServer` boots the composition Storybook from the repo root via
  `pnpm run storybook:test` (the per-framework dev servers on 6006–6012 + the :6100 aggregator, without
  the `@inkline/components` compile watcher that would otherwise race the cold boot). Locally, an
  already-running `pnpm run storybook` is reused.
- The story list is read once from React's `/index.json` (React is the reference).
- For each story, the suite screenshots each framework's standalone `iframe.html?id=<id>&viewMode=story`
  (`#storybook-root` element) and pixel-diffs it against the React render with `pixelmatch`.
- **No committed baseline images** — React is the live reference each run, so every framework renders on
  the same machine in the same run and cross-OS font/anti-aliasing drift can't cause false diffs.

Story ids are identical across frameworks (the story generator enforces this), so one id drives all
seven.

## Running

```bash
pnpm run test:e2e                          # from the repo root (shortcut for the line below)
pnpm --filter @inkline/e2e test:e2e        # boots/reuses the storybook, runs the suite
pnpm --filter @inkline/e2e test:e2e:ui     # Playwright UI mode (local debugging)
```

First-time setup: `pnpm --filter @inkline/e2e exec playwright install chromium`.

The suite uses Playwright, not Vitest, and exposes a `test:e2e` script (not `test`), so the repo's
`vp test` gate never collects it.

## Layout

```
testing/e2e/
├── playwright.config.ts     # chromium, workers:1, webServer → pnpm run storybook:test (:6100)
├── visual-parity.spec.ts    # one test per compared framework; per-step diff vs React
├── scenarios.ts             # hand-maintained per-story interaction steps
├── storybook.ts             # story enumeration, capture, pixel-diff, sharding helpers
└── tsconfig.json
```

## Interaction steps

A story can be compared at multiple interaction states (hover, press, focus, type). Steps are listed by
hand in [`scenarios.ts`](./scenarios.ts), keyed by story id; stories not listed get a single `initial`
screenshot. Each step's `run` acts on the story root via role-based locators (the DOM is identical
across frameworks), and the screenshot is compared per step. See the seeded `components-button--default`
example (`initial → hover → pressed`).

## Sharding

`STORY_SHARD="i/n"` slices the sorted story list into `n` contiguous chunks; the same slice drives the
React reference capture and every framework comparison, so a shard compares the same stories across all
of them. Example: `STORY_SHARD=1/2 pnpm --filter @inkline/e2e test:e2e`. CI runs a 2-way shard matrix.

## Sequential by design

`workers: 1`, `fullyParallel: false`, and one test per framework — so only one framework's dev server is
exercised at a time. React references are captured once in `beforeAll` and reused across the
per-framework tests.

## Expect some red

The suite surfaces **real** cross-framework differences. As of this writing: the Input `two-way` width
differs ~10px and a Button `sizes` story ~18px between some frameworks, plus a few ±2px rounding diffs;
Solid matches React exactly; Qwik renders (the suite waits for its container to resume) and shows only
small `fieldgroup` diffs. These are genuine findings, not test flakiness — the suite is wired
**non-blocking** in CI (not part of `ci-success`) while they're triaged.

## CI

A non-blocking `visual-parity` job in [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml)
(`needs: build`) runs both shards and uploads the Playwright report + diff images as artifacts. It is
deliberately not in `ci-success.needs`; add it there to make it blocking.

## See also

- [`apps/storybook/AGENTS.md`](../../apps/storybook/AGENTS.md) — the composition Storybook this suite drives.
- [`tooling/storybook/AGENTS.md`](../../tooling/storybook/AGENTS.md) — the generator that keeps story ids identical across frameworks.
