import type { DocsSectionDescriptor } from "@uxfront/docs-theme/content";

/**
 * Documentation section topology for the Inkline docs site. This descriptor is
 * the single source of truth the `@uxfront/docs-theme` layer reads (via global
 * auto-import — see `imports.dirs` in nuxt.config) to build the content
 * collections, the nav tree and the sub-header. Add a section here + a matching
 * `content/docs/<folder>/` subtree and it appears everywhere automatically.
 *
 * Content-IA topology (additive, grows page-by-page as the library grows):
 *   Getting Started → Guide → Components → Customization
 *
 * Only sections with authored content are declared, so the nav never shows an
 * empty tab. `Customization` lands with its first page.
 */
export interface DocsSection extends DocsSectionDescriptor {
  /** Sub-header label. */
  label: string;
  /** Sub-header icon (Iconify name). */
  icon: string;
}

export const DOCS_SECTIONS: readonly DocsSection[] = [
  {
    key: "getting-started",
    slug: "getting-started",
    label: "Getting Started",
    icon: "i-lucide-rocket",
    folder: "01.getting-started",
  },
  {
    key: "guide",
    slug: "guide",
    label: "Guide",
    icon: "i-lucide-book-open",
    folder: "02.guide",
  },
  {
    key: "components",
    slug: "components",
    label: "Components",
    icon: "i-lucide-blocks",
    folder: "03.components",
  },
] as const;

export function findDocsSectionBySlug(slug: string): DocsSection | undefined {
  return DOCS_SECTIONS.find((section) => section.slug === slug);
}
