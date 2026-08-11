# ADR-006: The component authoring surface is _inferred_ from `defineComponent`, not _generated_ by the compiler

Date: 2026-08-08 · Status: Accepted
Deciders: Project owner · Informed by: internal tracker UXF-162 (delivery RFC + measurements), UXF-161 (feasibility spike), UXF-135 (blast-radius RFC)
Supersedes: [ADR-005](./005-generated-component-authoring-types.md) · Superseded by: —

[ADR-005](./005-generated-component-authoring-types.md) committed, in its second decision, to this:

> the compiler emits the authoring type it already derives from its own IR — props, models, slots
> and emits together — so the type surface is **generated rather than hand-maintained**.

**That sentence, taken literally, has no mechanism.** UXF-162 went looking for one and found that
the two obvious deliveries are not expensive — they are impossible. What ships instead reaches the
same safety by a different road: TypeScript infers the surface from `defineComponent`'s own options
and setup body, with no emitted artifact anywhere.

This ADR supersedes rather than amends ADR-005 because **both halves of ADR-005's decision change** —
the index signature goes, and "generated" becomes "inferred". Editing those two sentences in place
would leave a record that never happened. ADR-005 stays readable, and wrong in exactly the way it was
wrong on 2026-08-06; the chain is the memory.

## Context

### What ADR-005 left open, and what closed it

ADR-005 §3 gated everything on a feasibility question, and named UXF-162 as the follow-up that would
answer "delivery mechanism, editor resolution, watch-mode staleness". UXF-161 returned GO on
feasibility. UXF-162 then measured delivery against `80f9914d2` with the repo's pinned TypeScript
7.0.2, across both corpora, and found the delivery question answered in the negative for every
artifact-based route.

### Why generation has no mechanism — the finding that must not be re-spiked

Two artifact-shaped deliveries were built and run, not estimated:

| Mechanism                                          | Result   | Evidence                             |
| -------------------------------------------------- | -------- | ------------------------------------ |
| **A** — generated `Child.ink.d.ts` sidecar         | **Dead** | `tsc` exit 0, the typo goes uncaught |
| **C** — ambient `declare module "./Child.ink.tsx"` | **Dead** | **TS2436**, a hard compiler error    |

The cause is one line of authoring convention. `.ink.tsx` files import each other **with the explicit
extension** — `import IButtonBase from "../headless/IButtonBase.ink.tsx"` — and **TypeScript always
prefers the implementation file over a declaration file when the specifier resolves to real source.**
A generated artifact sitting next to its source is therefore never reached.

The probe, verbatim: `Child.ink.tsx` carrying a loose type, `Child.ink.d.ts` carrying a tight
`{ label?: string }`, parents importing both spellings.

- Both files present → **exit 0**; `<Child labell="x" />` **uncaught**, for _both_ import spellings.
- Control, implementation deleted → **TS2561 "Did you mean to write 'label'?"** — the sidecar is
  well-formed, merely unreachable.
- `paths` rescue → **does not apply to relative specifiers**; exit 0.
- Ambient relative `declare module` → **TS2436 "Ambient module declaration cannot specify relative
  module name."**

This is a structural property of module resolution, not a tuning problem. **Nobody should spike a
sidecar a fourth time.** Only two families survive it: **B** (inference — no artifact) and **D**
(interception — a virtual artifact behind a language-service plugin).

### What inference measures

Option **B2**: `InferSlotFills` / `InferEventProps` / `InferModelProps` composed into `SurfaceOf<O>`
in `core/core/src/index.ts`, both options-taking `defineComponent` overloads made generic in `O`,
`[attr: string]: any` dropped, the ``[K in `$${string}`]?: any`` hatch kept (already precedent in
`jsx-runtime.ts`), plus a new `models?: Record<string, PropDeclaration>` key on `ComponentOptions`.

| Variant                           | `ui/components` | `core/compiler` | Matrix catches | **False positives** |
| --------------------------------- | --------------- | --------------- | -------------- | ------------------- |
| **V0** (`main` today)             | 0               | 14              | 3              | 0                   |
| **B1** — inference, no migration  | **9**           | 16 (Δ+2)        | 6              | **2**               |
| **B2** — + `models` key, migrated | **0**           | **14 (Δ0)**     | 6              | **0**               |

**+3 real new catches over `main`, rejecting nothing correct.** The UXF-135 12-case matrix re-run:
`labell`, `nope` and `opne` all flagged; `open={true}`, `prefix={<>$</>}`, `onChange` and
`$bind:open` all stay clean. `$bind:vlaue` and `aria-labell` remain uncovered — diagnostics work
(UXF-136), not type work, exactly as ADR-005 predicted.

