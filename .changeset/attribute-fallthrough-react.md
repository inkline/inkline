---
"@inkline/compiler": minor
---

Add Vue-style attribute fallthrough across all targets. A component's single host-element (or component-instance) root now inherits attributes passed by its parent: `class` is merged with the root's own class, and all other non-prop attributes (`id`, `aria-*`, `data-*`, event handlers) are spread onto the root. This makes the styled/headless composition work — a styled component's `styleframe` classes now reach the rendered DOM.

- **React, Solid (`splitProps`), Svelte 5 (`$props()` rest), Qwik, Astro** — attributes are spread onto the rendered root element and `class` is merged there.
- **Vue** — handled natively by `inheritAttrs`.
- **Angular** — handled natively: a `class`/`[class]` passed to a component is applied to its host element (the component selector), not the inner template root.

A new diagnostic (`INK0120`) warns when a parent passes a class to a same-module child whose root cannot inherit it (fragment / control-flow root).
