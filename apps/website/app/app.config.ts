export default defineAppConfig({
  /**
   * Inkline branding for the docs site. The @uxfront/docs-theme layer ships
   * neutral defaults; these values are merged over them by Nuxt's `defu` layer
   * merge (consumer wins). `modules/config.ts` also fills `seo`/`header`/`github`
   * from the consumer's `package.json` + git as fallbacks.
   */
  seo: {
    title: "Inkline",
    titleTemplate: "%s - Inkline",
    description:
      "Write-once, compile-everywhere UI components for React, Vue, Svelte, Solid, Angular, Qwik and Astro.",
  },
  header: {
    title: "Inkline",
    // logo: { alt, light, dark } — no header wordmark asset exists in the live
    // tree yet (only the icon favicon at public/favicon.svg). Text title is used
    // until a wordmark lands.
    links: [
      {
        label: "Docs",
        to: "/docs/getting-started/installation",
        activeMatch: "/docs",
      },
      {
        label: "GitHub",
        to: "https://github.com/inkline/inkline",
        target: "_blank",
      },
    ],
  },
  github: {
    url: "https://github.com/inkline/inkline",
    branch: "main",
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()} Inkline`,
    links: [],
  },
  // socials: {} — no verified handles in the live tree; add when confirmed.
  ui: {
    // `primary` must match the `--color-purple` scale in assets/css/main.css.
    colors: {
      primary: "purple",
      neutral: "slate",
    },
  },
  // Consumer-declared framework list for the package's generalized
  // FrameworkSwitcher (UXF-13). Inkline compiles to these seven, in this order
  // (ui/components/inkline.config.ts); one tab renders per entry.
  docsTheme: {
    frameworks: [
      { value: "react", label: "React", icon: "i-mdi-react" },
      { value: "vue", label: "Vue", icon: "i-mdi-vuejs" },
      { value: "svelte", label: "Svelte", icon: "i-mdi-svelte" },
      { value: "solid", label: "Solid", icon: "i-mdi-atom" },
      { value: "angular", label: "Angular", icon: "i-mdi-angular" },
      { value: "qwik", label: "Qwik", icon: "i-mdi-lightning-bolt" },
      { value: "astro", label: "Astro", icon: "i-mdi-rocket-launch" },
    ],
  },
});
