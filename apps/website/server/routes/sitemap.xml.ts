import { queryCollection } from "@nuxt/content/server";

// The fields read below. Nitro's types don't see the collections Docus defines.
interface DocsPage {
  path: string;
  meta: { sitemap?: boolean; modifiedAt?: string };
}

/**
 * Serves `/sitemap.xml` in place of Docus's route, which robots.txt points
 * crawlers at. Docus lists its docs and landing pages, and skips the landing
 * collection when the app has its own app/pages/index.vue, so the homepage
 * never made it in. This lists the homepage first, then the docs pages by
 * Docus's rules: `sitemap: false` in a page's frontmatter leaves it out, and
 * `modifiedAt` sets its `<lastmod>`.
 *
 * Nitro keeps the first handler for a route, and it scans the app's server/
 * before the layers'. Docus still adds the route to the prerendered ones.
 */
export default defineEventHandler(async (event) => {
  const { siteUrl } = useRuntimeConfig(event).public;
  const pages = (await queryCollection(event, "docs" as never).all()) as DocsPage[];

  const urls = [
    { loc: "/", lastmod: undefined },
    ...pages
      .filter((page) => page.meta.sitemap !== false && !isNavigationPath(page.path))
      .map((page) => ({ loc: page.path, lastmod: page.meta.modifiedAt?.split("T")[0] })),
  ];

  setHeader(event, "Content-Type", "application/xml");
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(({ loc, lastmod }) =>
      [
        "  <url>",
        `    <loc>${escapeXml(siteUrl + loc)}</loc>`,
        ...(lastmod ? [`    <lastmod>${escapeXml(lastmod)}</lastmod>`] : []),
        "  </url>",
      ].join("\n"),
    ),
    "</urlset>",
  ].join("\n");
});

const XML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (char) => XML_ENTITIES[char]!);
}
