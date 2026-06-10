---
"@inkline/compiler": patch
---

Preserve camelCase for component-instance event names in Solid, Svelte, and Angular output. A callback prop like `onValueChange` on a component instance was previously emitted lowercased (`onvaluechange` / `(valuechange)`), which breaks the case-sensitive callback-prop / `@Output()` binding. Native DOM event listeners are still lowercased.
