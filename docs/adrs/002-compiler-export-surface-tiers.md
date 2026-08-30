# ADR-002: Tier the `@inkline/compiler` export surface via subpath exports

Date: 2026-07-29 · Status: Accepted
Deciders: Project owner · Informed by: internal tracker UXF-91 (RFC), UXF-71 finding #15 (friction audit), UXF-144 (this record)
Supersedes: — · Superseded by: —

Resolves one of the two items [ADR-001](./001-compiler-dx-invests-in-diagnostics.md) left explicitly
undecided ("Narrowing the compiler's public export surface").

## Context

[`core/compiler/src/index.ts`](../../core/compiler/src/index.ts) re-exports essentially the whole
compiler. Alongside the handful of names a normal consumer needs — `compile`, `defineConfig`,
`Diagnostic`, the target registry — it re-exports the full render IR, the full Code IR, the symbol
table, the transform and serialization entry points, and every built-in target. Autocompleting
`import { … } from "@inkline/compiler"` buries the real entry points, and every name in that list is
something a plugin author can reasonably read as supported.

**Correcting the audit's number.** The parent friction audit (UXF-71 finding #15) estimated "roughly
ninety internal names." The actual count, taken from `index.ts` on 2026-07-28, was **158 exported
names across 40 export statements**. The audit's figure is wrong and this record is what fixes it.
Re-counted on 2026-07-29 while filing: **160** — three commits landed on `index.ts` within 24 hours
of the census (`8480e72d0`, `65c9f94a2`, `a2bd7688c`), two of which widened the surface. The surface
grows on its own; that is part of why the decision was taken now rather than queued.

**The forcing fact: the package has never been published.** `npm view @inkline/compiler` returned
**404** on both 2026-07-28 and 2026-07-29 (re-verified at filing time). It is not private —
`publishConfig.access` is `public` and there is no `private: true` — it is intended to publish and
has not yet. Local versions are `0.0.0`; the `v4.x` git tags belong to the Vue-era Inkline, a
different package lineage.

This is the fact that made the decision cheap, and it is the fact a future reader will not be able to
reconstruct, because **it stops being true the moment the package ships**. There were zero external
consumers, by construction. There was no semver break to pay, no deprecation cycle, and an empty
migration note. The usual framing — "narrowing a public export surface is semver-major, weigh it
carefully" — was simply not in force. It becomes true at the first `npm publish`, and 79 changesets
are queued behind that publish.

**What the internal census showed (verified).** Grepping every import form across `ui/`, `core/`,
`tooling/`, `apps/`, `docs/`, and `testing/`: 42 files reference the package, and **22 of 158 names
(14%) have a cross-package importer. 136 have zero.** Zero importers for the entire render IR, the
entire Code IR, `SymbolTable`, `transform`, `serializeModule`, `definePlugin`, `defineTarget`,
`createRegistry`, and all seven built-in targets.

One structural detail cuts both ways: `core/inkline/src/compiler.ts` is a single
`export * from "@inkline/compiler"`, so the meta-package re-exports all of them at
`inkline/compiler`. That widens the surface on paper — and it means any narrowing propagates with no
edit to that file.

**The "advanced authors need this" justification did not survive reading the extension points.**
`TargetName` is a closed string-literal union of the seven built-ins
([`core/compiler/src/codegen/context.ts`](../../core/compiler/src/codegen/context.ts)), and
`Target.name: TargetName`, so an external `defineTarget({ name: "lit" })` cannot typecheck. It also
cannot run: `resolveOptions` rejects any target absent from `ALL_TARGETS` (diagnostic `INK0085`,
[`core/compiler/src/core/options.ts`](../../core/compiler/src/core/options.ts)) _before_ consulting a
custom registry, so supplying your own registry does not open the door. Roughly 50 exports therefore
serve an audience that cannot exist today.

Plugins are the opposite case. `config.plugins` is genuinely honoured and `Plugin.name` is a free
string, but that surface is **leaky rather than wide**: the `ir:post` hook hands the author an
`AnalyzedModule` whose `.graphs` is `ReadonlyMap<string, ReactivityGraph>`, and `ReactivityGraph` is
not exported at all. A plugin author cannot name the type of a field they are handed. The IR tier
needed curating, not deleting.

**Options that were live.** The RFC ranked four and steelmanned each: (A) a single narrowed entry;
(B) subpath exports; (C) an `unstable_` prefix or `internal` namespace; (D) leave as-is and document
the tiers. C lost on tree-shaking reliability, inability to version a tier independently, and being
the most expensive option to reverse. D lost because the friction is an _editor_ problem that
documentation does not reach, because reframing ~1,411 lines of `docs/api-reference.md` is effort
comparable to the code change, and because it is the only option that spends the free window without
buying anything.

