---
"@inkline/compiler": minor
---

fix(compiler): declare the bindings of a `props` destructuring on all seven targets

Destructuring the props object in the setup body emitted a read of an identifier the generated
component never declared:

```tsx
const props = defineProps<{ label: string }>();
const { label: text = "x" } = props;
return <div title={text} />;
```

compiled clean, with no diagnostic, and emitted `title={text}` beside a declaration of `label`
only. The statement matched no branch of the setup parser, so it was recorded as a generic setup
statement; `setupDeclaredNames` ignores binding patterns, so `INK0121` never fired, and
`setupLocalDefs` emits only function-valued declarators, so the statement itself was dropped from
every target's output. The reads survived verbatim. On the four targets that emit a template (Vue,
Svelte, Astro, Angular) the reference landed where `tsc` cannot see it, so the first sign of it was
a `ReferenceError` in the browser.

The plain form `const { label } = props` reached the same output on React, Solid, Vue, Qwik and
Astro; only Svelte and Angular happened to declare the names, because both declare every prop as a
bare local anyway.

Parse now consumes the statement and records each binding as an alias of the prop it names, on
`IRComponent.propAliases`. Codegen rewrites a read of the local exactly as it rewrites the matching
`props.<prop>` read, under whichever convention the target uses — `props.label` on React, Solid,
Qwik and Astro, `label` in a Vue or Svelte template, `label()` on Angular. A default written in the
pattern is folded into the prop's `defaultValue` and makes the prop optional, so all seven targets
apply it through the mechanism each already has: React's and Qwik's rest destructure, Solid's
`mergeProps`, Vue's `withDefaults`, Svelte's `$props()` destructure, Astro's frontmatter
destructure, and Angular's `input()` seed. A default the prop already declares wins, which matches
the JS semantics — a declared default means the property is never `undefined`, so the pattern's
default would not run in the authored source either.

Vue's `withDefaults` now also wraps the named-type form. `defineProps<FooProps>()` previously
dropped every default, which no fixture could reach before this change because a `propsTypeText`
component had no way to carry one.

Two shapes are refused instead, each with a written reason:

- `INK0122` — a rest element (`...rest`), a nested pattern (`{ a: { b } }`), or a computed key
  (`{ [k]: v }`). Each binds a local that names no single static prop, so no target could declare
  it. The rest of the pattern still compiles.
- `INK0123` — a binding naming a prop the component never declared. Carrying it would put a rewrite
  rule on a name no target declares, which is the defect this change closes.

No existing component, fixture, or snapshot changes behaviour.
