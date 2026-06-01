---
"@inkline/compiler": patch
"@inkline/solid": patch
---

fix(solid): render the unscoped default slot via the native `children` prop

The Solid target read the default slot from `props.default`, but Solid delivers
default-slot content on `props.children`, so slotted text (e.g. badge labels) was
silently dropped. The unscoped default slot now compiles to `props.children` in the
slot read, the generated props type, and the `splitProps` exclusion list — matching
the React target. Named and scoped slots are unchanged.
