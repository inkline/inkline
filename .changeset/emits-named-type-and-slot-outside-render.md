---
"@inkline/compiler": patch
---

feat(compiler): resolve `defineEmits<NamedType>()` and diagnose the two silent authoring holes

Two constructs used to compile to broken output with zero diagnostics.

`defineEmits<MyEvents>()` with a named type argument declared **no** events at all — the parse pass
only read `ts.TypeLiteralNode`. Every `emit("close")` call then compiled to a write against a prop
nothing declared (`props.onClose?.()` on React). Named references are now resolved through the
checker, on one condition: the compiler must be able to read **every** member from a **single
declaration in the same file**. Same-file is required because each member's type node is emitted
verbatim into the generated component, where a type from another module is not in scope. Single and
complete is required because a partially read type is worse than an unread one — a dropped member
still leaves the author's `emit("open")` call compiling into a read of a prop nothing declares, and
nothing downstream catches it. So a union, a generic instantiation, an interface with a heritage
clause, an interface split across merged declarations, and a cross-module import are all refused with
**INK0042**.

`<Slot name="icon" />` the compiler never reaches declared no slot and survived into the output
verbatim, against a `Slot` the target never imports. Lowering reaches a fixed set of shapes inside
the returned expression, so being in the render tree is necessary but not sufficient: a `<Slot>` in
a helper function, an effect, or a function nested inside the render expression is all equally
unreachable. Both positions are now refused with **INK0069** — the setup body outside the returned
expression at parse time, and every `<Slot>` still sitting in an expression after lowering. The
second check reports what lowering actually left behind rather than a syntactic guess at it, so a
`<Slot>` in a `.map` callback — which lowering does handle — is unaffected.

Both codes are `error` severity, so they fail the build. Fixtures live in
`core/compiler/src/__fixtures__/`; `core/compiler/src/pipeline/uxf165-review-repro.test.ts` covers
the five cases end to end through `compile()`.
