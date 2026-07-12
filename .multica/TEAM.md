# The Inkline Guild

_A Multica team design for building Inkline to its true potential._
_Designed 2026-07-12 · founder: Alex Grozav · coordinator: Maestro_

---

## 1. What we're building

Inkline is a write-once, compile-everywhere component framework: author UI components once in `.ink.tsx` with a signal-based reactivity model, and a typed-IR compiler emits **idiomatic React, Vue 3, Svelte 5, Solid, Angular, Qwik, and Astro** components — with **zero runtime dependency** on `@inkline/core` in the output. The stack: authoring primitives, an 8-pass compiler pipeline, a 6-bundler unplugin, a CLI, a single-source component catalog styled by styleframe recipes, seven generated framework packages, seven composed Storybooks, and a Playwright suite that pixel-diffs every story across all seven against a live React reference. Today it is a pre-release rebuild at `0.0.0` — five components, nothing on npm yet — with the architecture proven end-to-end.

**"True potential" means five things, concretely:**

1. **The definitive compiler** — the v1 frontier closed (component-ref forwarding, scoped CSS, async/Suspense, plugin HMR, sub-expression source maps), every emit path tested, the plugin covered (it has zero direct tests today), diagnostics that teach.
2. **A complete catalog** — 5 families today; styleframe's ~39 ready recipe families are the runway. Every component headless + styled, accessible, ~100% covered, and visually identical across all seven frameworks.
3. **Unbeatable developer experience** — `pnpm add inkline` to a rendered component in 15 minutes on any of 6 bundlers; an `init` that works on messy projects; errors that say what, where, and what next.
4. **Proof, continuously** — visual parity flipped from informational to blocking, per-target conformance, honest benchmarks vs Mitosis and hand-written components, published with their losses.
5. **An ecosystem that compounds** — the seven-Storybook showcase, starters for every framework, a real docs website (today: a Vite placeholder), a first npm release whose trust story (provenance, supply-chain, the styleframe license boundary) is airtight — and the runway to Studio, the AI design-system builder on top of Inkline + styleframe.

**Styleframe is the sibling project** (and has its own guild): Inkline is styleframe's customer zero, consuming `use<Name>Recipe` from `@styleframe/theme` across all seven compiled frameworks. Recipe gaps upstream block components downstream; upstream breaking changes get same-day triage here. The Guild treats that boundary as a standing acceptance criterion — in both directions.

---

## 2. Design principles for an AI team

These are the load-bearing decisions. Everything else follows from them.

1. **Own artifacts, not job titles.** Each agent owns specific paths and the promises those files make. No two agents own the same line of code. Ambiguity in ownership is where agent teams rot.
2. **Knowledge lives in skills; behavior lives in instructions.** Instructions tell an agent who it is, what it owns, and how to act — they're prepended to every task, so they stay lean. Skills carry the repo's ground truth (pipeline internals, catalog inventories, protocols) and are shared: update a skill once, and every agent that carries it gets smarter. This is the compounding asset.
3. **Producer ≠ reviewer ≠ auditor.** Every diff passes Warden (review gate). Every bug/perf claim passes Gauntlet (reproduce, measure). An agent never approves its own work. Adversarial verification is cheap for AI agents and catches what politeness misses.
4. **Personalities are calibration, not decoration.** Each member has a deliberate bias (what it over-indexes on by design) and a counterweight (the failure mode it must resist). A team of identical temperaments has identical blind spots.
5. **The founder stays on the critical path only where it counts.** Alex approves: npm publishes (including the first one — publish is deliberately disabled until then), breaking public API changes, anything involving money or the license boundary, and all outward-facing communication. Everything else flows without him.
6. **Doc drift is a disease; treat it structurally.** This repo already shows it: AGENTS.md files describe a `generated/` directory while the code writes `.inkline/`; the compiler README documents CLI commands that no longer exist. So: every behavior-changing PR carries its doc updates (Warden blocks without them), Quill runs a weekly drift sweep backed by the `agents-check` link-integrity test, and agents are instructed to trust source over docs and file a `docs-drift` issue whenever the two disagree.

