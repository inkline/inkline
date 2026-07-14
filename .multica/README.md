# Inkline Guild — Multica setup kit

Everything needed to stand up the AI agent team that builds Inkline to its true potential, on [Multica](https://multica.ai).

**Start with [`TEAM.md`](./TEAM.md)** — the team design: who exists, why, how work flows, and the first 90 days of missions.

## What's in this kit

```
TEAM.md              The team design (read first)
agents/              11 agent definitions — Multica config + paste-ready instructions
  00-maestro.md      Coordinator
  01-atlas.md        Engine Steward (compiler + core + barrel)
  02-palette.md      Component Author (the catalog)
  03-forge.md        Toolsmith (plugin + CLI)
  04-bridge.md       Interop Diplomat (7 framework packages + styleframe boundary)
  05-quill.md        Documentarian (website, docs, AGENTS.md freshness)
  06-gauntlet.md     Adversary (visual parity, test harnesses, benchmarks)
  07-warden.md       Gatekeeper (Review)
  08-keeper.md       Steward of Ship (Release/Triage/CI)
  09-herald.md       Ecosystem Gardener (stories, Storybook, starters)
  10-patron.md       Product Engineer (trust surfaces, future Studio)
images/              Team portraits (one per agent + squad)
```

The team's skills live in **`.claude/skills/`** at the repo root (Anthropic Agent Skills format, one `SKILL.md` each) so they double as live Claude Code skills: 16 team skills (`inkline-project-map`, `ink-authoring-api`, `multica-teamwork`, `compiler-pipeline-internals`, `component-catalog`, `design-token-architecture`, `bundler-matrix-verification`, `framework-interop`, `docs-writing-style`, `adversarial-qa`, `benchmark-protocol`, `review-gate`, `release-train`, `issue-triage`, `starter-templates`, `platform-trust`) plus the 6 component-pipeline phase skills (`create/research/implement/stories/test/document-component`).

## Install into Multica

1. **Import the skills** (Multica → Skills → import each `.claude/skills/<name>/` directory as a workspace skill). They follow the Anthropic Agent Skills standard: one `SKILL.md` with `name`/`description` frontmatter.
2. **Create the agents** (Multica → Agents → New), in file order `00` → `10`. For each file in `agents/`:
   - **Name**: the file's @handle (e.g. `@atlas` → agent named Atlas).
   - **System instructions**: copy the fenced block under _System instructions_ verbatim.
   - **Runtime / Model / Skills / Triggers / Concurrency / Visibility**: from the _Multica configuration_ table below the instructions.
3. **Check `multica.json`** at the repo root has run scripts that match the toolchain (Vite+ under pnpm):

   ```json
   {
     "scripts": {
       "setup": "pnpm install --frozen-lockfile && pnpm run build",
       "run": {
         "dev": "pnpm run dev",
         "storybook": "pnpm run storybook",
         "test:e2e": "pnpm run test:e2e"
       },
       "cleanup": "pnpm run clean"
     }
   }
   ```

4. **Environment**: the styleframe packages Inkline builds with are license-gated upstream (missing/invalid key → CSS watermark injection, not failure). If agents need watermark-free production builds, set the license env var via the agent's `custom_env` — check `@styleframe/license`'s `getLicenseKeyFromEnv` for the exact variable name (Pro docs reference `STYLEFRAME_KEY`). Never commit or log keys.
5. **Seed Wave 0** (TEAM.md §8): create the three bootstrap issues (truth reconciliation → Quill, board bootstrap → Keeper, plugin test coverage → Forge). Assignment activates the agents.

## Operating notes

- **Alex approves**: npm publishes (the publish workflow step is deliberately disabled until the first release), breaking public API, anything touching money/license/supply-chain, all public-facing comms. Everything else flows agent-to-agent.
- **Every PR mentions @warden.** Perf/bug-fix claims get audited by @gauntlet. Blocked twice → @maestro. The full protocol is in the `multica-teamwork` skill.
- **Facts age.** The skills snapshot the repo as of 2026-07-12 (5 components, `0.0.0` versions, catalog pins, known drift list). Agents are instructed to trust source over docs and to PR skill amendments directly (the compounding rule — always in scope); @maestro reviews and merges them weekly.
- **Re-import after skill edits.** Multica reads skills at import time, not from git: a merged edit under `.claude/skills/` is not live until the affected skill is re-imported (or edited in the Multica UI). @maestro reminds on the PR.
