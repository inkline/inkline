---
name: benchmark-protocol
description: How Styleframe measures itself against Tailwind, Panda CSS, and vanilla-extract — metrics, fairness rules, and reporting format. Use for perf work, regression gates, and published comparisons.
---

# Benchmark protocol

Benchmarks serve two purposes: **regression gates** (internal, every release) and **published comparisons** (external, credibility). Both die if the methodology is sloppy — a benchmark we can't defend in a hostile Hacker News thread must not be published.

## Metrics that matter

| Metric                  | How                                                                                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| Cold build time         | fresh install → first production build, wall clock                                                            |
| Incremental/HMR latency | edit token file / content file → styles updated in browser                                                    |
| CSS output size         | bytes raw + gzip + brotli, after tree-shake/minify                                                            |
| Runtime overhead        | recipe class-string generation, ops/sec (Styleframe ships ~1.4KB runtime; zero-runtime for non-recipe styles) |
| Tree-shake efficacy     | 1 recipe imported from a 39-recipe system → emitted CSS delta                                                 |
| Type feedback           | time-to-first-typecheck on the generated .d.ts surface                                                        |

## Fairness rules (non-negotiable for published numbers)

1. Same reference app per contender, idiomatic for each tool (no strawmen) — equivalent tokens, equivalent component set, equivalent content globs.
2. Pinned versions, stated hardware, median of ≥5 runs after warmup; report variance.
3. Measure both dev and production paths (Styleframe's CLI vs plugin paths differ by design — benchmark the plugin path, it's the product).
4. Contenders: **Tailwind v4, Panda CSS, vanilla-extract** (closest architectural neighbors). CVA+Tailwind is the fair baseline for recipe-runtime comparisons.
5. Publish the harness repo with the numbers. Reproducibility is the argument.
6. Report losses honestly. A benchmark that Styleframe never loses reads as marketing and converts nobody.

## Existing surfaces

- `testing/benchmark` — visual-parity + perf regression specs (Playwright).
- A benchmark-vs-Tailwind harness already landed once (repo history, PR #230) and a `benchmark-vs-tailwind` branch exists — extend, don't duplicate.

## Regression gating

Per release train: run the internal suite, compare against the previous tagged release. Deltas beyond noise (>5% build time, >2% CSS size) → flag on the release issue; Keeper holds the train until explained (regression vs accepted trade documented in the changeset).

## Reporting format

```
Environment: <hw, os, node, pnpm, versions table>
Scenario: <app shape, tokens count, components, content files>
Results: <table, median ± spread>
Interpretation: <one paragraph, includes where we lose and why>
Harness: <repo/branch link, exact commands>
```
