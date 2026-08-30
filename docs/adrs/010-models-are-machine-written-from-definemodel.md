# ADR-010: `options.models` is machine-written from `defineModel` — the author never writes it

Date: 2026-08-30 · Status: Accepted
Deciders: Operator (2026-08-30, on internal tracker UXF-234) · Informed by: UXF-234 (design + Option D pricing), UXF-177 (the directive), UXF-162 (measurements)
Supersedes: [ADR-006](./006-inferred-component-authoring-types.md) **in part** — Decision 5 (Option D deferred) and Decision 3's authorship, only; [ADR-008](./008-authoring-surface-is-inferred-from-options-alone.md) **in part** — the "Option D stays deferred" clause of its Decision 5, only · Superseded by: —

[ADR-006](./006-inferred-component-authoring-types.md) Decision 3 put two-way models in `options.models`,
a type-only channel, and left the author to write it. On 2026-08-30 the Operator struck that:

> I had the right instinct. I DO NOT WANT `options.models`. I WANT THIS TO BE INFERRED FROM
> `defineModel`. Take the required measures.

The channel survives. **Its authorship does not.** The Inkline compiler already extracts every model
from the setup body; it now writes the `models` entry as well, and the author writes only
`defineModel<boolean>("open")`. The key becomes machine-owned output, like a lockfile: present in the
file, never hand-written.

## Context

### Two readings, and which one was chosen

The directive admits two readings, and they lead to opposite designs:

- **Lenient** — _the author must never write it._ Satisfied by having a machine write it.
- **Strict** — _the text must not exist in the file at all._ Satisfied only by deleting the channel.

**The Operator chose the lenient reading on 2026-08-30**, on UXF-234, answering the open question
void's design closed with. This is the part most likely to be misremembered, so it is recorded before
anything else: a machine-owned `models:` key visible in the authored file is acceptable.

### The option space is closed

Per UXF-234's design (third-party; its premises re-verified on `8118157a8` for this record), the model
surface can exist in exactly three places, because TypeScript cannot see the setup body
([ADR-008](./008-authoring-surface-is-inferred-from-options-alone.md) receipt 1) and no artifact
_next to_ the source is reachable (ADR-006, built and killed twice):

1. **Text inside the authored file** — written by the author (B2, struck by the directive) or by a
   machine (**Option E**, this decision).
2. **A virtual layer** that lies to the checker — **Option D**.
3. **Nowhere** — **Option G**, no typed model surface.

There is no fourth position.

### Why Option D is a measured blocker, not a deferral

ADR-006 Decision 5 deferred D as unpriced. It is now priced, against the pinned toolchain rather than
by estimate. **Verified** via `npm pack typescript@7.0.2`, the workspace default
(`pnpm-workspace.yaml:96`): TypeScript 7 is the **native compiler** — platform binaries via
`optionalDependencies`, `bin/tsc` only, **no `tsserver`, no `tsserverlibrary`, no plugin entry point
anywhere in the package**. The classic programmatic API now lives under `typescript/unstable/*`.

- **The editor half has no loading point** (_inferred, strong_ — a Go binary has no JS runtime and
  exposes no extension protocol). The only route is a standalone LSP server embedding a **second
  checker** on the TS6 line, plus a VS Code extension; other editors manual or unsupported. That TS6
  line is documented in this repo as temporary, "until their dependency ports to TS7"
  (`pnpm-workspace.yaml:105-135`, **verified**). Estimate, labelled: **4–8 weeks initial**, plus a
  permanent maintenance tail.
- **The degraded path is the default, and it is the one that kills it.** External authors are real —
  `@inkline/plugin` compiles user-authored `.ink.tsx` across six bundlers (**verified**, its
  `package.json` description). A stock consumer loads no plugin, so either they see B1's errors on
  correct code while intercepted CI is green, or enforcement stays off and D delivers nothing to
  exactly the people it cannot reach. Either way the surface forks by installation state.

**D is not buildable against the pinned toolchain without a second, permanently divergent checker.**
That is stronger than ADR-006's "deferred, not rejected" and stronger than ADR-008's restatement of
it. It is a blocker with a named lift condition, not a preference — see the revisit triggers.

### Why Option G was rejected

G satisfies the strict reading by deleting the channel and keeping `InkComponent`'s
`[attr: string]: any` (still on `main`, **verified**, `core/core/src/index.ts:139`; no `SurfaceOf`
exists yet, **verified** — UXF-178 never landed). Its price is the entire measured benefit. Without a
model channel, enforcement degrades to **B1**, measured in ADR-006's table at **9 errors in
`ui/components` on code that is correct today** (`main` measures 0) plus **2 false positives** in the
12-case matrix. UXF-178 becomes unshippable and its **+3 real catches** are forfeited, along with
autocomplete and ADR-003's "most likely to bite" close.

### What Option E stands on

The pieces exist and were re-verified for this record on `8118157a8`:

- The compiler extracts every model's name and type at parse —
  `core/compiler/src/pipeline/passes/02-parse/setup.ts:375-383` (**verified**).
- The drift gate is live on `main`: INK0094 compares declared against actual in **both** directions —
  `core/compiler/src/pipeline/passes/04-analyze/validate.ts:172-211` (**verified**), severity
  `warning` today (`core/compiler/src/core/diagnostics/codes.ts:249`, **verified**).
