---
"@inkline/compiler": minor
"@inkline/cli": minor
---

Stop the CLI on a config value of the wrong type instead of crashing on it a few lines later.

Config validation reported a wrong-typed value as a warning and handed the config to the command
unchanged, so `targets: "react"` printed a correct `INK0083` diagnostic and then died with
`TypeError: fileConfig.targets?.join is not a function`. The value was never usable — the diagnostic
just arrived before the crash rather than instead of it.

`INK0083` (invalid config value) is now an `error`, and `loadInklineConfig` returns
`{ config, valid }`. `check` and `compile` stop at the boundary with exit code `2` when `valid` is
`false`, before any consumer reads a field — in `compile`, notably before `--clean` removes output
directories named by a `targets`/`targetOutDir` that failed validation.

Fixing this at the load boundary covers every consumer at once. `targets.join`, `barrels.filter`
and `srcDir.endsWith` were three instances of the same assumption — that a validated config's fields
hold their declared types — and hardening them one at a time would have left the next field to be
found by a user.

Unknown _keys_ remain non-fatal, and now consistently so: an unrecognised key nested inside a value
(`barrels[0].extra`) is reported as `INK0081` by its full path rather than as an invalid value, so
it no longer inherits the new fatal severity. `INK0081`/`INK0082` are unchanged.

Breaking for direct importers of `@inkline/cli`'s `loadInklineConfig`, which now returns
`{ config, valid }` rather than the config itself.
