---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): add FieldGroup component

Add `IFieldGroup` (and its headless `IFieldGroupBase`), styled with the Styleframe 3.9 `field-group`
recipe. It joins bordered controls — inputs, buttons, selects, badges — placed as its **direct
children** into a single visual unit, merging their border radii and collapsing the inner border at
the seams. Supports `orientation` (`horizontal` / `vertical`) and a `block` mode that fills the
container width.

This is the supported replacement for the Input `prepend`/`append` addons removed alongside it: wrap
a control and its neighbours in an `IFieldGroup` instead of nesting them inside the input.
