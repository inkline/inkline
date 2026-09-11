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
every target's output. The reads survived verbatim. A renamed or defaulted binding names something
no target declares, so all seven emitted an undeclared identifier; on the four targets that emit a
template (Vue, Svelte, Astro, Angular) the reference also landed where `tsc` cannot see it, so the
first sign of it was a `ReferenceError` in the browser.

The plain form `const { label } = props` was broken on four of the seven. Measured against the
canonical `props.label` read on the same target: a render read was wrong on React, Solid, Angular
and Qwik, and correct on Vue, Svelte and Astro, because those three already declare every prop as a
bare local the template or the frontmatter can see. A setup-body read was also wrong on Vue, whose
bare names exist in the template scope only.

On the plain form, Angular's break was not a `ReferenceError`. Angular declares a prop as a signal
input under the bare name, so the identifier resolves — it is the call that goes missing. Base emitted
`[attr.title]="(label) ?? null"` and `{{ label }}` against a canonical `(label()) ?? null` and
`{{ label() }}`, which renders the input function instead of its value, silently.

Parse now consumes the statement and records each binding as an alias of the prop it names, on
`IRComponent.propAliases`. Codegen rewrites a read of the local exactly as it rewrites the matching
`props.<prop>` read, under whichever convention the target uses — `props.label` on React, Solid and
Qwik; a bare `label` in a Vue or Svelte template and in Astro's frontmatter; `label()` on Angular. A
default written in the pattern is folded into the prop's `defaultValue` and makes the prop optional,
so all seven targets apply it through the mechanism each already has: React's and Qwik's rest
destructure, Solid's `mergeProps`, Vue's `withDefaults`, Svelte's `$props()` destructure, Astro's
frontmatter destructure, and Angular's `input()` seed. A default the prop already declares wins, which matches
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

One limitation is accepted, and documented in `core/compiler/README.md` beside the rule. React and
Qwik apply a folded default with a rest destructure emitted below the memos and effects, so an alias
read inside one rewrites to `props.<prop>` rather than to that local — a temporal-dead-zone
reference otherwise — and reads `undefined` when the caller omits the prop. The render body reads
the default. This is what a declared default already does when read as `props.<prop>` inside a memo
on those two targets, so the alias inherits the behaviour instead of introducing it; the other five
seed the default on the props object or on the declaration, so the memo reads it. The
`PropsDestructuredMemo` fixture pins both halves on all seven.

Resolving these bindings also changes the consequence of an untracked read. Dependency analysis runs
on the authored name, so a memo or an effect whose only reads are destructured locals tracks nothing
and React emits `useMemo(…, [])`. `INK0011` and `INK0010` still report that at compile time, but the
code now compiles to a memo that never recomputes where it previously raised a `ReferenceError`.

No existing component, fixture, or snapshot changes behaviour.
