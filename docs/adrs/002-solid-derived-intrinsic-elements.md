# ADR-002: Adopt Solid-derived `JSX.IntrinsicElements` behind an Inkline-owned alias

Date: 2026-07-28 · Status: Accepted
Deciders: Project owner · Informed by: internal tracker UXF-90 (RFC), UXF-71 (friction audit), UXF-72 (prior-art survey)
Supersedes: — · Superseded by: —

## Context

Inkline's JSX surface was entirely untyped. [`core/core/src/jsx-runtime.ts`](../../core/core/src/jsx-runtime.ts)
gave `slot` a shape and declared `[elemName: string]: any` for everything else, so every HTML tag,
attribute, and event handler was `any` — no autocomplete, no typo detection, no event types. The
codebase already worked around it: `ui/components/src/components/radio/headless/IRadioFieldBase.ink.tsx:43`
hand-types an event as `(e: { preventDefault: () => void })`.

Typing that surface is a one-way door. `JSX.IntrinsicElements` is public API the moment it ships, and
it turns currently-green repositories red. [ADR-001](./001-compiler-dx-invests-in-diagnostics.md)
explicitly deferred this decision to its own RFC for that reason.

**Four options were live, and the losing ones were real:** (a) generate the surface from upstream
element/attribute data, (b) hand-author a minimal HTML/SVG surface, (c) reuse an existing framework's
JSX types behind a compatibility layer, (d) stay `any` and spend the same week on diagnostics. The
full steelmanned case for each is in the RFC (internal tracker UXF-90, §4) and is not re-litigated
here.

**The decision turned on a measurement, not on an argument.** Two candidate surfaces were built on a
scratch branch and run with `tsc --noEmit --skipLibCheck` against every authored `.ink.tsx` in the
repository — 67 files in `ui/components` (checked in CI today) and 101 compiler fixtures (excluded
from `core/compiler/tsconfig.json` today), 168 files in total. Fixture numbers are deltas against
their own 9-error pre-existing baseline; the `ui/components` baseline is 0.

| Candidate                      | First-pass errors, `ui/components` | Final shim | Final errors, all 168 files |
| ------------------------------ | ---------------------------------- | ---------- | --------------------------- |
| React (`@types/react` 19.2.17) | 20                                 | 56 lines   | 0                           |
| Solid (`solid-js` 1.9.13)      | 1                                  | 34 lines   | 0                           |

**The React number is a lower bound, not a count.** TypeScript reports only the first offending
property per JSX element, so `IInputControlBase.ink.tsx:27` reported `class` while silently sitting
on `readonly` as well. Anyone re-estimating this decision from a first-pass error count will estimate
wrong; the shim size is the honest cost signal, not the error count. Reaching zero with React
required re-spelling `class`, `readonly`, `maxlength`, `tabindex`, `autocomplete`, `autofocus`,
`contenteditable`, `spellcheck`, `crossorigin`, `minlength`, `style`, and `children`, and re-typing
every event's `target` — React types `FormEvent<T>.target` as bare `EventTarget`, which broke
`<input onInput={(e) => setValue(e.target.value)} />` in 7 of the 101 fixtures. Reaching zero with
Solid required **one property name**: `indeterminate`.

Zero of the eight Solid first-pass failures were naming mismatches. Solid already spells `class`,
`readonly`, `tabindex`, and `maxlength` the HTML way and already types `currentTarget` as the
element. Every remaining failure was a place where Inkline has a concept no upstream surface can know
about — `Ref<T> = { current }`, compiler-opaque `children`, `key`, `$bind:` directives — the exact set
that options (a) and (b) would have had to hand-write anyway.

`solid-js@^1.9.13` is already in the workspace catalog ([`pnpm-workspace.yaml:87`](../../pnpm-workspace.yaml))
and already a first-class compile target (`ui/solid`), so this adds no new vendor to the graph.

Check-time cost is not measurable at this corpus size: `tsc --noEmit -p ui/components` ran at
0.34s/0.35s on the baseline and 0.30–0.57s with the candidate.

## Decision

We will type `JSX.IntrinsicElements` as `Inklinified<SolidJSX.IntrinsicElements>` — Solid's element
surface, re-exported through an Inkline-owned type alias that overrides `ref`, `children`, `key`,
`indeterminate`, and the `$*` directive namespace.

The `Inklinified<…>` alias is load-bearing and is part of the decision, not an implementation detail.
It is the seam that makes the upstream swappable: replacing Solid with a generated surface later is
one line in one file with no author-visible effect, which the measurement supports — both candidates
converge on 0 errors.

Implementation is tracked separately (internal tracker UXF-133); no PR had been opened when this ADR
was filed. The decision does not wait on the implementation.

## Consequences

**Good.**

- **Zero migration, measured.** 168 authored `.ink.tsx` files, 0 errors, 0 author-file edits. No
  codemod, no opt-in flag, no deprecation window — a flag on a zero-error change is config surface
  bought for no risk reduction.