**A was the real contender, and the hinge was a product question, not a technical one.** A has the
same zero-edit property as B, a cleaner story, and a smaller maintenance surface. It loses only if
external plugins are in scope, because A deletes the IR types outright and makes the `ir:post` hook
unusable from outside the repo. The RFC put that question to the Operator explicitly — _are external
compiler plugins in scope for v1?_ — and stated that a "no" flips the recommendation to A. The
Operator answered **B**, which selects "yes" on plugin scope. That is the hinge.

## Decision

We will split `@inkline/compiler` into three export tiers, expressed as subpath exports, before the
first `npm publish`:

1. **Root (`@inkline/compiler`) — supported.** The ~22 names with a verified cross-package importer
   plus their obvious peers (~30 total). This is the public API and carries normal stability
   expectations.
2. **`@inkline/compiler/ir` — plugin-author API, semi-supported.** Render IR types, builders,
   visitors, `transform`, `serialize`, `migrate`, `SymbolTable`, and `ReactivityGraph` — the last of
   these added specifically to close the `ir:post` leak.
3. **`@inkline/compiler/codegen` — explicitly unstable.** Code IR, the `Target` contract, `print`,
   the registry, and the built-in targets. Marked unstable in the docs and in the package, for as
   long as `TargetName` remains a closed union.

The support tier lives in the import path, where a reader sees it without consulting documentation.

Implementation is tracked separately and is **not** part of this record.

## Consequences

**Good.**

- **Zero cross-package edits.** The root tier retains every name the census found, so nothing in
  `ui/`, `tooling/`, or `core/plugin/` changes, and `core/inkline` follows automatically through its
  `export *`.
- **No migration cost, because there is nothing to migrate.** Taken before the first publish, this is
  a config-and-barrel change rather than a major version with a deprecation cycle.
- **The infrastructure already exists.** `core/compiler/vite.config.ts` already declares a multi-entry
  `pack.entry` (`index` + `testing`), and `./testing` is live precedent in `package.json#exports`. New
  subpaths are configuration lines, not new build machinery.
- Autocomplete on the root drops from ~160 names to ~30.
- The plugin extension point becomes properly typed for the first time — `ReactivityGraph` stops
  being a name plugin authors can receive but not write down.

**Bad.**

- **Blessing `/ir` as a semi-supported tier means bug reports against it.** This was named in the RFC
  and accepted deliberately, not overlooked. Publishing a tier is a promise, even a soft one: issues
  will be filed against IR shapes, and refusing them becomes a recurring judgement call rather than a
  one-line "that's internal."
- **Three entry points are more surface _area_ to maintain than one.** Each tier needs its own build
  entry, its own type surface, and its own answer to "is this stable?" A would have been strictly
  simpler.
- **The decision is contingent on a product answer that could change.** It rests on external plugins
  being in scope for v1. If that reverses, this is largely wasted structure and A becomes correct —
  see the revisit triggers.
- The `/codegen` tier ships names that no external consumer can currently use for their intended
  purpose, since `defineTarget` cannot typecheck or run from outside the repo. We are exporting an
  extension point that is not yet open, and labelling it unstable rather than withholding it.
- **The window has an edge, and missing it inverts the recommendation.** If this slips past the first
  publish, the honest answer becomes D — document the tiers and live with the wide surface — because
  past that point the cost of narrowing exceeds the cost of the friction.

**Neutral.**

- `docs/api-reference.md` needs restructuring to match the tiers regardless; the sections presenting
  IR Types, Code IR, and the Target API as first-class supported API move under their subpaths.

## Revisit triggers

Written now, before any of it ships:

- **`TargetName` opens from a closed union** — that is, external targets become able to typecheck and
  survive `resolveOptions`. The `/codegen` unstable marking exists _because_ the tier serves an
  audience that cannot exist; the moment that audience can exist, the marking and the tier's contents
  need re-examining on purpose rather than by drift.
- **External compiler plugins are dropped from scope.** That was the hinge that selected B over A.
  If the answer reverses, A becomes correct again and this ADR should be superseded rather than
  quietly stretched.
- **More than three bug reports per quarter arrive against `/ir` shapes**, or any request to treat an
  IR type as stable API. Then the semi-supported tier is being read as supported, and either the
  labelling or the tier's contents are wrong.
- **The first `npm publish` happens before this ships.** Then the free window closed, this decision
  is no longer cheap, and it should be re-argued against D at its real post-publish price rather than
  executed on the reasoning above.
- **Root-tier exports grow past ~50 names.** The census is a snapshot; `index.ts` gained two names in
  the 24 hours between census and filing. Tiering does not stop surface growth, it only makes it
  visible — if the root drifts back toward the original size, the discipline failed, not the design.

## Note

The RFC also surfaced a defect independent of this decision:
[`docs/adding-a-target.md`](../adding-a-target.md) documents an extension path that can neither
typecheck nor run from outside the repository. Tracked separately as a docs correction, explicitly
scoped to fixing the documentation rather than opening the extension point.