- The extraction-and-writer codemod is written on [#584](https://github.com/inkline/inkline/pull/584)
  and **is not on `main`** (**verified**: `core/compiler/scripts/` holds `bench.ts`,
  `gen-aria-attributes.ts`, `gen-diagnostics.ts` and nothing else).
- The enforcement type change is measured: B2 = 0 errors, 0 false positives, +3 real catches
  (ADR-006, UXF-162).

## Decision

**1. The models authoring surface is inferred from `defineModel` and machine-written (Option E).**
The compiler extracts every model from the setup body and writes the matching `options.models` entry.
The author writes `defineModel<T>("name")` and nothing else. The key is tool-maintained output; hand-
editing it is a mistake INK0094 exists to catch.

**2. The lenient reading is the operative one.** "I do not want `options.models`" means _the author
must never write it_, not _the text must not exist in the file_. The strict reading is closed, and
Option G with it.

**3. Option D is closed on a measured blocker, superseding ADR-006 Decision 5.** ADR-006 deferred D
as the unpriced alternative and told anyone reopening it to start by costing it. It has now been
costed against the pinned toolchain: there is no plugin entry point in TypeScript 7, so D requires a
second checker on an engine line already scheduled to die, and its default un-intercepted path is
B1's failure mode. ADR-008 Decision 5's clause "Option D stays deferred" is corrected the same way;
the rest of ADR-008 Decision 5 stands. D is not dead forever — it is blocked, with one lift condition
below.

**4. Option G is rejected**, for the price recorded above. Named here so the cost of the strict
reading stays on the record and nobody re-derives it.

**5. ADR-006 Decision 3 is amended, not reversed.** `options.models` remains the type-only channel the
compiler never reads for emission — [ADR-008](./008-authoring-surface-is-inferred-from-options-alone.md)
Decision 3's finding that it is the only slot simultaneously visible to TypeScript and invisible to
the compiler is what makes E possible at all. Only the authorship changes: machine, not author.

**6. What is unchanged.** ADR-008 Decisions 1–4 stand in full, including its Decision 2 — E does not
remove the duplication from the file, it removes the author's hand from it, so "D is the only
mechanism that removes the duplication while keeping today's authoring shape" remains true as
written. ADR-006 Decisions 1, 2, 4, 6 and 7 stand, as do ADR-005 §4's authoring-time-only ceiling and
[ADR-004](./004-inkline-check-does-not-type-check.md)'s division of labour.

**7. ADR-006 and ADR-008 keep status `Accepted`.** Each is superseded only in the scoped parts named
in this ADR's header, and each carries a forward link saying which. Flipping either to `Superseded`
would misrepresent decisions that are still live — the same judgement ADR-008 §6 made and
[README.md](./README.md) records as the house rule for partial supersedes.

## Consequences

**Good.**

- The double-declaration objection is finally answered rather than relocated. ADR-006's top _Bad_
  consequence — "`options.models` is a hand-maintained duplicate … that is a lie surface" — stops
  being hand-maintained, and INK0094 already guards what is left.
- Boring technology, days not weeks. Plain `tsc` and every stock editor see the full surface,
  including external `@inkline/plugin` consumers, with no second toolchain.
- The measured B2 benefit is preserved intact: 0 errors, 0 false positives, +3 real catches.
- D's status is now pinned to a checkable upstream fact instead of an unpriced estimate, which makes
  the next reversal cheap.

**Bad.**

- **The `models:` key stays visible in the authored file.** The author never writes it but always
  sees it. On the strict reading of the directive this decision fails the letter while meeting the
  spirit; the Operator accepted that trade explicitly, and it is the first thing to reopen if the
  cost turns out to be real.
- **Staleness is reintroduced, where B2's inference had none.** Between editing a `defineModel` and
  running the autofix the entry is stale. It is bounded by INK0094 rather than eliminated — a
  diagnostic plus one command, the same loop as formatting — but ADR-006's "staleness is structurally
  zero" no longer describes the whole system.
- **Type fidelity is capped by `PropDeclaration`.** `options.models` is
  `Record<string, PropDeclaration>` (`core/core/src/index.ts:118`), so a model typed as a union or a
  named interface has no spelling that says the same thing; `Object` is the closest available and
  degrades to `Record<string, any>` at the parent (`core/core/src/index.ts:36-37`, **verified**; the
  compiler's own note on the limit is at `04-analyze/validate.ts:157-163`). B2 had this too. Only D
  would not.
- **The writer is not yet built.** Today's codemod skips any component that already carries a
  `models` key, so updating and removing stale entries is unwritten work, as is the autofix wiring
  and the INK0094 warning→error flip. Estimate, labelled: **2–5 days** (UXF-234). Until it lands the
  decision is recorded and not yet true of the repo.

**Neutral.**

- No code ships with this ADR. The implementation is tracked as UXF-239; docs as UXF-179, whose
  content changes to "models are inferred from `defineModel`; the `models` key is tool-maintained —
  never edit it by hand." UXF-178's enforcement flip is kept and resequenced behind the writer.
- [#573](https://github.com/inkline/inkline/pull/573) (the channel and INK0094) is kept untouched;
  [#584](https://github.com/inkline/inkline/pull/584) is reworked and landed rather than closed.
- No new measurement was taken for this record. Every number above is ADR-006's or UXF-234's, cited;
  every `file:line` was re-verified on `8118157a8`.

## Revisit triggers

Written now, while the judgement is cold:

- **TypeScript's native language service ships an official extension or virtual-file API.** D's
  blocker lifts at that moment and only then; re-price the editor half against that API before
  anything else. This is the one trigger that makes reopening D cheap.
- **Authors keep hand-editing the machine-owned key** — INK0094 churn showing up in review. Then the
  visible-artifact cost is real, the strict reading comes back, and it is cheaper to reopen it then
  than to re-derive the option space.
- **Rich model types — unions, named interfaces — become common.** The `Object` degradation starts
  costing real safety at that point, and only D preserves exact types.
- **The autofix loop proves intrusive** — authors routinely hit INK0094 in CI rather than locally.
  Then the fix is a pre-commit or watch-mode integration, not a re-decision, but it belongs on the
  record as the expected failure of a lockfile-shaped workflow.
