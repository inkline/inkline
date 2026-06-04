---
"@inkline/compiler": patch
"@inkline/react": patch
"@inkline/angular": patch
"@inkline/qwik": patch
---

fix(compiler): import React Fragment, qualify Angular class-body refs, order Qwik provides after signals

Three runtime-correctness fixes the adversarial review of the real-world suite surfaced:

- **React** keyed list rows wrapped each row in `<React.Fragment>`, but the module never imports
  `React` (the automatic JSX runtime doesn't bind it), so the value was undefined at runtime. The
  named `Fragment` is now imported and used (`<Fragment key={…}>`).
- **Angular** class-body expressions (an `afterNextRender`/effect that focuses a ref) read the ref
  as a bare `inputRef`, but a ref is a `viewChild` signal member — `TS2663`. It now reads
  `this.inputRef()`, mirroring the `this.`-prefixing already applied to state/memo reads.
- **Qwik** emitted `useContextProvider(…)` before the `useSignal` declarations whose `.value` it
  reads, a temporal-dead-zone reference. Provides are now emitted after all signal/memo/ref
  declarations.
