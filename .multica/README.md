# Styleframe Guild — Multica setup kit

Everything needed to stand up the AI agent team that builds Styleframe to its true potential, on [Multica](https://multica.ai/uxfront/issues).

**Start with [`TEAM.md`](./TEAM.md)** — the team design: who exists, why, how work flows, and the first 90 days of missions.

## What's in this kit

```
TEAM.md              The team design (read first)
agents/              11 agent definitions — Multica config + paste-ready instructions
  00-maestro.md      Coordinator
  01-atlas.md        Engine Steward
  02-palette.md      Design System Author
  03-forge.md        Toolsmith (DX)
  04-bridge.md       Interop Diplomat (Figma/DTCG)
  05-quill.md        Documentarian
  06-gauntlet.md     Adversary (QA)
  07-warden.md       Gatekeeper (Review)
  08-keeper.md       Steward of Ship (Release/Triage)
  09-herald.md       Ecosystem Gardener
  10-patron.md       Product Engineer (Pro/Platform)
skills/              16 skills in Anthropic Agent Skills format (SKILL.md each),
                     importable as Multica workspace skills
```

## Install into Multica

1. **Import the skills** (Multica → Skills → import each `skills/<name>/` directory as a workspace skill). They follow the Anthropic Agent Skills standard: one `SKILL.md` with `name`/`description` frontmatter.
2. **Create the agents** (Multica → Agents → New), in file order `00` → `10`. For each file in `agents/`:
   - **Name**: the file's @handle (e.g. `@atlas` → agent named Atlas).
   - **System instructions**: copy the fenced block under _System instructions_ verbatim.
   - **Runtime / Model / Skills / Triggers / Concurrency / Visibility**: from the _Multica configuration_ table below the instructions.
3. **Add `multica.json` to the styleframe repo** (it doesn't have one yet — verified 2026-07-11):

   ```json
   {
     "scripts": {
       "setup": "pnpm install && pnpm build:nodocs",
       "run": {
         "dev": "pnpm dev",
         "docs": "pnpm dev:docs",
         "storybook": "pnpm storybook",
         "playground": "pnpm dev:playground"
       },
       "cleanup": "rm -rf node_modules"
     }
   }
   ```

4. **Environment**: builds validate a license via `@styleframe/license` (missing/invalid → CSS watermark injection, not failure). If agents need watermark-free production builds or work on Pro, set the license env var via the agent's `custom_env` — check `@styleframe/license`'s `getLicenseKeyFromEnv` for the exact variable name (Pro docs reference `STYLEFRAME_KEY`). Patron additionally needs Supabase project access only if explicitly granted.
5. **Seed Wave 0** (TEAM.md §8): create the three bootstrap issues (truth reconciliation → Quill, issue-tracker revival → Keeper, loader tests → Atlas). Assignment activates the agents.

## Operating notes

- **Alex approves**: npm publishes, breaking public API, anything touching money/license enforcement, all public-facing comms. Everything else flows agent-to-agent.
- **Every PR mentions @warden.** Perf/bug-fix claims get audited by @gauntlet. Blocked twice → @maestro. The full protocol is in the `multica-teamwork` skill.
- **Facts age.** The skills snapshot the repo as of 2026-07-11 (package versions, catalog counts, gaps). Agents are instructed to trust source over docs and to PR skill amendments directly (the compounding rule — always in scope); @maestro reviews and merges them weekly.
- **Re-import after skill edits.** Multica reads skills at import time, not from git: a merged edit under `skills/` is not live until the affected skill is re-imported (or edited in the Multica UI). @maestro reminds on the PR.
