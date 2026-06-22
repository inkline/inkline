---
"@inkline/compiler": patch
"@inkline/angular": minor
---

feat(components): zero-wrapper Angular Input family via the composite collapse

Splits the conditional `IInputControlBase` (which rendered `<input>` _or_ `<textarea>`) into two
single-root headless components — `IInputControlBase` (`input[ink-input-control-base]`) and the new
`IInputTextareaBase` (`textarea[ink-input-textarea-base]`) — and hoists the `type === "textarea"`
choice up into the styled `IInput`. Each Input part (`IInputBase`, prefix, suffix, both controls) is
now `meta.headless`, and `IInput` collapses the whole composite:

```html
<div ink-input ink-input-base class="input …">
  <span ink-input-prefix-base class="input-prefix …"></span>
  <input ink-input-control-base value="…" class="input-field" />
  <span ink-input-suffix-base class="input-suffix …"></span>
</div>
```

The native `<input>`/`<textarea>` carries the behavior directly — zero wrapper elements around the
control or the shell, with the two-way value preserved. A void-element attribute-child self-closes
(`<input ink-x />`). The element-selector wrapper variant is still emitted (dual selector); the split
itself changes all seven targets' Input output (functionally equivalent), Angular adds the host
variants.
