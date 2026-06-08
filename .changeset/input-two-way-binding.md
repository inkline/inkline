---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): two-way binding for Input (UXF-5)

`IInputControl` (and the headless `IInputControlBase`) now expose a two-way-bindable
`value` via `defineModel`, so a parent binds it with each framework's native idiom:
Vue `v-model:value`, Svelte `bind:value`, Angular `[(value)]`, and a `value` +
`onUpdateValue` controlled pair in React/Solid/Qwik. On the static Astro target the
value is render-only (one-way). This replaces the previous controlled-only `value`
prop — the control now emits its own updates instead of relying on a parent-supplied
`onInput` handler.
