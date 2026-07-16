---
"@inkline/compiler": patch
"@inkline/react": patch
---

fix(compiler): scope React HTML-attr canonicalisation to native host elements (INK-26)

The React emitter renamed HTML attributes to their React-DOM spellings (`readonly` →
`readOnly`, `for` → `htmlFor`) even when the JSX element was a custom Inkline component,
not a native host element. Inkline component prop interfaces use the HTML-native
lowercase names, so the forwarded key no longer matched what the child reads and the
value silently never arrived on React — e.g. a styled component forwarding
`readonly={props.readonly}` to its headless control emitted `readOnly={props.readonly}`,
leaving `props.readonly` `undefined` in the child (`aria-readonly` unset, click-cancel
guard dead). Every other target already crossed the boundary verbatim.

Canonicalisation now applies only to native host elements; component prop names cross
the boundary verbatim. `class` → `className` stays the one deliberate exception on
components, since Inkline React components expose `className`. This fixes `readonly` on
`IInput`'s styled composition (and any future component forwarding a canonicalised HTML
attr) on React; the six other targets emit byte-identical output.
