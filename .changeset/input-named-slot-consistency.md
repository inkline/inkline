---
"@inkline/compiler": patch
"@inkline/react": patch
"@inkline/solid": patch
"@inkline/qwik": patch
"@inkline/angular": patch
---

fix(compiler): consistent named-slot rendering across JSX targets + Angular nullish attributes

Rendering the Input "Default" story side-by-side surfaced cross-framework inconsistencies, all in codegen:

- **Named slots were silently dropped on React, Solid, and Qwik.** Each emitted a named-slot fill as a
  dead `<Tag.name>` child while consuming the slot a different way, so content (e.g. the Input's `$`
  prefix and `USD` suffix) never rendered. All three now emit named slots as **props** — a node prop
  (`prefix={<>$</>}`, consumed as `{props.prefix}`) when unscoped, a function prop when the slot takes
  args — matching the authored `.ink.tsx` source with no runtime machinery. Qwik's default slot still
  projects through its native `<Slot/>`.
- **React emitted the invalid lowercase `readonly` DOM prop** (a React warning); `REACT_ATTR_MAP` now
  maps `readonly` → `readOnly`.
- **Angular rendered `id="undefined"`.** Dynamic native-element attributes were property bindings, which
  stringify a nullish value (`[id]="id()"` → `id="undefined"`). Non-property attributes now bind via
  `[attr.name]="(expr) ?? null"`, which Angular omits when null; boolean/value-semantic and special
  bindings (`value`, `disabled`, `readonly`, `style`, `innerHTML`, …) stay property bindings.
