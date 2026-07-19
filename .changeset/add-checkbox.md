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
`$bind:checked`; `indeterminate` renders the partially-checked ("mixed") state on all seven targets,
auto-exposing `aria-checked="mixed"`. A `readonly` prop keeps the box focusable but non-toggleable,
announced via `aria-readonly` and enforced by cancelling the click default on all seven targets.
Supports `color` (`light` / `dark` / `neutral`), `size` (`sm` / `md` / `lg`), and a `label` prop
overridable by the default slot.
