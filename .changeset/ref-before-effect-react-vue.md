---
"@inkline/compiler": patch
"@inkline/react": patch
"@inkline/vue": patch
---

fix(compiler): emit refs before memos/effects on React and Vue (INK-12)

The React and Vue emitters declared element refs after memos and effects. React
dependency arrays (`[controlRef.current, …]`) evaluate synchronously at the
`useMemo`/`useEffect` call site, and Vue's `watchEffect` runs its callback
synchronously at setup — so a ref referenced before its `const` declaration was a
temporal-dead-zone `ReferenceError` that crashed the component on mount (e.g. a
`createRef` + `createEffect` pair setting a DOM IDL property like `indeterminate`).

Refs are inert `null` declarations that depend on nothing, so the refs loop is now
hoisted above the memos/effects loops in both emitters — behavior-preserving and
matching source order. Solid/Svelte/Qwik defer effects, Angular initializes class
fields before the constructor body, and Astro emits no effects, so those targets
were already correct and emit byte-identical output.
