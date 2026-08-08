---
"@inkline/core": minor
"@inkline/compiler": minor
---

feat(core): add the type-only `models` declaration channel with INK0094 drift diagnostic

`ComponentOptions` now accepts `models?: Record<string, PropDeclaration>`, so a parent's type-checker
can see the two-way models a component's setup body creates with `defineModel` at JSX attribute
position (`open`, `$bind:open`) without the child having to hand-write props.

The key is a **type-only channel**: the compiler emits models from the setup body's `defineModel`
calls alone, so declaring it changes no emitted output on any of the seven targets — asserted by
compiling the same body with and without the key and requiring byte-identical files.

Because nothing downstream reads it, a drifted entry would compile clean on both sides while teaching
a parent a shape the compiler never emits. The new `INK0094` warning reports that disagreement: a
name declared but never created, a name created but never declared, or a declared type that
contradicts the `defineModel` type argument.
