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

fix(compiler): bind createResource, preserve async, and correct per-target control-flow/state codegen

Further real-world codegen fixes surfaced by the fixture→output assertion suite:

- **`createResource` was silently dropped.** The primitive was missing from the parser's binding
  table, so the resource declaration never reached the IR and every target rendered undefined
  reads. It is now bound and emitted across all 7 targets.
- **`async` was stripped from arrow/function expressions** by the shared rewriter, corrupting every
  async fetcher/handler (`async () => …` became `() => …`). The modifier is now preserved.
- **Solid** destructures only the resource metas the author actually bound, mapping each to its
  local name and honouring aliases (`{ loading, error: _error }`), so unbound accessors no longer
  emit unused variables.
- **Astro** now declares signal state as a mutable frontmatter `let` (it was dropped entirely, so
  the template referenced undeclared identifiers); setters become direct re-assignments.
- **Vue** emits native DOM event listeners in all-lowercase (`@mousemove`, `@submit`) — a
  kebab-cased `@mouse-move` never fires — while keeping kebab case for component custom events; a
  root `<>…</>` fragment now emits sibling root nodes (Vue 3 multi-root) instead of a directive-less
  `<template>` that renders nothing.
- **Angular** `@for` tracks the extracted key expression (`track item.id`, `track i`) with
  `let i = $index` for index bindings instead of leaking the raw arrow; `@switch (true)/@case`
  becomes an `@if/@else if` chain (boolean cases are not value matches); string literals in template
  bindings are single-quoted so they don't terminate the surrounding double-quoted binding; and
  effects + `onMount` (`afterNextRender`) + `onCleanup` (`inject(DestroyRef).onDestroy`) are
  consolidated into the single permitted `constructor`.
