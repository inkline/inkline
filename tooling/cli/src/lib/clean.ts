import { realpathSync } from "node:fs";
import { basename, dirname, isAbsolute, join, parse, relative, resolve } from "node:path";
import { resolveTargetDir } from "./barrel.ts";

/** True when `child` is a strict descendant of `parentDir` (equal paths are not "inside"). */
function isInside(parentDir: string, child: string): boolean {
  const rel = relative(parentDir, child);
  return rel !== "" && !rel.startsWith("..") && !isAbsolute(rel);
}

/**
 * `resolve` with symlinks followed, for a path that need not exist yet.
 *
 * Comparing `resolve()`d strings is comparing *spellings*, and a directory reachable by two names is
 * then only guarded under the one `process.cwd()` happens to report. macOS ships `/tmp` →
 * `/private/tmp` and `/var` → `/private/var`, so this is the default state of a Mac, not a contrived
 * setup: with a lexical comparison, `targetOutDir: { react: "/tmp/proj" }` sails past a guard that
 * refuses the identical `/private/tmp/proj`.
 *
 * `realpathSync` throws `ENOENT` on a path that is not there, and on a first build the target
 * directory usually is not — so walk up to the nearest ancestor that does resolve, canonicalise
 * that, and re-append the remainder. The remainder cannot itself be the working directory or the
 * root, because those exist.
 *
 * `.native` because on a case-insensitive volume it returns the case as stored on disk, which is
 * what makes `/Users/x/Proj` and `/users/x/proj` compare equal; the JS implementation preserves the
 * spelling it was given and would leave that hole open.
 *
 * Any failure walks up rather than throwing (`EACCES` and `ELOOP` as much as `ENOENT`): the fallback
 * is the lexical path, which is no worse than the comparison this replaces, and refusing to build
 * because one ancestor is unreadable would be a worse trade than the hole it closes.
 */
function toRealPath(path: string): string {
  const resolved = resolve(path);
  const missing: string[] = [];
  let current = resolved;

  for (;;) {
    try {
      const real = realpathSync.native(current);
      return missing.length === 0 ? real : join(real, ...missing);
    } catch {
      const parent = dirname(current);
      if (parent === current) return resolved;
      missing.unshift(basename(current));
      current = parent;
    }
  }
}

/**
 * Why `--clean` must not `rm -rf` this target directory, or `undefined` when it may. Every
 * comparison is made on real paths ({@link toRealPath}) — a guard decided on spelling is not a
 * guard.
 *
 * Two tiers, because `targetOutDir` is a documented per-target override and this repo's own
 * `ui/components/inkline.config.ts` points every target *outside* `outDir`:
 *
 * 1. A hard floor with no opt-out — the filesystem root, the working directory, or any ancestor of
 *    it. These are never an output tree, whoever named them and however they spelled it;
 *    `targetOutDir: { react: "" }` resolves to the working directory and used to take the sources
 *    and the config with it.
 * 2. The output tree must be a sane place and the target must be in it. Applied only to *derived*
 *    `outDir/<target>` paths: an explicit `targetOutDir` entry is the user naming a directory on
 *    purpose, so it is exempt from this tier and still cleans normally — but never from tier 1.
 *
 * Only tier 2 can be escaped, and only by saying where the output goes.
 */
export function cleanRefusalReason(
  dir: string,
  outDir: string,
  isExplicitOverride: boolean,
  cwd: string = process.cwd(),
): string | undefined {
  // Relative paths resolve against the *lexical* cwd, because that is what the process does; the
  // canonical form is for comparing only.
  const lexicalCwd = resolve(cwd);
  const realCwd = toRealPath(lexicalCwd);
  const realDir = toRealPath(resolve(lexicalCwd, dir));

  if (realDir === parse(realDir).root) return "it is the filesystem root";
  if (realDir === realCwd) return "it is the current working directory";
  if (isInside(realDir, realCwd)) return "it contains the current working directory";

  if (isExplicitOverride) return undefined;

  const realOutDir = toRealPath(resolve(lexicalCwd, outDir));

  // The same floor, applied to the tree the path was derived from. Without it `outDir: "/"` cleans
  // `/react` while `outDir: ""` — whose target resolves to the identical `/react` — is refused:
  // one delete target, two verdicts, decided by spelling again. `outDir` may still *be* the working
  // directory (that is `outDir: "."`, and `./<target>` is a normal place to build into); it may not
  // be the root or sit above the project.
  if (realOutDir === parse(realOutDir).root) return "the output directory is the filesystem root";
  if (isInside(realOutDir, realCwd)) {
    return "the output directory contains the current working directory";
  }

  // Containment is the weakest of these checks — `outDir/<target>` is inside `outDir` by
  // construction — and earns its place on the one input that escapes: `outDir: ""` concatenates to
  // an absolute `/<target>`, outside the project entirely.
  if (!isInside(realOutDir, realDir)) {
    return `it is outside the output directory (${realOutDir})`;
  }

  return undefined;
}

export type CleanPlan = { readonly dirs: string[] } | { readonly error: string };

/**
 * Vet every target directory `--clean` is about to remove, and only then hand back the list.
 *
 * All-or-nothing on purpose: `rmSync(…, { recursive: true, force: true })` does not ask twice, so
 * checking inside the removal loop would still cost the user every target listed before the bad
 * one. A refusal is a message and a non-zero exit, never a silent skip — a `--clean` that quietly
 * declined to clean would resurface later as stale output nobody can explain.
 *
 * The returned paths are the lexical ones, which is what `rmSync` should be given: removing a
 * symlinked target directory unlinks the link rather than its contents, while the verdict was
 * reached on what the link points at. Judging the more dangerous of the two is the safe asymmetry.
 */
export function planClean(
  targets: readonly string[],
  outDir: string,
  targetOutDir: Partial<Record<string, string>>,
  cwd: string = process.cwd(),
): CleanPlan {
  const dirs: string[] = [];

  for (const target of targets) {
    const override = targetOutDir[target];
    const dir = resolveTargetDir(target, outDir, targetOutDir, cwd);
    const reason = cleanRefusalReason(dir, outDir, override !== undefined, cwd);

    if (reason !== undefined) {
      const source =
        override !== undefined
          ? `targetOutDir.${target} = ${JSON.stringify(override)}`
          : `outDir = ${JSON.stringify(outDir)}`;
      // Show the real path whenever it differs: the whole point of a refusal on `/tmp/proj` is that
      // the user cannot see it is `/private/tmp/proj` without being told.
      const realDir = toRealPath(dir);
      const shown = realDir === dir ? dir : `${dir} (real path ${realDir})`;
      return {
        error:
          `Error: refusing to clean the output directory for target "${target}": ` +
          `${shown} — ${reason}.\n` +
          `  Resolved from ${source}.\n` +
          `  Nothing was deleted. Point it at a real output directory, or pass --no-clean.`,
      };
    }

    dirs.push(dir);
  }

  return { dirs };
}
