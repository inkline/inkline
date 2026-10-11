import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Checks the static site `nuxt generate` wrote to `.output/public`.
 *
 * Requires a prior `generate`. Excluded from the default `vp test` run (see
 * `vite.config.ts`); runs via `test:build` in the Build Website CI job, against
 * the artifact that job just produced.
 */
const output = fileURLToPath(new URL("../.output/public", import.meta.url));

// Docus prerenders `route.html` rather than `route/index.html`
// (`autoSubfolderIndex: false`), so every docs URL that resolves is one file.
const files = [
  "index.html",
  "docs/getting-started.html",
  "docs/getting-started/installation.html",
  "docs/getting-started/first-component.html",
  "docs/getting-started/theming.html",
  "docs/getting-started/framework-support.html",
  "docs/components/button.html",
  "llms.txt",
  "sitemap.xml",
  "robots.txt",
  "200.html",
  "404.html",
];

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

describe("the generated site", () => {
  it.each(files)("has %s", (file) => {
    expect(existsSync(join(output, file))).toBe(true);
  });

  // The compiler pages are parked in content/_compiler/, so nothing about the
  // compiler reaches the homepage.
  it("keeps the compiler out of the homepage", () => {
    expect(readFileSync(join(output, "index.html"), "utf8")).not.toContain("compile-everywhere");
  });

  // The assistant needs a server route a static host doesn't have.
  it("ships no Docus assistant", () => {
    const hits = [...walk(output)].filter((file) =>
      readFileSync(file, "utf8").includes("__docus__/assistant"),
    );
    expect(hits).toEqual([]);
  });
});
