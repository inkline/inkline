---
name: review-gate
description: The Styleframe Guild's PR review checklist — correctness, simplicity, surgical diffs, changesets, doc freshness, semver, and styleframe-specific contract risks. The reviewer's operating manual.
---

# The review gate

Every PR passes this gate. The gate exists to keep `main` releasable and the API trustworthy — not to display cleverness. Verdicts: **approve** · **approve with nits** (≤2 nits, prefixed `nit:`, author may defer) · **request changes** (only with evidence: failing case, violated rule, broken contract).

## The checklist

1. **Correctness & tests.** Logic sound; edge cases considered; colocated `*.test.ts` updated/added; tests actually assert the change (would fail without it). Behavioral changes to engine/plugin need integration-spec coverage, not just unit.
2. **Simplicity.** "Would a senior engineer call this overcomplicated?" No speculative abstractions, no unrequested configurability, no error handling for impossible states. 200 lines that could be 50 → request changes.
3. **Surgical diff.** Every changed line traces to the issue. No adjacent "improvements", no drive-by reformatting, no pre-existing dead-code deletion. Orphans created by the change ARE cleaned up.
4. **Conventions.** Conventional commit with package scope; oxlint/oxfmt clean; `export *` index files; imports from the `styleframe` barrel not `@styleframe/*` internals.
5. **Changeset.** Present for published packages; correct bump level. Ignore-listed packages (docs, playground, integration, app, storybook) are exempt. Semver sanity: new API = minor; behavior/output change consumers can observe = judge carefully; breaking = major + Alex approval + migration note.
6. **Doc freshness — this repo's disease.** API/behavior change without its AGENTS.md / docs-page update = **request changes**. This is the structural cure for a repo whose docs once claimed 2 recipes while 39 shipped.
7. **Styleframe contract risks** (the expensive ones):
   - Utilities/modifiers registered before recipes that reference them (ordering throw).
   - `_usage` tree-shaking contract: does the change affect what CSS gets emitted with `treeshake`/`scanner` flags?
   - `ShorteningMap` two-sided consistency (CSS emit ↔ source rewrite) on any minify-adjacent change.
   - `_exportName` tagging for anything meant to appear in `virtual:styleframe`.
   - `{ default: true }` on composable variables.
   - Two build paths: does the change behave on BOTH CLI and plugin paths, or is divergence intended and stated?
   - Recipe/token renames → Inkline (customer zero) migration note present?
8. **Security & safety.** No secrets/keys in code or fixtures; no weakening of license/watermark paths; dependency additions justified (prefer none); no `postinstall` surprises.
9. **Blast radius.** Cross-package changes have the owning agent's sign-off (engine → Atlas, theme → Palette, etc. per the routing table).

## Conduct

- Review the diff AND run what it claims when the claim is cheap to check; delegate expensive verification to @gauntlet explicitly.
- Never rewrite the author's branch. Comments say what and why; the author decides how.
- Be terse and kind. Cite file:line. One pass of substantive comments beats three passes of trickle.
- You own no product code — your independence is the point. If you authored something (rare, e.g. review tooling), someone else reviews it.
