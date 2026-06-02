---
"@inkline/compiler": patch
"@inkline/react": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/solid": patch
"@inkline/angular": patch
"@inkline/qwik": patch
"@inkline/astro": patch
---

fix(compiler): unwrap batch() and capture Transition name/appear

- **`batch()`** was emitted verbatim (`batch(() => { … })`) but never imported, leaving an undefined
  reference at runtime on every target. Since `batch` is a no-op grouping wrapper in the authoring
  model (`batch(fn) => fn()`) and every framework already batches synchronous updates, it is now
  unwrapped to its inner body: `() => batch(() => { … })` collapses to `() => { … }` (and to a
  `;`-separated statement run inside an Angular event binding).
- **`<Transition name="…" appear>`** dropped both the `name` (always emitting the default `"ink"`)
  and the `appear` flag, because the lowering only read Expression-kind attributes while `name` is a
  static string and `appear` is a boolean shorthand. Both are now captured, so the authored
  transition name and mount-animation flag reach every target.
