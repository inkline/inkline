# ADR-009: Emitted output is typechecked by a subprocess `tsc`, on react and solid only

Date: 2026-08-27 · Status: Accepted
Deciders: Project owner (landed as [#589](https://github.com/inkline/inkline/pull/589), `d6e9ad7`, 2026-08-27) · Informed by: internal tracker UXF-205 (harness verdict and receipts), UXF-206 (this record), parent UXF-204
Supersedes: — · Superseded by: —

> **Replaces a draft that never landed.** A `Proposed` ADR written 2026-08-11 — _"ADR-008: Emitted
> output is typechecked in the unit suite, in-process, behind a poison test"_ — described this gate
> and was never merged; the number it claimed was later taken by
> [ADR-008](./008-authoring-surface-is-inferred-from-options-alone.md), a different decision. There
> is no superseding chain to enter: nothing accepted was overturned, because nothing was accepted.
> See [What was believed, what was true](#what-was-believed-what-was-true).

## Context

[ADR-004](./004-inkline-check-does-not-type-check.md) settled who typechecks **authored** `.ink.tsx`:
`tsc`, not `inkline check`. This ADR settles the other half — who typechecks the **emitted** output,
and how far that check reaches.

### What was believed, what was true

**Believed.** `typecheckEmittedForTarget` ([`core/compiler/src/testing/typecheck.ts`](../../core/compiler/src/testing/typecheck.ts))
ran `tsc` over emitted output across four targets in a 420-test sweep.
[`core/compiler/docs/testing.md`](../../core/compiler/docs/testing.md) said it "verifies that emitted
code is type-safe." The 2026-08-11 draft recorded the gate as already fixed by an in-process
`ts.createProgram`, with a `checkedFiles` field on the result, react only, 80 of 105 fixtures, and a
25-entry exclusion list in `src/testing/typecheck-fixtures.ts` keyed by `EXCLUSIONS.react`.

**True.** Verified by QA on UXF-205, each reproduced before any fix:

- **The gate never ran `tsc`. Not once, on any target, for its entire life.** It shelled `npx tsc`
  into an OS temp dir with no `node_modules`; `npx` printed a refusal carrying no `error TS` line, so
  the diagnostic parse returned `[]` and `runTsc` discarded the child error entirely. Fed
  `const broken: number = 'not a number'`, the harness returned `pass: true` with zero diagnostics.
- **The tsconfig paths pointed at nothing.** `conformance.typecheck.tsconfig` resolved
  `"./tsconfigs/react.tsconfig.json"` against `process.cwd()`, landing on `core/compiler/tsconfigs/…`,
  which does not exist — the real path is `src/codegen/targets/react/tsconfigs/`. Even with a real
  `tsc` the gate could not have started.
- **`typecheck-fixtures.ts` and `EXCLUSIONS.react` were never built.** Nothing by those names existed
  anywhere in the repo's history. UXF-199's definition of done described a quarantine mechanism that
  had no implementation — consistent with a gate that never ran. #589 built it under exactly those
  names.
- **The draft's decision never shipped.** Its Decisions 1 and 2 — in-process `ts.createProgram`, a
  `checkedFiles` field — are absent from `main`: `typecheck.ts` spawns a subprocess and parses text,
  and `TypecheckResult` carries `pass` / `diagnostics` / `raw` only. Verified on `0e1913939`.

**What changed.** #589 made the gate real by a different mechanism than the draft proposed, on a
wider target scope, against a quarantine list two orders of magnitude larger than the draft's
estimate. This ADR records what shipped, measured against `main`.

### The gate can now fail, and is proven to

Un-quarantining `ElementRef → react` turns the sweep red with
`TS2339: Property 'focus' does not exist on type 'never'` — the exact defect that reached `main`
behind the green gate (UXF-199, since fixed by
[#586](https://github.com/inkline/inkline/pull/586)). Sweep wall time **52 s, down from 319 s**,
while now actually running `tsc`: 420 `npx` spawns of a decoy cost more than the real work does.
Both figures measured by QA on UXF-205.

## Decision

**Emitted output is typechecked in the unit suite by a subprocess run of the workspace `tsc`, over
react and solid, with every known failure quarantined per `(fixture, target)` pair.**

1. **The workspace `tsc`, resolved from the package — never `npx`.** `resolveTscBin` reads
   `typescript/package.json`'s `bin` from `@inkline/compiler`'s own resolution root, so the decoy
   package cannot win the race and the bin name is not hardcoded (`typecheck.ts:102-109`). Emitted
   files are written under `core/compiler/node_modules/.tmp` so bare imports (`react`, `solid-js`)
   resolve by walking up.
2. **A toolchain that cannot start is a failure, never a pass.** A tsconfig that is empty, relative,
   or non-existent fails outright; a file set plain `tsc` cannot read fails; a non-zero `tsc` exit
   with no parseable diagnostics fails, whatever the stderr text says (`typecheck.ts:35-49, 88-90`).
3. **Target tsconfigs are absolute, resolved from their own conformance file**, and a test asserts
   that every builtin target declares an absolute existing tsconfig or none at all
   (`typecheck.test.ts:87-94`). A second test reaches the same verdicts under `chdir(tmpdir())`.
4. **The anti-vacuity guards are permanent and live outside the sweep.** A deliberately broken file
   and a well-typed one are inline `GeneratedFile`s in `typecheck.test.ts`, not `.ink.tsx` fixtures,
   so they guard the harness without entering the fixture sweep. If they ever both go green, the gate
   has gone vacuous again.
5. **Scope is react and solid — two targets of seven.** `SWEPT_TARGETS = ["react", "solid"]`. Vue and
   svelte emit single-file components plain `tsc` cannot read, and a test compiles each and asserts
   it produces no typecheckable file, so the gap cannot widen silently
   (`typecheck.test.ts:113-114, 166-173`). Angular, qwik and astro declare `tsconfig: ""` and are
   outside the gate entirely.
6. **Known failures are quarantined, not waived.** `EXCLUSIONS` in
   [`typecheck-fixtures.ts`](../../core/compiler/src/testing/typecheck-fixtures.ts) names each
   excluded fixture with the TypeScript codes it suppresses, grouped by root cause. A staleness test
   compiles every excluded pair and fails when one starts passing, so the list can only shrink. No
   wildcards; no entry without codes.
7. **`compileToChecked` is left alone.** It asserts the _compiler_ emitted no error diagnostics
   (`codegen.ts:64-70`) — a different, legitimate assertion. Output can be diagnostic-clean and still
   fail `tsc`; the two gates are independent and stay that way.

## Consequences

### Good

- The gate can fail, it is proven to fail by tests that ship with it, and its verdicts do not depend
  on the directory the suite runs from.
- **121 real emitted-output failures surfaced** the moment it ran — 92 solid, 29 react, across 109
  fixtures — inventoried by root cause with diagnostic codes, and tracked as internal tracker
  UXF-211. They were invisible for as long as the gate reported green.
- The suite got **faster** (52 s vs 319 s) while asserting something for the first time.
- A moved or renamed target tsconfig now fails a test instead of silently disabling a target.

### Bad — accepted

- **Coverage is two targets of seven.** Five have no emitted-output verification of any kind: vue and
  svelte need `vue-tsc` / `svelte-check`, angular, qwik and astro have no tsconfig. Anyone reading
  "emitted output is typechecked" without reading `typecheck-fixtures.ts` and `SWEPT_TARGETS` will
  overestimate this gate. The scope lives in code, in files the sweep imports, for exactly that
  reason.
- **The quarantine is 121 entries — a large maintenance surface, and not all of it is defects.**
  Roughly 16 pairs are sweep artifacts rather than emitted-output bugs: the sweep typechecks one
  fixture's output in isolation, so components living in other fixtures cannot resolve. They are
  labelled as such in the file and in UXF-211 rather than counted as compiler bugs, but they still
  have to be re-read every time someone touches the list. _(Inferred: the 16 is QA's triage
  classification on UXF-205, not an independently re-measured count.)_
- **It catches "the emitted code does not compile," not "the emitted code compiles and means the
  wrong thing."** UXF-192's `{ size: { type: Number, default: "big" } }` is the counterexample that
  motivated the work: react emits an implicit `any` and is caught, angular emits `input('big')`,
  compiles clean, means the wrong thing — and angular is outside the gate. _(Inferred: carried from
  the 2026-08-11 draft's probe; not re-run against current `main`.)_
- **Second checker, second thing to rot.** Mitigated by the permanent guards, not eliminated by them.
  The first version of this gate rotted for its entire life while reporting green.
- **Subprocess per `(fixture, target)`** rather than one program over the corpus. Cheap enough today
  at 52 s; it scales with fixtures × swept targets, and adding targets multiplies it.

### Neutral

- `core/compiler/docs/testing.md` still describes this helper as verifying "that emitted code is
  type-safe" and the suite as spanning "all 7 targets." #589 did not touch it. That is a live
  documentation overstatement, not a decision — tracked as a docs correction, not here.
- The 2026-08-11 draft's branch, [#581](https://github.com/inkline/inkline/pull/581), is still open
  and now describes neither the defect nor the fix. Closing it is the tidy end of this record; it
  carries no decision that this ADR does not.

## Open, and deliberately not decided here

Two escalations from UXF-205 are decisions for the project owner, and this ADR does not pre-empt
either:

- **Internal tracker UXF-214** — vue and svelte need `vue-tsc` / `svelte-check` as dependencies
  before they can be swept. Whether to add them changes how large UXF-211's burn-down is.
- **Internal tracker UXF-215** — the gate cannot run from a published `@inkline/compiler`: target
  tsconfigs live under `src/codegen/targets/*/tsconfigs/` and `package.json#files` ships only `dist`
  and `src/__fixtures__`. Previously that read as a pass; it now reads as an explicit toolchain
  failure. Whether `@inkline/compiler/testing` is meant to work for consumers is a published-surface
  question.

## Revisit triggers

Written now, cold:

- **Solid's systemic TS2322 is fixed** (attribute passthrough widening the root element type, ~87 of
  the 92 solid entries) → delete those entries in the same PR as the fix. That is how the fix gets
  verified.
- **The sweep learns to compile a fixture with its dependencies** → delete every cross-fixture
  exclusion and re-measure. If the count does not drop by ~16, the change is incomplete.
- **UXF-214 is decided in favour of adding `vue-tsc` / `svelte-check`** → `SWEPT_TARGETS` grows, the
  `emits only files plain tsc cannot read` tests are deleted rather than edited, and the subprocess
  cost above is re-priced before the targets are added.
- **The quarantine stops shrinking for a full release cycle, or grows at all** → the gate is
  documenting rot instead of preventing it. Escalate the underlying defects; do not grow the list to
  make a change green.
- **Anyone proposes skipping, quarantining, or `it.skip`-ing `typecheck.test.ts`** → stop. Its
  guards are the only thing separating this gate from the vacuous one it replaced, and skipping the
  file reverts it silently and invisibly: green suite, no gate. Fix the flake or delete the gate
  deliberately.
- **The sweep exceeds ~150 s** → move it behind its own vitest project or CI shard rather than
  letting it tax every unit run. Baseline is 52 s, leaving ~3× headroom.