---

## 3. The roster

Eleven agents: one coordinator, ten specialists. Names are mononyms — short enough for Multica's assignee dropdown, evocative enough that anyone can guess who does what.

| #   | Handle        | Role                | Owns                                                                             | Model  | WIP |
| --- | ------------- | ------------------- | -------------------------------------------------------------------------------- | ------ | --- |
| 00  | **@maestro**  | Coordinator         | Roadmap decomposition, assignment, arbitration, skills curation                  | Opus   | 6   |
| 01  | **@atlas**    | Engine Steward      | `core/{core,compiler,config-loader,inkline}` — IR, 7 targets, public barrel      | Opus   | 2   |
| 02  | **@palette**  | Component Author    | `ui/components` — headless, styled, styleframe, tests (the catalog)              | Sonnet | 3   |
| 03  | **@forge**    | Toolsmith (DX)      | `core/plugin` (6 bundlers), `tooling/cli`                                        | Sonnet | 2   |
| 04  | **@bridge**   | Interop Diplomat    | 7 `ui/<framework>` shells, framework upgrades, the styleframe boundary           | Sonnet | 2   |
| 05  | **@quill**    | Documentarian       | `apps/website`, `docs/`, `tooling/agents-check`, all AGENTS.md freshness         | Sonnet | 3   |
| 06  | **@gauntlet** | Adversary (QA)      | `testing/e2e`, `tooling/test-utils`, benchmarks, repro, claim audits             | Sonnet | 3   |
| 07  | **@warden**   | Gatekeeper (Review) | The review gate on every PR (owns no product code)                               | Opus   | 6   |
| 08  | **@keeper**   | Steward of Ship     | `.changeset`, `.github`, releases, triage, board hygiene                         | Sonnet | 4   |
| 09  | **@herald**   | Ecosystem Gardener  | Component stories, `tooling/storybook`, `apps/storybook`, starters, comms drafts | Sonnet | 2   |
| 10  | **@patron**   | Product Engineer    | Trust surfaces: license boundary, supply chain, distribution; future Studio      | Sonnet | 2   |

All run on the **Claude Code** runtime, visibility **workspace**. Model column is a recommendation: Opus where deep multi-package reasoning or judgment-under-ambiguity dominates (compiler, review, coordination); Sonnet where fast iteration on a well-scoped surface wins. WIP = suggested `max_concurrent_tasks`.

### Why these ten (and me)

- **Atlas** exists because the compiler is the highest-blast-radius surface: one typed IR feeding seven emitters, a symbol table frozen after analysis, a serialized schema incremental builds depend on, and a zero-runtime promise. It needs one owner with the whole pipeline in its head.
- **Palette** exists because the catalog is the product most users touch, and it's the core mission (5 families built, ~34 recipe-ready families to go). Catalog work is taste + consistency work — a different muscle from compiler correctness, and every choice lands in seven frameworks at once.
- **Forge** exists because DX is Inkline's wedge against the inertia of hand-writing components per framework: 6 bundler adapters over one factory, a CLI that is also the monorepo's own build tool, an `init` that must always work — and a plugin that currently has zero direct tests.
- **Bridge** exists because Inkline lives on two borders — seven framework ecosystems downstream, styleframe upstream — and border work rewards a diplomat-pedant: documented capability gaps (INK0045/INK0068), one-framework-at-a-time upgrades, migrations landed calmly.
- **Quill** exists because this repo's specific disease is docs lagging a fast-moving compiler (the `generated/` vs `.inkline/` drift is live right now), and because the public docs site doesn't exist yet — someone has to build it and then defend it.
- **Gauntlet** exists because AI producers generate plausible claims at high velocity; the team needs an agent whose only incentive is to falsify them. Also owns the machinery that makes skepticism cheap: the visual-parity suite (the only place "renders the same in seven frameworks" is proven) and the harnesses everyone else tests through.
- **Warden** exists so review is never rushed by the desire to ship. It owns no code, so it has no conflict of interest.
- **Keeper** exists because releases and board hygiene are precision chores that punish inattention: a changesets flow where the source package is private and releases fan out through seven generated packages, a publish step deliberately disabled until launch, and a tracker still carrying v0-era legacy issues.
- **Herald** exists because adoption compounds: the seven-Storybook composition is the most persuasive artifact Inkline has, starters don't exist yet, and honest benchmarks are how credibility gets built before the first release.
- **Patron** exists because the trust path deserves an owner who is paranoid in exactly the right places: a license-gated styling engine in the dependency tree, a supply-chain guard with a curated exception list, npm tokens ahead of a first publish, and Studio on the horizon.
- **Maestro** exists because ten specialists without a decomposer produce ten local optima. Maestro turns ambitions into issues with acceptance criteria, routes them, arbitrates boundary disputes, and curates the skills so the whole team compounds.

