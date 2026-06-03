---
"@inkline/compiler": minor
"@inkline/react": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/solid": patch
"@inkline/angular": patch
"@inkline/qwik": patch
"@inkline/astro": patch
---

feat(compiler): object-form prop types and defaults

The options/object form of prop declarations (`defineComponent({ props: { color: "blue", size: Number } }, …)`)
previously emitted malformed, untyped output like `{ color?; size }` and never applied the declared
default. The parser now infers a type for each object-form prop (from a constructor reference —
`Number` → `number`, `String` → `string`, … — or the type of a default-value literal), and each target
emits a valid type and applies the default in its own idiom:

- **React / Qwik / Astro** — destructure with a default: `const { color = "blue", size, ...rest } = props`.
- **Vue** — `withDefaults(defineProps<{ color?: string; size: number }>(), { color: "blue" })`.
- **Svelte** — `let { color = "blue", size, ...rest } = $props()`.
- **Solid** — `const props = mergeProps({ color: "blue" }, _props)` (the parameter is renamed `_props`
  so the merged binding narrows the defaulted keys to non-optional types).
- **Angular** — `@Input() color: string = 'blue'` (field default) and `@Input() size!: number`.

A new `propLocals` rewrite rule lets targets that keep `props.x` reads resolve a defaulted prop to its
destructured local so the default takes effect.
