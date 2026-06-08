---
"@inkline/core": minor
"@inkline/compiler": minor
---

Add two-way binding and custom component-event emission. New authoring primitives: `defineModel(name)` declares a two-way-bindable prop plus its paired `update:<name>` event (returns a `[get, set]` signal tuple), and `defineEmits()` declares custom events and returns an `emit` function. The compiler parses both into the IR (new `IRComponent.models`, synthesized value prop + `update:<name>` model event, recorded `emitName`), and lowers `$bind:<prop>` on a component instance to the bound value plus the child's update event using the getter convention (`$bind:value={state}`). `IR_VERSION` is bumped 1 → 2 with a migration.
