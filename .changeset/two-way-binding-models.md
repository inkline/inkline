---
"@inkline/core": minor
"@inkline/compiler": minor
---

Add two-way binding and custom component-event emission. New authoring primitives: `defineModel(name)` declares a two-way-bindable prop plus its paired `update:<name>` event (returns a `[get, set]` signal tuple), and `defineEmits()` declares custom events and returns an `emit` function.

Each target emits the idiomatic shape: Vue `defineModel()` / `defineEmits()`, Svelte 5 `$bindable()` + callback props, Angular `model()` / `output()`, React/Solid a value prop + `onUpdate<Prop>` callback, Qwik the same with `QRL` callbacks, and Astro a read-only server value (two-way/events are not interactive there — diagnostic `INK0045`). Parents two-way-bind a component with `$bind:<prop>={state}` (getter convention). `IR_VERSION` is bumped 1 → 2 with a migration.
