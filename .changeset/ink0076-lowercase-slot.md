---
"@inkline/compiler": minor
---

fix(compiler): refuse a lowercase `<slot>` element (`INK0076`)

Lowering turns the capitalized `<Slot>` into a slot placeholder. A lowercase `<slot>` parses as an
ordinary JSX intrinsic, so no pass ever looked at it: it declared no slot, typed no prop, and was
copied into every target verbatim with no diagnostic. TypeScript reported nothing either — `slot` is
a declared JSX intrinsic in the vendored element types.

```tsx
export default defineComponent(() => {
  return (
    <div>
      <slot />
    </div>
  );
});
```

compiled clean on all seven targets. The two failure shapes hid behind one cause. On React, Solid,
Svelte, Angular and Qwik the element reached the output as inert markup that nothing ever projects
into — the compiler emits framework components, never custom-element classes, so no output of it
lands in a shadow root. On Vue and Astro the same source _is_ that target's own slot outlet, so it
rendered while the component still declared no slot: no prop type, no fallback wiring, no `hasSlot`.
One file, two meanings, and neither is the one the author wrote.

`INK0076` is now reported as an error, from the `unloweredSlots` lowering that already reports
`INK0069`. It matches the IR element rather than the emitted text: Vue and Astro print `<slot>` for a
correctly lowered `<Slot>` too, so by codegen the two are no longer distinguishable. A lowercase
`<slot>` surviving inside an expression lowering never reached — an IIFE, say — is reported from the
same pass.

`core/compiler/README.md`, `docs/authoring-components.md` and the `ink-authoring-api` skill taught
the lowercase form for the default slot. All three now teach `<Slot />`. No component or fixture
changes behaviour.
