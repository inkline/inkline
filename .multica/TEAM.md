# The Styleframe Guild

_A Multica team design for building Styleframe to its true potential._
_Designed 2026-07-11 · workspace: multica.ai/uxfront · founder: Alex Grozav · coordinator: Maestro_

---

## 1. What we're building

Styleframe is a type-safe, composable CSS-in-TypeScript engine for design systems: one shared `Root` AST authored through `styleframe.config.ts` + `*.styleframe.ts` files, transpiled into zero-runtime CSS, a ~1.4KB recipe runtime, and full type declarations, integrated into 9 bundlers, with a 39-family component recipe catalog, 300+ utilities, 23 token composables, and bidirectional Figma sync via DTCG. MIT core, paid Pro layer. Today it is a one-person tour de force at v3.x with daily velocity.

**"True potential" means five things, concretely:**

1. **The definitive engine** — at-rules (`@layer`/`@container`/`@supports`), sourcemaps, airtight tree-shaking and minification, every path tested (the loader currently has zero tests).
2. **The most complete recipe catalog in the ecosystem** — 39 families today; a full system needs toast, combobox, date-picker, data-table, command-palette, stepper, and more. Every family documented, showcased, and accessible.
3. **Unbeatable developer experience** — 15-minute time-to-first-success on any of 9 bundlers, honest HMR, error messages that teach, starters for every major framework.
4. **The bridge between design and code** — lossless DTCG round-trips (composites and booleans included), a Figma plugin designers trust, and the token foundation for the future AI design-system builder (uxfront/Studio).
5. **A business that funds the work** — Pro modules worth paying for, a licensing path that never gets in an honest user's way, and public benchmarks that earn credibility against Tailwind, Panda, and vanilla-extract.

Inkline is **customer zero**: it consumes `use<Name>Recipe` from `@styleframe/theme` across 7 compiled frameworks. Recipe gaps block Inkline components; breaking variant-axis changes break Inkline builds. The Guild treats Inkline compatibility as a standing acceptance criterion.

---

## 2. Design principles for an AI team

These are the load-bearing decisions. Everything else follows from them.

1. **Own artifacts, not job titles.** Each agent owns specific paths and the promises those files make. No two agents own the same line of code. Ambiguity in ownership is where agent teams rot.
2. **Knowledge lives in skills; behavior lives in instructions.** Instructions tell an agent who it is, what it owns, and how to act — they're prepended to every task, so they stay lean. Skills carry the repo's ground truth (pipeline internals, catalog inventories, protocols) and are shared: update a skill once, and every agent that carries it gets smarter. This is the compounding asset.
3. **Producer ≠ reviewer ≠ auditor.** Every diff passes Warden (review gate). Every bug/perf claim passes Gauntlet (reproduce, measure). An agent never approves its own work. Adversarial verification is cheap for AI agents and catches what politeness misses.
4. **Personalities are calibration, not decoration.** Each member has a deliberate bias (what it over-indexes on by design) and a counterweight (the failure mode it must resist). A team of identical temperaments has identical blind spots.
5. **The founder stays on the critical path only where it counts.** Alex approves: npm publishes, breaking public API changes, anything involving money or license enforcement, and all outward-facing communication. Everything else flows without him.
6. **Doc drift is a disease; treat it structurally.** This repo's own `theme/AGENTS.md` claimed 2 recipes while 39 families shipped. So: every behavior-changing PR carries its doc updates (Warden blocks without them), Quill runs a weekly drift sweep, and agents are instructed to trust source over docs and file a `docs-drift` issue whenever the two disagree.

---

## 3. The roster

Eleven agents: one coordinator, ten specialists. Names are mononyms — short enough for Multica's assignee dropdown, evocative enough that anyone can guess who does what.

