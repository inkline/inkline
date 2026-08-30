# ADR-008: The inferred authoring surface comes from `defineComponent`'s options alone — the setup body contributes nothing

Date: 2026-08-11 · Status: Accepted
Deciders: Project owner (decision 4, on 2026-08-11) · Informed by: internal tracker UXF-176 (probe + receipts), UXF-162 (delivery RFC), UXF-161 (feasibility spike)
Supersedes: [ADR-006](./006-inferred-component-authoring-types.md) **in part** — its Decision 1 mechanism claim and its Option D uniqueness claim, only · Superseded by: [ADR-010](./010-models-are-machine-written-from-definemodel.md) **in part** — the "Option D stays deferred" clause of its Decision 5, only

> **Superseded in part — see [ADR-010](./010-models-are-machine-written-from-definemodel.md).**
> Decision 5 below restates ADR-006's "Option D stays deferred". That clause alone is superseded: on
> 2026-08-30 D was priced against the pinned TypeScript 7 toolchain and closed on a measured blocker —
> the native compiler ships no plugin entry point — with one named lift condition. **Decisions 1–4,
> the rest of Decision 5, and Decision 6 stand unchanged**, and Decision 1 is load-bearing for
> ADR-010, which is why this ADR's status remains `Accepted`. ADR-010 also records that Decision 2
> stays true as written: Option E removes the author's hand from the duplication, not the duplication
> itself.

[ADR-006](./006-inferred-component-authoring-types.md) Decision 1 says:

> `defineComponent` derives the component's authoring type from its own options **and setup body**
> through TypeScript inference.

The bolded half is false, and the same phrasing appears in ADR-006's Context. This ADR corrects it,
narrows one adjacent overstatement, and records the constraint that the wrong sentence was hiding.

**This is a record correction. It changes no decision.** ADR-006 Decisions 2 through 7 stand exactly
as written, B2 ships as decided, and the alternative discussed below is closed.

## Context

### Why a sentence is worth an ADR

ADR-006's top _Bad_ consequence already admits that `options.models` is "a hand-maintained duplicate
of what the compiler already derives … That is a lie surface." But Decision 1 tells the next reader
that inference reads the setup body — and if it did, the duplicate would be unnecessary. The record
therefore reads as though the double-declaration objection had been considered and handled.

It had not been. On 2026-08-11 the project owner raised exactly that objection against UXF-176's
implementation, as a new question, and it cost a re-litigation of a decision made three days earlier:
PR #573 held, UXF-177 and UXF-178 parked, a day of probe work, and a decision the owner had already
made once. Left standing, the sentence guarantees the same loop runs again.

### Receipt 1 — `defineComponent` has two inference sites and neither reaches the body

Reproduced for this record on `70a7735e4` against the repo's default-catalog TypeScript **7.0.2**
(`pnpm-workspace.yaml:96`; the earlier UXF-176 run used the `ts6` catalog's 6.0.3 — same result on
both). `defineComponent` was given the most permissive signature that could possibly work — generic
in _both_ argument positions, `<O extends ComponentOptions, S extends (props: any) => any>` — and fed
the real `IHamburgerMenuBase.ink.tsx` body, whose line 14 is
`const [open, setOpen] = defineModel<boolean>("open")`. Assigning each inferred type to a
`unique symbol` makes the compiler print what it inferred:

```
error TS2322: Type '(props: HamburgerMenuBaseProps) => { open: () => boolean; setOpen: (value: boolean) => void; props: HamburgerMenuBaseProps; }' is not assignable to type 'unique symbol'.
error TS2322: Type '{ meta: { headless: true; }; }' is not assignable to type 'unique symbol'.
error TS2322: Type '"meta"' is not assignable to type 'unique symbol'.
```

The third line is the whole answer. **The complete set of keys reachable from both inference sites is
`"meta"`.** `open` appears nowhere. Note that the first line is _generous_: this variant returns the
setup body's locals as an object, so the model's type is visible in the setup function's own type —
and even then it never reaches the surface, because a component's authoring type is derived from the
options, and `keyof O` is `"meta"`.

Two hardenings, so the finding cannot be dismissed as a fixable defect:

- **`defineModel` discards the name literal.** `defineModel<T = any>(_name = "value")` returns
  `[get: () => T, set: (value: T) => void]` (`core/core/src/index.ts:179`) — the name is absent from
  the return type. So the probe redesigned it: `defineModel<boolean, "open">("open")` branding its
  own return with `{ __model: { open: boolean } }`, `const` type parameter so the literal survives.
- **Real setup bodies return the render tree, not their locals.** Given the branded model and the
  real return shape, the outer call infers, in full:

  ```
  error TS2322: Type '(props: HamburgerMenuBaseProps) => any' is not assignable to type 'unique symbol'.
  error TS2322: Type '"meta"' is not assignable to type 'unique symbol'.
  ```

  The brand is unreachable. A `const` declaration is not an inference channel; the return position
  is — and in `.ink.tsx` the return position is the render tree.

