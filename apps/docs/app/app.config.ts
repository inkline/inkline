import { GITHUB_URL } from "./data/site";

export default defineAppConfig({
  // The docs' GitHub, "Edit this page" and "Report an issue" links. Docus reads
  // them from the git remote otherwise, which not every checkout has. `rootDir`
  // is the path from the repository root to this app: without it the edit links
  // point at `content/`, not `apps/website/content/`, and 404.
  github: {
    url: GITHUB_URL,
    branch: "main",
    rootDir: "apps/website",
  },
  docsTheme: {
    // Inkline ships these seven, in this order (ui/components/inkline.config.ts).
    // `value` names each framework's slot in `::framework-switcher`. MDI has no
    // Svelte glyph, so that one comes from simple-icons, which Docus installs.
    frameworks: [
      { value: "react", label: "React", icon: "i-mdi-react" },
      { value: "vue", label: "Vue", icon: "i-mdi-vuejs" },
      { value: "svelte", label: "Svelte", icon: "i-simple-icons-svelte" },
      { value: "solid", label: "Solid", icon: "i-mdi-atom" },
      { value: "angular", label: "Angular", icon: "i-mdi-angular" },
      { value: "qwik", label: "Qwik", icon: "i-mdi-lightning-bolt" },
      { value: "astro", label: "Astro", icon: "i-mdi-rocket-launch" },
    ],
    // The docs header's site name, set and signed "by UXFront" the way the
    // homepage header does.
    wordmark: { bold: "Ink", regular: "line" },
    byline: true,
  },
  ui: {
    colors: {
      // Inkline's purple (see app/app.css for its shades).
      primary: "purple",
      neutral: "slate",
    },
    // Nuxt UI's `UContentSearch` falls back to `t('contentSearch.title')` and
    // `t('contentSearch.description')` for the search modal's accessible name
    // and description, but its own catalogue only ships
    // `contentSearch.links|search|theme`: the two keys resolve to nothing and
    // the raw key strings are what a screen reader announces. `useComponentProps`
    // reads `defaultVariants` as app-config-level prop defaults, so setting the
    // props here names the modal.
    contentSearch: {
      defaultVariants: {
        title: "Search documentation",
        description: "Search the Inkline documentation by page title or content.",
      },
    },
  },
});
