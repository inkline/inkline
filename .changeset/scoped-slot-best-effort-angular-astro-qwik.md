---
"@inkline/compiler": patch
"@inkline/angular": patch
"@inkline/astro": patch
"@inkline/qwik": patch
---

fix(compiler): best-effort scoped slots on Angular/Astro/Qwik

A scoped slot (`<Slot args={[item, index]}>…fallback…</Slot>`) passes per-row data to slot content.
Angular and Astro have no scoped-slot mechanism, and Qwik's `children`/`Slot` projects JSX rather than
being a callable render function — so the previous output dropped the args and fallback (Angular/Astro
emitted a bare `<ng-content>`/`<slot>`) or called the uncallable `props.children?.(args)` (Qwik).

These targets now render the authored **fallback** (the component's default content, whose loop/scope
variables are in scope) as a best-effort, so the component renders standalone; a parent simply cannot
override the per-row rendering. Angular/Astro additionally emit a short template comment noting that the
scoped-slot args are not projectable. React, Vue, Svelte and Solid (which have render-prop or
slot-binding mechanisms) are unchanged.
