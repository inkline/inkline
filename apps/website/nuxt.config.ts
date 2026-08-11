// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Consume the published, cross-repo docs theme. inkline is a separate repo,
  // so this resolves from the npm registry (@uxfront/layer-docs@^0.1.0), not a
  // workspace link. Branding, section topology and content stay local (below).
  extends: ["@uxfront/layer-docs"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  // Local brand palette + --ui-primary map. Imports the palette-free package
  // base; keeps @uxfront/layer-docs brand-free (the UXF-6/UXF-10 boundary).
  css: ["./app/assets/css/main.css"],
  // Auto-import DOCS_SECTIONS / findDocsSectionBySlug from app/constants/ so the
  // theme layer can reference them as globals (overrides the layer's empty
  // default via app-dir auto-import precedence).
  imports: {
    dirs: ["constants"],
  },
  site: {
    url: "https://inkline.io",
    name: "Inkline — Write-once, compile-everywhere UI components",
  },
  llms: {
    domain: "https://inkline.io",
    title: "Inkline",
  },
  routeRules: {
    "/docs": {
      redirect: "/docs/getting-started/installation",
    },
  },
  // Storybook embed host. Empty by default → the component falls back to the
  // documented per-framework convention (https://{framework}.storybook.inkline.io).
  // Override at build time with NUXT_PUBLIC_STORYBOOK_BASE_URL, no code change.
  runtimeConfig: {
    public: {
      storybookBaseUrl: "",
    },
  },
  nitro: {
    vercel: {
      config: {
        // The layer ships `/` → `/llms.txt` content negotiation as a Nitro
        // *request* plugin (server/plugins/llms-redirect.ts). A fully static
        // deploy (ADR-007) has no Nitro runtime, so that plugin never executes.
        // These two rules restore the same behaviour at the CDN edge: agents
        // asking for markdown, and curl, get the llms.txt entry point; browsers
        // get the rendered homepage. `(?i)` makes the match case-insensitive.
        //
        // Build Output API v3 routes must be declared here, not in vercel.json —
        // once .vercel/output/config.json exists, Vercel ignores vercel.json's
        // own routes/redirects entirely.
        //
        // Nitro types `routes` as a narrow 3-variant union that predates `has`
        // and redirect routes; the Build Output API accepts both, and the
        // emitted .vercel/output/config.json carries these two entries verbatim
        // as routes[0] and routes[1]. Drop the directives below when nitropack
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
});
