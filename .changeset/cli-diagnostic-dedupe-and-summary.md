---
"@inkline/cli": minor
---

feat(cli): print each advisory once per source location and close the build with a summary

Build-invariant advisories are pushed once per codegen target with the component's own location, so
compiling for both Angular and Qwik printed the byte-identical `INK0068` line twice for a single
`hasSlot()` call site. `inkline compile` now reports a finding once per
`(code, file, line, column, title)`: one thing to fix, one line of output. The same code at a
different position — or saying something different at the same position, as `INK0090` and `INK0100`
do — is a different finding and still prints. Deduplication spans the whole build rather than a
single file.

Every one-shot compile now ends with a summary of what it did:

```
$ inkline compile "src/**/*.ink.tsx" --config inkline.config.ts
…
Compiled 67 files in 0.34s — 0 errors, 0 warnings, 12 notes
```

Exit codes are unchanged: `0` clean, `1` when the compile reported errors, `2` for unusable input
(which produces no summary, because no build ran). The exit status is computed before filtering and
deduplication, so neither can hide a failure. `--watch` keeps its per-rebuild reporting and its
`warning` floor.
