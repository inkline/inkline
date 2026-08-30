export default defineAppConfig({
  /**
   * Inkline branding for the docs site. The @uxfront/layer-docs layer ships
   * neutral defaults; these values are merged over them by Nuxt's `defu` layer
   * merge (consumer wins). `modules/config.ts` also fills `seo`/`header`/`github`
   * from the consumer's `package.json` + git as fallbacks.
   */
  seo: {
    title: "Inkline",
    // @ts-expect-error the layer reads `seo.titleTemplate` in its `app.vue`, but
    // its `AppConfig` augmentation only declares `title`/`description`. The key
    // works; the type is incomplete upstream. (Latent until now: TypeScript
    // skipped the excess-property check on this literal while every nested value
    // was assignable.) Delete this directive once the layer widens the type.
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
        to: "/docs/getting-started",
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
    // Path from the repository root to this Nuxt app. The layer builds the
    // "Edit this page" href as
    // `{url}/edit/{branch}/{rootDir}/content/{stem}.{extension}`; with `rootDir`
    // unset the segment is dropped and every link 404s, because the content
    // lives at `apps/website/content/`, not `content/`.
    rootDir: "apps/website",
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
    // Nuxt UI's `UContentSearch` falls back to `t('contentSearch.title')` and
    // `t('contentSearch.description')` for the search modal's accessible name
    // and description, but its own catalogue (`@nuxt/ui/locale/en`) only ships
    // `contentSearch.links|search|theme` — the two keys resolve to nothing and
    // the raw key strings are what a screen reader announces. Supplying the
    // props here is the fix: `useComponentProps` reads `defaultVariants` as
    // app-config-level prop defaults, and the layer's `AppSearch` passes
    // neither prop. (Not an i18n-registration problem — no Nuxt UI locale
    // defines these keys, so `@nuxtjs/i18n` would not change this.)
    contentSearch: {
      defaultVariants: {
        // @ts-expect-error Nuxt UI types `defaultVariants` as tailwind-variants
        // keys only (`fullscreen`, `size`), but `useComponentProps` reads it for
        // any prop at runtime. Verified in a browser — see the PR. Delete this
        // directive once @nuxt/ui widens the type.
        title: "Search documentation",
        description: "Search the Inkline documentation by page title or content.",
      },
    },
  },
  // Consumer-declared framework list for the package's generalized
  // FrameworkSwitcher (UXF-13). Inkline compiles to these seven, in this order
  // (ui/components/inkline.config.ts); one tab renders per entry.
  docsTheme: {
    frameworks: [
      { value: "react", label: "React", icon: "i-mdi-react" },
      { value: "vue", label: "Vue", icon: "i-mdi-vuejs" },
      // MDI has no Svelte brand glyph; use the simple-icons set. Both sets are
      // installed locally (see package.json), so `icon.serverBundle: "local"`
      // resolves them at build time instead of via api.iconify.design.
      { value: "svelte", label: "Svelte", icon: "i-simple-icons-svelte" },
      { value: "solid", label: "Solid", icon: "i-mdi-atom" },
      { value: "angular", label: "Angular", icon: "i-mdi-angular" },
      { value: "qwik", label: "Qwik", icon: "i-mdi-lightning-bolt" },
      { value: "astro", label: "Astro", icon: "i-mdi-rocket-launch" },
    ],
  },
});
