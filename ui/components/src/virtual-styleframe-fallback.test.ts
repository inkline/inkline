import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// The checked-in fallback for `virtual:styleframe` (see types/virtual-styleframe.d.ts) has to list
// every recipe by name, because TypeScript has no way to declare a module with arbitrary named
// exports. The real export list is produced at build time by the styleframe plugin from the
// `export const *Recipe` declarations in the `*.styleframe.ts` files, so the two can silently drift
// — a new recipe would type-check fine on a built tree and fail only for contributors who have not
// built yet. This test closes that gap without requiring a build.

const SRC = dirname(fileURLToPath(import.meta.url));
const FALLBACK = resolve(SRC, "../../../types/virtual-styleframe.d.ts");

function collectStyleframeFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return collectStyleframeFiles(path);
    return entry.name.endsWith(".styleframe.ts") ? [path] : [];
  });
}

function authoredRecipeNames(): string[] {
  const names = collectStyleframeFiles(SRC).flatMap((file) =>
    Array.from(readFileSync(file, "utf8").matchAll(/^export const (\w+Recipe)\b/gm), (m) => m[1]!),
  );
  return [...new Set(names)].sort();
}

function fallbackRecipeNames(): string[] {
  const source = readFileSync(FALLBACK, "utf8");
  const names = Array.from(
    source.matchAll(/^export declare const (\w+Recipe): Recipe;$/gm),
    (m) => m[1]!,
  );
  return [...new Set(names)].sort();
}

describe("virtual:styleframe fallback declarations", () => {
  it("declares exactly the recipes authored in the *.styleframe.ts sources", () => {
    const authored = authoredRecipeNames();

    expect(authored.length).toBeGreaterThan(0);
    expect(fallbackRecipeNames()).toEqual(authored);
  });

  it("declares a matching `<Name>RecipeProps` alias for every recipe", () => {
    const source = readFileSync(FALLBACK, "utf8");

    for (const recipe of authoredRecipeNames()) {
      const propsAlias = `${recipe[0]!.toUpperCase()}${recipe.slice(1)}Props`;
      expect(source).toContain(`export type ${propsAlias} = RecipeProps;`);
    }
  });

  it("stays a plain module declaration so it cannot collide with the generated ambient shims", () => {
    // `.styleframe/shims.d.ts` declares `virtual:styleframe` ambiently and wins over `paths`.
    // A second ambient declaration here would merge with it and raise TS2300/TS2451 instead.
    const withoutComments = readFileSync(FALLBACK, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");

    expect(withoutComments).not.toMatch(/\bdeclare module\b/);
  });
});