The rule underneath: **a generic call infers only from the types of its arguments; a function
expression's type is its parameter list and its return type; a `const` declaration in the body is
neither.** No signature can invent a third channel. `defineComponent`'s overloads
(`core/core/src/index.ts:142-155`) take two arguments, and those two argument positions are every
inference site there is.

### Receipt 2 — this is a channel limit, not a TypeScript limit

The same probe, same information, moved to the return position:

```
error TS2322: Type '{ value: string; open: boolean; }' is not assignable to type 'unique symbol'.
```

Inferred perfectly. TypeScript is entirely capable of this; there is simply no channel. And the one
channel that would work is already occupied and inert — a setup body returns the render tree, and
`JSX.Element` is `any` (`core/core/src/jsx-runtime.ts:41`; the probe confirms `IsAny<JSX.Element>` →
`"ANY"` on the same run).

### Receipt 3 — why the duplication exists, and why it is a constraint

The sharper form of the objection is not "derive it from `defineModel`" — it is _"why a new key at
all; put `open?: boolean` in the props interface I already write."_ That interface **already** flows
to the type for free, via the setup parameter annotation — the second inference site, and the
options-taking overload every authored component without an `options.props` map resolves to
(`core/core/src/index.ts:152-155`):

```ts
export function defineComponent<P = {}>(
  options: ComponentOptions & { props?: never },
  setup: (props: P) => any,
): InkComponent<P>;
```

It looks free.

The compiler closes it, deliberately:

- `core/compiler/src/pipeline/passes/02-parse/index.ts:47-49` — with no `options.props`, props are
  parsed **from the setup parameter's type annotation**. So a model named in that interface becomes a
  declared prop.
- `core/compiler/src/pipeline/passes/02-parse/index.ts:61-66` — every model whose name collides with
  a declared prop raises **INK0044** (`ctx.diagnostics.push` at `:64`; severity `warning`,
  `core/compiler/src/core/diagnostics/codes.ts:30-35`): _"Model 'open' collides with a declared prop
  of the same name … Remove the duplicate prop; defineModel already declares the prop and its update
  event."_

That is UXF-135 V2's exact measured failure mode, rejected once already and recorded in ADR-006. So
the one channel TypeScript reads for free is the one the compiler forbids. `options.models` exists
because it is the only slot the compiler ignores: `component.models` is assigned from
`setupResult.models` alone (`:96`), and the declared copy is carried as `declaredModels` (`:99`) for
the INK0094 drift check and read by nothing else.

**The duplication is not a design preference. It is the residue of needing one place that is
simultaneously visible to TypeScript and invisible to the compiler.**

### The alternative, raised and closed

A shape called **B3** was probed in the same UXF-176 run: declare the model once in `options.models` and
hand the bindings to setup via a context parameter (`(props, { models }) => { const [open, setOpen] =
models.open; }`). It produces an authoring surface identical to B2's from a single declaration —
same +3 catches, same 0 false positives — and makes INK0094 unnecessary, because nothing is left to
drift.

