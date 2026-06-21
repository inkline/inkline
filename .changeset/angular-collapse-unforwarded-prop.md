---
"@inkline/compiler": patch
"@inkline/angular": patch
---

fix(compiler): don't leak an unforwarded prop onto the collapsed Angular host

When a styled `meta.headless` component collapses onto its headless child, the inlined host now binds
the child's root attributes against the styled instance's actual arguments. A prop the child's root
reads but the styled wrapper does not forward resolves to `undefined` (the binding is omitted) instead
of the styled component's same-named prop.

Previously `IInput` — whose `IInputBase` shell root binds `id={props.id}` but which forwards `id` only
to the inner control — emitted `[attr.id]` on both the shell `<div ink-input>` and the inner
`<input ink-input-control-base>`, producing a duplicate `id` (invalid HTML, broken `label[for]`). The
collapsed host now carries `id` on the control only, matching the element-selector wrapper variant and
the other six targets.
