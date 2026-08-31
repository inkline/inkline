# ADR-010: `defineProps` joins the macro family; the macro registry is formalized

Date: 2026-08-31 · Status: Accepted
Deciders: Project owner (2026-08-31) · Informed by: [RFC-0001](../rfcs/0001-compiler-macros-for-the-authoring-surface.md), internal tracker UXF-241 (`design-uxf-241.md`, verified against `main` @ `24df22c1f`), UXF-244 (this record)
Supersedes: — · Superseded by: —

## Context

The ask was Vue-shaped macros for authoring: declaration at the point of use, no second registration
anywhere. [RFC-0001](../rfcs/0001-compiler-macros-for-the-authoring-surface.md) carries the full
argument, the options and their receipts. What made the decision reasonable, compressed:

- **Half the request already shipped.** `defineModel` and `defineEmits` auto-register compiler-side;
  `component.models` comes from `setupResult.models` alone
  (`core/compiler/src/pipeline/passes/02-parse/index.ts:57-67, 97`). `defineProps` does not exist —
  props enter via the setup parameter's type annotation or `options.props` (`:48-50`).
- **UXF-234 changed the trade.** The owner directive ([#605](https://github.com/inkline/inkline/pull/605),
  `d35d7fa99`) removed the type-only `models` channel and left `InkComponent`'s index signature in
  place (`core/core/src/index.ts:129`), so parent-facing props are untyped today. That closed the
  last plain-TypeScript route to parent-facing model typing. **After it, macro-first authoring and
  plain-`tsc` parent typing are no longer in tension** — the parent-typing road is Option D
  regardless. That is what makes this decision cheap: it forecloses almost nothing UXF-234 had not
  already foreclosed.
- **Three constraints bound the options:** [ADR-004](./004-inkline-check-does-not-type-check.md) (no
  second toolchain without an explicit decision),
  [ADR-008](./008-authoring-surface-is-inferred-from-options-alone.md) (setup-body statements are not
  an inference channel — physics, not tuning), and UXF-234 itself.

The approval was given on UXF-241 as: *"The design is approved, going with void's recommendation."*

> **Scope of that approval (labelled: inferred).** The sentence does not itself separate the three
> questions the design asked in §8. It is recorded here as approving Option A and authorizing Phases
> 1 and 2, because §8 asks for approval of phases 1–2 only and puts the other two questions to the
> owner separately. The two open questions below are therefore recorded as **open, not decided**. If
> that reading is wrong, this ADR is the thing to correct.

## Decision

**1. Compiler macros are the Inkline authoring grammar, and the grammar is formalized.** A macro is
an identifier imported from `@inkline/core` that ships as an inert runtime stub, is recognized by
binding rather than by name, and is erased from every target's output. Four rules apply uniformly:
macro calls only at the setup top level (R1); statically analyzable arguments only (R2); one
declaration channel per concern, never silent precedence (R3); macros are erased (R4).

**2. A macro registry replaces the per-macro `if` blocks in `02-parse`.** Shape:
`{ name, parse(callSite, ctx) → IR contribution, rules }`, dispatched from `parseSetup`
(today `02-parse/setup.ts:334-389`). This is a refactor of existing behaviour, and it is the seam
every later phase plugs into.

**3. `defineProps` is added as a third props channel, in two forms** — `defineProps<T>()` and
`defineProps({ … })`, the latter typed by the existing `InferProps<D>`
(`core/core/src/index.ts:94-100`). Both produce the same `IRProp[]` and `propsTypeText` as today's
channels: **zero IR change, zero lowering change, zero target change.**

**4. A component uses exactly one props channel** — macro, annotation, or `options.props`. Two of
them is INK0047, an error, by the same reasoning as the `props?: never` overload guard
(`core/core/src/index.ts:138-144`): a mismatched pair compiles clean and lies. INK0048 covers
non-literal macro arguments and INK0049 covers macro calls outside the setup top level.

**5. The parameter-annotation channel stays legal and documented**, deliberately. It is the only
channel TypeScript can see, so keeping it alive is what keeps the parent-typing door open. The macro
form becomes the documented primary style.

**6. Phases 1 and 2 are authorized. Phase 3 is not, and Phase 4 is not.** Each phase ships alone
behind its own cut line. Phase 1 is the registry, with byte-identical fixture output. Phase 2 is
`defineProps` plus the three diagnostics, additive.

**7. Four shapes are closed. Do not re-spike them.**

| Shape                                            | Closed by                                                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Generated `.d.ts` sidecar / ambient declarations | [ADR-006](./006-inferred-component-authoring-types.md) receipts — module resolution makes it unreachable |
| Type-only options key for models                 | UXF-234 / [#605](https://github.com/inkline/inkline/pull/605)                                |
| Context-parameter models                         | [ADR-008](./008-authoring-surface-is-inferred-from-options-alone.md) decision 4              |
| Models in the props interface                    | [ADR-008](./008-authoring-surface-is-inferred-from-options-alone.md) decision 3; INK0044 diagnoses it |

**8. Two questions are open, and this ADR decides neither.**

- **Phase 3 house style** — migrate `ui/components` to macro-first, or keep both grammars. The
  codemod spike measures 5 of the 24 annotation files first; the owner calls it after.
- **Phase 4** — whether to fund the Option D costing spike. Option D (a language-service plugin plus
  a `tsc` wrapper) is **the only remaining road to typed parent props**, and ADR-006's gate stands:
  cost it before adopting it. Nothing here schedules it.

Recording these as open is the point. Neither is decided by approval of Phases 1 and 2.

## Consequences

**Good.**

- The requested grammar ships without touching the IR, the lowering, or any of the seven targets.
- UXF-234's directive is satisfied structurally: there is nothing to register anywhere but the call
  site.
- Macro misuse becomes diagnosable instead of silently degrading — today a non-literal
  `defineModel(name)` just quietly does the wrong thing. This is
  [ADR-001](./001-compiler-dx-invests-in-diagnostics.md)'s direction.
- The registry is the seam Option D would need anyway, so Phases 1 and 2 are not wasted work under
  any later decision on the open questions.

**Bad.**

- **Parent-facing typing does not improve.** This decision explicitly does not deliver it. An author
  still gets no type checking on `<IButton color=…>`, because `InkComponent`'s index signature
  stands. The road to it is Option D, and Option D is uncosted. Saying this plainly is the point:
  nobody should read "macro props" as "typed props".
- **Two legal props grammars now exist** — until Phase 3 resolves house style, and *forever* if the
  annotation stays as the inference-compatible channel. That is a real consistency cost. It is
  priced against keeping the only TypeScript-visible channel alive, which is a deliberate trade, not
  an oversight.
- **The no-destructure rule extends to a local `const`.** `defineProps`' returned object is subject
  to `requirePropsNotDestructured`, so conformance has one more thing to check and authors have one
  more way to get it wrong.
- **Phases 1 and 2 were approved without Phase 3 being decided**, so the corpus sits on the old
  grammar while the docs recommend the new one. That gap is intended and timeboxed by the spike, but
  while it lasts, the documented primary style is the one the codebase does not use.

**Neutral.**

- No behaviour changes in Phase 1; fixture output is expected byte-identical.
- INK0047, INK0048 and INK0049 are unallocated on `24df22c1f` (verified: the codes table jumps
  INK0046 → INK0050).
- Corpus scale, verified on `24df22c1f`: 67 `defineComponent` files in `ui/components`, 24 of them
  carrying a `props: SomeType` annotation, 10 using `defineModel`.
- *(Inferred, not measured.)* Macro-form fixtures added in Phase 2 enter the emitted-output
  typecheck sweep from [ADR-009](./009-emitted-output-is-typechecked-by-a-subprocess-tsc.md) on react
  and solid. New fixtures either pass that gate or need a quarantine entry with codes.

## Revisit triggers

- **The Phase 3 spike reports that conversion needs human judgment per file.** Then the codemod
  assumption is dead, "two grammars forever" becomes the default rather than a gap, and the house
  style question must be answered on that basis instead.
- **INK0047 cannot be expressed at the type level** against the `defineComponent` overloads. A
  compiler-only collision was accepted in advance; if it turns out authors hit it often enough to
  complain, the overload set needs revisiting, not the diagnostic.
- **Typed parent props become a stated requirement** — a consumer needs them, or the untyped surface
  causes a real defect. That fires the Phase 4 gate: cost Option D, per ADR-006's bar, before
  adopting it.
- **`InkComponent`'s index signature is removed.** Then the annotation channel starts feeding
  `InkComponent<P>` for real, the two grammars stop being equivalent in capability, and decision 5's
  reasoning becomes load-bearing rather than precautionary.
- **A TypeScript release adds an inference channel for statements in a function body.** ADR-008's
  physics claim would fall, and with it the reason the macro channel can never reach the parent
  surface without a second toolchain.
