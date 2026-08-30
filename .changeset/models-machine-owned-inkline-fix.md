---
"@inkline/compiler": minor
"@inkline/cli": minor
"@inkline/core": patch
---

`options.models` is machine-owned: `inkline fix` writes it, and `INK0094` is now an error.

The author writes `defineModel<T>("name")` and nothing else. The `models` key stays visible in the
file — a parent's type-checker has to read it to see `checked` and `$bind:checked` at JSX attribute
position — but it is maintained by tooling, like a lockfile.

**`inkline fix <glob>`** rewrites the key from the setup body's `defineModel` calls, adding,
retyping, and removing entries, and dropping the options argument entirely when the last model goes.
`--check` reports without writing and exits non-zero if anything would change, which is the shape a
pre-commit hook or a CI gate wants. It compiles nothing and reads no config: the
transform is a text splice at AST offsets, so untouched lines stay byte-identical. Entries are
compared by name and type rather than by their text, so a run after the formatter — or a second run —
changes nothing.

**`INK0094` is now an `error`, was a `warning`.** A drifted entry is a type-only lie: no target reads
`models`, so a wrong entry emits identical output and compiles clean on both sides while teaching the
parent a shape the child never accepts. The warning could be scrolled past; the error cannot. The
full authored corpus passes it, and the help text now names the one-command fix. Four entries retire
from the emitted-output typecheck quarantine as a result: the three `Diag_Model*` fixtures no longer
reach codegen, so their output cannot fail to typecheck.

**New `@inkline/compiler/codemod` subpath** exports `declareModels(fileName, source)` — the transform
itself, returning the rewritten source and the list of edits. It lives in the compiler rather than the
CLI because it needs TypeScript's programmatic AST API, which the CLI's TypeScript does not carry.
This is where future source-rewriting fixes go: the write half of a diagnostic the compiler can report
but not repair. It replaces the unexported `scripts/codemod-declare-models.ts`, which could create a
`models` key but never correct one.
