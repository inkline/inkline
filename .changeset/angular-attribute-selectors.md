---
"@inkline/core": minor
"@inkline/compiler": minor
"@inkline/angular": minor
"@inkline/test-utils": minor
"@inkline/cli": patch
---

feat(compiler): emit best-practice Angular attribute-selector output

The Angular target now emits each component as its native host element (the Angular Material
directive-on-native-element pattern) instead of a nested `ink-*` custom-element wrapper with
`display: contents`:

- a headless leaf **is** its element — `<button inkButtonBase>` / `<div inkBadgeBase>` (host bindings
  on the real element, no wrapper);
- a pure-forwarding styled component is a styling directive stacked onto it —
  `<button inkButtonBase inkButton>` (Ivy unions the base, recipe, and consumer classes);
- a structure-injecting styled component (the Input) flattens its trivial base into one
  element-component — `<div inkInput>`.

Consumers therefore render each control as a real **direct child**, so direct-child / sibling /
`nth-child` / `gap` / grid CSS now works on Angular exactly as on the other six targets. Concretely
this fixes the field-group seam (a doubled +2px border on Angular), letting the field-group recipe's
direct-child seam rules apply uniformly — the interim CSS reach-through workaround is removed.

Attribute-selector codegen is an explicit opt-in: a headless leaf declares its native host tag via
`defineComponent({ element: "button" }, …)` (a new, Angular-only `ComponentOptions.element` field;
ignored by every other target and validated against the actual root — `INK0130`). Styled and
structural components are inferred from their marked base, so app authors' and story components are
untouched (they stay `ink-*` element wrappers) and the other six targets emit byte-identical output.
A build-time pre-pass builds the registry from these declarations (new `analyzeOnly` /
`buildAngularRegistry` APIs, threaded via the `angularRegistry` compiler option), which also lets the
Storybook story generator mount a directive on its native host element.
