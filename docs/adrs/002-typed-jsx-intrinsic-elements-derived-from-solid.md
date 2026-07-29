# ADR-002: Type `JSX.IntrinsicElements` by deriving it from Solid's, behind an Inkline-owned alias

Date: 2026-07-29 · Status: Accepted
Deciders: Project owner · Informed by: internal tracker UXF-71 (friction audit), UXF-90 (RFC + measurements), UXF-133 (implementation)
Supersedes: — · Superseded by: —

Resolves the first item ADR-001 left in "Explicitly still undecided". ADR-001 is unchanged and still
Accepted; its ordering of diagnostic work stands, subject to the revisit trigger it wrote for exactly
this event ("a decision lands on typing the authoring surface").

## Context

`.ink.tsx` markup had no types. `JSX.IntrinsicElements` was `[elemName: string]: any`, so
`<div className="x">`, `<button onClik={…}>`, `<input disabled="yes-please">` and `<notatag />` all
compiled clean and surfaced only when the generated output was run in a browser. This was the
friction audit's highest-ranked _absent_ diagnostic: the compiler stayed quiet.

Writing a full `IntrinsicElements` from scratch is real work with a permanent maintenance tail — the
HTML and SVG attribute surface plus the DOM event map is thousands of lines that must track the
platform. Three options were measured on the repo's own authored corpus (UXF-90):

- **Borrow React's** (`@types/react`). First pass: 20 errors across the corpus, and a 56-line
  compatibility shim to reconcile React's DOM-property naming (`className`, `htmlFor`) with the
  attribute names Inkline emits.
- **Borrow Solid's** (`solid-js`). A 34-line shim and one property name (`indeterminate`) to
  reconcile. Solid's surface is attribute-named (`class`, `for`), which is what Inkline's targets
  emit, and its signal-and-JSX authoring model is the closest neighbour to Inkline's.
- **Stay `any`.** Zero cost, zero benefit; keeps shipping the silence.

Solid is already a first-class compile target (`ui/solid`) and already in the workspace catalog, so
this adds no new vendor to the dependency graph.

The measured safety level was also part of the decision, not a discovered afterthought. Of twelve
deliberate authoring mistakes, a Solid-derived surface catches eight and structurally cannot catch
four: hyphenated attribute names (TypeScript exempts non-identifier JSX attribute names from
unknown-property checking, which is what makes `data-*` authoring work at all), component prop typos
(`InkComponent` carries `[attr: string]: any`), invalid members of open string unions Solid declares
as `… | (string & {})`, and unknown `$`-prefixed compiler directives.

## Decision

Derive `JSX.IntrinsicElements` from `solid-js`'s, reshaped through a single Inkline-owned alias in
[`core/core/src/jsx-runtime.ts`](../../core/core/src/jsx-runtime.ts):

```ts
type Inklinified<T> = { [K in keyof T]: Omit<T[K], InklineOwnedKeys> & InklineOwned };
```

Three commitments come with it:

1. **The alias is the contract, not Solid.** The public shape is "upstream element attributes, minus
   the keys Inkline redefines, plus `InklineOwned`". Replacing Solid with a generated
   Inkline-owned surface later is one `extends` clause, invisible to authors.
2. **`InklineOwned` is where Inkline overrides upstream**, and nowhere else: `ref` is Inkline's
   `{ current }` object, `children`/`key` are compiler-opaque, `indeterminate` is a DOM property with
   no HTML attribute, and every `` `$${string}` `` key stays open so directives are unconstrained by
   construction.
3. **Component props stay untyped.** `InkComponent`'s `[attr: string]: any` is explicitly out of
   scope. It is a much larger change with a different blast radius and gets its own decision.

The 101 compiler fixtures are checked as part of this: they are no longer excluded in
`core/compiler/tsconfig.json`, and no longer ignored by the root `vite.config.ts` — that
`ignorePatterns` list gates the type-check path too, which is why excluding them had silently kept
them out of CI. The fixtures are the control that catches a bad upstream bump.

## Consequences

**Good.**

- The corpus that motivated this is now checked: 170 authored `.ink.tsx` files, and the repo-wide
  type-check corpus grows from 611 to 715 files. On the compiler fixtures the typed surface is a net
  improvement of 10 errors against the `any` baseline — every implicit-`any` event parameter is now
  inferred — with zero new errors introduced.
- Event handlers get real event objects. `e.currentTarget` is the element, not `any`, which is where
  most of the day-to-day value lands.
- Editors gain attribute autocomplete on every intrinsic element, from the same types.
- The safety level is pinned by test, not by prose:
  [`jsx-runtime.probes.test.ts`](../../core/core/src/jsx-runtime.probes.test.ts) asserts all twelve
  probe outcomes. A Solid bump that stops catching one of the eight fails, and one that starts
  catching one of the four fails too — so the documented blind spots cannot go stale.

**Bad.**

- **`@inkline/core` now depends on a framework it is not.** `solid-js` is a real dependency edge for
  types only, and Inkline's authoring types now move when Solid's do. The alias limits the blast
  radius to one file, and the probe suite makes a regression loud, but the coupling is genuine and
  the escape from it is writing the surface ourselves — the cost this decision declined to pay.
- **It can turn green consumer builds red.** That is the intent, but it is a cost paid by anyone who
  relied on the untyped surface. Mitigated, not removed, by a documented `jsxImportSource` shim that
  restores the old behaviour while errors are worked through.
- **Four of twelve mistakes still pass.** The surface is a real improvement, not a guarantee, and the
  gap most likely to bite — component prop typos — is the one deliberately left open. Presenting
  "typed JSX" without that caveat would overstate what authors actually get.
- **The fixtures are now a gate.** Adding a fixture that does not type-check fails CI, which is the
  point, and is also new friction on a corpus whose job is to be weird.

**Neutral.**

- `@inkline/core` still ships no runtime and the compiler still erases every reference to it. Nothing
  about the output changed; this is an authoring-time and editor-time change only.

## Revisit triggers

Written now, before the consequences are known:

- Solid's JSX types diverge from the attribute surface Inkline's targets emit — more than a handful
  of `InklineOwned` overrides accumulate, or an upstream bump breaks the probe suite twice. Then
  generating an Inkline-owned surface outranks borrowing one.
- Real reports arrive of the four blind spots costing time. The component-prop one is the likely
  candidate and is a separate decision; the other three are structural and would argue for compiler
  diagnostics instead.
- `solid-js` becomes a problem to depend on (license, size in a consumer's lockfile, release cadence)
  in a way that types-only usage does not excuse.
- A consumer needs the `jsxImportSource` escape hatch for longer than one minor cycle. Then the
  migration cost was underestimated and the rollout, not the decision, needs rework.
