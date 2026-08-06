# ADR-005: Keep `InkComponent`'s index signature; type component props by generating the authoring surface from the compiler's IR

Date: 2026-08-06 · Status: Accepted
Deciders: Project owner · Informed by: internal tracker UXF-135 (RFC + measurements), UXF-90 (typed authoring surface RFC), UXF-161 (feasibility spike), UXF-162 (delivery RFC, gated)
Supersedes: — · Superseded by: —

Resolves the item [ADR-003](./003-typed-jsx-intrinsic-elements-from-a-vendored-upstream.md) deferred
in its fourth commitment — _"Component props stay untyped. `InkComponent`'s `[attr: string]: any` is
explicitly out of scope… gets its own decision."_ This is that decision. ADR-003 is unchanged and
still Accepted.

**Read the decision as two halves. Neither is the whole answer.**

1. **What `main` does today is unchanged:** `InkComponent` keeps `[attr: string]: any`. Zero code.
2. **Where this is going:** the compiler emits the authoring type it already derives.

An account of this decision that carries only the first half says _"Inkline decided against typing
component props."_ That is not what was decided, and it is the misreading that would send someone
back to zero on a question that has already been measured.

## Context

`InkComponent` is one alias, in
[`core/core/src/index.ts:27-29`](../../core/core/src/index.ts):

```ts
export type InkComponent<P = {}> = (
  props: P & { class?: string; children?: any; ref?: Ref; key?: any; [attr: string]: any },
) => any;
```

That trailing index signature is why `<IButtonBase colr="light" />` compiles clean. ADR-003 named it
"the gap most likely to bite" and left it for a separate decision because it has a different blast
radius from the intrinsic-element surface. UXF-135 measured that blast radius on the same rig UXF-90
used, against post-#554 `main` (`f9514e498`), with the repo's pinned TypeScript 7.0.2.

### The measurement

Baselines, both corpora, verified: `ui/components/src/**/*.ink.tsx` — 67 files, **0 errors**;
`core/compiler/src/__fixtures__/**/*.ink.tsx` — 101 files, **16 errors**. The fixture baseline is 16
rather than UXF-90's 9 because #554 un-excluded the fixtures, so they are now checked under the
compiler's own `strict: true` tsconfig; all 16 sit in files listed in
`core/compiler/typecheck-exclusions.ts`, so the repo's real gate is green. Fixture numbers below are
deltas against that 16.

| Variant        | `InkComponent` props tail                      | `ui/components` | Fixtures (Δ) |
| -------------- | ---------------------------------------------- | --------------- | ------------ |
| V0             | today's `main` (`+ [attr: string]: any`)       | 0               | 16 (—)       |
| V1             | strict removal — `{class, children, ref, key}` | **63**          | 20 (**+4**)  |
| V2             | ``V1 & { [K in `$${string}`]?: any }``         | **10**          | 18 (**+2**)  |
| V3             | ``V2 & { [K in `on${string}`]?: any }``        | 9               | 18 (+2)      |
| V2 + migration | 4 files, 6 props added                         | **0**           | 16 (**0**)   |

Two things about that table matter more than the totals.

**V1's 63 is a lower bound, not a count.** TypeScript reports one offending property per JSX element,
so `InputPrefixSuffix.ink.tsx` reported `prefix` while sitting silently on `suffix` too. UXF-90 hit
the identical trap. Anyone re-estimating this from a first-pass error count will estimate low.

**53 of V1's 63 failures were `$bind:*` on a component element** — precisely the class #554 already
solved for intrinsics with ``[K in `$${string}`]?: any``. Any honest candidate carries that hatch,
which makes **V2 the real number: 10 / Δ+2 — 12 failures across 4 files.** V3 buys one error and
gives up all event-name safety; it is dominated.

### None of the twelve is an author mistake

| Cause                                            | `ui/components` | Fixtures | Author mistake? |
| ------------------------------------------------ | --------------- | -------- | --------------- |
| `defineModel` model prop — `open` ×7, `value` ×1 | 8               | 0        | **No**          |
| Slot fill passed as a prop — `prefix`, `icon` ×2 | 1               | 2        | **No**          |
| `defineEmits` event prop — `onChange`            | 1               | 0        | **No**          |
| **Genuine author mistakes**                      | **0**           | **0**    | —               |

