---
"@inkline/react": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/solid": patch
"@inkline/angular": patch
"@inkline/qwik": patch
"@inkline/astro": patch
---

fix(components): keep the read-only checkbox from toggling

A read-only checkbox stayed focusable but must not change value. The click guard
(`readonly && preventDefault()`) cancels the toggle synchronously on React, Vue, Solid, Svelte and
Angular. On Qwik, event handlers are QRLs that resume _after_ the browser's default action, so
`preventDefault()` there cannot stop the toggle. The `change` handler now re-asserts the control from
the model when read-only (`el.checked = checked()`) instead of writing to it, snapping the box back
and leaving the model untouched. The handler is a single expression so Angular's template codegen
inlines it. Read-only is unchanged elsewhere and stays announced via `aria-readonly`.
