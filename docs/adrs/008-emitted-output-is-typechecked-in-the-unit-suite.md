# ADR-008: Emitted output is typechecked in the unit suite, in-process, behind a poison test

Date: 2026-08-11 · Status: Proposed
Deciders: Project owner (pending) · Recommended by: QA · Measurements reviewed by: Research
Informed by: internal tracker UXF-194, parent UXF-139, UXF-192 (the case that shipped uncaught)
Supersedes: — · Superseded by: —

> **Amended 2026-08-12, while `Proposed`.** The original draft's cost figures were wrong by ~6× and
> its two halves disagreed with each other. Every timing below has been independently re-measured and
> is attributed to who measured it. Amending a `Proposed` ADR is the correct move; once this reaches
> `Accepted` it is append-only and a change of substance requires a superseding ADR.

## Context

[ADR-004](./004-inkline-check-does-not-type-check.md) settled who typechecks **authored** `.ink.tsx`:
`tsc`, not `inkline check`. This ADR settles the other half — who, if anyone, typechecks the
**emitted** output, and where that check runs.

UXF-139 recorded the gap as "`compileToChecked` doesn't typecheck." That is true and it is not the
problem. `compileToChecked` ([`core/compiler/src/testing/codegen.ts`](../../core/compiler/src/testing/codegen.ts))
asserts the _compiler_ emitted no error diagnostics. That is a legitimate, different assertion, and
it should stay exactly as it is.

**The real finding is worse.** A dedicated harness already existed — `typecheckEmittedForTarget` in
[`core/compiler/src/testing/typecheck.ts`](../../core/compiler/src/testing/typecheck.ts) — wired into
a 420-test sweep across 4 targets, and documented in `docs/testing.md` as the thing that "verifies
that emitted code is type-safe." It had never typechecked a single line.

Four defects, stacked:

1. It shelled out to `npx tsc`. In this repo that resolves to the **`tsc` npm package** — a decoy that
   prints `This is not the tsc command you are looking for` and exits. The real compiler is
   `typescript`, whose binary is also `tsc`; the decoy wins the `node_modules/.bin` race.
2. The output parser kept only lines containing `error TS`. The decoy's banner has none, so the parser
   returned `[]` and the helper returned `pass: true`. **Tool failure was indistinguishable from
   success.**
3. `resolve(conformance.typecheck.tsconfig)` resolved a `./tsconfigs/…` string against the process
   cwd, not the conformance file. The paths pointed at nothing. Even with the real `tsc` this would
   have failed.
4. Coverage was fictional anyway: `angular`, `qwik` and `astro` carry `tsconfig: ""`; `vue`, `svelte`
   and `astro` emit `.vue` / `.svelte` / `.astro`, which `tsc` cannot parse at all.

Receipt — mutation probe, run 2026-08-11 at the pre-fix HEAD. `Counter` compiled to all 7 targets,
then the same output with `const __poison: number = "definitely not a number";` appended:

```
[react]   CLEAN pass=true rawLen=544   POISONED pass=true rawLen=544
[solid]   CLEAN pass=true rawLen=544   POISONED pass=true rawLen=544
[vue]     CLEAN pass=true rawLen=544   POISONED pass=true rawLen=544
[svelte]  CLEAN pass=true rawLen=544   POISONED pass=true rawLen=544
[angular] CLEAN pass=true rawLen=544   POISONED pass=true rawLen=544
[qwik]    CLEAN pass=true rawLen=544   POISONED pass=true rawLen=544
[astro]   CLEAN pass=true rawLen=544   POISONED pass=true rawLen=544

raw (all 14 runs, byte-identical):
  "This is not the tsc command you are looking for … To get access to the
   TypeScript compiler, tsc, from the command line either: - Use npm install typescript to …"
```

7 of 7 targets: a deliberate type error and clean output produce byte-identical results. The gate was
vacuous in every cell.

**What a working gate is worth, priced rather than guessed.** Measured 2026-08-11, in-process
`ts.createProgram` over the emitted output of all 105 fixtures:

| Measurement                                 | react  | solid  |
| ------------------------------------------- | ------ | ------ |
| Compile fixtures → emitted files (no check) | 168 ms | 85 ms  |
| One program over all 103 `.ts`/`.tsx` files | 567 ms | 484 ms |
| Same, repeat run                            | 427 ms | 437 ms |
| Per-file program, average over 10 files     | 115 ms | 109 ms |

Realised suite cost after the fix — re-measured independently 2026-08-12 on a clean
`pnpm install --frozen-lockfile` at this branch's HEAD, two consecutive runs each:

