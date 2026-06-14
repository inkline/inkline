---
"@inkline/core": minor
"@inkline/compiler": minor
---

Add a `hasSlot(name)` authoring primitive that reports whether a named (or default) slot was filled, so a component can conditionally render a slot's wrapper: `<Show when={hasSlot("prefix")}>…<Slot name="prefix" /></Show>`.

The compiler lowers it to each target's slot-presence read — `props.renderX != null` (React), `props.x != null` (Solid), `xSnippet != null` (Svelte), `!!$slots.x` (Vue), `Astro.slots.has("x")` (Astro). Qwik and Angular expose no runtime slot-presence API, so it lowers to `true` (the gated content always renders — pair it with a CSS `:empty` rule) and emits the new `INK0068` info diagnostic. Statically-true/false conditions are folded during codegen, so no constant `<Show when={true}>` is emitted.
