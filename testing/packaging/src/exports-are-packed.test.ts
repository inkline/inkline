import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Every file a published package's `exports` map points at must actually be in the
 * tarball that publish would upload.
 *
 * This repo is where the regression it guards shipped. Five packages declared
 * `"./css": "./dist/index.css"` against a file no build step ever emitted, so
 * `import "@inkline/react/css"` — the one instruction the Installation page gives
 * every framework — died with `ERR_MODULE_NOT_FOUND` on a clean install (UXF-212,
 * inkline#598). Nothing caught it because nothing asserted the artifact existed:
 * `exports` is a promise the build is never asked to keep, and a green pipeline
 * proved only that the JS compiled.
 *
 * The assertion is deliberately about the tarball rather than `dist/`. A file can be
 * emitted and still not ship — `files`, `.npmignore` and the default include rules
 * all sit between the two, and the consumer only ever sees the far side.
 *
 * Needs a prior `pnpm run build`, so this package defines no `test` script and stays
 * out of the repo-wide `vp run -r test`; it runs as `test:build` from the Build
 * Packages CI job, against the `dist/` that job just produced.
 */

const workspaceRoot = fileURLToPath(new URL("../../../", import.meta.url));

/** Workspace globs from `pnpm-workspace.yaml` that contain publishable packages. */
const PACKAGE_GROUPS = ["core", "tooling", "ui"];

/**
 * Packages whose `exports` are known to be broken today, each with the issue tracking
 * it. Entries are asserted to still fail, so a fix cannot leave a stale waiver behind.
 */
const KNOWN_BROKEN: Record<string, string> = {
  // `vp pack` writes only `assets/` and `q-manifest.json` — none of the three
  // `dist/*.qwik.mjs` files `exports` names exist, so every subpath including `.` is
  // dead on install. Pre-existing and unrelated to UXF-212; tracked in UXF-236.
  "@inkline/qwik": "UXF-236",
};

interface PublishablePackage {
  name: string;
  dir: string;
  /** Every distinct file `exports` points at, relative to the package root. */
  exportTargets: string[];
}

/** Flattens an `exports` map into the set of `./`-relative files it can resolve to. */
function collectExportTargets(node: unknown, out: Set<string>): void {
  if (typeof node === "string") {
    if (node.startsWith("./")) out.add(node.slice(2));
    return;
  }

  if (node && typeof node === "object") {
    for (const value of Object.values(node)) collectExportTargets(value, out);
  }
}

function publishablePackages(): PublishablePackage[] {
  const packages: PublishablePackage[] = [];

  for (const group of PACKAGE_GROUPS) {
    for (const entry of readdirSync(join(workspaceRoot, group), { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;

      const dir = join(workspaceRoot, group, entry.name);
      let manifest: { name?: string; private?: boolean; exports?: unknown };

      try {
        manifest = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
      } catch {
        continue; // No manifest, or unreadable — not a package.
      }

      if (manifest.private === true || !manifest.name) continue;

      const targets = new Set<string>();
      collectExportTargets(manifest.exports, targets);
      if (targets.size === 0) continue;

      packages.push({ name: manifest.name, dir, exportTargets: [...targets].sort() });
    }
  }

  return packages.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * The file list a publish would upload. `pnpm`, not `npm`: `npm pack` cannot resolve
 * the workspace `catalog:` protocol and fails with `EUNSUPPORTEDPROTOCOL`.
 */
function packedFiles(dir: string): string[] {
  const stdout = execFileSync("pnpm", ["pack", "--dry-run", "--json"], {
    cwd: dir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });

  return (JSON.parse(stdout) as { files: { path: string }[] }).files.map((file) => file.path);
}

function missingExportTargets(pkg: PublishablePackage): string[] {
  const packed = new Set(packedFiles(pkg.dir));

  return pkg.exportTargets.filter((target) => !packed.has(target));
}

const packages = publishablePackages();

describe("published packages ship every file their exports point at", () => {
  it("finds the workspace packages to check", () => {
    // Guards the guard: a bad root or a renamed group would otherwise make this
    // whole file pass by checking nothing.
    expect(packages.map((pkg) => pkg.name)).toEqual(
      expect.arrayContaining([
        "@inkline/angular",
        "@inkline/astro",
        "@inkline/qwik",
        "@inkline/react",
        "@inkline/solid",
        "@inkline/svelte",
        "@inkline/vue",
      ]),
    );
  });

  for (const pkg of packages.filter((candidate) => !(candidate.name in KNOWN_BROKEN))) {
    it(`${pkg.name} (${pkg.exportTargets.length} targets)`, { timeout: 30_000 }, () => {
      expect(missingExportTargets(pkg)).toEqual([]);
    });
  }

  for (const pkg of packages.filter((candidate) => candidate.name in KNOWN_BROKEN)) {
    // `.fails` keeps the waiver honest: fix the package and this test starts passing,
    // which vitest reports as a failure until the KNOWN_BROKEN entry is deleted.
    it.fails(`${pkg.name} — known broken, ${KNOWN_BROKEN[pkg.name]}`, { timeout: 30_000 }, () => {
      expect(missingExportTargets(pkg)).toEqual([]);
    });
  }
});
