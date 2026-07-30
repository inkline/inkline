---
"@inkline/compiler": minor
"@inkline/cli": minor
---

feat(cli): add `--report-level` and config `reportLevel` to set the diagnostic reporting floor

`inkline compile` now takes `--report-level error | warning | info`, with a matching `reportLevel`
config key. The level is the floor for what gets **printed**; the compiler pipeline still produces
every diagnostic and the exit status is still decided before the level applies, so hiding a
diagnostic can never turn a failed build green.

No default changes. A one-shot `compile` still reports from `info` and `compile --watch` still
reports from `warning`, and both are now overridable rather than hard-coded — `--watch` previously
ignored a reporting level entirely, which was the one place the setting could silently do nothing.
Resolution is `flag > config > per-mode default`, and the flag declares no citty default so the
config branch is reachable (the defect fixed for `--out-dir` and `--source-map`).

An unrecognised level is refused up front as **INK0087**, before `--clean` deletes anything. It has
to be: `meetsLevel` ranks an unknown level as `undefined`, which would have suppressed every
diagnostic — a silent, total loss of output on a typo.

Because a level can now withhold findings, the build summary says so instead of under-reporting:
`— 0 errors, 2 warnings, 0 notes (4 notes hidden; run with --report-level info to list)`. Withheld
findings are deduplicated on the same key as printed ones, so the two counts are comparable. The
summary also now distinguishes files attempted from files that compiled — `Compiled 65 of 67 files`
— and prints the plain `Compiled 67 files` form when they agree, which is every clean build.

`@inkline/compiler` gains `ALL_SEVERITIES` and `isDiagnosticSeverity` at the root, the runtime side
of `DiagnosticSeverity`: any tool that takes a reporting level from a user needs to validate it
before it reaches `meetsLevel`.
