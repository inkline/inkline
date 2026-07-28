# ADR-001: Invest compiler DX in diagnostics, ordered coverage → rendering → prose

Date: 2026-07-27 · Status: Accepted
Deciders: Project owner · Informed by: internal tracker UXF-70 (goal), UXF-71 (friction audit), UXF-72 (prior-art survey)
Supersedes: — · Superseded by: —

## Context

The goal set for this round of work was that reading and writing `.ink.tsx` should be a good
experience. Two investigations ran in parallel and independently: a survey of prior art in
compiler and toolchain developer experience, and a hands-on friction audit of this repository.

**Scope note.** The compiler in `core/compiler` is a _component_ compiler — `.ink.tsx` with signal
primitives to per-target component output via a typed IR ([`core/compiler/package.json`](../../core/compiler/package.json)).
It is not a styling engine. Styling belongs to the upstream `styleframe` project, so
token-authoring prior art (Tailwind v4 `@theme`, UnoCSS) was routed there and is out of scope here.

**Latency is not the constraint.** The friction audit measured a full build of 67 files at 0.45s and
a warm incremental rebuild at 209ms. This retired the branch of the survey that would have argued
for build-architecture work ahead of everything else.

**The diagnostic data model is mostly right; the renderer is not.** Today the compiler has 29 stable
codes with severity, an optional `help` channel, and a canonical docs URL
([`core/compiler/src/core/diagnostics/codes.ts`](../../core/compiler/src/core/diagnostics/codes.ts)),
typed placeholder parameters, an auto-generated reference
([`core/compiler/scripts/gen-diagnostics.ts`](../../core/compiler/scripts/gen-diagnostics.ts)), and a
`SourceLocation` that carries `offset` and `length`
([`core/compiler/src/ir/types.ts`](../../core/compiler/src/ir/types.ts)). The CLI formatter is ten
lines and prints `file:line:col severity code title` plus `help` and `docs`
([`tooling/cli/src/lib/diagnostics.ts`](../../tooling/cli/src/lib/diagnostics.ts)). It never prints
the user's source. The span data needed to draw a code frame is carried the whole way through the
pipeline and discarded at the last step. The survey and the audit reached this conclusion
separately and cited the same file.

**The survey under-weighted one class of problem.** The audit's highest-ranked findings were not bad
diagnostics — they were _absent_ ones: JSX spread attributes discarded with no diagnostic and exit
code 0; nothing type-checking `.ink.tsx`; unknown configuration keys ignored; a documented API that
does not exist. Every exemplar in the survey (rustc, Elm, Biome, Vite, Sass) improves diagnostics
that already fire. None of them has a story for a compiler that stays quiet. A code frame drawn on
a diagnostic that never fires is worth nothing, so coverage has to precede rendering.

**Prose quality is measurably incomplete.** 7 of the 29 codes carry `help: undefined` (`INK0060`,
`INK0061`, `INK0062`, `INK0065`, `INK0066`, `INK0080`, `INK0090`). Separately, `DiagnosticParams`
extracts placeholders from `title` only, and the collector interpolates `title` but assigns `help`
verbatim ([`core/compiler/src/core/diagnostics/collector.ts`](../../core/compiler/src/core/diagnostics/collector.ts)),
so `help` strings containing `{name}` reach the terminal with the braces intact — `INK0121` does this
three times in one sentence.

**Options that were live and were not chosen this round:**

- _Build-architecture work_ (Vite's model: dev cost proportional to the modules on the page, not the
  project). Declined because the measurement above says there is nothing to fix yet.
- _Structured autofix suggestions_ (rustc `Applicability`, Biome `CodeSuggestion` with safe/unsafe
  fixes). Deferred, not rejected — see the Decision.
- _A dev-time inspector_ (UnoCSS `/__unocss`: per-token, per-file attribution of what the tool did
  and why). Strong option, genuinely useful, but it explains correct output; it does not help the
  case where the output is silently wrong.
