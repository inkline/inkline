---
"@inkline/compiler": patch
---

fix(compiler): aliased-model Svelte bindings + Qwik model/event-only props param

**Svelte** declared each model's `$bindable()` binding under the public prop name, but
model reads and writes resolve to the getter local. For an aliased model
(`const [isOpen, setIsOpen] = defineModel("open")`) the script destructured
`open = $bindable()` while the template read and assigned the never-declared `isOpen`,
referencing an undefined variable for both reads and writes — and the same in the
reconstructed whole-`props` object. The binding is now destructured with a rename when
the names differ (`open: isOpen = $bindable()`).

**Qwik** only emitted the `props` parameter when a component had plain props, slots, or
attribute fallthrough — yet models compile to `props.<prop>` reads and emit/update to
`props.on<Name>$` callbacks. A model- or event-only component with a non-fallthrough root
(e.g. a Fragment root, which never gains attribute fallthrough) was emitted as
`component$(() =>` while its body referenced `props.value`, crashing with
"props is not defined". Models and events are now included in the parameter condition.

Both were masked by the shipped components using `value`/`defineModel("value")`
(name === propName) and single-element roots that gain fallthrough, so generated output
is unchanged.
