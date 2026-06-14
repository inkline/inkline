---
"@inkline/react": minor
"@inkline/vue": minor
"@inkline/svelte": minor
"@inkline/solid": minor
"@inkline/angular": minor
"@inkline/qwik": minor
"@inkline/astro": minor
---

`IInput` is now a single styled component that composes every part — the field shell, the native control, and the optional `prefix`/`suffix`/`prepend`/`append` addons — styled together, rather than a set of separate styled parts you assemble by hand:

```tsx
<IInput
  type="text"
  placeholder="0.00"
  prefix={<>$</>}
  suffix={<>USD</>}
  color="light"
  size="md"
  $bind:value={amount}
/>
```

Addons are named slots gated by `hasSlot`, so an unused addon renders nothing (the wrapper is omitted entirely on React/Vue/Solid/Svelte/Astro, and collapses via CSS `:empty` on Qwik/Angular). The standalone styled `IInputControl`, `IInputGroup`, `IInputPrefix`, `IInputSuffix`, `IInputPrepend`, and `IInputAppend` components are removed; the headless `*Base` parts remain exported for fully custom composition.
