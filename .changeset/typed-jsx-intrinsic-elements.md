---
"@inkline/core": minor
---

feat(core): type `JSX.IntrinsicElements` instead of `any`

`.ink.tsx` authoring had no type safety in markup: `JSX.IntrinsicElements` was
`[elemName: string]: any`, so a misspelled attribute, a React-ism like `className`, or a typo'd event
handler compiled silently and surfaced only when you ran the output. `IntrinsicElements` is now
derived from an upstream JSX surface — a vendored, MIT-licensed copy of Solid's element types,
carried in-tree rather than depended on — reshaped through an Inkline-owned alias. `@inkline/core`
gains no runtime dependency from this: its only dependency is `csstype`, which ships no JavaScript.
The package still ships no runtime, and the compiler still erases every `@inkline/core` reference
from the output.

The declarations do get bigger: `dist/jsx-runtime.d.mts` goes from ~1.7 kB to ~163 kB (21.5 kB
gzipped), since the element surface is inlined rather than referenced. That is types-only weight.

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
