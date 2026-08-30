import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, expect } from "vitest";

import * as root from "./index.ts";
import * as ir from "./ir/index.ts";
import * as codegen from "./codegen/index.ts";
// Type-only, so it is `vp check` that enforces it rather than a runtime assertion: the `ir:post`
// hook hands a plugin author an `AnalyzedModule` whose `graphs` is a map of these. Closing that
// leak is the reason the `/ir` tier exists, so the import must keep resolving.
import type { ReactivityGraph } from "./ir/index.ts";

const packageDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");

interface PackageManifest {
  readonly exports: Readonly<Record<string, unknown>>;
  readonly inkline?: { readonly unstableExports?: readonly string[] };
}

const manifest = JSON.parse(
  readFileSync(join(packageDir, "package.json"), "utf-8"),
) as PackageManifest;

/**
 * The root's runtime exports, exhaustively.
 *
 * This is the guard the split exists for. `@inkline/compiler` carried 158 names; autocomplete
 * buried the real entry points in internals. Every IR builder, visitor and transform, every Code
 * IR builder, and every built-in target is a *value*, so any attempt to re-widen the root with
 * them fails here. Type-only names are invisible at runtime and are not covered — the docblock in
 * `index.ts` is what governs those.
 */
const ROOT_RUNTIME_EXPORTS = [
  "ALL_TARGETS",
  "DIAGNOSTICS",
  "InklineConfigError",
  "angularSelector",
  "builtinRegistry",
  "compile",
  "compileIncremental",
  "createDiagnosticCollector",
  "createIncrementalState",
  "defineConfig",
  "definePlugin",
  "isInklineConfigError",
  "meetsLevel",
  "resolveOptions",
  "seedIncrementalState",
] as const;

/** One representative value per subpath, checked through the packed tarball below. */
const SUBPATH_PROBES = {
  "./ir": { specifier: "@inkline/compiler/ir", name: "walkRenderTree" },
  "./codegen": { specifier: "@inkline/compiler/codegen", name: "defineTarget" },
  "./codemod": { specifier: "@inkline/compiler/codemod", name: "declareModels" },
} as const;

function names(mod: Record<string, unknown>): string[] {
  return Object.keys(mod)
    .filter((k) => k !== "default")
    .sort();
}

describe("@inkline/compiler entry points", () => {
  it("declares /ir, /codegen and /codemod in package.json exports", () => {
    expect(manifest.exports["./ir"]).toEqual({
      types: "./dist/ir.d.mts",
      default: "./dist/ir.mjs",
    });
    expect(manifest.exports["./codegen"]).toEqual({
      types: "./dist/codegen.d.mts",
      default: "./dist/codegen.mjs",
    });
    expect(manifest.exports["./codemod"]).toEqual({
      types: "./dist/codemod.d.mts",
      default: "./dist/codemod.mjs",
    });
  });

  // The tier is unstable for as long as `TargetName` is a closed union, and a docblock alone is
  // not machine-readable. Delete this expectation only when the extension point actually opens.
  it("marks /codegen unstable in package metadata", () => {
    expect(manifest.inkline?.unstableExports).toEqual(["./codegen"]);
  });

  it("keeps the root narrow", () => {
    expect(names(root)).toEqual([...ROOT_RUNTIME_EXPORTS].sort());
  });

  it("ships the moved names at their new paths rather than dropping them", () => {
    expect(names(ir)).toEqual(
      expect.arrayContaining([
        "walkRenderTree",
        "transform",
        "SymbolTable",
        "migrate",
        "serializeModule",
        "pipe",
      ]),
    );
    expect(names(codegen)).toEqual(
      expect.arrayContaining(["defineTarget", "createRegistry", "print", "cFile", "reactTarget"]),
    );
  });

  it("exposes ReactivityGraph so a plugin can name what ir:post hands it", () => {
    // `satisfies` would need a value; asserting the shape is enough to keep the type reachable.
    const graph: ReactivityGraph = {
      dependencies: new Map(),
      dependents: new Map(),
      topo: [],
      cycles: [],
    };
    expect(graph.topo).toEqual([]);
  });

  // Packaging can only be checked against a build. CI always builds before testing (the `test`
  // job downloads the `build` job's artifacts); an unbuilt local tree skips. Keyed on `dist/`
  // itself, so a build that stops emitting these entries fails rather than skips.
  it.skipIf(!existsSync(join(packageDir, "dist")))(
    "resolves both subpaths under the import and require conditions from a packed tarball",
    () => {
      // Staged under the package's own node_modules so peer dependencies still resolve by walking
      // up to the workspace root, as they do for a real consumer.
      const consumerDir = join(packageDir, "node_modules", ".entry-point-smoke");
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

        for (const [subpath, { specifier, name }] of Object.entries(SUBPATH_PROBES)) {
          // Run out of process with cwd inside the consumer so bare-specifier resolution picks the
          // real condition. `exports` declares only `default`, which both conditions land on — the
          // point is that neither one 404s on a missing map entry.
          const esm = execFileSync(
            process.execPath,
            [
              "--input-type=module",
              "-e",
              `const m = await import(${JSON.stringify(specifier)}); process.stdout.write(typeof m[${JSON.stringify(name)}]);`,
            ],
            { cwd: consumerDir, encoding: "utf-8" },
          );
          expect(esm, `${subpath} under the import condition`).toBe("function");

          const cjs = execFileSync(
            process.execPath,
            [
              "--input-type=commonjs",
              "-e",
              `const m = require(${JSON.stringify(specifier)}); process.stdout.write(typeof m[${JSON.stringify(name)}]);`,
            ],
            { cwd: consumerDir, encoding: "utf-8" },
          );
          expect(cjs, `${subpath} under the require condition`).toBe("function");
        }
      } finally {
        rmSync(consumerDir, { recursive: true, force: true });
      }
    },
    120_000,
  );
});
