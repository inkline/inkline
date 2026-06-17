// Deterministic stub for the `virtual:styleframe` module, shared by the SSR mount sandbox (mount.ts)
// and the coverage harness (coverage.ts). Both need generated component files to resolve their recipe
// imports to a real module when executed outside a styleframe build.

import { writeFileSync } from "node:fs";
import { join } from "node:path";

export const STYLEFRAME_SHIM = "__styleframe__.mjs";

/** Named value imports from `virtual:styleframe` across the given files (the module's exported names). */
export function styleframeImportNames(files: readonly { contents: string }[]): string[] {
  const names = new Set<string>();
  for (const f of files) {
    for (const m of f.contents.matchAll(
      /import\s*\{([^}]*)\}\s*from\s*["']virtual:styleframe["']/g,
    )) {
      for (const entry of m[1]!.split(",")) {
        const trimmed = entry.trim();
        if (!trimmed || trimmed.startsWith("type ")) continue;
        names.add(trimmed.split(/\s+as\s+/)[0]!.trim());
      }
    }
  }
  return [...names];
}

/**
 * A deterministic recipe stub: `inputGroupRecipe({ size: "md" })` → `"input-group input-group--size-md"`.
 * The base class is the recipe name minus its `Recipe` suffix, kebab-cased — matching the real
 * theme's base class names so assertions read naturally.
 */
export function writeStyleframeShim(tmp: string, files: readonly { contents: string }[]): void {
  const names = styleframeImportNames(files);
  if (names.length === 0) return;

  const kebab = (name: string) =>
    name
      .replace(/Recipe$/, "")
      .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
      .toLowerCase();

  const lines = names.map(
    (n) =>
      `export const ${n} = (props = {}) => ["${kebab(n)}", ...Object.entries(props)` +
      `.filter(([, v]) => v != null && v !== false)` +
      `.map(([k, v]) => (v === true ? "${kebab(n)}--" + k : "${kebab(n)}--" + k + "-" + v))].join(" ");`,
  );
  writeFileSync(join(tmp, STYLEFRAME_SHIM), lines.join("\n") + "\n", "utf-8");
}

/** Rewrite a file's `virtual:styleframe` import to the relative path of the stub module. */
export function rewriteStyleframeImport(contents: string, filePath: string): string {
  const depth = filePath.split("/").length - 1;
  const rel = depth === 0 ? `./${STYLEFRAME_SHIM}` : `${"../".repeat(depth)}${STYLEFRAME_SHIM}`;
  return contents.replaceAll(`"virtual:styleframe"`, JSON.stringify(rel));
}
