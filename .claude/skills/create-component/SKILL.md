---
name: create-component
description: Build a new Inkline component end-to-end — research the API, implement the headless + styled .ink.tsx source, add Storybook stories, write cross-target tests, and finalize docs/changeset. Runs five phases in order with an approval gate and a commit after each. Use when the user wants to add a brand-new component (or take one through the full pipeline).
triggers:
  - create a component
  - new component
  - build a component
  - add a component
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
  - Agent
  - AskUserQuestion
  - WebSearch
  - WebFetch
---

# create-component — the full component pipeline

Take a component from idea to release-ready across all 7 Inkline frameworks. This skill **orchestrates** five focused phase skills; it does not duplicate their detail. For each phase you **Read that phase's `SKILL.md` and execute its steps at full depth**, then stop at the gate.

Each phase skill is also invocable on its own (e.g. `/stories-component` to add stories to an existing component). This orchestrator is for building a new one start-to-finish.

## Working agreement (applies to every phase)

- **Approval gate between phases.** Finish a phase, present the result, and **wait for an explicit green-light** before starting the next. Never run the whole pipeline unattended.
- **Commit after each phase that produces committable files**, with a conventional-commit message scoped `components`. **Never push.** (If the current branch is `main`, create a feature branch first.)
- **~100% test coverage** by the test phase, with the coverage report shown at that gate.
- Tooling is **Vite+ / OXLint / Oxfmt** (`vp …`), never ESLint/Prettier. Tests are colocated `<file>.ink.test.ts`.
- **Never hand-edit** generated output (`ui/<framework>/.inkline/`, `.styleframe/`) or `.old/`. Author only in `ui/components/src/`.
- **Anchor on live source, not prose.** The exemplars (`badge`/`button`/`input`) and `inkline.config.ts` are canonical; `docs/authoring-components.md` has drifted.

## Phases

| #   | Phase     | Skill file                                    | Output                                        | Commit on pass                          |
| --- | --------- | --------------------------------------------- | --------------------------------------------- | --------------------------------------- |
| 1   | Research  | `.claude/skills/research-component/SKILL.md`  | `.context/component-<name>-spec.md`           | — (spec is gitignored)                  |
| 2   | Implement | `.claude/skills/implement-component/SKILL.md` | headless + styled + `.styleframe.ts` + export | `feat(components): add I<Name>`         |
| 3   | Stories   | `.claude/skills/stories-component/SKILL.md`   | `defineStories` meta + render helpers         | `feat(components): add I<Name> stories` |
| 4   | Test      | `.claude/skills/test-component/SKILL.md`      | colocated `.ink.test.ts` (+ Angular SSR)      | `test(components): cover I<Name>`       |
| 5   | Document  | `.claude/skills/document-component/SKILL.md`  | TSDoc pass + changeset + freshness            | `docs(components): document I<Name>`    |

Shared reference (each phase skill points into these; read them when a phase tells you to):
`create-component/reference/{conventions,primitives,verification}.md`.

## Run loop

For each phase 1 → 5:

1. **Read** the phase's `SKILL.md` (path above) and follow it top-to-bottom at full depth. Use its "Read first" list and run its verification.
2. **Present** the phase output: phase 1 → the spec's headline decisions (anatomy, prop table, a11y contract, styling branch); phases 2–5 → the diff plus the verification result (compile notices / Storybook / coverage / `vp run ready`).
3. **Gate** — wait for the user's go-ahead. Use `AskUserQuestion` only for genuine design forks; otherwise state assumptions and pause for approval.
4. On approval, **commit** the phase's files (table above), then continue to the next phase.

Phase 1 is the most important gate: do not write any component code until the API spec is signed off.

## On completion

Report: the files added, the per-phase commits (and that nothing was pushed), the final `vp run ready` result, the coverage numbers, and the changeset created. Note that the public docs-website page is staged but pending (the site isn't built yet — see the document phase).