All twelve are Inkline concepts declared where the props type parameter `P` structurally cannot reach
them: models are created in the setup body (`const [open] = defineModel<boolean>("open")`), slots are
declared in the options object — or, in `NamedSlotFill.ink.tsx`, exist _only_ as `<Slot name="icon" />`
inside the child's JSX body — and emits come from `defineEmits<{ change: [value: string] }>()`.

### The output check is what moved this from cosmetic to structural

The migration that takes V2 to 0/16 is small — 4 files, 6 props. Applying it costs **5 test failures
across 3 files** (5 failed / 207 passed in `ui/components`) and changes **all seven targets'** emitted
output for `IInput`. Specifically:

- **The compiler diagnoses the migration as a defect.** `INK0044` (`warning`) —
  _"Model '{name}' collides with a declared prop of the same name… defineModel already declares the
  prop and its update event"_ — fires on both `IInput` and `IHamburgerMenu`
  ([`core/compiler/src/core/diagnostics/codes.ts`](../../core/compiler/src/core/diagnostics/codes.ts)).
  The only edit that satisfies the type system is the edit the compiler tells authors to undo.
- **The Svelte target emits code that does not parse.** `let { …, open, …, open = $bindable(), …$props() }`
  — `open` bound twice in one destructuring. Verified: `SyntaxError: Identifier 'open' has already been declared`.
- **Angular grows a duplicate channel**: `onChange = input<…>()` alongside the existing `change = output()`.

### What the index signature actually costs

Twelve deliberate probes — eight mistakes, four controls. **Today's `any` already catches 3 of the 8
mistakes**, because an index signature permits _unknown_ keys and never loosens _declared_ ones:
`<IButtonBase disabled="yes-please" />` has always been an error. The gap was only ever unknown-key
detection — materially smaller than "component props are untyped" implies.

Against that, V2's score is **+2 real new catches** (`labell`, `nope`) **against 3 of the 4 controls
rejected** — correct code (`<IHamburgerMenu open={true} />`, `<IInput prefix={<>$</>} />`,
`<IRadioFieldBase onChange={…} />`) that compiles today and would stop. A fourth apparent catch was
discounted as counterfeit: `<IHamburgerMenu opne={true} />` errors for exactly the reason the correctly
spelled `open` errors, so the type system is not distinguishing the typo from the truth.

### The finding that set the direction

**The compiler already knows the entire surface.** `component.props`, `component.models`,
`component.slots` and `component.events` are all in the IR, and every target already composes and
writes the full type out —
[`core/compiler/src/codegen/targets/svelte/index.ts:375-395`](../../core/compiler/src/codegen/targets/svelte/index.ts)
is one of seven:

```ts
// react/IInput.tsx
InputProps & { prefix?: React.ReactNode; suffix?: React.ReactNode }
           & { value?: string; onUpdateValue?: (value: string) => void }
           & React.HTMLAttributes<HTMLElement>
```

The information is not missing. It is derived correctly, seven times per component, and never handed
back to the `.ink.tsx` author. Hand-widening `P` asks authors to re-type by hand what the compiler
already computes — and INK0044 exists specifically to stop them doing it.

## Decision

**1. `InkComponent` keeps `[attr: string]: any`.** No change to `main`, no migration, no deprecation
window. The measured price of removing it today is +2 catches for 3 classes of rejected valid
authoring, a compiler diagnostic contradicting the migration that satisfies the type checker, and an
un-parseable Svelte emit.

**2. The committed direction is compiler-generated authoring types.** The compiler emits the
authoring type it already derives from its own IR — props, models, slots and emits together — so the
type surface is generated rather than hand-maintained. This closes both the unknown-key gap _and_ the
three false-positive classes at once, because it comes from the same IR the targets consume. The
index signature is the **interim state of that plan**, not a resting position.

**3. Feasibility is answered before the design.** UXF-135 ranked generation first on shape and then
labelled its core mechanism _"assumed feasible, not verified"_ — whether slot names written only as
`<Slot name="icon" />` inside a child's JSX body can be extracted early enough to type the _parent_.
If they cannot, the generated type either drops slots (reintroducing the exact false positives that
sank hand-widening) or requires children compiled before parents, a build-ordering constraint nobody
has costed. UXF-161 answers that question; UXF-162 — delivery mechanism, editor resolution, watch-mode
staleness — is gated behind it and gets cancelled, not started, on a no-go.

