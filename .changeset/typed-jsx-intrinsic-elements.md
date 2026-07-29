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

Elements now carry real attribute types and typed event objects (`e.currentTarget` is the element you
clicked, not `any`). `ref` stays Inkline's `{ current }` object, `children` and `key` stay
compiler-opaque, and every `$`-prefixed key — `$bind:value`, `$if`, and any future directive — stays
unconstrained. Component props are deliberately unchanged: `InkComponent` keeps its
`[attr: string]: any`, so `<IButton colr="light" />` still type-checks.

The declarations get bigger: `dist/jsx-runtime.d.mts` goes from ~1.7 kB to ~163 kB (21.5 kB gzipped),
since the element surface is inlined rather than referenced. That is types-only weight.

## Migrating

**Custom elements are the sharpest edge.** Any web component in your markup was previously accepted
by the `any` index signature and is now an error, because `IntrinsicElements` enumerates only the
standard HTML, SVG and MathML tags:

```
<my-custom-element />
// error TS2339: Property 'my-custom-element' does not exist on type 'JSX.IntrinsicElements'.
```

Declare it once, anywhere in your project's type scope, and it is typed everywhere — including
autocomplete on its own props. This is the fix for custom elements, and it keeps every other element
strict:

```ts
// src/inkline-jsx.d.ts
declare module "@inkline/core/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "my-custom-element": { foo?: string; children?: any };
    }
  }
}
```

The same augmentation takes an index signature (`[elemName: string]: any`) if you have a whole family
of them and do not want to enumerate it yet.

### What else changes

15 realistic downstream patterns, type-checked against the published `dist/`. Ten are newly
diagnosed; five that look risky are fine:

| Pattern                             | Now                                                     |
| ----------------------------------- | ------------------------------------------------------- |
| `<my-custom-element />`             | TS2339 — see above                                      |
| `className="…"`                     | TS2322 — use `class`                                    |
| `htmlFor="…"`                       | TS2322 — use `for`                                      |
| `dangerouslySetInnerHTML={…}`       | TS2322 — use `innerHTML`                                |
| `defaultValue="…"`                  | TS2322 — use `value`                                    |
| `autoFocus`                         | TS2322, did-you-mean `autofocus`                        |
| `spellCheck={false}`                | TS2322, did-you-mean `spellcheck`                       |
| `contentEditable="true"`            | TS2322 — it is a union, not a string: use `{true}`      |
| `style={{ fontSize: 12 }}`          | TS2561, did-you-mean `font-size` — CSS keys are kebab   |
| `role="buton"`                      | TS2820, did-you-mean `"button"` — this one is the point |
| `maxLength={10}`                    | fine                                                    |
| `tabIndex={0}`                      | fine                                                    |
| `readOnly`                          | fine                                                    |
| `style={{ "font-size": "12px" }}`   | fine — object `style` is supported, kebab keys          |
| `onInput={(e) => e.currentTarget…}` | fine, and `currentTarget` is now the real element type  |

Note that camelCase is **not** a reliable rule of thumb in either direction: `maxLength`, `tabIndex`
and `readOnly` are declared alongside their lowercase spellings, while `autoFocus` and `spellCheck`
are not. Where a camelCase spelling is unsupported TypeScript emits a did-you-mean, so the compiler
tells you which is which — do not try to predict it.

This landed with zero edits across Inkline's own 168 authored components and fixtures, so most
codebases should see few or none of these.

### Last resort: opt out entirely

If you hit more than you can fix now, point `jsxImportSource` at a local shim to restore the old
untyped surface. **This disables the feature everywhere**, so prefer the augmentation above and reach
for this only to unblock a large migration:

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