Its cost was never measured: model parsing would move from `parseSetup` to `parseOptions` (reversing
UXF-176's explicit non-goal), lowering across all seven targets is unpriced, and the codemod is
unwritten. The recommendation on UXF-176 was to spike it for one day before UXF-177, since both
migrations touch the same files.

**The project owner declined, on 2026-08-11: "let's ship B2, forget about B3."** The reasoning is
sound and worth recording, because it is the case the recommendation itself named as strongest:
B2 is measured end to end and B3 is a verified type mechanism and nothing more; B2's +3 catches are
measured and staged, and a spike delays every one of them; `defineModel<boolean>("open")` is named,
greppable, and the shape Vue authors already know, so trading it for a destructured context
parameter is an authoring-experience regression in a _different_ direction; and B3 surrenders the
inertness of `options.models`, which is the property that made B2 lowering-safe across seven targets.

## Decision

**1. ADR-006 Decision 1 is corrected: the authoring surface is inferred from `defineComponent`'s
options alone.** The setup body contributes nothing to TypeScript inference, per receipt 1. Read
ADR-006's Decision 1 and its Context paragraph with "and setup body" struck. Everything else in
Decision 1 — no `.d.ts` sidecar, no ambient declaration, no language-service plugin, no second
toolchain, plain `tsc` and any stock editor — is unaffected and stands.

**2. ADR-006's Option D claim is narrowed.** ADR-006 says D "is the only mechanism that sees the
setup body." True as written, and it stays true. But the record implies more than it says — that
only D can remove the duplication. It cannot: **B3 removes the duplication without seeing the setup
body**, by moving the declaration out of it. The accurate claim is that **D is the only mechanism
that removes the duplication while keeping today's authoring shape.** D's deferred status,
and ADR-006's insistence that anyone reopening it starts by costing it, are unchanged.

**3. `options.models` is a constraint, not a preference.** It is the only slot simultaneously visible
to TypeScript and invisible to the compiler (receipt 3). The props interface — the channel TypeScript
reads for free — is closed by INK0044 at `02-parse/index.ts:61-66`, which is UXF-135 V2's measured
failure mode. Anyone proposing "just put it in the props interface" is proposing a shape the compiler
already diagnoses.

**4. B3 is considered and rejected**, by the project owner on 2026-08-11, for the reasons recorded
above. It is not a live option and it does not need re-discovering. Reopening it means costing the
compiler and lowering work first — the same bar ADR-006 set for Option D.

**5. What is unchanged.** ADR-006 Decisions 2 through 7 stand in full: the index signature goes,
models are declared in `options.models`, the migration is sized by census, Option D stays deferred,
and ADR-005 §4's authoring-time-only ceiling still holds. Every measured number in ADR-006 stands —
none of them depended on the incorrect sentence. UXF-176's channel and its INK0094 drift diagnostic
landed on `main` in [#573](https://github.com/inkline/inkline/pull/573) (`70a7735e4`), so ADR-006's
"until it lands, the weakness is live" no longer applies.

**6. ADR-006's status stays `Accepted`, not `Superseded`.** Its operative decisions are still the
live ones; flipping the whole record would be as misleading as the sentence this ADR corrects. Its
header carries a forward link scoped to what was actually superseded. This is a deliberate departure
from the whole-ADR supersede rule in [README.md](./README.md), and it is the first one.

## Consequences

**Good.**

- The next reader of ADR-006 learns the real constraint at the point where they would otherwise form
  a false belief, and the double-declaration objection is answered on the record rather than
  appearing new.
- The rejected shapes are now findable by name. "Put it in the props interface" and B3 both have
  receipts attached, so the next person to propose either starts from the measurement instead of the
  intuition.
- The correction is confined: a repo-wide sweep found the wrong phrasing in exactly two places, both
  in ADR-006 (Context and Decision 1). `docs/authoring-components.md` and every other ADR are clean.

**Bad.**

- **A partially superseded ADR is a worse artifact than a fully superseded one.** A reader who lands
  on ADR-006 mid-file, or who greps for the sentence, still finds the wrong claim in place, and only
  the header tells them it was corrected. Immutability buys an honest chain at the cost of leaving
  false sentences readable — that is the trade, and this is the first time the repo has paid it.
- **This ADR costs a number in the index for something that decided nothing.** Decisions 1–3 are
  corrections of fact; only decision 4 is a decision. That dilutes "one number, one decision," and
  someone auditing the chain will have to read to find out which is which.
- **Receipt 1 is a probe, not the shipped code.** It measures `defineComponent` as it exists on
  `70a7735e4`, where the options-taking overload is not yet generic in `O` — the generic form arrives
  with UXF-178. The finding is about where inference sites _can_ exist at all, so it survives that
  change, but it will not have been re-run against the shipped signature until UXF-178 lands.
- **B3 is closed on an unmeasured cost.** Its compiler and lowering price was never established;
  the decision to close it accepts that a cheap option may have been declined. Recorded plainly so
  nobody later mistakes "rejected" for "priced and found expensive."

**Neutral.**

- No code changes with this ADR. PR #573 is untouched, and UXF-177's migration proceeds as staged.
- The probe was built outside the repo tree and is not committed; it is reproducible from the method
  above with TypeScript 7.0.2.
- ADR-006's cited line for the models assignment (`02-parse/index.ts:96`) still resolves correctly on
  `70a7735e4`. Two references drifted and are corrected here: the INK0044 collision check is at
  `:61-66`, not `:59-64`, and INK0044's severity is `warning`, not an error.

## Revisit triggers

- **UXF-178 lands and the generic `defineComponent<O>` signature reaches a key other than `meta`.**
  Then receipt 1 is stale and decision 1 needs re-verifying against the shipped signature, not the
  probe.
- **A TypeScript release adds an inference channel for statements in a function body.** Unlikely, and
  it would reopen decisions 1 and 3 together — the duplication would stop being a constraint.
- **The INK0094 drift diagnostic proves insufficient in practice** — drifted `options.models` entries
  reach `main` despite it. Then the lie surface is permanent rather than guarded, and B3's central
  advantage (nothing left to drift) becomes worth the costing it never got.
- **UXF-177's migration turns out to need human judgment per file.** This fires ADR-006's own codemod
  trigger, and it should reopen B3 alongside Option D rather than D alone — both migrations touch the
  same files, so the wasteful ordering ADR-006 warned about becomes real at that moment.