**4. This is authoring-time only, and the record says so plainly.** Three of the seven emitted
surfaces terminate in `Record<string, any>` regardless. Downstream `@inkline/react` and friends gain
**nothing** from this line of work. Anyone hoping otherwise should learn it here rather than from a
PR.

**5. What was rejected, and why it is not "generation with extra steps."** Hand-widening `P` plus a
4-file migration (V2 + migration above) was a real option with a real case: INK0044 is severity
`warning` and therefore a policy choice, not a law. Invert it — let a declared model prop be the
source of truth and deduplicate during lowering — and the Svelte double-binding and the Angular
duplicate channel both disappear, V2's migration becomes legal, and `ui/components` reaches 0 with
genuine typo detection on the plain-props majority. It loses because at that point it is no longer
"remove an index signature": it is a compiler change to model lowering across seven targets, plus
slot-fill and emit reconciliation, and at the end authors still hand-maintain a duplicate of what the
compiler derives. If the compiler is changing, it changes in the direction that removes the
hand-maintenance rather than legalising it.

## Consequences

**Good.**

- **Zero migration today**, in this repo and in every consumer. Removing the index signature would
  break every downstream `.ink.tsx` using two-way binding or slot fills — a strictly larger population
  than #554's `className` risk, and unmeasurable from here.
- **Two systems Inkline owns stop disagreeing.** No shipped type surface that requires authors to
  write what INK0044 tells them to delete.
- **The direction is on the record with its unknown attached.** The next person picks up a question
  ("are slot names extractable pre-codegen?") rather than a debate.
- **The scope is honest.** Naming the authoring-time-only ceiling now prevents a downstream-typing
  expectation forming around work that cannot deliver it.

**Bad.**

- **The gap ADR-003 called "most likely to bite" stays open, knowingly.** `<IButtonBase colr="light" />`
  compiles clean today and will keep compiling clean for however long generation takes. This is the
  direct cost of the decision and nothing mitigates it in the interim.
- **This ages badly if generation stalls.** If UXF-161 returns no-go and nothing replaces it, what
  remains is an untyped component surface with a plan attached and no delivery date. That is a worse
  position than either shipping V2 or deciding to live with `any` deliberately, because it looks
  decided while nothing is happening. The revisit triggers below are the only thing standing between
  this ADR and that outcome — they are load-bearing, not decoration.
- **Generation is a compiler project, not a type change.** Watch-mode staleness, editor resolution
  before the first compile, and the cross-file ordering constraint are all unpriced at the time of
  this decision. The estimate for the work is, honestly, unknown.
- **`$bind:*` targets and hyphenated attributes stay uncovered either way.** `$bind:vlaue` is an
  escape hatch by construction, and TypeScript exempts non-identifier JSX attribute names — which is
  what makes `data-*` authoring work at all. Both are diagnostics work (UXF-136), not type work; no
  version of this decision reaches them.

**Neutral.**

- No code changed. This ADR is the only artifact of the decision; `main` behaves exactly as it did
  before it was taken.
- The measurement branch (`scratch/index-component-props-blast-radius`) was deleted and the probe
  files removed; the numbers above are reproducible from the method in UXF-135, not from a surviving
  branch.

## Revisit triggers

Written now, while the judgment is cold:

- **The feasibility spike (UXF-161) returns "not extractable."** Then the committed direction has no
  mechanism and this decision reduces to an indefinite hold — which is not what was decided. Reopen
  and choose deliberately between a partial generated surface (props + models + emits, no slots),
  hand-widening with the INK0044 policy inversion, or an explicit "stays `any`."
- **Component-prop typos generate more than 3 issues before the generated surface ships.** Then the
  interim cost is being paid by real people at a rate the measurement did not predict, and the +2 /
  −3 trade needs re-pricing against evidence rather than probes.
- **The generated surface ships and the false-positive classes survive it.** If models, slots or
  emits still fail to type after generation, the premise of the direction — that the IR is complete —
  was wrong, and that is a supersede rather than an adjustment.
