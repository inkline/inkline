import { existsSync } from "node:fs";
import { readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { SECURITY_HEADERS } from "./server/lib/headers";

const SITE_URL = "https://inkline.io";

// Docus reads the site URL from the environment: for canonical URLs, robots.txt
// and llms.txt at build time, and for the sitemap when it's prerendered.
process.env.NUXT_SITE_URL ||= SITE_URL;

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: true,

  // Since Nuxt 4.6, `nuxt build` and `generate` move to node_modules/.cache/nuxt
  // when .nuxt exists, and point .nuxt/tsconfig.server.json there. The root type
  // check (`vp check`, after `pnpm run build`) skips node_modules, so it lost the
  // Nitro auto-imports server/ relies on. Keep every command on .nuxt.
  buildDir: ".nuxt",

  extends: [
    // The homepage kit: components, fonts, head helpers and critical-path loading.
    "@uxfront/layer-ui",
    // The docs theme: Docus, which renders content/docs/ at /docs (see app/app.vue),
    // plus the framework switcher (`docsTheme.frameworks` in app/app.config.ts).
    "@uxfront/layer-docs",
  ],

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
      // Where `StorybookEmbed` (app/components/content/) points. `{framework}` is
      // replaced per embed. No Storybook is deployed there yet (AGENTS.md, Known
      // gaps); NUXT_PUBLIC_STORYBOOK_BASE_URL overrides it at build time.
      storybookBaseUrl: "https://{framework}.storybook.inkline.io",
    },
  },

  // The docs header and title template (Docus falls back to the package name).
  site: {
    name: "Inkline",
  },

  // The site is static, so Docus's MCP server has nothing to run on.
  mcp: {
    enabled: false,
  },

  docus: {
    // The assistant answers from a server route, which a static host doesn't have.
    // Off, its button stays out of the docs header even when the build can reach
    // an AI gateway (VERCEL_OIDC_TOKEN on Vercel).
    assistant: {
      enabled: false,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
    },
  },

  experimental: {
    // Inline the payload on first load (the homepage makes no extra request),
    // and extract it for client-side navigation between docs pages.
    payloadExtraction: "client",
  },

  routeRules: {
    "/docs": {
      redirect: "/docs/getting-started",
    },
    // The Guide section held one page, about the compiler — not what /docs
    // documents. Both URLs shipped, so they redirect rather than 404 until the
    // compiler tree exists to own the page (parked in content/_compiler/).
    "/docs/guide": {
      redirect: { to: "/docs/getting-started", statusCode: 301 },
    },
    "/docs/guide/architecture": {
      redirect: { to: "/docs/getting-started", statusCode: 301 },
    },
    // Hashed build assets never change, so cache them forever.
    "/_nuxt/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/**": {
      headers: SECURITY_HEADERS,
    },
  },

  nitro: {
    // Cloudflare Workers Builds sets WORKERS_CI, and Nitro reads it to pick its
    // `cloudflare-module` server preset, even under `nuxt generate`. That preset
    // writes .wrangler/deploy/config.json, which Wrangler prefers over this app's
    // wrangler.json. `cloudflare_pages_static` writes a static site to dist/ instead,
    // with a _headers file built from routeRules. Only there: the local and CI
    // `generate` keep the default preset, whose .output/public `test:build` reads.
    // Vercel's NITRO_PRESET still wins, since `nuxt generate` passes it as an override.
    preset: process.env.WORKERS_CI ? "cloudflare_pages_static" : undefined,
    prerender: {
      crawlLinks: true,
      // /docs only redirects, so crawling the docs starts from the introduction.
      routes: ["/", "/docs", "/docs/getting-started"],
      failOnError: true,
    },
    vercel: {
      config: {
        // Agents asking for markdown, and curl, get the llms.txt entry point at
        // `/`; browsers get the rendered homepage. A fully static deploy
        // (ADR-007) has no Nitro runtime to negotiate that, so it has to happen
        // at the CDN edge. Docus's vercel-markdown-rewrite module now writes
        // its own `^/$` → `/llms.txt` rewrites ahead of these two redirects, and
        // those match first; these two stay as the fallback if Docus drops them.
        // `(?i)` makes the match case-insensitive.
        //
        // Build Output API v3 routes must be declared here, not in vercel.json —
        // once .vercel/output/config.json exists, Vercel ignores vercel.json's
        // own routes/redirects entirely.
        //
        // Nitro types `routes` as a narrow 3-variant union that predates `has`
        // and redirect routes; the Build Output API accepts both, and the
        // emitted .vercel/output/config.json carries these two entries verbatim,
        // after Docus's rewrites. Drop the directives below when nitropack
        // widens the type — ts-expect-error errors once it is unnecessary.
        routes: [
          {
            src: "/",
            has: [{ type: "header", key: "accept", value: "(?i).*text/markdown.*" }],
            status: 302,
            // @ts-expect-error -- nitropack's route type allows only cache-control here
            headers: { Location: "/llms.txt" },
          },
          {
            src: "/",
            has: [{ type: "header", key: "user-agent", value: "(?i)curl/.*" }],
            status: 302,
            // @ts-expect-error -- nitropack's route type allows only cache-control here
            headers: { Location: "/llms.txt" },
          },
        ],
      },
    },
  },

  hooks: {
    // Every page would otherwise prefetch the docs' lazy chunks, which delays the
    // homepage's fonts and stylesheet, and with them its LCP.
    "build:manifest"(manifest) {
      for (const chunk of Object.values(manifest)) chunk.prefetch = false;
    },
    // Docus writes the assistant's endpoint into the public runtime config, and
    // so into every page, even with the assistant off. Off, nothing reads it.
    "nitro:config"(nitroConfig) {
      const assistant = nitroConfig.runtimeConfig?.public?.assistant as
        | { apiPath?: string }
        | undefined;
      delete assistant?.apiPath;
    },
    // Workers rejects the `/* /404.html 404` fallback the Cloudflare preset writes
    // to _redirects (404 isn't a valid redirect status), failing the deploy.
    // not_found_handling in wrangler.json serves 404.html instead. Registered here,
    // not in nitro.hooks, so it runs after the preset's compiled hook instead of
    // replacing it. Other presets write no _redirects, so it does nothing there.
    "nitro:init"(nitro) {
      nitro.hooks.hook("compiled", async () => {
        const file = join(nitro.options.output.dir, "_redirects");
        if (!existsSync(file)) return;
        const rules = (await readFile(file, "utf8"))
          .split("\n")
          .filter((line) => line && !/\s404$/.test(line));
        await (rules.length ? writeFile(file, rules.join("\n")) : rm(file));
      });
    },
  },
});
