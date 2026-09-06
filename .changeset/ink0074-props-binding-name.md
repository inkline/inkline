---
"@inkline/compiler": minor
---

fix(compiler): refuse a props binding that is not named `props` (`INK0074`)

Every target emits and rewrites the props object under the fixed name `props`, and the rewriter
matches that name by text. A binding under any other name was copied to the output unrewritten, so
the generated component referenced an identifier it never declared:

```tsx
const p = defineProps<{ label: string }>();
return <div>{p.label}</div>;
```

compiled clean and emitted `const { label, ...__attrs } = props; … {p.label}` on React. The setup
parameter's annotation channel — `(p: P) => …` — reached the same output. No diagnostic was
produced on any of the seven targets, and on the four that emit a template (Vue, Svelte, Astro,
Angular) the reference landed where `tsc` cannot see it either, so the first sign of it was a
`ReferenceError` in the browser.

`INK0074` is now reported, as an error, for both channels: the `defineProps` binding and the setup
parameter that carries the options or annotation channel's props. It is the fourth props-channel
rule beside `INK0047`, and it enforces a rule the authoring guide already stated. Destructuring the
binding stays a separate rule and is unaffected.

The check is gated on a declared prop. A binding that declares no props cannot be read through into
the output, so it stays legal — that keeps the headless components which call
`defineProps<EmptyProps>()` only to name their props type, and bind the unread result to `_props`.
No component or fixture changes behaviour.
