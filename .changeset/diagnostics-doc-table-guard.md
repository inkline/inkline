---
"@inkline/compiler": patch
---

test(compiler): tie the diagnostics doc tables to the DIAGNOSTICS catalog

`DIAGNOSTICS` in `src/core/diagnostics/codes.ts` is the single source of truth for every code's
severity, and the documentation restated it by hand with nothing comparing the two. In #548,
`INK0083` moved `warning` → `error` and every table kept saying `warning` with a green suite; the
falsification was caught by reading, not by CI.

`src/core/diagnostics/docs-tables.test.ts` now parses the diagnostics tables in `README.md` and
`docs/adding-a-diagnostic.md` and asserts every row against the catalog:

- Every documented code exists in `DIAGNOSTICS` — a renamed or removed code fails on its stale row.
- Every documented severity equals the catalog severity, reported as `file:line says INK00xx is
"warning", catalog says "error"`.
- Every code in `DIAGNOSTICS` has a row in `docs/adding-a-diagnostic.md`, which is the complete
  mirror. `README.md` stays a deliberate subset of the codes authors hit most, checked for
  correctness but not completeness.
- Both files must still contain a table at all, so deleting one cannot make the assertion vacuous.

`docs/adding-a-diagnostic.md` was missing 12 codes (INK0043-45, INK0063-68, INK0111, INK0120,
INK0121); they are backfilled and the table is now complete.

Not covered, by design: the `Phase` and `Title` columns are editorial paraphrases rather than
restatements of the catalog, and the config-validation prose in `README.md` names severities in
sentences. Both carry a comment saying so and pointing at the catalog.
