---
"@inkline/compiler": minor
---

Add Vue-style attribute fallthrough for the React target. A component's single host-element (or component-instance) root now inherits attributes passed by its parent: `class` is merged with the root's own class, and all other non-prop attributes (`id`, `aria-*`, `data-*`, event handlers) are spread onto the root. This makes the styled/headless composition work — a styled component's `styleframe` classes now reach the rendered DOM. A new diagnostic (INK0120) warns when a parent passes a class to a same-module child whose root cannot inherit it (fragment / control-flow root). Vue already inherits attributes natively; the remaining targets (Solid, Svelte, Qwik, Astro, Angular) are not yet covered.
