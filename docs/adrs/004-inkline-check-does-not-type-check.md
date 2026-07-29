# ADR-004: `inkline check` does not type-check; `tsc` owns types

Date: 2026-07-28 · Status: Accepted
Deciders: Project owner · Informed by: internal tracker UXF-90 (RFC), UXF-71 (friction audit), UXF-72 (prior-art survey)
Supersedes: — · Superseded by: —

## Context

This is the second half of the decision recorded in
[ADR-003](./003-solid-derived-intrinsic-elements.md), and it is separated because it is separately
revisitable: typing JSX is what gives a checker something worth checking, but _who_ runs that check
is its own one-way commitment to a maintenance surface.

**`inkline check` has never type-checked. Not partially — not at all.** `getSemanticDiagnostics`
appears exactly once in the repository, in `core/compiler/plan.md:818`, a planning document. It is
never called in shipped code. The `TypeChecker` built in
[`core/compiler/src/pipeline/passes/01-program.ts`](../../core/compiler/src/pipeline/passes/01-program.ts)
is used for six things total: five `getSymbolAtLocation` calls and one `getTypeAtLocation`.

Receipt, run 2026-07-28 against a file containing `notARealAttribute`, `e.nope.deep()`,
`disabled="yes-please"`, and `<notatag />`:

```
$ inkline check 'src/__probe__/Broken.ink.tsx' --config inkline.config.ts
inkline check EXIT=0
```

`tsc` with the ADR-003 candidate types catches 4 of those 4.

**What `check` is good at is a different question.** Add one line — `const n: number = "not a number"`
— and it does exit 1, with a code, a caret, a `help` line, and a docs URL:

```
src/__probe__/Broken.ink.tsx:4:3  error  INK0121  Setup-body local 'n' is referenced but its definition cannot be emitted
```

Note what that says and what it does not. It diagnoses a **lowering constraint** — code the compiler
cannot emit — and says nothing about the type error sitting in the same expression, because that was
never its job. The INK catalogue (35 codes at this HEAD) is a lowering-constraint checker, and a good
one.

**The steelman for the opposite, which is stronger than it looks.** One command that answers "is my
component OK" is a genuinely better experience than two. Authors do not care whose checker found the
bug. UXF-72 records a Panda adopter asking for exactly this — _"even a minimal linter… a non-zero exit
when the resulting CSS is invalid for any reason."_ This option was not dismissed; it was priced.

**The price.** Making `check` type-check is not "call `getSemanticDiagnostics`." The program it
builds is deliberately hermetic: `getDefaultLibFileName` returns a bare `"lib.d.ts"`, `strict: false`
is hardcoded, and the host's `fileExists` returns `false` for anything that is not the entry file, a
`.ink.*` file, or a tsconfig-listed `.d.ts`. Semantic diagnostics from that program would be a wall
of `Cannot find module '@inkline/core'` and `Cannot find name 'HTMLInputElement'`. Making them
meaningful means building a real program with lib and `node_modules` resolution — a second
type-checking path that must track `tsc` forever, that will diverge from the author's own tsconfig,
and that has to re-answer every `strict` question TypeScript already answers.

## Decision

We will not make `inkline check` type-check. `inkline check` remains a lowering-constraint checker;
`tsc` owns types. The documented workflow is `tsc --noEmit && inkline check`, stated loudly, with the
reason attached: **"can this be expressed" and "can this be lowered" are different questions.**

Preferred delivery for that guidance: `inkline check` detects that no `tsc` run covers the files it
was given and emits an INK-coded **warning** naming the exact command — so the guidance lives where
the mistake happens rather than in a document nobody opened.

## Consequences

**Good.**

- Inkline never ships a checker that is 95% of `tsc`. That is the worst available position: authors
  get _different_ answers from two tools and cannot tell which is right.
- The author's own `tsconfig.json` stays authoritative. Inkline does not get an opinion on `strict`.
- The INK catalogue keeps a coherent identity — every code answers a lowering question — which is
  what makes its `help` prose and docs URLs writable at all (see
  [ADR-001](./001-compiler-dx-invests-in-diagnostics.md)).
- No new type-checking maintenance surface tracking TypeScript releases forever.

**Bad.**

- **Authors run two commands, and some of them will run one.** That is a real ergonomic cost paid
  every day by every author, in exchange for a maintenance cost we would pay every TypeScript
  release. The warning above is a mitigation, not a fix — a warning is skippable and CI configs get
  copied.
- **"Does Inkline check my components?" now has a two-part answer**, and two-part answers are what
  documentation is bad at. Every tutorial, template, and CI example has to carry both commands or it
  teaches the wrong habit.
- **The silent-omission complaint stays unanswered by `check`.** UXF-72's most transferable finding
  was an adopter asking why a style was _silently dropped_; static extraction's characteristic
  failure mode is silent omission. This decision routes types away from `check` but does not add the
  coverage that would answer that complaint — that remains ADR-001's step 1.
- The four probe misses in ADR-003 that belong to the catalogue (`aria-*` spelling, `$bind:` target
  validation) are now unambiguously `check`'s to build. Declining the type-checking work does not
  make `check` cheaper; it re-points the same budget.

**Neutral.**

- `01-program.ts`'s hermetic host stops being a latent bug and becomes a documented design property:
  it builds a program for lowering analysis, not for semantic diagnostics.

## Revisit triggers

Written now, before any of it ships:

- More than 3 reports of an author shipping a type error because they ran `inkline check` and not
  `tsc`. Then the two-command workflow is failing in practice and the ergonomics outweigh the
  maintenance price.
- TypeScript ships a supported way to run semantic diagnostics against a project without owning
  program construction — i.e. the cost above stops being "a second type-checking path." Then this
  decision was priced against a constraint that no longer exists.
- `inkline check` acquires any diagnostic that requires a resolved type from outside the entry
  file's own graph. That is the first step down the path this ADR declines, and it is a supersede,
  not an exception.
