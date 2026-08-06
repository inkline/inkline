---
"@inkline/cli": minor
---

fix(cli): unregister the unimplemented `add` command

`inkline add` was listed in `inkline --help` as "Add a component to your project", then printed
`inkline add is not yet implemented.` and exited `0`. A `--help` listing is a claim of capability,
and exiting `0` from a no-op means no script or CI step could detect that nothing happened.

The command is unregistered until the real feature exists. `inkline --help` now advertises
`compile`, `check` and `init` only, and `inkline add IButton` is rejected by citty as an unknown
command — usage is printed and the process exits non-zero.

```
$ inkline add IButton
Unknown command add
```