| #   | Handle        | Role                 | Owns                                                                    | Model  | WIP |
| --- | ------------- | -------------------- | ----------------------------------------------------------------------- | ------ | --- |
| 00  | **@maestro**  | Coordinator          | Roadmap decomposition, assignment, arbitration, skills curation         | Opus   | 6   |
| 01  | **@atlas**    | Engine Steward       | `engine/*` — core AST, transpiler, loader, runtime, scanner             | Opus   | 2   |
| 02  | **@palette**  | Design System Author | `theme/*` — tokens, utilities, modifiers, elements, recipes, presets    | Sonnet | 3   |
| 03  | **@forge**    | Toolsmith (DX)       | `tooling/plugin`, `tooling/cli`, `config/*`, `apps/playground`          | Sonnet | 2   |
| 04  | **@bridge**   | Interop Diplomat     | `tooling/figma`, `tooling/dtcg` — DTCG spec, Figma sync                 | Sonnet | 2   |
| 05  | **@quill**    | Documentarian        | `apps/docs`, all `AGENTS.md` freshness                                  | Sonnet | 3   |
| 06  | **@gauntlet** | Adversary (QA)       | `testing/*` — integration, benchmarks, repro, claim audits              | Sonnet | 3   |
| 07  | **@warden**   | Gatekeeper (Review)  | The review gate on every PR (owns no product code)                      | Opus   | 6   |
| 08  | **@keeper**   | Steward of Ship      | `.changeset`, `.github`, releases, triage, board hygiene                | Sonnet | 4   |
| 09  | **@herald**   | Ecosystem Gardener   | `apps/storybook`, starter repos, examples, benchmark publishing         | Sonnet | 2   |
| 10  | **@patron**   | Product Engineer     | `apps/app`, `apps/shared`, styleframe-pro repo, license/billing surface | Sonnet | 2   |

All run on the **Claude Code** runtime, visibility **workspace**. Model column is a recommendation: Opus where deep multi-package reasoning or judgment-under-ambiguity dominates (engine, review, coordination); Sonnet where fast iteration on a well-scoped surface wins. WIP = suggested `max_concurrent_tasks`.

### Why these ten (and me)

- **Atlas** exists because the engine is the highest-blast-radius surface: one shared AST, ordering-sensitive recipe registration, a `_usage` contract that three packages depend on, and two build paths that can diverge. It needs one owner with the whole pipeline in its head.
- **Palette** exists because the catalog is the product most users touch, and it's growing fastest (~25 recipe commits recently). Catalog work is taste + consistency work — a different muscle from engine correctness.
- **Forge** exists because DX is Styleframe's wedge against Tailwind's gravity: 9 bundlers, two-faced virtual modules, HMR that must never lie, `init` that must always work.
- **Bridge** exists because design-code sync is the strategic differentiator (and the foundation for uxfront/Studio), and spec work rewards a pedant: DTCG conformance, lossless round-trips, documented deviations.
- **Quill** exists because this repo's specific disease is docs lagging a fast solo author. Docs are ~140 pages and good — they need a full-time defender to stay that way.
- **Gauntlet** exists because AI producers generate plausible claims at high velocity; the team needs an agent whose only incentive is to falsify them. Also owns the end-to-end harness (pack → fresh app → real browsers) that catches what unit tests can't.
- **Warden** exists so review is never rushed by the desire to ship. It owns no code, so it has no conflict of interest.
- **Keeper** exists because releases and board hygiene are precision chores that punish inattention (changesets ignore-list, node 22 workflow, 224 stale local branches, 10 stale issues).
- **Herald** exists because adoption compounds: starters, Storybook showcase (currently 2 of 39 families!), and published benchmarks are how 89 GitHub stars become 8,900.
- **Patron** exists because the money path (license SDK, Supabase edge functions, Polar) deserves an owner who is paranoid in exactly the right places.
- **Maestro** exists because ten specialists without a decomposer produce ten local optima. Maestro turns ambitions into issues with acceptance criteria, routes them, arbitrates boundary disputes, and curates the skills so the whole team compounds.

---

## 4. Ownership & routing

**Path → owner** (assign issues accordingly; PRs touching a path need that owner as author or sign-off):

```
engine/**                       → @atlas
theme/**                        → @palette
tooling/plugin/**, tooling/cli/** → @forge
tooling/figma/**, tooling/dtcg/** → @bridge
config/**                       → @forge
apps/docs/**                    → @quill
apps/storybook/**               → @herald   (recipe content with @palette)
apps/playground/**              → @forge
apps/app/**, apps/shared/**     → @patron   (shared layer: coordinate with @quill)
testing/**                      → @gauntlet
.changeset/**, .github/**       → @keeper
~/Workspace/styleframe-pro      → @patron   (pro theme composables: @palette reviews)
starter repos (to be created)   → @herald
```

