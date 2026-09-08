---
"@inkline/compiler": patch
---

ci(compiler): fail a branch that claims a diagnostic code `main` already defines

Diagnostic codes are claimed when a branch is authored and merged in whatever order review
finishes, so two branches opened in the same window both take the next free number. Every existing
check is blind to this by construction: `codes.test.ts` and `docs-tables.test.ts` compare the
catalog to files in the same working tree, so neither branch can see the other. The collision
surfaced as a merge conflict, after review had passed. #617 was renumbered twice — INK0075 → INK0076
→ INK0077 — each renumber touching about eleven files plus a fresh review sweep.

`scripts/check-diagnostic-collisions.ts` runs as a new blocking CI job, **Diagnostic Codes**, and as
`pnpm --filter @inkline/compiler check:diagnostics` locally. It reads three revisions to answer two
questions that are easy to confuse:

- _What does this branch introduce?_ — `HEAD` against the merge base. Only the branch's own history
  separates a newly claimed code from an edit to one that already existed, so a severity change or a
  reworded title is not mistaken for a claim.
- _What is already taken?_ — the `origin/main` **tip**, never the merge base. The merge base is by
  definition stale on the branches this check exists for; asking it whether INK0077 is free returns
  "yes" for precisely the branch about to collide.

The failure names the code, the rule on `main` that holds it with its severity, and the lowest code
free on both sides — the renumber target.

Only a key of the `DIAGNOSTICS` object literal counts as a claim, read off the TypeScript AST rather
than by scanning for `INKxxxx`. A code named anywhere else — a `push("INK0075")` call site, a docs
table row, the `url` value, a comment — is a reference to a code someone else owns and cannot trip
the check.

Two details that would have made the job pass vacuously, both covered: on `pull_request` the job
checks out the PR head sha, because the default merge commit already contains `main` and its merge
base with `origin/main` is `main` itself; and the check refuses to run when the catalog is absent at
`HEAD` rather than reporting success on an empty set.

Not covered: stale prose references to a renumbered code, which fire inside one branch and are a
separate gap (UXF-272).
