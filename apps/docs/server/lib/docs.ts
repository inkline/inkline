import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { H3Event } from "h3";

// The fields read below. Nitro's types don't see the collections Docus defines.
interface DocsPage {
  stem: string;
  extension: string;
  title: string;
  description: string;
}

/**
 * Finds the docs page served at `path`, like `/docs/components/button`, and reads
 * its source file. The site is static: this runs on `pnpm dev` and when the pages
 * are prerendered, both from the project root.
 *
 * It's in server/lib rather than server/utils, which Nitro auto-imports: the app's
 * tsconfig type-checks those too, and sees Nuxt Content's client queryCollection().
 */
export async function readDocsPage(event: H3Event, path: string) {
  const page = (await queryCollection(event, "docs" as never)
    .path(path)
    .first()) as DocsPage | null;
  if (!page) return;

  const source = await readFile(
    join(process.cwd(), "content", `${page.stem}.${page.extension}`),
    "utf8",
  );
  return { page, source };
}
