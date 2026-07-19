// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Consume the published, cross-repo docs theme. inkline is a separate repo,
  // so this resolves from the npm registry (@uxfront/docs-theme@^0.1.0), not a
  // workspace link. Branding, section topology and content stay local (below).
  extends: ["@uxfront/docs-theme"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  // Local brand palette + --ui-primary map. Imports the palette-free package
  // base; keeps @uxfront/docs-theme brand-free (the UXF-6/UXF-10 boundary).
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
});
