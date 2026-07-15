---
name: create-pr
description: Author a pull request in the Guild's standard shape — a fixed Summary / Changes / Verification / Notes skeleton that mirrors the review-gate, plus the hard anti-leak rule that no agent @mention or mention:// link ever reaches a public PR. Use whenever you are about to open a PR (e.g. `/create-pr`), so the PR passes review by construction.
---

# Create a PR

This is the **author-side mirror of `review-gate`**. The reviewer's manual defines what a good PR carries; this skill builds one that satisfies it *by construction*, so review is a confirmation, not a repair. Do not invent a second standard — when in doubt, defer to `review-gate` and `multica-teamwork`'s PR rule (title = conventional commit; body = what/why, evidence, risk, docs).

## Hard rule — PRs are public, agent handles must not leak

**A PR title or body must never contain an agent `@mention` or a `mention://` link.** PRs are public artifacts; internal agent handles and Multica mention URLs do not belong in them. This is load-bearing (`platform-trust`), not a style nit.

- Routing another agent for review/sign-off happens **on the Multica issue** (`multica issue comment add … [@warden](mention://agent/…)`), never in the PR. The PR references *work* (issue identifiers like `INK-23`, commit SHAs, file paths) — never *people by handle*.
- Plain GitHub `@username` handles for real humans that GitHub itself expands are a separate thing, but **do not add them speculatively** — and never an agent handle dressed as one.

### Pre-post check (mandatory — run before `gh pr create`)

Scan the fully drafted title **and** body. If either matches, **stop and fix** — strip the handle/link or rephrase to reference the issue/SHA instead — then re-scan. Do not create the PR until the scan is clean.

```bash
# Draft title+body into files first, then:
grep -nE '@[A-Za-z0-9_-]+|mention://' pr-title.txt pr-body.md && {
  echo "LEAK: @handle or mention:// found in PR — strip before creating."; exit 1
} || echo "clean"
```

A hit is a hard reject, not a warning. The most common source is copy-pasting a Multica comment (which *does* carry mentions) into the PR body — rewrite it, don't paste it.

## Before you draft — the gate the PR must already pass

Author these into the branch *first*; the PR only describes them:

1. **Surgical diff.** Every changed line traces to the issue. No drive-by reformatting, no adjacent "improvements", no unrelated dead-code deletion. Orphans your change creates ARE cleaned up.
2. **Changeset.** Present for every affected **published** package, at the correct bump level (`pnpm changeset`). Ignore-listed: `website`, `@inkline/components` — but a component change ships through the framework packages, so it needs a changeset for **each affected `@inkline/<framework>`**. Semver: new API = minor; observable output/type change ≠ patch; breaking (removed exports/subpaths, IR schema, prop/axis renames) = major + migration note + Alex sign-off.
3. **Docs fresh.** Any API/behavior change updates its `AGENTS.md` / docs / compiler-README in the same PR. Stale docs = `review-gate` requests changes.
4. **Verified.** Ran the issue's Verify block and your VERIFY (`vp run ready` or the scoped equivalent). You have real output to paste — not "tests pass".
5. **Conventions.** Conventional-commit title with package scope; `vp check` clean (mind the known noise baselines); tests colocated; no hand-edits under `.inkline/`, `.styleframe/`, `dist/`, `.old/`.

## The fixed skeleton

Every PR body uses exactly these four sections, in this order:

```markdown
## Summary
One or two sentences: what changed and why. Reference the issue by identifier (e.g. INK-23) — not by any agent handle.

## Changes
- Bulleted, per-area. Each bullet traces to the issue.
- Note the changeset(s) added and their bump level, or state why none is required (ignore-listed package).

## Verification
Paste the actual command output (test/build), not a claim. Note which paths were exercised (CLI vs plugin, per-target) when relevant.

## Notes
Risk, blast radius, breaking-change migration note (if any), and anything deferred as out of scope. "None." is a valid body.
```

Title: `type(scope): imperative summary` — e.g. `docs(skills): add create-pr authoring skill`.

## Worked example

Title:

```
feat(react): forward aria-label on Button root
```

Body:

```markdown
## Summary
Button dropped `aria-label` on the emitted root, breaking icon-only buttons for
screen readers (INK-118). Forward it through to the root element.

## Changes
- ui/components: pass `aria-label` from props to the root node in `button.ink.tsx`.
- Added `button.ink.test.ts` case asserting the attribute reaches the DOM (fails without the fix).
- Changesets: minor for each affected @inkline/<framework> (react, vue, svelte, …) —
  emitted output changed, so this ships through every framework package at a consistent bump.

## Verification
$ vp test --filter @inkline/components button
  ✓ forwards aria-label to root (real-DOM mount)
  32 passed
$ vp check
  clean (baseline TS17004 fixture noise only)

## Notes
No API surface change; additive behavior. No migration needed.
```

Note what the example does **not** contain: no `@warden`, no `mention://` anywhere. Review routing for this PR is requested on issue INK-118 with a Multica comment, not in the PR.

## After creating

- Request review **on the Multica issue** — mention **@warden** (and **@gauntlet** if you make a perf/fix claim). That mention lives in the issue comment, never in the PR.
- Keep the PR small. If it grew past the issue, split it.
- Never merge unreviewed; never push to `main`; never publish.
