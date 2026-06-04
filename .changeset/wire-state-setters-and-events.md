---
"@inkline/compiler": patch
"@inkline/vue": patch
"@inkline/svelte": patch
"@inkline/angular": patch
"@inkline/qwik": patch
---

fix(compiler): wire up state setters and correct event-handler emission

State mutation and interactivity were broken in Vue/Svelte/Angular/Qwik — surfaced by
the real-world assertion suite. Fixes:

- **State setters** are now applied per target (`setterStyle` was defined but never used):
  a `setX(v)` call becomes `x.value = v` (Vue script / Qwik), `x = v` (Svelte / Vue template,
  where Vue adds `.value`), or `x.set(v)` (Angular — new `method-call` style). React/Solid keep
  the declared `setX(v)`.
- **Qwik** event handlers are single-wrapped: `$(() => …)` / `$(e => …)`, not `$(() => e => …)`.
- **Angular** event bindings are statements, not arrow expressions: `(click)="count.set(count() + 1)"`,
  with the handler param mapped to `$event` and block bodies emitted as `;`-separated statements.
