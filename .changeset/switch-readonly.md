---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): add `readonly` prop to Switch

Add a `readonly` prop to `ISwitch` (and its headless `ISwitchControlBase`). Because a native
checkbox ignores the HTML `readonly` attribute, read-only is enforced behaviourally: the control
announces `aria-readonly="true"` and cancels the click's default action so the box can't flip. Mouse
click, Space (which the browser dispatches as a click), and the Enter-synthesised click all funnel
through one guard, so the two-way `checked` model can't change — while the switch stays focusable and
form-submittable, unlike `disabled`. The `switch-field` recipe has no read-only visual state, so this
is aria + behaviour only.
