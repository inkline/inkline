# @inkline/core

## 0.1.0

### Minor Changes

- 78ea062: Add @inkline/core authoring API package with typed primitives (defineComponent, createSignal, createMemo, etc.), JSX runtime, and control-flow helpers. Support external import forwarding in the compiler codegen so non-framework imports (e.g. styleframe) are emitted into each target's output.
- 407c744: feat(compiler): meta.headless + Angular attribute-selector host-extraction

  `defineComponent` accepts a new `meta: { headless?: boolean }` option, threaded through the parse
  pass into `IRComponent.meta` (IR_VERSION → 3, with a pure-bump 2→3 migration).

  On the **Angular** target, a `headless` component with a single static-element root now emits a
  second, **attribute-selector** `@Component` whose root element IS the host — `button[ink-button-base]`
  with the root's attrs/events extracted into `host: { … }` and a children-only template — so the
  native element carries the behavior with **no wrapper** (`<button ink-button-base>` instead of
  `<ink-button-base><button></button></ink-button-base>`). The original element-selector wrapper
  component is still emitted unchanged (dual selector), so `<ink-button-base>` keeps working as a
  `display: contents` wrapper.

  A `headless` component whose root is not a single static element (fragment/conditional) cannot be
  host-extracted; the target warns (**INK0111**) and emits only the element-selector wrapper.

  This is the compiler foundation for zero-wrapper Angular components; no shipped components opt in yet.

- 287b326: Add a `hasSlot(name)` authoring primitive that reports whether a named (or default) slot was filled, so a component can conditionally render a slot's wrapper: `<Show when={hasSlot("prefix")}>…<Slot name="prefix" /></Show>`.

  The compiler lowers it to each target's slot-presence read — `props.renderX != null` (React), `props.x != null` (Solid), `xSnippet != null` (Svelte), `!!$slots.x` (Vue), `Astro.slots.has("x")` (Astro). Qwik and Angular expose no runtime slot-presence API, so it lowers to `true` (the gated content always renders — pair it with a CSS `:empty` rule) and emits the new `INK0068` info diagnostic. Statically-true/false conditions are folded during codegen, so no constant `<Show when={true}>` is emitted.

- c12188d: Add two-way binding and custom component-event emission. New authoring primitives: `defineModel(name)` declares a two-way-bindable prop plus its paired `update:<name>` event (returns a `[get, set]` signal tuple), and `defineEmits()` declares custom events and returns an `emit` function.

  Each target emits the idiomatic shape: Vue `defineModel()` / `defineEmits()`, Svelte 5 `$bindable()` + callback props, Angular `model()` / `output()`, React/Solid a value prop + `onUpdate<Prop>` callback, Qwik the same with `QRL` callbacks, and Astro a read-only server value (two-way/events are not interactive there — diagnostic `INK0045`). Parents two-way-bind a component with `$bind:<prop>={state}` (getter convention). `IR_VERSION` is bumped 1 → 2 with a migration.
