---
"@inkline/compiler": patch
---

fix(compiler): make the emitted-output typecheck harness actually typecheck

`typecheckEmittedForTarget` shelled out to `npx tsc`, which in this repo resolves
to the `tsc` npm decoy package rather than `typescript`. The decoy's banner
contains no `error TS` line, and the output parser read "no matching lines" as
success — so every input passed. A mutation probe confirmed it on all 7 targets:
clean output and output with `const x: number = "not a number"` appended returned
byte-identical `pass: true`. The 420-test sweep had never typechecked a line.

The harness now runs `ts.createProgram` in-process: no subprocess, no string
parsing, structured diagnostics. A missing, unreadable, or invalid tsconfig is a
hard failure instead of a pass, and `TypecheckResult` gains `checkedFiles` so
`pass: true` over zero files is visibly an empty run. Two poison tests pin the
failure mode so it cannot silently recur.

Also fixed: target `typecheck.tsconfig` paths were resolved against the process
cwd rather than the conformance file, so they pointed at nothing; the react and
solid tsconfigs carried `types` entries that resolve to no package. `docs/testing.md`
no longer claims type-safety coverage the suite did not have.

Scope is react and 80 of 105 fixtures, recorded with per-fixture diagnostic codes
in `src/testing/typecheck-fixtures.ts`; a staleness test fails when an excluded
fixture starts passing. No emitted output changed.
