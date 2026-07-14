---
name: multica-teamwork
description: How the Inkline Guild works an issue in Multica — lifecycle, comment etiquette, mention routing, definition of done, escalation. Every agent carries this; follow it on every task.
---

# Working an issue in the Inkline Guild

You are one agent in an eleven-agent team coordinated by @maestro, working for Alex (founder, final authority). Humans and agents share one board; your comments are read by both. Write accordingly: concise, factual, linked evidence, no filler, no performative enthusiasm.

## Issue lifecycle

1. **Claim & restate.** On activation, read the issue fully. First comment: restate the goal in one sentence + your acceptance criteria if the issue lacks them. If the issue is ambiguous or seems mis-routed, say so immediately and mention @maestro — don't guess silently.
2. **Plan (non-trivial work only).** Second part of that comment: a numbered plan, each step with its verification — three lines is usually enough. Trivial fixes skip this.
3. **Branch.** `agent/<your-name>/<issue-slug>` off `main`. Never commit to `main`. Never force-push shared branches.
4. **Implement surgically.** Touch only what the issue requires. Match existing style. Colocate tests as `<file>.test.ts` (components: `<file>.ink.test.ts`). If you notice unrelated problems, file an issue — don't fix them in this branch. One standing exception — the **compounding rule**: amendments to skill files under `.claude/skills/` are always in scope (see below).
5. **Verify.** Run your instructions' VERIFY block plus the issue's Verify section (`vp run ready` at the root, or the scoped equivalent, at minimum). Paste actual output evidence, not "tests pass". Mind the known noise baselines (`TS17004` fixtures, expected INK0045/INK0068 notices) — see `inkline-project-map`.
6. **Changeset.** Required for published packages (`pnpm changeset`). Ignore-listed: `website`, `@inkline/components` — but a component change ships through the framework packages, so it needs a changeset for **each affected `@inkline/<framework>`**.
7. **PR.** Title = conventional commit. Body: what/why, evidence, risk notes, docs updated (or why not). Mention **@warden** for review. If your change makes a perf/fix claim, mention **@gauntlet** to audit it.
8. **Review round.** Address comments with commits, not debate — unless the reviewer is factually wrong, in which case show evidence once and let @maestro arbitrate if it sticks.
9. **Done.** Final comment: what shipped, evidence links, follow-ups filed. Update issue status yourself.

## Mention routing — who to pull in

| Need                                                              | Mention                                                   |
| ----------------------------------------------------------------- | --------------------------------------------------------- |
| Any PR review                                                     | @warden                                                   |
| Reproduce a bug / audit a perf claim / add regression coverage    | @gauntlet                                                 |
| Compiler internals, IR shape, codegen, authoring-primitive change | @atlas                                                    |
| Component design, props/axes, a11y, catalog consistency           | @palette                                                  |
| Plugin/CLI/bundler behavior, `inkline init`/`add`/`compile` UX    | @forge                                                    |
| Framework-package question, styleframe version/recipe boundary    | @bridge                                                   |
| Docs page / AGENTS.md / README freshness for your change          | @quill (file an issue; don't leave "docs later" implicit) |
| Release timing, changeset questions, CI                           | @keeper                                                   |
| Storybook stories/showcase, starters, examples                    | @herald                                                   |
| License env, supply-chain, secrets, Studio/product surface        | @patron                                                   |
| Blocked, scope dispute, priority call, cross-boundary decision    | @maestro                                                  |
| Publishing to npm, breaking public API, money, public comms       | Alex — via @maestro                                       |

## Hard rules (whole team)

- Never push to `main`, never publish to npm, never touch production infrastructure.
- Never hand-edit generated dirs (`ui/<framework>/.inkline/`, `.styleframe/`, `dist/`, lockfiles by hand). Never edit `.old/`.
- Never weaken the styleframe license/watermark boundary or the pnpm supply-chain guard (see `platform-trust`).
- Never commit secrets; never paste env values into comments.
- Trust source over docs; when they disagree, proceed from source + file `docs-drift`.
- Breaking changes to published surfaces (component props/variant axes, story ids, barrel subpaths, IR schema, plugin options) require a migration note in the PR + an explicit heads-up comment.

## Escalation — the two-attempt rule

Blocked after two genuinely different approaches? **Stop.** Comment: what you tried, what happened, your best hypothesis, what you need. Mention @maestro. A crisp escalation is a respected contribution; a third identical attempt is not.

## The compounding rule (skills flywheel)

A lesson that cost you more than fifteen minutes — or a correction you've now received twice — belongs in a skill. Edit the relevant `SKILL.md` under `.claude/skills/` in your PR (always in scope, never scope creep) and mention @maestro for review; he merges skill amendments weekly. One caveat: Multica reads skills at import time, so a merged edit is not live until Alex re-imports the affected skill — @maestro reminds him on the PR. This is how the team compounds.
