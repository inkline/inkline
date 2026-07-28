import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

interface PackageManifest {
  readonly files: readonly string[];
  readonly exports: Readonly<Record<string, unknown>>;
}

const manifest = JSON.parse(
  readFileSync(join(packageDir, "package.json"), "utf-8"),
) as PackageManifest;

/** The harnesses `README.md` → "Testing Utilities" promises at this subpath. */
const DOCUMENTED_HARNESSES = [
  "compileFixture",
  "typecheckEmittedForTarget",
  "lintEmittedForTarget",
  "mountForTarget",
  "runScenarioAcrossTargets",
  "runBenchSuite",
  "runConformanceInvariants",
  "expectMappingAt",
  "verifyIdentifierMappings",
] as const;

describe("@inkline/compiler/testing subpath", () => {
  it("is declared in package.json exports", () => {
    expect(manifest.exports["./testing"]).toEqual({
      types: "./dist/testing.d.mts",
      default: "./dist/testing.mjs",
    });
  });

  it("ships the fixtures compileFixture and scenarios read at runtime", () => {
    expect(manifest.files).toContain("src/__fixtures__");
  });

  // Packaging can only be checked against a build. CI always builds before testing
  // (the `test` job downloads the `build` job's artifacts); an unbuilt local tree skips.
  // Keyed on `dist/` itself, so a build that stops emitting `testing.mjs` fails rather than skips.
  it.skipIf(!existsSync(join(packageDir, "dist")))(
    "resolves and loads from a packed tarball the way a consumer would",
    async () => {
      // Staged under the package's own node_modules so peer dependencies (typescript)
      // still resolve by walking up to the workspace root, as they do for a real consumer.
      const consumerDir = join(packageDir, "node_modules", ".subpath-export-smoke");
      rmSync(consumerDir, { recursive: true, force: true });
      mkdirSync(join(consumerDir, "node_modules", "@inkline"), { recursive: true });

      try {
        execFileSync("pnpm", ["pack", "--pack-destination", consumerDir], {
          cwd: packageDir,
          stdio: "pipe",
        });
        const tarball = readdirSync(consumerDir).find((f) => f.endsWith(".tgz"));
        expect(tarball).toBeDefined();

        execFileSync("tar", ["-xzf", join(consumerDir, tarball as string)], { cwd: consumerDir });
        renameSync(
          join(consumerDir, "package"),
          join(consumerDir, "node_modules", "@inkline", "compiler"),
        );

        const entry = createRequire(join(consumerDir, "index.js")).resolve(
          "@inkline/compiler/testing",
        );
        const mod = (await import(entry)) as Record<string, unknown>;

        for (const name of DOCUMENTED_HARNESSES) {
          expect(mod[name], `${name} missing from @inkline/compiler/testing`).toBeTypeOf(
            "function",
          );
        }

        // Proves the shipped fixtures are reachable from the packed layout.
        const compileFixture = mod.compileFixture as (
          name: string,
          targets: readonly string[],
        ) => Promise<{ files: Record<string, { path: string }[]> }>;
        const compiled = await compileFixture("Counter", ["react"]);
        expect(compiled.files.react?.map((f) => f.path)).toEqual(["Counter.tsx"]);
      } finally {
        rmSync(consumerDir, { recursive: true, force: true });
      }
    },
  );
});
