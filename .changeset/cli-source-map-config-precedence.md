---
"@inkline/cli": patch
---

fix(cli): let the config file's `sourceMap` take effect, and `--no-verbose` override a config `verbose`

A config file's `sourceMap` was silently ignored. `--source-map` carried a citty `default: "external"`,
which made `args["source-map"]` permanently defined, so the `flag ?? config ?? "external"` chain could
never reach the config branch — the same defect that was fixed for `--out-dir`, one line down. Removing
the citty default lets the chain work as written: `--source-map` still wins, a config `sourceMap` now
applies when the flag is omitted, and `external` remains the documented fallback.

`--verbose` on both `compile` and `check` had the boolean form of the same problem. With `default: false`,
an omitted flag and an explicit `--no-verbose` both arrived as `false`, so a config `verbose: true` could
not be switched off from the command line. The flag now declares no default and resolves
`flag ?? config ?? false`.

Behaviour change: a project whose config sets `sourceMap` was previously getting `external` regardless;
it now gets what the config asks for. Projects that relied on the ignored value being overridden should
pass `--source-map external` explicitly. `--clean` and `--watch` keep their citty defaults — they have no
config counterpart, so the default is the whole resolution rather than a shadow over one.
