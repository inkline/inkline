---
name: adversarial-qa
description: Repro-first QA for Styleframe — minimal reproductions, the end-to-end integration harness, fuzz targets, and how to audit teammates' claims. Use for bug verification, regression coverage, and claim audits.
---

# Adversarial QA

Your posture: **a claim without a reproduction is a rumor.** That applies to bug reports AND to teammates' "fixed"/"faster" claims. Adversarial toward artifacts, never toward teammates — your reports are minimal, actionable, and kind.

## Repro-first protocol

1. Reproduce before believing. Bug report → build the smallest failing case: one `styleframe.config.ts`, minimal extension files, one consuming component. Cannot reproduce after honest effort → report exactly what you tried, request specifics; don't guess-fix.
2. Reduce until every line is load-bearing. The repro IS the test: turn it into a colocated `*.test.ts` (unit) or an integration spec (behavioral) that fails before the fix and passes after.
3. Bisect when the regression window is known (`git bisect` with the repro script).
4. For "fixed" claims: check out the fix, run the repro, THEN try to break the fix's edges (empty instance, boolean values, compound modifiers, namespace imports, unicode class values, huge inputs).

## The integration harness (testing/integration — the real gate)

Anatomy: builds all packages → packs `.tgz` tarballs → scaffolds a **fresh Vite+Vue+TS app** → installs via `styleframe init` with local tarball overrides → `vite build` → serves on :4173 → Playwright asserts **browser-computed styles** (`getComputedStyle`; colors asserted as **OKLCH**) across **Chromium + Firefox + WebKit**, retries 2 on CI.

10 specs today: example (selectors+refs), utilities, utilities-autogenerate (scanner + array syntax), variables (@-refs), selectors-advanced (nesting+media), themes (data-theme switching), recipes (badge variants), keyframes, layout-flexbox, borders-effects. New engine/plugin features get a spec here, not just unit tests — unit tests can't catch virtual-module/bundler integration breaks.

Adjacent: `testing/benchmark` (visual-parity + perf specs); Storybook Vitest browser-mode tests + a11y addon (currently `test:"todo"` — flipping it to failing is an open mission).

## Unit test landscape (know where the holes are)

core 20 files/~13k LOC (strong) · transpiler 31/~11.4k (strongest, per-generator) · scanner 8/~3.2k · runtime 1/713 (single dense suite) · **loader 0 — untested I/O + jiti cache invalidation + license-gated build; highest-risk surface, prioritize coverage there** · plugin has own colocated tests.

## Fuzz / property targets (high-yield edges)

- Transpiler: arbitrary token trees → output must always parse as valid CSS; empty instance → minimal output (`:root {}`).
- Scanner: class-pattern parser on adversarial strings (`_a:b:c:d`, arbitrary values with `_`→space, unicode, near-miss typos — must warn, not silently drop).
- Recipe runtime: undefined/unknown variant props (silently skipped by design — assert base preserved), missing defaultVariants, boolean values, compound modifier nesting.
- Minifier: `ShorteningMap` collisions; source-rewrite ↔ CSS-emit consistency end-to-end.
- Ordering: recipes before utilities must throw the documented error, not corrupt state.

## Claim audit format (post as issue/PR comment)

```
Claim: <what was asserted>
Repro/measurement: <exact commands, environment, versions>
Result: CONFIRMED | REFUTED | PARTIAL — <evidence, numbers, links>
Residual risk: <edges not covered>
```
