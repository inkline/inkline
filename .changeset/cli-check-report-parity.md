---
"@inkline/cli": minor
---

feat(cli): report `inkline check` diagnostics through the build's reporting path

`inkline check` documents itself as reporting "exactly the diagnostics the build would report", and
for two releases it did not. It printed `result.diagnostics` straight to the terminal while
`inkline compile` moved on without it: deduplication landed on the build path only, and so did
`--report-level` / `reportLevel`. A project that set `reportLevel: "error"` got a quiet build and an
unchanged, noisier check, and a finding raised by three targets printed three times in one command
and once in the other.

`check` now resolves its level through the same `flag ?? config ?? default` chain, prints through the
same reporter, and closes with the same summary line. `--report-level` is accepted on `check` as
well — the summary tells you to re-run with it, so it has to exist there.

**This changes what `inkline check` prints.** Three differences, all in the direction of the build:

- `info` notes are withheld by default, as they are on `compile`. `--report-level info` (or
  `reportLevel: "info"`) prints exactly what `check` printed before.
- A finding raised at one position by several targets, or seen in several files, prints once.
- A summary line closes the run, naming anything the level withheld:

```
$ inkline check "src/**/*.ink.tsx"
Checked 67 files in 0.31s — 0 errors, 0 warnings, 0 notes (12 notes withheld at --report-level warning; re-run with --report-level info to list)
```

Exit codes are unchanged, and an error still fails the check whether or not it was printed: the
status is decided before the level and the dedup apply, so a quieter check never becomes a passing
one. If you parse `check`'s output, or rely on it listing notices, pass `--report-level info`.
