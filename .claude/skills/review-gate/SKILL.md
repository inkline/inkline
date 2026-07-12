---
name: review-gate
description: The Inkline Guild's PR review checklist — correctness, simplicity, surgical diffs, changesets, doc freshness, semver, and Inkline-specific contract risks. The reviewer's operating manual.
---

# The review gate

Every PR passes this gate. The gate exists to keep `main` releasable and the public surface trustworthy — not to display cleverness. Verdicts: **approve** · **approve with nits** (≤2 nits, prefixed `nit:`, author may defer) · **request changes** (only with evidence: failing case, violated rule, broken contract).

## The checklist

1. **Correctness & tests.** Logic sound; edge cases considered; colocated `*.test.ts` / `*.ink.test.ts` updated/added; tests actually assert the change (would fail without it). Compiler behavior changes need scenario or per-target fixture coverage, not just unit; component changes need real-DOM evidence (Angular SSR mount) where behavior is visible.
2. **Simplicity.** "Would a senior engineer call this overcomplicated?" No speculative abstractions, no unrequested configurability, no error handling for impossible states. 200 lines that could be 50 → request changes.
3. **Surgical diff.** Every changed line traces to the issue. No adjacent "improvements", no drive-by reformatting, no pre-existing dead-code deletion. Orphans created by the change ARE cleaned up.
4. **Conventions.** Conventional commit with package scope; oxlint/oxfmt clean (`vp check`); tests colocated; no hand-edits under `.inkline/`, `.styleframe/`, `dist/`, or `.old/`.
5. **Changeset.** Present for published packages; correct bump level. Ignore-listed (`website`, `@inkline/components`) are exempt — but a component change ships through the framework packages: **each affected `@inkline/<framework>` needs its changeset**. Semver sanity: new API = minor; observable output change = judge carefully; breaking (removed exports/subpaths, IR schema affecting serialized caches, prop/axis renames) = major + Alex approval + migration note.
6. **Doc freshness — this repo's disease.** API/behavior change without its AGENTS.md / docs / compiler-README update = **request changes**. The link-integrity test (`tooling/agents-check`) catches dead paths; you catch semantic drift. This is the structural cure for a repo whose docs already claim `generated/` while the code writes `.inkline/`.
7. **Inkline contract risks** (the expensive ones):
   - IR node shape changed → `IR_VERSION` bumped + migration present?
   - Symbols minted after P4 / state stashed on IR nodes between passes?
   - New diagnostic registered in `codes.ts` (right band, INK0001–INK0120) and surfaced, never thrown? Expected-notice baseline (INK0045/INK0068) not silently expanded?
   - New primitive/IR node wired end-to-end (P2 parse + P3 lower + **every** target's emit)?
   - Emitted output still free of `@inkline/core` imports (the zero-runtime promise)?
   - Per-target test isolation respected (no `ALL_TARGETS` loops in `codegen/targets/<name>/` tests)?
   - `inkline` barrel subpath map and framework-package exports maps unchanged — or flagged as breaking?
   - Story ids stable (meta/variant renames ripple to 7 CSFs and the e2e reference)? Slot-gated addons carry `:empty` collapse rules?
   - CLI vs plugin path divergence: which paths does the change affect, and is each verified?
   - styleframe boundary: recipe props still typed from `virtual:styleframe` types; custom CSS layered, tokens not hardcoded; upstream version bumps carry parity evidence?
8. **Security & safety.** No secrets/keys in code, fixtures, or logs; dependency additions justified (prefer none — and no casual `minimumReleaseAgeExclude`/`allowBuilds` additions); no weakening of the styleframe license/watermark boundary; no `postinstall` surprises.
9. **Blast radius.** Cross-package changes have the owning agent's sign-off (compiler/core → Atlas, components → Palette, plugin/CLI → Forge, framework packages/styleframe boundary → Bridge, etc. per the routing table).

## Conduct

- Review the diff AND run what it claims when the claim is cheap to check (`vp test` in the package, `pnpm build` in ui/components); delegate expensive verification (visual parity, matrix runs, benchmarks) to @gauntlet explicitly.
- Mind the known noise baselines before blocking: ~290 `TS17004` fixture errors in `vp check`, the Astro conformance-lint baseline. Blocking on pre-existing noise teaches authors to ignore the gate.
- Never rewrite the author's branch. Comments say what and why; the author decides how.
- Be terse and kind. Cite file:line. One pass of substantive comments beats three passes of trickle.
- You own no product code — your independence is the point. If you authored something (rare, e.g. review tooling), someone else reviews it.
