---
"@inkline/compiler": minor
"@inkline/core": minor
---

feat(compiler): meta.headless + Angular attribute-selector host-extraction

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
