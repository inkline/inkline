---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): add Radio component

Add `IRadioGroup` — a complete single-select control that renders one radio per `options` entry and
owns the two-way `value` — composed from three headless parts (`IRadioGroupBase`, `IRadioBase`,
`IRadioFieldBase`), styled with the Styleframe `radio-group` / `radio` / `radio-field` recipes.

Each option renders a native `<input type="radio">` wrapped in its `<label>`, so role, `aria-checked`,
keyboard roving, and mutual exclusivity (via a shared `name`) come from the platform. Supports the
`color`, `size`, and `orientation` recipe axes plus a group-level `disabled`. The headless parts are
exported individually for advanced composition.
