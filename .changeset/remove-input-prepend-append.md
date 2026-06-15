---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): remove Input prepend/append addons

Remove the `prepend` and `append` slots from `IInput`, along with the now-purposeless
`input-group` wrapper. This mirrors Styleframe 3.9, which dropped the per-field
`useInputGroupRecipe`, `useInputPrependRecipe`, and `useInputAppendRecipe` recipes in favour of a
single, generic field group.

`IInput` now composes only the shell, the native control, and the inline `prefix`/`suffix` addons.
The `IInputGroupBase`, `IInputPrependBase`, and `IInputAppendBase` headless exports are removed. To
attach controls outside an input (the old prepend/append use case), wrap them in the new
`IFieldGroup`.