Three results decided the shape:

- **B1 is not a cheaper B2.** Its extra catch is counterfeit — it errors alongside correct `open`
  and `onChange`, which is UXF-135 V2's exact failure mode, already rejected once. The migration is
  what makes the catch genuine.
- **The output check that killed V2 does not recur.** ADR-005 recorded three failures for
  hand-widening: INK0044 firing, un-parseable Svelte, an Angular duplicate channel. **None
  reappeared.** V2 widened **`props`**, colliding a declared prop with a model of the same name —
  precisely what INK0044 exists to catch. B2 declares into **`options.models`**, which the compiler
  never reads (verified: `component.models` is assigned from `setupResult.models` alone,
  [`core/compiler/src/pipeline/passes/02-parse/index.ts:96`](../../core/compiler/src/pipeline/passes/02-parse/index.ts)).
  No lowering change, across zero targets.
- **Staleness is structurally zero.** ADR-005 listed watch-mode staleness as unpriced. Measured in a
  real language server, a parent's view of a child updated **11 ms after an unsaved edit to the
  child's buffer** — no save, no build, no compiler run. There is no staleness window because there
  is no artifact to lag. No artifact-based mechanism can match this.

One live defect surfaced during the output check and is **not caused by this decision**:
`core/compiler/src/pipeline/passes/02-parse/index.ts:68` merges `[...baseEvents, ...setupResult.events]`
with no dedupe, so a component declaring `events: { change: {} }` alongside `defineEmits` emits
`defineEmits(["change","change"])`. Verified still present on `af6996e7d`. Tracked separately.

### Correction to ADR-005's measurement

ADR-005 records the `core/compiler` fixture type-check baseline as **16**. The correct figure is
**14**. Reproduced for this record on `af6996e7d` via `core/compiler`'s own `vp check`: _"Found 14
errors and 2 warnings in 431 files"_ — the 16 was an error+warning total. All ten error-carrying
fixtures are listed in `core/compiler/typecheck-exclusions.ts`, so ADR-005's substantive claim — the
repo's real gate is green — stands unchanged. Every fixture delta in this ADR is against **14**.

## Decision

**1. The authoring surface is inferred, not generated.** `defineComponent` derives the component's
authoring type from its own options and setup body through TypeScript inference. No `.d.ts` sidecar,
no ambient declaration, no language-service plugin, no second toolchain. Plain `tsc` and any editor's
stock TypeScript both see it.

**2. `InkComponent`'s `[attr: string]: any` is removed.** This reverses ADR-005 §1. The measured
price is zero: `ui/components` 0 errors, fixtures Δ0, after a bounded migration. The
``[K in `$${string}`]?: any`` compiler-directive hatch stays.

**3. Two-way models are declared in `options.models`, a type-only channel.** The compiler does not
read it and will not; it exists so the parent's checker can see what the setup body's `defineModel`
creates. Staged as UXF-176 (channel + drift diagnostic), UXF-177 (corpus migration), UXF-178 (the
core type change), UXF-179 (docs).

**4. The migration is sized by census, not by today's error count.** Only 4 files error now, because
setup-declared surface bites only when another component consumes it. The true bound is the census:
~13 files in `ui/components`, ~14 in fixtures, **~27 total**. Migrating lazily is rejected — "correct
code suddenly errors" is the specific experience that teaches people to distrust a type surface.

**5. Option D is deferred, not rejected.** See below. It remains the only mechanism that delivers
ADR-005 §2 as written.

**6. What survives from ADR-005 unchanged.** Its §4 ceiling still holds: **this is authoring-time
only.** Three of the seven emitted surfaces terminate in `Record<string, any>` regardless, and
downstream `@inkline/react` and friends gain nothing from this work.
[ADR-003](./003-typed-jsx-intrinsic-elements-from-a-vendored-upstream.md) and
[ADR-004](./004-inkline-check-does-not-type-check.md) are untouched — `tsc` still owns type-checking,
and this decision is what finally makes ADR-004's division of labour pay.

**7. Decided by the project owner on 2026-08-08**, on UXF-162, choosing option 1 of three offered.
The recommendation and the decision agreed.

## The deferred alternative — Option D, stated at full strength

A TypeScript language-service plugin for the editor plus a `tsc` wrapper for CI — the Vue/Volar and
Svelte/`svelte2tsx` route. Generation, but virtual, so module resolution never gets the chance to
prefer the implementation file.

