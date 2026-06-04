---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

feat(components): add compound Input component

Add an `Input` composed of individual sub-part components instead of a single
slot-based monolith, styled with the styleframe input recipe family:

- `IInput` — the bordered field shell (`color`, `variant`, `size`, `invalid`,
  `disabled`, `readonly`)
- `IInputControl` — the native control; renders `<textarea>` when
  `type="textarea"`, otherwise `<input>`
- `IInputGroup` — layout row for joined prepend/append addons
- `IInputPrefix` / `IInputSuffix` — inline addons inside the shell
- `IInputPrepend` / `IInputAppend` — block addons outside the shell

Each ships in headless (`I…Base`) and styled variants and compiles to all seven
framework targets. The control uses the controlled-value pattern (`value` plus
native `onInput`/`onChange`/`onFocus`/`onBlur`); state props map to the recipe's
styling axes and the matching native attributes.
