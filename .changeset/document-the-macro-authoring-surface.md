---
"@inkline/compiler": patch
---

docs(compiler): document the macro authoring surface and the three props channels

The README's `Props` section now leads with `defineProps` — the documented primary style per
ADR-010 — in both its type form (`defineProps<ButtonProps>()`) and its declaration-map form
(`defineProps({ color: "blue" })`). The setup-parameter annotation and the options `props` map are
documented alongside it, with the reason to reach for each. A new `Macros` section states the
grammar the compiler now enforces: top-level calls only (`INK0049`, `hasSlot` exempt), statically
analyzable arguments only (`INK0048`), and one declaration channel per concern (`INK0047` for
props, `INK0046` for events).

Two corrections in the same pass:

- The options-object paragraph said a setup-parameter annotation that _agrees_ with a `props` map
  "still compiles, but it is redundant". Since `INK0047` shipped, that pair is a compiler error.
  TypeScript still only rejects the pair when the two disagree, so the compiler is what reports it.
- The props section did not state that the binding must be named `props`. Every target rewrites the
  props object under that fixed name, so any other name emits an undeclared identifier.

Every example in the section was compiled against the current compiler to all seven targets.
