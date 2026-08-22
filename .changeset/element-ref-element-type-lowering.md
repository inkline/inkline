---
"@inkline/compiler": patch
---

fix(compiler): type emitted element refs from the IR's `elementType`

An element ref bound to `<input>` emitted an untyped ref on every target — React's
`useRef(null)` widens to `RefObject<null>`, so an imperative DOM use of it
(`ref.current?.focus()`, `.value`, layout measurement) resolved against `never` and
failed to typecheck with `TS2339`.

The React emitter already read `elementType`; the 03-lower `refs` pass never set it.
Ref-binding `deps` are never resolved by the parse deps pass — every ref binding, element
and component-instance alike, arrives with an empty `deps` array — so keying element refs
off `deps[0].symbolId` matched nothing. Element refs now link to their declaration through
the binding's identifier text, the same render-tree-derived path the component-instance
branch and the Angular target already use.

`elementType` feeds five targets, so all five now emit a typed ref for the same tag map
that was already in the pass: React `useRef<HTMLInputElement>(null)`, Vue
`ref<HTMLInputElement | null>(null)`, Qwik `useSignal<HTMLInputElement | null>(null)`,
Svelte `$state<HTMLInputElement | null>(null)`, Solid `let ref: HTMLInputElement | undefined`
— the last two narrowing from their `HTMLElement` fallback. Angular and Astro do not read
`elementType` and are byte-identical. Emitted runtime semantics are unchanged; only type
arguments were added.
