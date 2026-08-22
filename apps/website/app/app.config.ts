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
      "One component library, native in seven frameworks — the same UI components as React, Vue, Svelte, Solid, Angular, Qwik and Astro packages.",
  },
  header: {
    title: "Inkline",
    // Wordmark lockup: the committed brand mark (the #863bff glyph from
    // public/favicon.svg, the same one main.css derives the palette from) beside
    // the product name in the site's own type stack. `AppHeaderLogo` renders the
    // image *instead of* `header.title`, never alongside it, so the name has to
    // live inside the asset. Two files because the text flips with the colour
    // mode; the mark lightens to #a06bff on dark for contrast against --ui-bg.
    logo: {
      alt: "Inkline",
      light: "/logotype-light.svg",
      dark: "/logotype-dark.svg",
    },
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
    // Path from the repository root to this Nuxt app. The layer builds the
    // "Edit this page" href as
    // `{url}/edit/{branch}/{rootDir}/content/{stem}.{extension}`; with `rootDir`
    // unset the segment is dropped and every link 404s, because the content
    // lives at `apps/website/content/`, not `content/`.
    rootDir: "apps/website",
  },
  footer: {
    credits: `Copyright © ${new Date().getFullYear()} Inkline`,
    // Flat link row (`AppFooterCenter` renders one horizontal menu, not a
    // sitemap). The conventional legal row — Privacy · Terms · License — is not
    // shippable: there is no LICENSE file in the v5 tree and no /license,
    // /privacy or /terms page, so every one of those would 404 (UXF-185). These
    // three all resolve today.
    links: [
      { label: "Docs", to: "/docs/getting-started/installation" },
      { label: "Components", to: "/docs/components/button" },
      {
        label: "Contributing",
        to: "https://github.com/inkline/inkline/blob/main/.github/CONTRIBUTING.md",
        target: "_blank",
      },
    ],
  },
  // Verified accounts only. `AppFooterRight` maps every key to
  // `i-simple-icons-${key}` and appends GitHub automatically from `github.url` —
  // a `github` key here would render the icon twice. The legacy Discord invite
  // (discord.gg/2w5UGnK) is dead, so there is no `discord` key to add.
  socials: {
    x: "https://x.com/inkline",
  },
  toc: {
    // Right-rail panel under the page TOC, on docs pages only. The layer reads
    // `title` and `links`; a `storybook` link is deliberately absent while
    // storybook.inkline.io still serves the v4 Vue-only library (UXF-170).
    bottom: {
      title: "Resources",
      links: [
        {
          icon: "i-lucide-star",
          label: "Star on GitHub",
          to: "https://github.com/inkline/inkline",
          target: "_blank",
        },
        {
          icon: "i-lucide-bug",
          label: "Report an issue",
          to: "https://github.com/inkline/inkline/issues/new/choose",
          target: "_blank",
        },
      ],
    },
  },
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
