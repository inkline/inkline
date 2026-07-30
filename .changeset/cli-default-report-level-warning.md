---
"@inkline/cli": minor
---

feat(cli): default the report level to `warning` in one-shot builds

`inkline compile` reported from `info` unless `--watch` was passed, so every build printed every
`info` notice. On this repo's own `ui/components` that is 12 notes on a build with 0 errors and 0
warnings. Notes of that kind are target-invariant advisories — `INK0045` tells you a fact about the
Astro target, not about the edit you just made — so a CI log filled with them trains people to skip
the compiler's output, which is where errors and warnings also live.

Both modes now default to `warning`. `--report-level info` (or `reportLevel: "info"` in
`inkline.config.ts`) reports exactly what a one-shot build printed before, byte for byte.

Nothing else changes. Errors and warnings print as they always did, and the exit code is decided
before the level applies, so a quieter build never becomes a passing one:

```
$ inkline compile "src/**/*.ink.tsx"
Compiled 67 files in 0.28s — 0 errors, 0 warnings, 0 notes (12 notes withheld at --report-level warning; re-run with --report-level info to list)
```

If you verify a build by reading its notices — checking for the expected `INK0045`/`INK0068` on a new
component, for instance — add `--report-level info`. Without it a quiet build no longer proves the
notices you got are the ones you expected.
