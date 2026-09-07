---
"@inkline/compiler": minor
---

feat(compiler): make the `defineSlot` binding optional and refuse an unbound `defineProps` / `defineEmits` / `defineModel`

`defineSlot` declares its slot from the call alone. The binding only gives the render tree a name to
place the slot by, so a component that renders through `<Slot>` no longer has to keep a local it
never reads:

```tsx
defineSlot(); // renders as <Slot>
const footer = defineSlot("footer"); // renders as {footer}
```

Both forms produce the same declaration and the same emitted code on all seven targets. The 17
components under `ui/components` that carried a `const _defaultSlot = defineSlot();` now use the bare
form, and their generated output is byte-identical, sourcemaps included.

The grammar gained a fourth rule to make that legal without opening a hole. `MacroRules` now carries
`bindingRequired`, and a bare `defineProps();`, `defineEmits();` or `defineModel();` is the new
**INK0075**, an error. The binding is the only way to reach what those macros declare, and the call
itself is erased, so an unbound one read as a declaration while being none — and reported nothing.
`defineSlot` is the one macro exempt from the rule.

A note for anyone reading the IR: a slot inferred from `<Slot>` carries a `fallback` on its
declaration and a declared one does not, but no target reads
`IRSlotDeclaration.fallback` — every one of them reads the fallback off the `SlotPlaceholder` render
node. The difference stops at the IR and never reaches the output.
