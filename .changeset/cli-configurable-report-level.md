---
"@inkline/compiler": minor
"@inkline/cli": minor
---

feat(cli): make the diagnostic report level configurable with `--report-level`

The reporting floor was a hardcoded constant: `info` on a one-shot `inkline compile` and `warning`
under `--watch`. A project that wanted a quieter CI build, or a developer who wanted to see the `info`
notices the watch loop withholds, had no way to say so.

`--report-level <error|warning|info>` and a `reportLevel` config key now set it, resolving
`flag ?? config ?? default` exactly as `--target`, `--src-dir` and `--out-dir` do. A level reports
itself and everything above it, so `warning` withholds notes. Both defaults are unchanged — `info`
one-shot, `warning` under `--watch` — and the flag governs the watch loop too, which previously read
the constant directly and so ignored it. An unusable value is reported as `INK0087`, a formatted
diagnostic with help and a docs URL on the same path as a misspelled `--target`, and it is refused
rather than coerced to the default; it is refused before `--clean` deletes anything.

The summary line no longer under-reports what the level hid. `0 notes` cannot be told apart from
"there were none", so withheld findings are named along with the level that hid them and the flag that
reveals them:

```
$ inkline compile "src/**/*.ink.tsx" --report-level warning
Compiled 67 files in 0.45s — 0 errors, 0 warnings, 0 notes (12 notes withheld at --report-level warning; re-run with --report-level info to list)
```

`Compiled N files` also now counts files that compiled without an error rather than files the glob
matched, so a build with one failing file out of five no longer claims to have compiled all five
directly below the error it printed. A clean build's output is byte-identical to before.
