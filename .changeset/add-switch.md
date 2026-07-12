---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): add Switch component

Add `ISwitch` (and its headless parts `ISwitchBase`, `ISwitchControlBase`, `ISwitchLabelBase`), an
accessible on/off toggle styled with the Styleframe `switch` / `switch-field` recipes. It follows the
WAI-ARIA **Switch** pattern on a native `<input type="checkbox">`: a two-way `checked` model drives
`aria-checked`, Space toggles natively, and Enter synthesises the native click to complete the switch
keyboard map. The default slot (or `label` prop) supplies the accessible name, and the `.switch-label`
addon collapses when empty. Supports `color` (`light` / `dark` / `neutral`) and `size`
(`sm` / `md` / `lg`).
