---
name: pro-platform
description: The Styleframe commercial layer — Pro packages, license SDK, customer dashboard, Supabase/Polar architecture — and the hard safety rules around it. Use for apps/app, apps/shared, and styleframe-pro work.
---

# Pro & platform

## The commercial model (understand it before touching it)

- **Core styleframe = MIT, free forever.** The paid layer is additive.
- **`@styleframe/pro`** (styleframe-pro repo, `theme/`): premium composables. Currently the fluid responsive design module (`useFluidClamp`, `useFluidFontSize`, `useFluidViewport` — Utopia-style math). More modules planned.
- **`@styleframe/license`** (styleframe-pro repo, `license/`): client-side license verification SDK. **Free in development; production builds without a valid key get watermarks/console warnings — never hard failures.** The engine's transpiler injects the CSS watermark; the loader validates via env (see `getLicenseKeyFromEnv` for the exact variable — Pro docs reference `STYLEFRAME_KEY`).
- **Purchase flow**: styleframe.dev/pricing → Polar (external billing/customer portal) → license key → activated at app.styleframe.dev. "One license, unlimited projects"; redistribution requires a separate Builder License.

## The dashboard (apps/app, deployed app.styleframe.dev, dev port 4000)

Nuxt 3, extends `apps/shared` layer. Stack: `@nuxtjs/supabase` + supabase-js (auth: email/password, GitHub OAuth, confirm/reset flows, auto-redirect to /login), `@nuxt/ui`, PostHog (analytics), i18n (30+ locales), zod. Core feature today: **license activation** — `LicenseActivationCard` → `app/api/license.ts` → Supabase **Edge Function `activate-license`**. No in-app billing (Polar portal link), no team management (single-user, GitHub-username-keyed), no token editor (that's the future uxfront/Studio product). DB types generated via `generate:db:types` from the hosted Supabase project. The `styleframe-supabase` repo is an **empty stub** — the real backend is the hosted project; treat hosted config as production infrastructure.

## Hard rules (each violation is a fire-Alex-immediately event)

1. **Never weaken, bypass, stub, or "fix" license verification or watermark injection** — in pro, engine, or tests. If a licensed path blocks legitimate testing, escalate to Alex via Maestro for a test key.
2. **Never commit or log license keys, Supabase service-role keys, or any secret.** Env vars via Multica `custom_env` only; never paste values in issues/PRs.
3. **Anything touching payments, pricing, entitlements, or the `activate-license` edge function requires Alex's explicit approval** before merge — not after.
4. **Production Supabase config/schema changes**: proposal first (SQL/diff in the issue), Alex approves, apply through migration files — never hand-edit the hosted project silently. Respect RLS; new tables ship with policies.
5. Auth flows change → full manual pass of sign-up/confirm/sign-in/reset/OAuth in preview before merge.
6. Privacy: PostHog events carry no PII beyond what's already consented; new events documented.

## Working notes

- Pro composables are normal styleframe code — `styleframe-authoring-api` conventions apply (tokens, `{ default: true }`, tests colocated). Palette reviews pro theme composables for catalog consistency.
- Pro releases are separate from the OSS train (Keeper coordinates timing; Alex publishes).
- Candidate future Pro modules (Alex decides): advanced theming toolkits, motion presets, premium recipe packs, team token workflows. Pitch via issue with scope + pricing rationale, don't build speculatively.
