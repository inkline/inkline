---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): add Select component

Add `ISelect` — a complete single-select combobox that renders a `role="combobox"` trigger and, while
open, a `role="listbox"` panel of `role="option"` rows built from `options`. It owns the two-way
`value` plus internal open and virtual-focus state, composed from four headless parts (`ISelectBase`,
`ISelectTriggerBase`, `ISelectListboxBase`, `ISelectOptionBase`) and styled with the Styleframe
`select` / `select-panel` / `select-option` / `select-arrow` recipes.

Implements the APG select-only keyboard model — Up/Down/Home/End move the active row, Enter/Space open
then commit, Escape closes — with focus kept on the trigger via `aria-activedescendant`. Disabled
options are skipped from selection; the accessible name comes from `label`. Supports the `color`,
`variant`, and `size` recipe axes plus `invalid`, `disabled`, and `readonly`. On the static Astro
target the two-way `value` lowers to one-way (INK0045). The headless parts are exported individually
for advanced composition.
