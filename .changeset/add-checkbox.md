---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): add Checkbox component

Add `ICheckbox` (and its headless parts `ICheckboxBase` + `ICheckboxControlBase`), a labelled
boolean control styled with the Styleframe `checkbox` and `checkbox-field` recipes. It wraps a native
`<input type="checkbox">` inside a `<label>` for implicit label association and free APG semantics
(`role="checkbox"`, `Space` toggle, focus, disabled). A two-way `checked` model drives the box via
`$bind:checked`; `indeterminate` renders the partially-checked ("mixed") state. Supports `color`
(`light` / `dark` / `neutral`), `size` (`sm` / `md` / `lg`), and a `label` prop overridable by the
default slot.

Note: `indeterminate` is bound as an attribute that resolves to the native `el.indeterminate` IDL
property on the Vue, Solid, Svelte, Qwik, and Angular targets (auto-exposing `aria-checked="mixed"`).
On React it currently renders as an inert HTML attribute, so the mixed-state visual does not surface
there yet — pending a compiler ref/effect ordering fix.
