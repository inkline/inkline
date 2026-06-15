---
"@inkline/solid": patch
"@inkline/react": patch
---

fix(input): render an empty control instead of the literal `undefined` when no value is bound

The Input control bound `value={value()}` straight to the native `<input>`/`<textarea>`. When no
parent binds the value, the `defineModel` getter is `undefined`, and Solid's client runtime assigns
DOM properties with no nullish guard (`node.value = undefined`), which the browser coerces to the
string `"undefined"` — so every Solid Input story showed "undefined" in the field. The binding now
coalesces to an empty string (`value={value() ?? ""}`), rendering an empty control. This also keeps
the React Input consistently controlled, avoiding React's controlled/uncontrolled-input warning when
a value is later bound.
