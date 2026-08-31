---
"@inkline/compiler": patch
---

Move macro parsing in the parse pass behind a registry. `defineModel`, `defineEmits`, `defineSlot` and `hasSlot` were four hand-written `if`-blocks inside `parseSetup`, each interleaved with the reactive primitives and each carrying its own recognition, its own binding-shape checks and its own IR pushes. They are now one entry apiece in a `MACROS` table — `{ name, position, rules, parse }` — that `parseSetup` dispatches to.

This is a refactor with no behavior change. Recognition stays by binding rather than by name, so an aliased import is still followed and a local function of the same name is still left alone. Every fixture compiles byte-identically across all seven targets, source maps and diagnostics included.

Each entry also carries the macro grammar as data: whether the call is valid only at the top level of the setup body, whether its arguments must be statically analyzable, which concern it declares, and that it is erased from the emitted output. Nothing reads those rules yet — they are recorded so the diagnostics that enforce them have one place to read from instead of four, and so a rule cannot drift away from the macro it describes.
