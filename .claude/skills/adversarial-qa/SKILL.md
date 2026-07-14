---
name: adversarial-qa
description: Repro-first QA for Inkline — minimal .ink.tsx reproductions, the visual-parity and cross-target harnesses, fuzz targets, and how to audit teammates' claims. Use for bug verification, regression coverage, and claim audits.
---

# Adversarial QA

Your posture: **a claim without a reproduction is a rumor.** That applies to bug reports AND to teammates' "fixed"/"faster" claims. Adversarial toward artifacts, never toward teammates — your reports are minimal, actionable, and kind.

## Repro-first protocol

1. Reproduce before believing. Compiler bug → the smallest `.ink.tsx` that shows it (+ target list); component bug → story id + framework(s) + interaction step. Cannot reproduce after honest effort → report exactly what you tried, request specifics; don't guess-fix.
2. Reduce until every line is load-bearing. The repro IS the test: a compiler fixture under `__fixtures__/` + scenario assertion, a per-target codegen test (respect the one-file-per-target rule), or a colocated `.ink.test.ts` — failing before the fix, passing after.
3. Bisect when the regression window is known (`git bisect` with the repro script). Rebuild `core/compiler` dist (`vp pack`) per step — consumers test against dist, and a stale dist fabricates results.
4. For "fixed" claims: check out the fix, reproduce, THEN attack the edges (below). The bug next to the bug is usually still there.

## The harnesses you drive

- **Visual parity (`testing/e2e`) — the ground truth for "renders the same".** Playwright boots `pnpm run storybook:test` (7 framework Storybooks + :6100 aggregator, **without** the compile watcher — it races cold boots). Story ids come from React's `/index.json`; each framework's `iframe.html?id=…` is screenshotted (`#storybook-root`) and pixel-diffed against the **live React reference** (no committed baselines) via pixelmatch; `MAX_DIFF_RATIO = 0.01` per step. Interaction steps per story id live in `scenarios.ts` (hover/press/focus/type via role-based locators — add steps for stateful components, they're hand-maintained). Sequential by design (`workers: 1`). Shard with `STORY_SHARD=i/n`. Run: `pnpm run test:e2e` (root) · `test:e2e:ui` to debug · first time: `playwright install chromium`. Boot hygiene: kill stale 6006–6012/6100 listeners first.
- **Cross-target harnesses (`@inkline/test-utils`)**: `compileComponent`/`compileSource`, `expectDiagnostics`/`expectNoDiagnostics`, `assertConformance` (per-target typecheck+lint of emitted code), `assertHtmlEquivalence`/`mountComponent` (SSR/CSR mount per target, normalized HTML), `snapshotOutput`, `coverInkViaReact` (remaps V8 coverage onto `.ink.tsx`).
- **Angular real-DOM**: `mountStyledOnAngular` (ui/components `angular-ssr-helper.ts`, `@angular/platform-server`) — recipe classes are asserted in **alphabetically sorted** order.
- **Compiler scenario layer**: `runScenarioAcrossTargets` — the only place a fixture legitimately compiles across all 7 at once.
- **Bench (`core/compiler`)**: `pnpm bench` (tinybench + baseline comparison) — every perf claim gets a number from here or gets rewritten without the claim.

## Fuzz / property targets (high-yield edges)

- Parser (P2) on adversarial TSX: namespace core imports (must INK0001), multiple components per file, deeply nested control flow, weird JSX attr expressions, unicode text/attrs.
- Reactivity analysis (P4): dynamic reads `obj[key()]` (INK0020), conditional reads, memo cycles (must INK0030, never hang), effects with zero deps (INK0010).
- Control flow: `<For>` without key (INK0050) / without each (INK0062), `<Show>` without when (INK0060), empty slots + fallbacks, `hasSlot` on Qwik/Angular (always-true semantics + `:empty` collapse actually collapses).
- Two-way: `$bind` on native vs component, `defineModel` with undefined initial (Solid renders `"undefined"` — assert coalescing), Astro one-way degradation (INK0045 count exact).
- IR round-trip: serialize → deserialize → identical emit; `IR_VERSION` bump paths exercise `ir/migration.ts`.
- Emitted-output conformance: typecheck + per-target lint stays green (Astro has a ~74 pre-existing lint-baseline — diff against it, don't re-report it).

## Claim audit format (post as issue/PR comment)

```
Claim: <what was asserted>
Repro/measurement: <exact commands, environment, versions>
Result: CONFIRMED | REFUTED | PARTIAL — <evidence, numbers, links>
Residual risk: <edges not covered>
```

## Standing coverage priorities

`@inkline/plugin` — **zero direct tests** (the transform entry of every consumer bundler; coordinate with @forge). The visual-parity suite's known real diffs (Input two-way ~10px, a Button sizes ~18px, fieldgroup on Qwik, ±2px rounding) — drive to zero and flip `visual-parity` into `ci-success` (it is deliberately non-blocking today). Coverage: full local `vp test --coverage` enforces ~100% thresholds; CI shards zero them and Codecov merges — don't read a single shard as the truth.
