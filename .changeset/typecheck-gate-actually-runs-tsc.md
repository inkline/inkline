---
"@inkline/compiler": patch
---

Fix the emitted-output typecheck gate, which passed unconditionally.

`typecheckEmittedForTarget` shelled `npx tsc` into an OS temp directory with no `node_modules`.
npx refused to run, its refusal text contained no `error TS`, and the diagnostic parse therefore
found zero errors and reported a pass — on any input, including output that does not compile.
It now runs the workspace TypeScript resolved from `@inkline/compiler`, writes the emitted files
where bare imports resolve, and treats a non-zero `tsc` exit as a failure whatever the output text.

`TargetConformanceSpec.typecheck.tsconfig` is now an absolute path for the react, vue, svelte and
solid targets, matching the `lint.config` sibling. It was relative and resolved against
`process.cwd()`, so it pointed at a non-existent file whenever the suite ran from anywhere other
than the target directory. A relative or missing path is now rejected rather than silently passed.
