---
"@inkline/core": minor
"@inkline/compiler": minor
---

feat(compiler): add the `defineProps` macro and the macro-discipline diagnostics

`defineProps` declares a component's props at the call site, in either of two forms:

```tsx
const props = defineProps<ButtonProps>(); // type form
const props = defineProps({ color: "blue" }); // declaration-map form
```

Both lower to the same `IRProp[]` the setup parameter's type annotation and the options object's
`props` map already produce, so no target, lowering pass or IR node changes. The type argument is
resolved with the checker, which covers an interface imported from another module. The declaration
map is parsed by the same code the options object uses, so a constructor reference is a required
prop and a bare value is an optional one with that default.

Three diagnostics come with it:

- **INK0047** — props declared through more than one channel. Exactly one of the macro, the setup
  parameter's annotation, or the options `props` map may declare them; a second channel would emit
  props the body never reads.
- **INK0048** — a macro argument that is not statically analyzable. A macro is erased at build time,
  so a value computed at runtime is gone before anything can read it.
- **INK0049** — a macro called outside the top level of the setup body. A nested macro still
  declares unconditionally while reading as if it did not.

Both new rules read the macro registry, so they cover the other macros too. INK0048 applies to
`defineEmits`, `defineSlot` and `hasSlot`. INK0049 applies to `defineEmits`, `defineSlot` and
`defineModel`; `hasSlot` is a query, not a declaration, so it stays legal anywhere in the setup body.
`defineModel` keeps reporting its own argument rule under INK0043 and is unchanged.
