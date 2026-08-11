---
"@inkline/compiler": patch
---

fix(compiler): treat a plugin registering no hooks as a no-op instead of crashing

`PluginRunner` dereferenced `plugin.hooks[...]` unguarded in both `invokeIrPost` and `invokeCodePost`.
A config entry such as `plugins: [{ name: "p" }]` passes CLI validation — the schema checks only the
identifying fields and lets `hooks` ride along, since it holds functions — and then reached the runner
with `hooks` undefined, ending the run in a raw `TypeError: Cannot read properties of undefined
(reading 'ir:post')` with a stack trace through bundled compiler internals and no diagnostic code.

Both lookups are now optional-chained, so a plugin that registers nothing simply does nothing and the
remaining plugins still run. Plugins arrive from a config file, so the `Plugin` type describes what an
author should write, not what the runner is handed; the guard is at the boundary where unvalidated
data enters.
