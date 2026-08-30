---
"@inkline/compiler": minor
---

Diagnose the two authoring mistakes the typed JSX surface structurally cannot catch — misspelled
`aria-*` attributes and `$bind:` targets nothing can be written back to.

TypeScript exempts JSX attribute names that are not valid identifiers from unknown-property
checking, which is what makes `data-*` authoring work and what makes `aria-hiddenn` type-check on
every element. `InklineOwned` declares ``[K in `$${string}`]?: any``, so every `$`-prefixed key is
open by construction. Both are deliberate properties of the type surface, not gaps to be closed
there — so they are now closed by the compiler:

- `INK0072` — **warning**. An `aria-*` attribute that is not an ARIA attribute, with a did-you-mean
  against the real set (`aria-hiddenn` → `aria-hidden`). A warning rather than an error because the
  valid set is a _snapshot_ of a spec Inkline does not own: a genuinely new ARIA attribute the
  snapshot predates would otherwise fail the build of an author who did nothing wrong. The emitted
  output is unaffected either way — an unknown `aria-*` renders as written and assistive technology
  ignores it, which costs accessibility, not correctness.
- `INK0073` — **error**. A `$bind:` target the compiler has nothing to write back to, naming what
  the element or component does bind. An error rather than a warning because `$bind:` is Inkline's
  own vocabulary with no external spec to lag, so a false positive is a bug rather than a risk to
  price in — and because the failure is not cosmetic: `<div $bind:nonsense={1} />` previously
  compiled clean and emitted `onInput={(e) => 1(e.target.value)}`, which throws on the first input
  event.

The ARIA attribute set is **derived**, not hand-listed: `scripts/gen-aria-attributes.ts` reads the
property names off `@inkline/core`'s vendored JSX element types and writes
`src/core/aria-attributes.generated.ts`. `pnpm run generate:aria:check` fails on drift, so re-syncing
the vendored types updates the diagnostic's vocabulary in the same step.

The native two-way vocabulary is now a single table, `NATIVE_BINDINGS`, shared by the lowering that
desugars `$bind:` and the check that rejects it — the two cannot drift into disagreeing about which
bindings exist. `$bind:` on a custom element stays ungated: its bindable surface is defined by its
own class, which the compiler cannot see. A `$bind:` onto a component from another module is skipped
for the same reason `INK0120` documents — its model set is not visible from here.

Rows 9 and 12 of the RFC §2.3 probe table move out of the blind-spot column: TypeScript still cannot
see them and never will, but the mistake no longer reaches the author's output.