- **It closes a correctness hole, not only an ergonomics one.** `className` and `htmlFor` compile
  silently today and emit wrong HTML. The typed surface rejects both.
- 4,253 lines of maintained, battle-tested element surface (`solid-js/types/jsx.d.ts`) that Inkline
  does not write and does not maintain, for the cost of an `extends`.
- 8 of 12 seeded authoring mistakes are caught that the `any` surface caught 1 of (see the RFC's
  §2.3 probe table, which ships as the regression suite).
- Escape hatches ship in the same release as the constraint: `$bind:*` and the ``[K in `$${string}`]``
  index signature are permanently unconstrained, `data-*` remains free, and a one-line
  `declare module` augmentation reopens the surface for anyone who needs it.

**Bad.**

- **Inkline's authoring surface is now coupled to Solid's release cadence and Solid's taste.** A
  Solid major that reshapes `JSX.IntrinsicElements` is our problem on their schedule. Solid's surface
  also encodes Solid's own opinions (reactive `ref` callbacks, `attr:`/`prop:` namespaces) that do
  not all map onto Inkline's lowering.
- **"Inkline's HTML types are Solid's" is a sentence a competitor can use against a
  framework-agnostic compiler.** That narrative cost is accepted, not dismissed. The mitigation is
  structural rather than aspirational — the `Inklinified<…>` alias, above — but the mitigation is a
  future one-line change, not a present answer.
- **It does not buy the two mistakes most likely to happen in a component library.** Four of the
  twelve probes are still missed, and nobody reading this in six months should overestimate what
  shipped:

  | Miss                                     | Why types cannot reach it                                                                                                                                                                                                              |
  | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | `<div aria-hiddenn="true" />`            | TypeScript does not validate JSX attribute names that aren't valid JS identifiers. `notARealAttribute` errors; `aria-hiddenn` does not. There are 11 `aria-*` uses in `ui/components` and this change buys zero safety on any of them. |
  | `<IButtonBase colr="light" />`           | `InkComponent<P>` still carries `[attr: string]: any` ([`core/core/src/index.ts:20`](../../core/core/src/index.ts)). `ui/components` authors far more component elements than native ones, so this is arguably the larger hole.        |
  | `<input type="definitely-not-a-type" />` | `HTMLInputTypeAttribute` includes `(string & {})` by design.                                                                                                                                                                           |
  | `<div $bind:totalNonsense={1} />`        | `$bind:*` is an escape hatch by construction; no TS mechanism constrains it against a per-element attribute set.                                                                                                                       |

  The first and last belong to the INK diagnostic catalogue (internal tracker UXF-136); the second
  needs its own measurement and its own RFC (internal tracker UXF-135).

- **Downstream breakage is unmeasurable from this repository and was not estimated.** External
  `.ink.tsx` authors, unlike ours, may well have written `className`. The only honest mitigation is a
  minor release whose changeset names the four rejected React-isms (`className`, `htmlFor`, `style`
  as an object, camelCase DOM props) and gives the augmentation escape hatch. That is a release note,
  not a migration plan.
- **Editor behaviour was not verified.** The measurement was `tsc`, not tsserver. UXF-72's survey
  found that one module-resolution quirk can remove 100% of a type story's benefit
  (`vanilla-extract-css/vanilla-extract#56`), so a real editor check is a merge-time condition on the
  implementation.

**Neutral.**

- `solid-js` moves from a compile-target dependency to a dependency of the authoring surface. Same
  package, higher stakes.
- Un-excluding the 101 compiler fixtures from type-checking turns them into a permanent regression
  corpus. That step is the control for the coupling risk above, not optional polish.

## Revisit triggers

Written now, before any of it ships:

- **A Solid major reshapes `JSX.IntrinsicElements`.** Watch: the un-excluded fixture corpus going red
  on a `solid-js` bump, or the 12-case probe suite changing its 8-error/4-clean result. Either is the
  signal to reopen and price option (a), the generated surface.
- **Downstream `className` breakage generates more than 3 issues.** Then the release-note mitigation
  was insufficient and the migration question reopens on its own terms.
- The `Inklinified<…>` alias stops being a one-line seam — i.e. the Inkline-owned override layer
  grows past roughly the size of the surface it wraps. At that point we are hand-authoring option (b)
  by accident and should do it deliberately or not at all.

## Relationship to ADR-001

This decision fires one of [ADR-001](./001-compiler-dx-invests-in-diagnostics.md)'s revisit triggers
— _"A decision lands on typing the authoring surface. Typed JSX changes which diagnostics matter and
which ones the type checker subsumes, and this ordering should be re-derived rather than assumed."_
ADR-001 is not edited; the re-derivation it asks for is owed, and the four probe misses above are the
starting input for it. The diagnostics ordering in ADR-001 stands until that work is done.
