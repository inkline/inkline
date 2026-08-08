---
"@inkline/compiler": patch
---

feat(compiler): resolve `defineEmits<NamedType>()` and diagnose the two silent authoring holes

Two constructs used to compile to broken output with zero diagnostics.

`defineEmits<MyEvents>()` with a named type argument declared **no** events at all — the parse pass
only read `ts.TypeLiteralNode`. Every `emit("close")` call then compiled to a write against a prop
nothing declared (`props.onClose?.()` on React). Named references are now resolved through the
checker to a type alias or interface **declared in the same file**, so they behave exactly like an
inline type literal — payload types included. Same-file only is deliberate: each member's type node
is emitted verbatim into the generated component, where a type from another module is not in scope.
Anything still unreadable — a cross-module import, a union, a generic instantiation — is refused with
**INK0042** rather than silently dropped.

`<Slot name="icon" />` reached only through a helper function or an effect body declared no slot and
survived into the output verbatim, against a `Slot` the target never imports. It is now refused with
**INK0069**, which names the fix (`defineSlot`) instead of inlining arbitrary functions.

Both codes are `error` severity, so they fail the build. Fixtures for all three paths live in
`core/compiler/src/__fixtures__/`.
