---
"@inkline/compiler": patch
---

fix(compiler): read a bare `Date` prop as a type, not a default value

`isConstructorRef` carried a hand-written constructor list that omitted `Date`,
so `{ props: { when: Date } }` fell through the default-value branch: every
target emitted `when?: Date` seeded with the `Date` _constructor_ — `when = Date`
on React/Svelte/Qwik/Astro, `withDefaults(…, { when: Date })` on Vue,
`mergeProps({ when: Date }, …)` on Solid, `input<Date>(Date)` on Angular. An
omitted `when` resolved to `DateConstructor` at runtime, and the emitted default
did not typecheck against its own declared type.

The bare form now reads the shared `CONSTRUCTOR_TYPES` table, so every accepted
constructor declares a type and never a default. Required-ness stays a separate
question: `Date` is the one constructor that types the prop while leaving it
optional, matching `PropConstructorRef` in `@inkline/core`, which excludes
`Date` where `PropConstructor` includes it. `{ when: Date }` now emits
`when?: Date` with no default on all seven targets — what `InferProps` already
said it should be.
