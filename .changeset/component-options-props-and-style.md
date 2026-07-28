---
"@inkline/core": minor
---

feat(core): declare `props` and `style` on `ComponentOptions` and infer setup props from them

The options-object props form (`defineComponent({ props: { color: "blue", size: Number } }, …)`) is a
per-target-tested compiler feature that could not be authored from a type-checked `.ink.tsx` file:
`ComponentOptions` declared neither the `props` key the parser reads nor the `style` key it reads
alongside it, and `defineComponent` could not infer the setup parameter's type from the options
object. Authoring the documented form produced `TS2353` on `props` and `TS2339` on every prop read.

`ComponentOptions` now declares `props?: Record<string, PropDeclaration>` and `style?: string`, and a
new `defineComponent` overload infers the setup parameter from the `props` map, mirroring the
optionality each target emits:

- a bare constructor reference (`size: Number`) → required, `number`;
- a bare default value (`color: "blue"`) → optional, `string`;
- the full shape (`count: { type: Number, required: true, default: 0 }`) → required, `number`.

The constructor-to-type table matches the compiler's (`String`/`Number`/`Boolean`/`Object`/`Array`/
`Function`/`Symbol`/`Date`). Leave the setup parameter unannotated to use the inference; annotating
it selects the existing overload unchanged, so every current call site keeps its behaviour.