- _Library-author diagnostics_ (Sass `@error`/`@warn`, where a library's error message points its
  caret at the consumer's call site). Valuable once there is a third-party component ecosystem;
  premature before one exists.

## Decision

We will spend the compiler developer-experience budget on diagnostics, in this order:

1. **Coverage.** Emit a diagnostic wherever the compiler currently fails silently or throws a raw
   error that bypasses the diagnostics pipeline.
2. **Rendering.** Render diagnostics with the user's own source and a caret under the span, using the
   `offset` and `length` already carried on `SourceLocation`, and print paths relative to the project
   root rather than absolute.
3. **Prose.** Every code carries an actionable `help`; placeholders resolve in `help` as well as
   `title`; `help` says what to change and nothing else.

Structured autofix suggestions are **deferred** until (2) has shipped. If they are ever built, a
machine-readable confidence level ships in the same release as the first suggestion — not later.

## Consequences

**Good.**

- The three steps are ordered so each one is worth something on its own; nothing is blocked on the
  step after it.
- Every step is a two-way door. Nothing here changes the authoring surface, the public API, or the
  compiled output.
- The data model already supports all three; this is renderer and catalogue work, not a redesign.
- Deferring suggestions defers the expensive part. In `rust-lang/rust`, measured 2026-07-27, there
  are 915 issues labelled `A-suggestion-diagnostics` and 95 open issues with "incorrect" in the
  title. Wrong suggestions are permanent maintenance; the confidence level is the pressure valve,
  which is why it is a release-gating condition rather than a follow-up.

**Bad.**

- **The strongest evidence available argues this may not work.** Santos & Becker (UKICER 2024,
  arXiv:2409.18661, n=106) found that error-message enhancement has shown "weak to insignificant
  results", that handwritten explanations beat both LLM-generated and conventional messages, and —
  most damaging — that preference and performance _dissociate_: users rate verbose messages higher
  while fixing bugs no faster. We are accepting this risk with one mitigation: acceptance criteria
  measure time-to-fix on a fixed scenario set, never satisfaction. A slice that ships and cannot show
  a time-to-fix improvement has failed, regardless of how it feels.
- **The prose is a permanent cost, and it is the expensive half.** Elm's reputation for good errors
  rests on `Reporting/Error/Syntax.hs`, 5,903 lines of hand-written prose; rustc maintains 518
  mandatory error-code explanation files. The plumbing is cheap and finite. The writing is neither.
  Committing to "every code carries an actionable `help`" commits every future diagnostic to the same
  bar, forever.
- **More output is a real failure mode in the best implementations.** `rust-lang/rust#115382` is a
  filed regression about verbosity burying the actual error. A green build here already prints 26
  informational diagnostics with no summary and no deduplication; adding a source frame to each one
  makes that worse before a severity and volume policy makes it better.
- Step 1 will turn currently-green builds red for anyone relying on the silent behaviour. That is the
  intent, but it is a real cost paid by existing consumers.

**Neutral.**

- The CLI renderer becomes a larger, tested component rather than a ten-line function, and the
  diagnostic catalogue acquires an editorial standard that reviewers must enforce.

## Revisit triggers

Written now, before any of it ships:

- The instrumented scenario set shows no measurable time-to-fix improvement after step 2 lands. Then
  Santos & Becker was right about this codebase and the remaining diagnostic budget moves elsewhere.
- Full-project compile p95 exceeds 2s, or warm incremental exceeds 500ms. Then the latency branch of
  the survey re-opens and outranks the rest of this.
- Diagnostic volume on a green build grows past what a reader will scan, or more than three reports
  arrive of a real error being buried. Then a volume policy (Biome caps output at 20 diagnostics by
  default) precedes any further rendering work.
- Autofix suggestions are proposed without a confidence level attached. That is a supersede, not an
  exception.
- A decision lands on typing the authoring surface. Typed JSX changes which diagnostics matter and
  which ones the type checker subsumes, and this ordering should be re-derived rather than assumed.

## Explicitly still undecided

This ADR covers reversible work only. The following were identified in the same round, are one-way
doors, and are **not** decided here:

- Giving JSX a real `IntrinsicElements` type and type-checking `.ink.tsx`.
- Narrowing the compiler's public export surface.

Each needs its own RFC and its own ADR before any code is written.
