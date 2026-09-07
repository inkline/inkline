# ADR-011: The `defineSlot` binding is optional

Date: 2026-09-07 · Status: Accepted
Deciders: Project owner (2026-09-07) · Informed by: [ADR-010](./010-defineprops-joins-the-macro-family.md), internal tracker UXF-251 (the decision thread), UXF-254 (the implementation), UXF-255 (this record)
Supersedes: — · Superseded by: —

Code claims below are **verified** against `main` @ `69bf779a5`. Component-corpus claims are
**verified** against the UXF-251 migration branch on
[#614](https://github.com/inkline/inkline/pull/614), which was open and unmerged at decision time.

## Context

`defineSlot` is a declaration-position macro: the dispatch reaches it only through a variable
initializer, and it returns `undefined` unless the declared name is a plain identifier
(`core/compiler/src/pipeline/passes/02-parse/macros.ts:259, 262`). The binding _was_ the declaration.

**The migration made the cost visible.** #614 converts every `slots:` declaration to the macro — 18
`defineSlot` calls across 17 component files. Every one of them binds a const the body never reads,
so every one carries a `_` prefix to silence the unused-local rule. Those 17 files hold 18 `<Slot`
render sites and **zero** uses of the `{defaultSlot}` alias — one `<Slot>` per declaration.

**What the binding actually is.** `defineSlot` is `erased: true` (`macros.ts:260`), so the const
never reaches any target's output. It survives only as a compile-time key in `slotBindings`
(`macros.ts:288`). Its one capability is positional: the lowering replaces a render-tree expression
node that is a bare matching identifier with a `SlotPlaceholder`
(`03-lower/define-slot.ts:12-24`). `defaultSlot` is not a value. It is a token meaning "render this
slot here".

**That alias is strictly weaker than `<Slot>`.** The lowering builds the placeholder with
`scopedArgs: []` and `fallback: undefined` (`define-slot.ts:21-22`), so `{defaultSlot}` can never
carry fallback content. `<Slot>` can.

**The grammar already fails silently.** A bare `defineSlot("footer");` reports nothing. The R1 walk
counts a top-level call statement as top level (`macros.ts:420-421`), so INK0049 stays quiet, and
the dispatch then never reads the call. The slot is never declared and nothing tells the author. The
guard's own doc comment says it exists to stop exactly this class of failure
(`macros.ts:392-400`). `defineProps` and `defineEmits` share the hole.

## Decision

**1. `defineSlot` declares its slot with or without a binding.** The bound form and the bare
`defineSlot()` both register the slot. The compiler learns of the slot from the macro call, not from
the declaration around it.

**2. The author picks the render form to match.** `{defaultSlot}` where a const exists, `<Slot>`
where it does not. The two are not equivalent in capability — only `<Slot>` carries a fallback — so
the alias is a convenience, not the recommended form.

**3. The 17 components drop their `_`-prefixed consts.** UXF-254 owns the compiler change and the
removal together. #614 merges as it stands; the removal follows it.

**4. The diagnostic is a precondition, not a follow-up.** Unbound-and-silent is worse than either
end state: today a bare `defineSlot()` that the dispatch misses declares nothing and reports
nothing. UXF-254 must close that hole in the same change that legalizes the unbound form.

### The rejected option

**Keep the binding required, and fix the silence separately.** This was the recommendation on
UXF-251, argued on one ground: one grammar with one diagnostic beats two grammars, because an unused
local is visible where a slot that never registers is not.

The Operator rejected it. In their terms: the consts are not used, so requiring them is not
justified — make the compiler aware of the slot through `defineSlot`, and let the author write
`{defaultSlot}` or `<Slot>` as the body needs.

The evidence supports the rejection. The recommendation's first form rested on the local being
"not always dead"; the same reviewer withdrew that a comment later, on finding the alias cannot
carry a fallback. Against a corpus where every one of the 18 render sites already writes `<Slot>`,
the required const buys nothing and costs 18 `_` prefixes. **The recommendation lost on the merits.**

## Consequences

**Good.**

- 18 dead consts leave the corpus, and with them the `_` convention that advertised them as dead.
- The declaration says what it does. `defineSlot("footer")` reads as a declaration; the bound form
  reads as a value that is then ignored.
- The silent-failure hole gets closed on a deadline instead of a backlog, because decision 4 makes
  it blocking.

**Bad.**

- **Two spellings now declare one slot**, and two more render it. That is a real consistency cost,
  paid deliberately. It is the same trade ADR-010 made for props, and it lands in the same place: the
  docs must name one primary style even though both compile.
- **A third, silent spelling exists until UXF-254 ships.** Between this decision and that change, a
  bare `defineSlot()` still declares nothing and still reports nothing. Decision 4 is what bounds
  that window; it does not close it today.
- **`{defaultSlot}` stays in the grammar as the weaker form.** An author who reaches for the alias
  and later needs a fallback must rewrite the render site. Keeping a strictly-weaker form legal is a
  cost, accepted because removing it is a separate breaking change nobody asked for.
- **The macro-declared slot carries no fallback, and the `<Slot>` inference will not supply one.**
  `slot-declarations.ts:11` infers a declaration from a `SlotPlaceholder` only when the name is not
  declared yet, and `:18` is what copies the fallback onto that inferred declaration. So
  `defineSlot("footer")` plus `<Slot name="footer">Text</Slot>` takes the guard, skips inference, and
  leaves the declaration fallback-less — where the same `<Slot>` alone today holds one. **Unverified:
  whether emitted output changes**, since a target may read the fallback from the placeholder node
  rather than the declaration. UXF-254 settles this first, before any code.

**Neutral.**

- No IR change and no target change are implied. The macro already produces the same `IRSlotDeclaration`;
  only the dispatch position and the diagnostics move.
- `defineProps` and `defineEmits` have the same declaration-position constraint and the same silent
  hole. This ADR decides nothing about them.

## Revisit triggers

- **UXF-254 finds that emitted output does change** when a macro-declared slot loses its `<Slot>`
  fallback. Then the fallback question is a decision in its own right, not an implementation
  detail, and it needs its own record before the unbound form ships.
- **A second alias capability appears** — scoped slot args reaching `{defaultSlot}`, say. Then
  `{defaultSlot}` stops being strictly weaker than `<Slot>`, and the "convenience, not recommended"
  framing in decision 2 needs rewriting.
- **Authors hit the unbound-and-silent hole in practice** after UXF-254 ships, meaning the
  diagnostic did not cover the real failure shape. That reopens whether the binding should have
  stayed required — this ADR's rejected option, with new evidence.
- **The macro grammar gains a statement-position class** covering `defineProps` and `defineEmits`
  too. Then this becomes a special case of a general rule, and the general rule should supersede it.