| Measurement                                     | Result                              |
| ----------------------------------------------- | ----------------------------------- |
| `typecheck.test.ts` in isolation                | **11.28 s**, **11.33 s**            |
| — tests it ran                                  | 90 passed, 25 skipped (115)         |
| `typecheck.test.ts` within the full package run | **13.82 s**                         |
| `lint.test.ts` within the same run              | **42.37 s**                         |
| `@inkline/compiler` package, wall               | **53.11 s** (223 files, 3189 tests) |

Two claims in the original draft do not survive that measurement and are corrected here:

- The isolated cost is **~11.3 s, not ~68 s.** The 67.97 s / 72.49 s figures appear to be an
  artefact of the measuring run, not of this code; the draft's own Consequences section already said
  ~12 s, and that was the right number.
- **This file is not the critical path.** `lint.test.ts` is the longest single pole at 42.37 s — 3×
  this gate — and the package's 53 s wall is dominated by module import cost (45.6 s aggregate across
  223 files), not by any one test file. Removing this gate entirely would not meaningfully shorten
  the suite.

The pre-fix `typecheck.test.ts` took **227.96 s** for 420 tests — spawning `npx` 420 times to run a
decoy. So the honest statement is the one the draft talked itself out of: **it did get cheaper**,
by roughly 20×, and unlike the broken one it asserts something. The price of this gate is
**~11 s for 1 target and 80 fixtures** — cheap enough that cost is not a reason to argue about it,
which is precisely why the scope limits below, not the runtime, are what deserve scrutiny.

**What it would have caught.** UXF-192's case is `{ size: { type: Number, default: "big" } }` — a
`type`/`default` contradiction. Probed on main:

- **react** emits `props: { size? }` with `const { size = "big", ...__attrs } = props`. Under the
  strict react tsconfig that is **TS7008, "Member 'size' implicitly has an 'any' type" — caught.**
- **angular** emits `size = input('big')`. Compiles clean. Wrong type, silent. **Not caught** — and
  angular is not in the sweep at all.
- Compiler diagnostics: **0 errors on all 7 targets**, before and after.

So a typecheck on emitted output is a **partial** net. It catches "the emitted code does not
compile." It does not catch "the emitted code compiles and means the wrong thing." UXF-192 shipped
uncaught for both reasons — no working check, and the target where it mattered most was outside the
net even in principle.

**The steelman for doing nothing.** The compiler's own diagnostics are the intended gate, snapshots
already pin emitted output byte-for-byte, and a snapshot diff is a cheaper, more legible signal than
a TS error code. Adding a second checker adds a second thing that can rot — as this one demonstrably
did, for its entire life, while reporting green. That argument is real and is why this ADR pairs the
gate with a mandatory anti-vacuity test rather than just switching it on.

## Decision

**Yes — emitted output gets a real typechecking assertion, in the unit suite, in-process, and it is
not allowed to exist without a test that proves it can fail.**

Concretely:

1. **`typecheckEmittedForTarget` runs `ts.createProgram` in-process.** No subprocess, no `npx`, no
   output-string parsing. Diagnostics come from the compiler API as structured objects.
2. **A tool that cannot run is a failure, never a pass.** A missing, unreadable, or invalid tsconfig
   returns `pass: false` with the reason. The result carries `checkedFiles`, so `pass: true` with
   `checkedFiles: 0` is visibly an empty run and callers can assert against it.
3. **The gate carries a poison test.** `typecheck.test.ts` asserts that well-typed output passes
   _and_ that `export const size: number = "definitely not a number"` fails with TS2322. If the
   typechecker ever stops typechecking, that test goes red. This is the load-bearing clause: the
   original failure was not "we had no gate," it was "we had a gate that could not fail."
4. **The sweep runs in the unit suite, not the visual-parity suite.** No browser, deterministic,
   same shard as the rest of `@inkline/compiler`. Visual-parity is a 30-minute browser job gating a
   different axis — pixels, not types — and putting a type gate behind it would delay the signal by
   half an hour for no gain.
5. **`compileToChecked` is left alone.** Per-call-site typechecking was priced and rejected: ~110 ms
   per file × ~7 targets ≈ 80 s, and a per-file program cannot see the cross-file imports that
   produce the interesting errors. The two assertions are documented as independent — output can be
   diagnostic-clean and still fail `tsc`.
6. **Scope is honest and written down.** [`typecheck-fixtures.ts`](../../core/compiler/src/testing/typecheck-fixtures.ts)
   names the swept targets and every excluded fixture, each with its TypeScript error code and a
   `[harness]` or `[emit]` classification. `[harness]` = the fixture is compiled in isolation so a
   module it imports is never emitted. `[emit]` = the emitted code is genuinely wrong. **No
   wildcards, and no entry without a diagnostic code.**
7. **Exclusions are tested for staleness.** A separate test compiles every excluded fixture and fails
   if one now typechecks clean. An exclusion cannot outlive the bug it documents.

