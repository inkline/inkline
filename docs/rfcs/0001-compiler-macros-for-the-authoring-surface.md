# RFC-0001: Compiler macros for the Inkline authoring surface

Status: Decided · Class: 2 · Comment window: opened and closed 2026-08-31
Author: Void · Reviewers: Project owner · Informed by: internal tracker UXF-241 (`design-uxf-241.md`, verified against `main` @ `24df22c1f`), UXF-234 / [#605](https://github.com/inkline/inkline/pull/605)
Outcome: [ADR-010](../adrs/010-defineprops-joins-the-macro-family.md)

This RFC transcribes the architectural design filed on UXF-241. The design is the source; its
sections are cited inline. Every code reference below was re-verified against `24df22c1f`, which is
the same commit the design names.

> **Class note.** §8.1 of the design calls the decision a two-way door — you reverse it by deleting
> the macro — which reads as Class 1. It is filed as Class 2 because it crosses three lanes
> (`core/core`, `core/compiler`, docs and skills) and because Phase 3 would touch 24 corpus files,
> which is not cheap to unwind.

## Problem

The ask: improve the authoring experience with Vue-compiler-inspired macros. `defineModel` registers
the models it defines; `defineProps` registers the props it defines. Declaration at the point of
use, with no second registration anywhere.

**The request is half-shipped, and the record explains why the other half is hard.** (Design §2.)

- **`defineModel` already auto-registers, compiler-side.** `component.models` is assigned from
  `setupResult.models` alone, so the setup body is the single source of truth
  (`core/compiler/src/pipeline/passes/02-parse/index.ts:57-67, 97`). Every target lowers the value
  prop and the `update:<name>` event from it. `defineEmits` behaves the same way, with INK0046
  dedupe.
- **`defineProps` does not exist.** Props enter through two channels: the setup parameter's type
  annotation, or `options.props` (`02-parse/index.ts:48-50`). The annotation is the form the whole
  corpus uses — 24 of 67 `defineComponent` files in `ui/components` carry `props: SomeType`
  (verified by count on `24df22c1f`).
- **UXF-234 (owner directive, [#605](https://github.com/inkline/inkline/pull/605), `d35d7fa99`):**
  `models` must not appear in the authoring experience at all, neither author-written nor
  machine-written. The type-only `options.models` channel and INK0094 are reverted. The tightening
  chain that would have removed `InkComponent`'s index signature never landed, so
  `[attr: string]: any` still stands (`core/core/src/index.ts:129`) and **parent-facing component
  props are untyped today**. `docs/authoring-components.md` says so explicitly.

**Why now, and why this is cheap.** UXF-234 closed the last plain-TypeScript route to parent-facing
model typing. After that directive, macro-first authoring and plain-`tsc` parent typing are no
longer in tension — the parent-typing road, if it is ever wanted, is Option D regardless of what
this RFC decides. This proposal forecloses almost nothing that UXF-234 has not already foreclosed.

### Constraints (design §3)

Fixed, not traditional:

1. **[ADR-004](../adrs/004-inkline-check-does-not-type-check.md):** `inkline check` does not
   type-check. Plain `tsc` owns types. No second toolchain without an explicit owner decision.
2. **UXF-234:** no `models`-shaped registration key in the authoring surface, ever.
3. **[ADR-008](../adrs/008-authoring-surface-is-inferred-from-options-alone.md):** setup-body
   statements cannot reach `InkComponent<P>` by inference. `defineComponent`'s two argument
   positions are every inference site there is. This is physics, not tuning.
4. **Solid reactivity:** the props object must not be destructured
   (`requirePropsNotDestructured`). Any `defineProps` return value inherits this rule.
5. **Existing corpus:** 67 `defineComponent` files and 10 `defineModel` files in `ui/components`;
   about 107 compiler fixture directories.

## What "compiler macro" means in Inkline (design §4)

Vue's `<script setup>` macros are the right prior art, adapted. A macro is an identifier imported
from `@inkline/core` that:

- ships as an **inert runtime stub**, so the editor and `tsc` see ordinary typed TypeScript;
- is recognized by the parse pass **by binding, not by name** — the existing `bindPrimitives` table
  already does this;
- is **erased** from the emitted output and replaced by each target's idiom.

`defineModel`, `defineEmits`, `defineSlot` and `hasSlot` already behave exactly like this, ad hoc,
inside `parseSetup` (`02-parse/setup.ts:334-389`). The design names the concept and gives it uniform
rules.

**Grammar rules, uniform across all macros:**

| Rule | Statement                                                                                                              |
| ---- | ---------------------------------------------------------------------------------------------------------------------- |
| R1   | A macro call is valid only as a top-level statement of the setup function body. Nested, conditional or looped → error.  |
| R2   | Macro arguments must be statically analyzable. Anything dynamic → error. Today a non-literal `defineModel(name)` silently degrades. |
| R3   | One declaration channel per concern. A concern declared twice is an error, or a warning with a defined winner. Never silent precedence. |
| R4   | Macros are erased. No `@inkline/core` import survives into any target's output. Already the invariant; a registry makes it checkable. |

**Implementation shape:** a small macro registry in `02-parse` — `{ name, parse(callSite, ctx) → IR
contribution, rules }` — that `parseSetup` dispatches to, replacing the current per-macro `if`
blocks. This is a refactor of existing behaviour, and it is the seam every later phase plugs into.

## Options considered

### Option A — Complete the macro family: add `defineProps`, formalize the registry

Add `defineProps` as a third props channel, in the two forms the compiler already lowers:

```tsx
// Type form — mirrors today's parameter annotation
export default defineComponent(() => {
  const props = defineProps<ButtonProps>();
  return <button disabled={props.disabled}>{props.label}</button>;
});

// Object form — mirrors today's options.props (per-target defaults, required flags)
export default defineComponent(() => {
  const props = defineProps({ color: "blue", size: Number });
  //    ^ typed via the existing InferProps<D> (core/core/src/index.ts:94-100)
  return <div class={`${props.color} ${props.size}`} />;
});
```

- **Compiler cost is near zero.** The type argument resolves with the same checker machinery as
  `parsePropsFromParameterType`; the object form reuses `parseOptions`' prop-map parsing. Both
  produce the same `IRProp[]` and `propsTypeText` — **zero IR change, zero lowering change, zero
  target change.** Vue keeps emitting `defineProps`/`withDefaults`, Solid keeps `mergeProps`,
  Angular keeps `input()`, exactly as today.
- **Author-facing types are exact.** `defineProps<T>(): T`; the object form returns `InferProps<D>`.
  Inside the body nothing changes versus the annotation form.
- **Parent-facing types are unchanged** — untyped either way, because `InkComponent` still has the
  index signature. Stated honestly: the annotation channel *could* one day feed `InkComponent<P>` if
  that signature were removed. The macro channel never can, without Option D. This design keeps the
  annotation channel **legal** precisely so that door stays open.
- **Channel exclusivity (R3):** a component uses exactly one of {macro, annotation,
  `options.props`}. Two of them → new diagnostic INK0047, error — the same reasoning as the
  `props?: never` overload guard (`core/core/src/index.ts:138-144`): a mismatched pair compiles
  clean and lies.
- **House style:** the macro form becomes the documented primary style. The annotation stays
  supported and documented as the equivalent. Corpus migration is optional and mechanical, and per
  ADR-006's discipline it stays unmeasured until spiked on 5 files.
- **`defineModel`** gains the R1/R2 diagnostics it currently lacks; its name argument becomes
  checkable (INK0048). No semantic change.
- **Prior art:** Vue 3 `<script setup>`, shipped and load-bearing for a large ecosystem.

### Option B — Registry only, no `defineProps`

Formalize the registry and the R1/R2 diagnostics. Keep props on the annotation.

The honest case: this is the cheapest option, it is a pure refactor with no new surface to support,
and **the annotation already _is_ auto-registration** — the thing the request asked for is, for
props, arguably already shipped. Every diagnostic win in Option A that concerns `defineModel` and
`defineEmits` lands here too.

Against it: it is not the Vue-shaped surface that was asked for, and the authoring grammar stays
split in a way authors feel — props in the signature, models and emits in the body. Recorded as the
fallback cut line, not the recommendation.

### Option C — Option A plus Option D interception

Everything in A, plus a TypeScript language-service plugin and a `tsc` wrapper that generate virtual
surface types from the body macros. Parents get typed `<IButton color=…>`, including `$bind:` and
event props.

The honest case: this is the **only** route to parent-facing typing left after UXF-234, it is what
Vue actually does, and macro-first authoring makes it *simpler* rather than harder — one grammar to
intercept instead of three channels.

Against it: [ADR-006](../adrs/006-inferred-component-authoring-types.md)'s gate stands. **Option D's
cost has never been measured, and it must be costed before it is adopted.** Bundling it here attaches
an unpriced multi-week tail to a cheap grammar change. It stays a separately gated phase.

### Considered and closed — do not re-spike

| Shape                                          | Closed by                                              |
| ---------------------------------------------- | ------------------------------------------------------ |
| Generated `.d.ts` sidecar / ambient declarations | ADR-006 receipts. Module resolution makes it unreachable. |
| Type-only options key, author- or machine-written | UXF-234 / [#605](https://github.com/inkline/inkline/pull/605). |
| Context-parameter models                        | ADR-008 decision 4. Declined by the owner on 2026-08-11. |
| Props-interface models                          | ADR-008 decision 3. INK0044 forbids it mechanically.    |

## Trade-off summary

|                            | A — macro family                        | B — registry only              | C — A plus interception                  |
| -------------------------- | --------------------------------------- | ------------------------------ | ---------------------------------------- |
| Delivery cost              | Low. Two phases, additive, no IR change | Lowest. One refactor phase     | Unpriced. Multi-week tail, never costed  |
| Operational cost           | One more stub, three diagnostics        | None beyond today              | A second toolchain to own and keep green |
| Reversibility              | Two-way. Delete the macro               | Two-way. Revert the refactor   | One-way in practice. Editor integration  |
| Risk, blast radius         | Low. Zero target change                 | Lowest                         | High. Touches the editor story           |
| Delivers the request       | Yes                                     | No                             | Yes, and typed parents                   |
| Improves parent-side types | No                                      | No                             | Yes — the only option that does          |

## Recommendation

**Option A, in three phases, each with a cut line. Each phase ships alone.** (Design §6.)

- **Phase 1 — macro registry.** Refactor, no behaviour change. Fold `defineModel`, `defineEmits`,
  `defineSlot` and `hasSlot` parsing into the registry. Existing tests hold; fixture outputs stay
  byte-identical. *Cut line: if only this ships, the codebase is cleaner and nothing moved.*
- **Phase 2 — `defineProps` and macro discipline.** Both macro forms, plus INK0047 (multiple props
  channels), INK0048 (non-literal macro argument) and INK0049 (macro outside the setup top level).
  Core stub added, reusing `InferProps`. Additive — every existing component compiles unchanged.
  *Cut line: the requested authoring surface exists; the corpus is untouched.*
- **Phase 3 — corpus migration.** A taste call for the owner. Spike the codemod on 5 components,
  measure, then migrate the 24 annotation files if it is mechanical. Fixtures are **not** migrated
  wholesale: both grammars stay covered deliberately, with macro-form fixtures added alongside.
- **Phase 4 — cost Option D.** Gated, a separate decision, per ADR-006's own bar. Only if typed
  parents are wanted. Not scheduled by this RFC.

**The strongest argument against the recommendation:** Option A ships a second legal props grammar
and does not improve the thing an author most visibly lacks — typed parent props. A reader could
fairly say it adds surface area to solve a problem the annotation already solves, and defers the
real one. The counter is that the two grammars are not equivalent in kind — the annotation is the
only TypeScript-visible channel and is kept alive for exactly that reason — and that the registry is
the seam Option D would need anyway, so Phase 1 and 2 are not wasted work under any later decision.

## Open questions

| # | Question                                                            | Owner         | Resolves by                                        |
| - | ------------------------------------------------------------------- | ------------- | -------------------------------------------------- |
| 1 | Phase 3 house style: migrate the corpus to macro-first, yes or no?   | Project owner | After the Phase 3 spike reports a number (UXF-247) |
| 2 | Phase 4: fund the Option D costing spike, to get typed parent props? | Project owner | Unscheduled. The only remaining road to typed parents |

Both are open. Neither was decided on 2026-08-31, and neither blocks Phase 1.

**Known risks carried into delivery** (design §7): checker resolution of *imported* type arguments at
the macro position — the same machinery as the annotation path, so low risk, but it must be verified
with an imported-interface fixture in Phase 2. And INK0047's interaction with the `defineComponent`
overloads: the `props?: never` guard needs a macro-aware equivalent at the type level, or the
collision is compiler-only. Compiler-only is acceptable, since `tsc` cannot see the body anyway.

## Decision log

2026-08-31 — decided by the project owner, on internal tracker UXF-241: **"The design is approved,
going with void's recommendation."** Option A adopted; Phases 1 and 2 authorized to proceed; open
questions 1 and 2 left open. → [ADR-010](../adrs/010-defineprops-joins-the-macro-family.md) filed.
