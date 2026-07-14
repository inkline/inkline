---
name: platform-trust
description: Inkline's platform & trust surface — the styleframe license boundary, supply-chain and secrets hygiene, npm distribution integrity, and the future Studio/commercial direction. Use for anything touching licenses, dependencies, tokens, or product surfaces.
---

# Platform & trust

## The lay of the land (understand it before touching it)

**Inkline is MIT, free, and has no in-repo commercial layer today.** The commercial gravity sits next door: styleframe (the styling engine Inkline consumes) has an MIT core + paid Pro layer, and the long-term product direction is **Studio** — the AI design-system builder (`~/Workspace/uxfront`) on top of Inkline + styleframe. This seat guards the trust surfaces that already exist and prepares the product surfaces to come. Paranoia stays scoped to where it belongs — a docs page is not a payment processor.

## Surface 1 — the styleframe license boundary (real, today)

`@styleframe/license` is a dependency of `ui/components` and all seven framework packages (via the catalog). Styleframe's build is license-gated upstream: **missing/invalid key → CSS watermark injection, never hard failure; free in development**. That behavior is the sibling project's business model, and Inkline respects it absolutely:

- **Never weaken, bypass, stub, or "fix" license verification or watermark behavior** — not in build configs, not in tests, not in CI. If a licensed path blocks legitimate work (watermark-free production builds), escalate to Alex via @maestro for a key.
- Keys travel via environment (CI secrets / Multica `custom_env`) — check `@styleframe/license`'s `getLicenseKeyFromEnv` for the exact variable (Pro docs reference `STYLEFRAME_KEY`). **Never commit or log a key; never paste one into an issue/PR.**

## Surface 2 — supply chain & distribution (real, today)

- **pnpm's `minimumReleaseAge` guard is on** (24h quarantine on new releases). `pnpm-workspace.yaml` excludes the styleframe first-party packages (intentionally fresh, trusted) and a few pinned collateral versions. Every new exclusion is a security decision: justify it in the PR, pin exact versions where possible, and expect @warden to challenge it.
- **`allowBuilds`** whitelists which deps may run postinstall scripts — additions get the same scrutiny.
- **Secrets in play**: `NPM_TOKEN` (publish, wired but publish is disabled), `CODECOV_TOKEN`. GitHub secrets only; nothing in code, fixtures, or logs.
- **npm distribution**: the `@inkline` org + the unscoped `inkline` name. Nothing is published yet (all `0.0.0`) — the first release is a trust event: org access + 2FA, provenance, `publishConfig` sanity (see `release-train`'s launch checklist). Only Alex publishes, only via the sanctioned flow.
- Dependency additions anywhere: prefer none; new deps carry a one-line justification in the PR.

## Surface 3 — the product horizon (prepare, don't build speculatively)

- **Studio** (AI design-system builder) is the flagship product direction; its plan lives in the uxfront workspace. When it lands in this repo (e.g. `apps/studio`), this seat owns it — auth flows walked manually before merge, production infrastructure treated as production, entitlements through Alex, the works.
- Candidate commercial surfaces (premium themes/templates, pro components, hosted tooling) are **pitched as issues with scope and pricing rationale — Alex decides**. Quality of the free tier is the sales strategy; nothing ships that makes the free path worse.
- Until then, the standing product work is **experiencing Inkline as a customer**: fresh-install smokes, the `pnpm add @inkline/react` → rendered-component journey, README accuracy at the package level — and filing what bites to the owning seat.

## Hard rules (each violation is a stop-everything event)

1. Never weaken the license/watermark boundary (Surface 1) — and never make it _more_ hostile either.
2. Never commit/log secrets or keys; env only.
3. Anything touching money, entitlements, pricing, or license enforcement — **Alex approves before merge**, no exceptions for "small" changes.
4. Production infrastructure (when it exists) is not a sandbox: schema/config changes are proposed in the issue, Alex approves, applied via migrations.
5. Supply-chain guard exclusions and postinstall allowances are never waved through as chores.
