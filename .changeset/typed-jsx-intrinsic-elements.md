---
"@inkline/core": minor
---

feat(core): type `JSX.IntrinsicElements` instead of `any`

`.ink.tsx` authoring had no type safety in markup: `JSX.IntrinsicElements` was
`[elemName: string]: any`, so a misspelled attribute, a React-ism like `className`, or a typo'd event
handler compiled silently and surfaced only when you ran the output. `IntrinsicElements` is now
derived from an upstream JSX surface (Solid's) through an Inkline-owned alias, which adds `solid-js`
as a dependency of `@inkline/core` — for types only; the package still ships no runtime, and the
compiler still erases every `@inkline/core` reference from the output.

Elements now carry real attribute types and typed event objects (`e.currentTarget` is the element you
clicked, not `any`). `ref` stays Inkline's `{ current }` object, `children` and `key` stay
compiler-opaque, and every `$`-prefixed key — `$bind:value`, `$if`, and any future directive — stays
unconstrained. Component props are deliberately unchanged: `InkComponent` keeps its
`[attr: string]: any`, so `<IButton colr="light" />` still type-checks.

This can newly surface errors in existing `.ink.tsx` files that relied on the untyped surface. It
landed with zero edits across Inkline's own 168 authored components and fixtures, so most codebases
should see none. If you hit errors you cannot fix immediately, point `jsxImportSource` at a local
shim to restore the old surface while you work through them:

```ts
// src/inkline-jsx-any/jsx-runtime.ts
export { jsx, jsxs, Fragment } from "@inkline/core/jsx-runtime";

export namespace JSX {
  export type Element = any;
  export interface IntrinsicElements {
    [elemName: string]: any;
  }
  export interface ElementChildrenAttribute {
    children: {};
  }
}
```

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "jsxImportSource": "inkline-jsx-any", // was "@inkline/core"
    "paths": { "inkline-jsx-any/jsx-runtime": ["./src/inkline-jsx-any/jsx-runtime.ts"] },
  },
}
```

This affects type-checking and editors only — the Inkline compiler reads `.ink.tsx` directly and is
unaffected by `jsxImportSource`. Delete the shim once the real errors are fixed.
