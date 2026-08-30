import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)));

/** The `exports` entries whose built barrels re-export `.astro` files by relative path. */
const BARRELS = ["index.mjs", "headless.mjs", "stories.mjs"] as const;

const RELATIVE_ASTRO_IMPORT = /from\s+"(\.[^"]*\.astro)"/g;

describe("@inkline/astro packaging", () => {
  // Packaging can only be checked against a build, and `dist/` is not the shipped surface — the
  // tarball is. This is the only place the `pack.copy` glob is exercised: it matched nothing for
  // as long as it existed and the build merely warned, so a green suite over `src/` said nothing.
  it.skipIf(!existsSync(join(packageDir, "dist")))(
    "ships every .astro file the built barrels import",
    () => {
      const stagingDir = join(packageDir, "node_modules", ".packaging-smoke");
      rmSync(stagingDir, { recursive: true, force: true });
      mkdirSync(stagingDir, { recursive: true });

      try {
        execFileSync("pnpm", ["pack", "--pack-destination", stagingDir], {
          cwd: packageDir,
          stdio: "pipe",
        });
        const tarball = readdirSync(stagingDir).find((f) => f.endsWith(".tgz"));
        expect(tarball).toBeDefined();
        execFileSync("tar", ["-xzf", join(stagingDir, tarball as string)], { cwd: stagingDir });

        const distDir = join(stagingDir, "package", "dist");
        const missing: string[] = [];
        let imported = 0;

        for (const barrel of BARRELS) {
          const source = readFileSync(join(distDir, barrel), "utf-8");
          for (const [, specifier] of source.matchAll(RELATIVE_ASTRO_IMPORT)) {
            imported += 1;
            if (!existsSync(resolve(distDir, specifier))) {
              missing.push(`${barrel} → ${specifier}`);
            }
          }
        }

        // Guards against the assertion below passing vacuously if the barrels ever stop importing
        // `.astro` files by path — at which point this test is measuring nothing.
        expect(imported).toBeGreaterThan(0);
        expect(missing).toEqual([]);
      } finally {
        rmSync(stagingDir, { recursive: true, force: true });
      }
    },
    120_000,
  );
});
