---
"@inkline/compiler": minor
---

fix(compiler): refuse a whole-object read of `props` (`INK0075`)

Only `props.<name>` carries a member the rewriter can map to each target's props convention. A read
of the object itself has no member to map, and the four `strip: true` targets emit no props object
at all, so the read did not survive them:

```tsx
const props = defineProps<{ label: string }>();
return <div title={String(props)} />;
```

compiled clean on all seven targets and produced two different failures. Angular emitted
`[attr.title]="(String(props)) ?? null"` against a class that declares only `klass` and `label`, so
the template named a member nothing declares — and inside a template `tsc` cannot see it either, so
the first sign was a `ReferenceError` in the browser. Svelte emitted
`title={String({ label, ...__attrs })}`, substituting the destructured shape: the read succeeded and
returned an object carrying every passed-through attribute, which is not the object the author
wrote. React, Solid, Qwik, Astro and Vue were correct, which is what made the split silent.

`INK0075` is now reported, as an error, for both channels — the `defineProps` binding and the setup
parameter — and from the parse pass, so all seven targets agree before any of them runs. It is the
companion to `INK0074`: that code refuses the binding under the wrong _name_, this one refuses
reading the correctly-named binding as a whole _object_. A binding that is both misnamed and read
whole reports `INK0074` alone, so one mistake stays one error.

The rule is scoped to a bare identifier. `props.label` is untouched, and destructuring —
`const { label } = props` — is excluded: it names its members statically and every target already
lowers it to the same locals. To pass props on, build the object explicitly from the properties you
declared, which is the form the component corpus already uses
(`radioGroupRecipe({ orientation: props.orientation, size: props.size })`). A survey of
`ui/components` found no whole-object read, and no component or fixture changes behaviour.