**Cross-review rules** (beyond Warden's universal gate):

- Engine public API or AST shape changes → @atlas signs off (even if @forge authored), Alex approves if breaking.
- Recipe variant-axis renames/removals → @palette + migration note + explicit Inkline heads-up (customer zero).
- Anything touching `@styleframe/license`, watermarking, payments, pricing, or production Supabase → @patron + **Alex, mandatory**.
- Transpiler ↔ plugin contract changes (`_usage`, `ShorteningMap`, virtual-module faces) → @atlas + @forge jointly.

---

## 5. How work flows

**Issue anatomy** (Maestro enforces this at creation; agents enforce it at claim time):

```
Goal: one sentence, outcome not activity.
Acceptance criteria: checkable statements. "Works" is not checkable.
Verify: the exact commands/evidence that prove it (tests, computed-style assertions, benchmark deltas).
Out of scope: what this issue deliberately does not do.
```

**Lifecycle:** assigned (or mentioned) → agent restates goal + plan as first comment (non-trivial work only) → branch `agent/<name>/<slug>` → surgical implementation with colocated tests → self-verify against the issue's Verify block and the instructions' VERIFY commands → changeset (unless package is on the ignore list) → PR with evidence → mention **@warden** → address review → done comment linking evidence. The full protocol lives in the `multica-teamwork` skill; every agent carries it.

**Escalation — the two-attempt rule:** blocked after two genuinely different approaches → stop, comment findings + what was tried, mention **@maestro**. Thrashing burns tokens and trust; a crisp escalation is a contribution.

**Verification culture:** a bug isn't fixed until Gauntlet can't reproduce it; a perf win isn't real until Gauntlet measures it independently; a doc isn't done until its code blocks run. Producers welcome this — it's what makes "done" mean something.

---

## 6. Rituals (scheduled, not aspirational)

| Ritual                 | Owner     | Cadence                        | Output                                               |
| ---------------------- | --------- | ------------------------------ | ---------------------------------------------------- |
| Triage sweep           | @keeper   | Daily                          | Labeled/routed issues, repro requests, stale nudges  |
| Doc-drift sweep        | @quill    | Weekly                         | Drift diff vs source; fix PRs or `docs-drift` issues |
| Release train          | @keeper   | Weekly or on-demand            | Version PR → green gate → Alex publishes             |
| Benchmark run          | @gauntlet | Every release + on perf claims | Delta report vs last release + competitors           |
| Board & branch hygiene | @keeper   | Weekly                         | Dead-branch list, mirrored roadmap issues            |
| Retro → skills         | @maestro  | Weekly                         | Skill-amendment PRs merged; re-import reminders sent |

---

## 7. The skills flywheel

Sixteen skills, importable as Multica workspace skills. Three are shared by everyone; thirteen are role-specific. The matrix:

| Skill                         | Carried by                                   |
| ----------------------------- | -------------------------------------------- |
| `styleframe-project-map`      | everyone                                     |
| `styleframe-authoring-api`    | everyone                                     |
| `multica-teamwork`            | everyone                                     |
| `engine-pipeline-internals`   | @atlas, @forge, @gauntlet, @warden, @maestro |
| `recipe-authoring`            | @palette, @quill, @warden, @herald           |
| `design-token-architecture`   | @palette, @bridge, @quill                    |
| `bundler-matrix-verification` | @forge, @gauntlet                            |
| `figma-dtcg-sync`             | @bridge, @forge                              |
| `docs-writing-style`          | @quill                                       |
| `adversarial-qa`              | @gauntlet, @warden                           |
| `benchmark-protocol`          | @gauntlet, @herald                           |
| `review-gate`                 | @warden, @maestro                            |
| `release-train`               | @keeper                                      |
| `issue-triage`                | @keeper, @maestro                            |
| `starter-templates`           | @herald, @forge                              |
| `pro-platform`                | @patron, @keeper                             |

**The compounding rule:** a lesson that cost an agent more than fifteen minutes — or any correction received twice — gets written into the relevant skill. Skill amendments under `.multica/skills/` are always in scope, never scope creep: agents edit the `SKILL.md` in their PR and mention **@maestro** for review; he merges amendments weekly. One mechanic to respect: Multica reads skills at import time, so a merged edit is not live until Alex re-imports the affected skill — @maestro reminds him on the PR. That's the mechanism that makes month three smarter than month one.

---

## 8. First 90 days — the opening missions

Grounded in what the research actually found, ordered by leverage:

**Wave 0 — bootstrap (week 1)**

1. **Truth reconciliation** (@quill, with every owner reviewing their area): fix the known AGENTS.md drift — 39 recipe families not 2, the undocumented `elements/`/`states/`/`sanitize/` layers and `useGlobalPreset`/`useSanitizePreset`, the `bun` plugin adapter, the `figma export` CLI command, button's actual `neutral` default. Deliverable: every AGENTS.md matches source.
2. **Issue-tracker revival** (@keeper): the 10 open issues are months stale while the real roadmap lives in 224 branches. Mirror the active roadmap into labeled, routed issues so the Guild has a board that means something.
3. **Loader test coverage** (@atlas): `@styleframe/loader` does I/O, jiti cache invalidation, and license-gated builds with **zero unit tests**. Highest-risk untested surface in the engine.

**Wave 1 — visible wins (weeks 2–4)** 4. **Storybook catch-up** (@herald + @palette): showcase 2/39 → 39/39 recipe families, and flip the a11y addon from `todo` to failing. 5. **Docs cleanup + Elements landing** (@quill): resolve the numbering collisions/dupes in `content/docs`, land the pending Elements-section and framework-switcher changesets. 6. **Native at-rules** (@atlas): `@layer`, `@container`, `@supports` first-class (issues #15–17) — table stakes for modern CSS engines. 7. **Starter repos** (@herald + @forge): `styleframe-starter-{react,vue,svelte}` (issues #11–13), clone-to-dev under 2 minutes.

**Wave 2 — deepening (weeks 5–8)** 8. **Sourcemaps** (@atlas + @forge, issue #20): generated CSS → authoring file/line. 9. **Recipe catalog wave** (@palette): toast/notification, combobox/autocomplete, date-picker (on the calendar primitive), data-table, stepper — prioritized by what Inkline needs next. 10. **DTCG composites** (@bridge): shadows, gradients, typography composite tokens — the evaluator explicitly marks these unimplemented; booleans currently round-trip lossy. This is the fidelity ceiling on Figma sync.

**Wave 3 — the moat (weeks 9–13)** 11. **Tailwind compat mode** (@atlas + @palette, issue #21): the single biggest adoption unlock; pairs with the `tailwind-utilities` branch work. 12. **Published benchmarks** (@gauntlet + @herald): honest, reproducible comparisons vs Tailwind v4 / Panda / vanilla-extract, published with methodology. 13. **WCAG AAA color work** (@palette): the `wcag-aaa-colors` branch signal — contrast-guaranteed palettes as a headline feature. 14. **Pro momentum** (@patron): fluid-design module docs + the second Pro module (candidates: advanced theming, motion presets — Alex picks).

---

## 9. What we deliberately did not create

- **An Architect agent.** Architecture is Maestro + Atlas + Alex in conversation, decided per-issue. A standing architect with no owned artifact becomes a bottleneck that produces documents instead of decisions.
- **A Security agent.** Security is a checklist inside `review-gate` (Warden) and hard rules inside `pro-platform` (Patron), not a role. A dedicated agent would rubber-stamp 99 quiet days and still miss day 100.
- **A Community agent that posts.** Herald _drafts_ announcements, comparison pages, and issue replies; a human presses send. Agents never speak publicly for the project unsupervised.
- **Per-framework agents.** The 9-bundler matrix is a verification _protocol_ (`bundler-matrix-verification`), not headcount. Nine shallow agents would each know one adapter; one Forge knows the unplugin factory they all share.
- **A second reviewer.** One excellent gate with teeth (plus Gauntlet's independent audits and cross-owner sign-offs) beats two soft gates that assume the other one looked.

---

## 10. Setup

See `README.md` in this directory: import the 16 skills, create the 11 agents with the paste-ready instruction blocks in `agents/`, add `multica.json` to the styleframe repo, seed the Wave 0 issues, and assign issue #1 to Quill.
