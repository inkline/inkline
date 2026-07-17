// `defineAppConfig` is a Nuxt auto-import, but apps/website is still vanilla
// Vite (the Nuxt + Nuxt Content conversion is tracked separately). Until that
// lands, this local identity helper keeps the file type-checkable and
// lint-clean while remaining functionally identical to Nuxt's helper (both just
// return the config object). Remove this shim when the app moves to Nuxt.
function defineAppConfig<const T>(config: T): T {
  return config;
}

export default defineAppConfig({
  seo: {
    title: "Inkline",
    titleTemplate: "%s - Inkline",
    description:
      "Write-once, compile-everywhere UI components for React, Vue, Svelte, Solid, Angular, Qwik and Astro.",
  },
  header: {
    title: "Inkline",
    // logo: { alt, light, dark } — no header wordmark exists in the live tree yet
    // (only the icon favicon at public/favicon.svg). Text title is used until a
    // wordmark asset lands.
  },
  github: {
    url: "https://github.com/inkline/inkline",
    branch: "main",
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()} Inkline`,
  },
  // socials: {} — no verified handles in the live tree; add when confirmed.
  ui: {
    colors: {
      primary: "purple",
      neutral: "slate",
    },
  },
});