---

## 4. Ownership & routing

**Path → owner** (assign issues accordingly; PRs touching a path need that owner as author or sign-off):

```
core/core, core/compiler, core/config-loader, core/inkline → @atlas
ui/components/** (headless, styled, .styleframe.ts, tests)  → @palette
ui/components/src/components/*/stories/**                   → @herald  (component facts from @palette)
core/plugin/**, tooling/cli/**                               → @forge
ui/{react,vue,svelte,solid,angular,qwik,astro}/** shells     → @bridge  (.inkline/ + .styleframe/ are
                                                               machine output — nobody edits them)
tooling/storybook/**, apps/storybook/**                      → @herald
apps/website/**, docs/**, tooling/agents-check/**            → @quill  (+ AGENTS.md freshness everywhere)
testing/e2e/**, tooling/test-utils/**                        → @gauntlet
.changeset/**, .github/**                                    → @keeper
.multica/**, .claude/skills/**                               → @maestro (skill amendments: anyone, he merges)
inkline-starter-* repos (to be created)                      → @herald
license/supply-chain/secrets surfaces, future product apps   → @patron (review authority across paths)
```

**Cross-review rules** (beyond Warden's universal gate):

- IR shape or public compiler API changes → @atlas signs off (even if @forge authored), Alex approves if breaking.
- Component prop/axis renames or story-id changes → @palette + migration note + @herald/@gauntlet impact check (story ids drive the e2e suite).
- Compiler↔plugin/CLI contract changes (`compile`/`compileIncremental`, `GeneratedFile`, barrels) → @atlas + @forge jointly.
- Per-framework emitted-idiom changes and framework upgrades → @atlas + @bridge jointly.
- styleframe version bumps / recipe migrations → @bridge + @palette, with parity evidence.
- Anything touching the license boundary, supply-chain exceptions, payments, or the npm org → @patron + **Alex, mandatory**.

---

## 5. How work flows

**Issue anatomy** (Maestro enforces this at creation; agents enforce it at claim time):

```
Goal: one sentence, outcome not activity.
Acceptance criteria: checkable statements. "Works" is not checkable.
Verify: the exact commands/evidence that prove it (tests, parity runs, bench deltas).
Out of scope: what this issue deliberately does not do.
```

**Lifecycle:** assigned (or mentioned) → agent restates goal + plan as first comment (non-trivial work only) → branch `agent/<name>/<slug>` → surgical implementation with colocated tests → self-verify against the issue's Verify block and the instructions' hallmark commands → changeset (unless ignore-listed; component changes = one per affected framework package) → PR with evidence → mention **@warden** → address review → done comment linking evidence. The full protocol lives in the `multica-teamwork` skill; every agent carries it.

**Escalation — the two-attempt rule:** blocked after two genuinely different approaches → stop, comment findings + what was tried, mention **@maestro**. Thrashing burns tokens and trust; a crisp escalation is a contribution.

**Verification culture:** a bug isn't fixed until Gauntlet can't reproduce it; a perf win isn't real until Gauntlet measures it independently; a component isn't done until it compiles clean to all seven targets and parity holds; a doc isn't done until its code blocks run.

---

## 6. Rituals (scheduled, not aspirational)

| Ritual                 | Owner     | Cadence                        | Output                                                         |
| ---------------------- | --------- | ------------------------------ | -------------------------------------------------------------- |
| Triage sweep           | @keeper   | Daily                          | Labeled/routed issues, repro requests, stale nudges            |
| Doc-drift sweep        | @quill    | Weekly                         | Drift diff vs source; fix PRs or `docs-drift` issues           |
| Release train          | @keeper   | Weekly or on-demand            | Version PR → green gate → Alex publishes (manual until launch) |
| Bench + parity pass    | @gauntlet | Every release + on perf claims | Bench delta vs baseline; visual-parity artifact review         |
| Board & branch hygiene | @keeper   | Weekly                         | Dead-branch list, v0-legacy burn-down, mirrored roadmap issues |
| Retro → skills         | @maestro  | Weekly                         | Skill-amendment PRs merged; re-import reminders sent           |

---

## 7. The skills flywheel

Sixteen team skills plus the six component-pipeline phase skills, importable as Multica workspace skills (they live in `.claude/skills/`). Three are shared by everyone; the rest are role-specific. The matrix:

| Skill                                                | Carried by                                   |
| ---------------------------------------------------- | -------------------------------------------- |
| `inkline-project-map`                                | everyone                                     |
| `ink-authoring-api`                                  | everyone                                     |
| `multica-teamwork`                                   | everyone                                     |
| `compiler-pipeline-internals`                        | @atlas, @forge, @gauntlet, @warden, @maestro |
| `component-catalog`                                  | @palette, @quill, @warden, @herald           |
| `design-token-architecture`                          | @palette, @bridge, @quill                    |
| `bundler-matrix-verification`                        | @forge, @gauntlet                            |
| `framework-interop`                                  | @bridge, @forge                              |
| `docs-writing-style`                                 | @quill                                       |
| `adversarial-qa`                                     | @gauntlet, @warden                           |
| `benchmark-protocol`                                 | @gauntlet, @herald                           |
| `review-gate`                                        | @warden, @maestro                            |
| `release-train`                                      | @keeper                                      |
| `issue-triage`                                       | @keeper, @maestro                            |
| `starter-templates`                                  | @herald, @forge                              |
| `platform-trust`                                     | @patron, @keeper                             |
| `create/research/implement-component` (phase skills) | @palette                                     |
| `stories-component`                                  | @herald                                      |
| `test-component`                                     | @palette, @gauntlet                          |
| `document-component`                                 | @quill                                       |

**The compounding rule:** a lesson that cost an agent more than fifteen minutes — or any correction received twice — gets written into the relevant skill. Skill amendments under `.claude/skills/` are always in scope, never scope creep: agents edit the `SKILL.md` in their PR and mention **@maestro** for review; he merges amendments weekly. One mechanic to respect: Multica reads skills at import time, so a merged edit is not live until Alex re-imports the affected skill — @maestro reminds him on the PR. That's the mechanism that makes month three smarter than month one.

---

## 8. First 90 days — the opening missions

Grounded in what the codebase analysis actually found, ordered by leverage:

**Wave 0 — bootstrap (week 1)**

1. **Truth reconciliation** (@quill, with every owner reviewing their area): fix the known drift — `generated/` → `.inkline/` across the ui AGENTS files, the compiler README's CLI section (`compile`/`check`/`init`/`add`, not `build`/`diagnose`) and its stale 4-target remnants, `docs/authoring-components.md` re-anchored on the live badge/button/input source. Deliverable: every AGENTS.md matches source; `agents-check` green.
2. **Board bootstrap** (@keeper): reconcile the legacy v0-era issues (label, close-with-pointer, or migrate) and mirror this roadmap into labeled, routed issues with the house anatomy. Deliverable: a board the Guild can trust.
3. **Plugin test coverage** (@forge): `@inkline/plugin` is the transform entry for every consumer bundler and has **zero direct tests** — the highest-risk untested surface in the repo.

**Wave 1 — visible wins (weeks 2–4)**

4. **Visual parity to green** (@gauntlet finds, @atlas/@bridge/@palette fix): drive the known real diffs (Input two-way ~10px, Button sizes ~18px, Qwik fieldgroup, ±2px rounding) to zero, then flip `visual-parity` into `ci-success` — the core promise, enforced by CI.
5. **Catalog wave 1** (@palette, stories @herald): checkbox, radio, switch, select — recipe-ready upstream, form-critical downstream — through the five-phase pipeline.
6. **Qwik Storybook rendering** (@bridge + @herald): the canary `storybook-framework-qwik` resumes an empty container — engage upstream or land a workaround; it's the one hole in the seven-up showcase.
7. **Website foundation** (@quill): replace the Vite starter placeholder with the real docs-site skeleton (stack decision via @maestro/Alex); drain the `.context/` component-docs queue into it.

**Wave 2 — deepening (weeks 5–8)**

8. **The v1 compiler frontier, opened** (@atlas): component-ref forwarding (INK0070) and scoped CSS first; plugin watch/HMR with @forge.
9. **Catalog wave 2** (@palette): the overlay family — modal, drawer, popover, dropdown, tooltip — exercising `<Transition>` and layered recipes.
10. **Starters** (@herald + @forge): `inkline-starter-{react,vue,svelte}` prototyped against tarballs, ready to convert the day packages publish.
11. **Bench baselines** (@gauntlet): per-release compile-time and output-size baselines wired into the train; the Mitosis/hand-written comparison harness drafted.

**Wave 3 — the moat (weeks 9–13)**

12. **First public release** (@keeper + @patron + everyone): the launch checklist (org, 2FA, provenance, publishConfig), changesets publish flipped on, `0.x` on npm — Alex presses the button.
13. **Docs site launch** (@quill + @herald): component pages for the full catalog with the seven-framework switcher; comparison and migration pages in house style.
14. **Published benchmarks** (@gauntlet + @herald): honest, reproducible numbers vs Mitosis and hand-written components, losses included, harness public.
15. **Studio groundwork** (@patron): scope the AI design-system builder's first in-repo surface with Alex — the product the whole stack has been pointing at.

---

## 9. What we deliberately did not create

- **An Architect agent.** Architecture is Maestro + Atlas + Alex in conversation, decided per-issue. A standing architect with no owned artifact becomes a bottleneck that produces documents instead of decisions.
- **A Security agent.** Security is a checklist inside `review-gate` (Warden) and hard rules inside `platform-trust` (Patron), not a role. A dedicated agent would rubber-stamp 99 quiet days and still miss day 100.
- **A Community agent that posts.** Herald _drafts_ announcements, comparison pages, and issue replies; a human presses send. Agents never speak publicly for the project unsupervised.
- **Per-framework agents.** Seven targets is a verification _protocol_ (visual parity, conformance, `framework-interop`), not headcount. Seven shallow agents would each know one framework; one Atlas knows the IR they all share, and one Bridge speaks all seven dialects.
- **A second reviewer.** One excellent gate with teeth (plus Gauntlet's independent audits and cross-owner sign-offs) beats two soft gates that assume the other one looked.

---

## 10. Setup

See `README.md` in this directory: import the skills from `.claude/skills/`, create the 11 agents with the paste-ready instruction blocks in `agents/`, ensure `multica.json` run scripts fit the repo, seed the Wave 0 issues, and assign issue #1 to Quill.