Initial scope is **react only**, 80 of 105 fixtures swept. The reasons are recorded in
`typecheck-fixtures.ts`: `vue`/`svelte`/`astro` emit files `tsc` cannot read and need
`vue-tsc` / `svelte-check` / `astro check`; `angular`/`qwik` have no tsconfig and no framework types
in this package's devDependencies; `solid` is close to ready but fails 90 of the 98 fixtures that
produce output, 87 of them carrying the same repeated TS2322 — shipping it behind a 90-entry
exclusion list would be a gate in name only.

## Consequences

### Good

- The gate can fail, and it is proven to fail, by a test that ships with it.
- It surfaced four genuine emitted-code defects that were invisible while the gate was vacuous:
  `useRef(null)` dropping the IR's `elementType` so `.current?.focus()` types as `never`
  (`ElementRef`, `MultiRefs`); `untrack(...)` emitted into react output with no import and no react
  equivalent (`UntrackBoundary`); a string `style` prop emitted as-is against `CSSProperties`
  (`PropDefaults`); and one systemic solid TS2322 across 87 fixtures.
- The suite got **faster**: 227.96 s → ~11.3 s for that file, because 420 subprocess spawns are gone.
  A gate that asserts something now costs a twentieth of the gate that asserted nothing.
- Target tsconfigs are now resolved relative to their own conformance file and are asserted to exist,
  so a moved or renamed config fails a test instead of silently disabling a target.
- `docs/testing.md` no longer claims coverage the repo does not have.

### Bad — accepted

- **Coverage is 1 target of 7, and 80 of 105 fixtures.** Stated against the denominator that
  matters — fixtures that actually reach the typechecker — it is 73 of the 98 that emit react
  output; the other 7 produce no output or fail compilation first. Both numbers are honest; the
  draft used them interchangeably without saying so, and that is fixed here. Either way this is a
  real gate over a narrow slice, not a comprehensive one. Anyone reading "emitted output is
  typechecked" without reading `typecheck-fixtures.ts` will overestimate it. That is why the scope
  lives in code, in a file the sweep imports, rather than in prose.
- **The 25-entry exclusion list is a maintenance surface**, and **12** of those entries are harness
  artifacts rather than bugs; the remaining **13** are `[emit]` — genuine defects in generated code.
  (The draft transposed these.) The 12 are noise that has to be re-read every time someone touches
  the list. Fixing them means teaching `compileFixture` to compile a fixture with its dependencies.
- **A wildcard `declare module "*"` resolves unmaterialised imports to `any`.** That is what turns
  the harness gap into TS2709/TS2304 instead of a flood of TS2307, but it also means a genuinely
  wrong import path in emitted output will not be caught. Real packages still resolve normally, so
  the blind spot is limited to modules the harness was never going to write.
- **It catches "does not compile," not "compiles but is wrong."** The angular
  `input('big')` case is the counterexample, and it is the exact case that motivated the work. This
  gate would not have caught UXF-192 on the target where it mattered.
- **Second checker, second thing to rot.** Mitigated by the poison test, not eliminated by it.
- **~13.8 s added to every `@inkline/compiler` unit run**, against a 53 s package wall. Second-longest
  file in the package, behind `lint.test.ts` at 42.37 s.

## Revisit triggers

Written now, cold:

- **Solid's systemic TS2322 gets fixed** → add `solid` to `TYPECHECKED_TARGETS` in the same PR as the
  fix. That is how the fix gets verified.
- **`compileFixture` learns to compile a fixture with its dependencies** → delete all **12**
  `[harness]` exclusions and re-measure. If the count does not drop to zero, the harness change is
  incomplete.
- **`vue-tsc` / `svelte-check` / `astro check` become cheap enough to run in the unit suite** (or a
  second shard) → revisit the 3 unreachable targets. Until then, `checkedFiles: 0` is the honest
  answer, not a passing test.
- **`angular` or `qwik` gains a tsconfig and framework devDependencies** → add it to the sweep.
- **The exclusion list crosses ~35 entries, or any `[emit]` entry passes its first birthday** →
  the gate is documenting rot instead of preventing it. Escalate the underlying defects rather than
  growing the list.
- **The sweep exceeds ~30 s** → move it behind its own vitest project or CI shard rather than
  letting it tax every unit run. Baseline for this trigger is the re-measured **11.3 s**, leaving
  ~2.6× headroom. Worth stating plainly: against the draft's erroneous 68 s this trigger was already
  tripped on the day it was written, which would have made it decoration rather than a trigger. A
  revisit threshold is only meaningful relative to a correct baseline — that is the whole reason the
  numbers above were re-measured rather than accepted.