**The case for it, honestly.** It is the **only** mechanism that sees the setup body and the JSX body
together, so `defineModel`, `defineEmits` and `<Slot name="icon" />` type themselves with **zero
authoring migration** — decision 3's hand-maintained `models` key, decision 4's ~27-file migration,
and the residual weakness below **all disappear**. It closes the two silent holes UXF-161 found
(`defineEmits<NamedType>()`, and `<Slot>` inside a helper function). It delivers ADR-005 §2 as
written. And it is where **both** Vue and Svelte independently ended up after trying lighter things
first — convergence is real evidence, not fashion.

**Why it lost anyway.** Editor and CI must _both_ be intercepted or they disagree; that is the
permanent second-toolchain tax, and it never goes away. Vue and Svelte intercept because SFCs **are
not TypeScript** — `.ink.tsx` **is** real TSX that TypeScript already handles correctly, so we would
be overriding a working checker, a much weaker case and a much larger surface for subtle divergence.
Editors that do not load plugins, or users with `typescript.tsdk` pinned elsewhere, silently get
nothing, with no error to tell them.

**Its cost was never measured.** No spike, no branch, no number. "A separate multi-week track with an
indefinite maintenance tail" is an estimate, labelled as such, and it must not harden into a fact
through repetition. Anyone reopening D starts by costing it.

## Consequences

**Good.**

- **Measured safety, today.** +3 real catches, **0 false positives**, 0 new errors in `ui/components`,
  Δ0 in fixtures. The unknown-key gap ADR-003 called "most likely to bite" — `<IButtonBase colr="light" />` —
  finally closes.
- **Zero staleness, structurally.** 11 ms to a live unsaved edit, because there is no artifact to lag.
- **No new toolchain and no new pre-build gap.** The surface travels inside `@inkline/core`'s own
  `.d.mts`, produced by a build that already has to run. Options A and D each would have added one.
- **Autocomplete works**, verified in a real language server: slots, models and emits are all offered
  at JSX attribute position, not merely enforced.
- **UXF-135's `prefix` slot-fill false positive disappears for free**, since options-declared slots
  are now captured.

**Bad.**

- **`options.models` is a hand-maintained duplicate of what the compiler already derives, and nothing
  validates it.** Because the compiler never reads it, a declaration that drifts from the setup body's
  `defineModel` is silently accepted by _both_ the compiler and the checker. **That is a lie surface.**
  It is the one ADR-005 objection this decision does not answer — ADR-005 §5 rejected hand-widening
  partly because "at the end authors still hand-maintain a duplicate of what the compiler derives",
  and that objection survives intact here. Mitigation is a P4 drift diagnostic, same shape as INK0044,
  staged as **UXF-176** — not shipped with this decision. Until it lands, the weakness is live.
- **ADR-005 §2 did not ship as written, and never will by that route.** Anyone who reads only ADR-005
  will believe Inkline generates authoring types. It does not. It infers them.
- **~27 files carry a one-time migration**, and the codemod that would make it mechanical is
  **plausible but unwritten and unmeasured**. The compiler already extracts models and emit names at
  P2 (UXF-161), which is why it looks mechanical — that is an inference, not a result.
- **The migration bound is itself an estimate.** 4 files error today; the rest arrive the first time
  someone writes the explicit `prop` + `onUpdateProp` form. ADR-005 warned about this exact shape
  ("V1's 63 is a lower bound, not a count") and it applies again.
- **Two silent holes stay open**: `defineEmits<NamedType>()` and `<Slot name=>` written inside a
  helper function are invisible to inference by construction. Only D reaches them.

**Neutral.**

- No code ships with this ADR; the work is staged as UXF-176 through UXF-179.
- The `02-parse:68` event-dedupe defect is real and pre-existing on `main`. This decision merely
  exposes it; fixing it is required before the migration lands, and it is tracked on its own.
- No measurement branch survives. Every number here is reproducible from UXF-162's method against
  `80f9914d2` with pinned TypeScript 7.0.2; the 14-error fixture baseline was re-verified on
  `af6996e7d` for this record.

## Revisit triggers

Written now, while the judgment is cold:

- **The codemod proves not to be mechanical.** The ~27-file migration is the price of choosing B2
  over D; if it turns out to need human judgment per file, the trade that justified this decision was
  mispriced and D deserves the costing it never got.
- **The 8 fixture files using `<Slot name="icon" />` turn out to represent real user patterns.** Then
  inference is structurally blind to a real authoring style, and only interception reaches it.
- **The drift diagnostic (UXF-176) does not ship, or ships and still lets `options.models` diverge.**
  Then the lie surface is permanent rather than transitional, and the hand-maintenance objection that
  sank V2 has simply been relocated rather than answered.
- **Migration reveals a lowering change after all.** The whole safety of B2 rests on `options.models`
  being a channel the compiler never reads. If that stops being true for any target, this is a
  supersede, not an adjustment.
