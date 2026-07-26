---
"@inkline/compiler": patch
---

fix(core/compiler): bind Qwik DOM event handlers as QRLs so they fire on resume

The Qwik target emitted DOM event handlers as a value-wrapped prop without the `$` suffix
(`onChange={$(...)}`). Qwik's optimizer only extracts a handler into a lazy-loadable QRL when the
prop name carries the `$` suffix, so the bare form was treated as a plain DOM attribute: the QRL was
stringified inline (`onchange="async function..."`), never bound on resume, and the handler silently
never fired (INK-31). Emitting `onChange$={$(...)}` makes the optimizer extract the QRL and wire it up,
so interactive handlers (e.g. the checkbox control's `change`/`click`) run at runtime. Verified with a
`createDOM` behaviour test in `@inkline/qwik` that toggles the bound model and enforces the read-only
guard, and that fails if the `$` suffix regresses.
