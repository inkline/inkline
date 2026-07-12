---
name: benchmark-protocol
description: How Inkline measures itself — compile performance, output size and quality vs hand-written components and Mitosis, fairness rules, and reporting format. Use for perf work, regression gates, and published comparisons.
---

# Benchmark protocol

Benchmarks serve two purposes: **regression gates** (internal, every release) and **published comparisons** (external, credibility). Both die if the methodology is sloppy — a benchmark we can't defend in a hostile Hacker News thread must not be published.

## Metrics that matter (for a compiler)

| Metric                     | How                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------- |
| Compile time               | per-component and full-catalog wall clock, cold + incremental (`compileIncremental` reuse)            |
| Emitted output size        | bytes raw + gzip per target, per component and for the full catalog CSS/JS                            |
| Output overhead            | emitted component vs a hand-written idiomatic equivalent: LOC, bundle delta, render performance       |
| Runtime cost               | zero-runtime promise: no `@inkline/core` in output; wrapper cost where one exists (`__InkTransition`) |
| Source-map cost            | compile-time and size delta of `sourceMap: external/inline/none`                                      |
| Emitted-code type feedback | time-to-typecheck of the generated per-target output (conformance path)                               |

## Existing surface (extend, don't duplicate)

`core/compiler/scripts/bench.ts` — tinybench suite run via `pnpm bench` (in `core/compiler`), with baseline comparison through the `runBenchSuite` harness (`@inkline/compiler/testing`). This is the number source for perf claims in PRs. Output-size checks ride the build artifacts (`ui/*/.inkline/`, framework `dist/`); pixel-behavior regression rides the e2e visual-parity suite (see `adversarial-qa`).

## Fairness rules (non-negotiable for published numbers)

1. Same reference component set per contender, idiomatic for each (no strawmen) — equivalent props, states, slots, styling.
2. Pinned versions, stated hardware, median of ≥5 runs after warmup; report variance.
3. Measure the path users actually run (CLI compile for libraries, plugin transform for apps) and say which.
4. Contenders: **Mitosis** (the direct write-once-compile-everywhere neighbor) and **hand-written per-framework components** (the honest baseline every team compares against). Web-component wrappers (Lit/Stencil) only for "one codebase" claims, clearly framed — they ship a runtime, we don't.
5. Publish the harness with the numbers. Reproducibility is the argument.
6. Report losses honestly. A benchmark Inkline never loses reads as marketing and converts nobody. "Hand-written is N% smaller on target X" is a finding, not a failure — it's the compiler's backlog.

## Regression gating

Per release train: run `pnpm bench` against the previous tag's baseline; track full-catalog compile time and per-target output size. Deltas beyond noise (**>5% compile time, >2% output size**) → flag on the release issue; Keeper holds the train until explained (regression vs accepted trade documented in the changeset). Any PR claiming "faster"/"smaller" carries its numbers, and @gauntlet re-measures independently before the claim stands.

## Reporting format

```
Environment: <hw, os, node, pnpm, versions table>
Scenario: <component set, targets, cold/incremental, path (CLI|plugin)>
Results: <table, median ± spread>
Interpretation: <one paragraph, includes where we lose and why>
Harness: <repo/branch link, exact commands>
```
