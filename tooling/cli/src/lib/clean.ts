import { isAbsolute, parse, relative, resolve } from "node:path";
import { resolveTargetDir } from "./barrel.ts";

/** True when `child` is a strict descendant of `parentDir` (equal paths are not "inside"). */
function isInside(parentDir: string, child: string): boolean {
  const rel = relative(parentDir, child);
  return rel !== "" && !rel.startsWith("..") && !isAbsolute(rel);
}

/**
 * Why `--clean` must not `rm -rf` this resolved target directory, or `undefined` when it may.
 *
 * Two tiers, because `targetOutDir` is a documented per-target override and this repo's own
 * `ui/components/inkline.config.ts` points every target *outside* `outDir`:
 *
 * 1. A hard floor with no opt-out — the filesystem root, the working directory, or any ancestor of
 *    it. These are never an output tree, whoever named them; `targetOutDir: { react: "" }` resolves
 *    to the working directory and used to take the sources and the config with it.
 * 2. Containment in the resolved `outDir`, applied only to *derived* `outDir/target` paths. An
 *    explicit `targetOutDir` entry is the user naming a directory on purpose, so it is exempt from
 *    this tier and still cleans normally — but never from tier 1.
 *
 * Only tier 2 can be escaped, and only by saying where the output goes.
 */
export function cleanRefusalReason(
  dir: string,
  outDir: string,
  isExplicitOverride: boolean,
  cwd: string = process.cwd(),
): string | undefined {
  // Resolved against `cwd` rather than through the bare `resolve()` overload so that both sides of
  // every comparison below share one base — a test (or a future caller) that supplies a working
  // directory gets an answer about *that* directory, not about the process's.
  const resolvedCwd = resolve(cwd);
  const resolvedDir = resolve(resolvedCwd, dir);

  if (resolvedDir === parse(resolvedDir).root) return "it is the filesystem root";
  if (resolvedDir === resolvedCwd) return "it is the current working directory";
  if (isInside(resolvedDir, resolvedCwd)) return "it contains the current working directory";

  if (isExplicitOverride) return undefined;

  const resolvedOutDir = resolve(resolvedCwd, outDir);
  if (!isInside(resolvedOutDir, resolvedDir)) {
    return `it is outside the output directory (${resolvedOutDir})`;
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
      return {
        error:
          `Error: refusing to clean the output directory for target "${target}": ` +
          `${dir} — ${reason}.\n` +
          `  Resolved from ${source}.\n` +
          `  Nothing was deleted. Point it at a real output directory, or pass --no-clean.`,
      };
    }

    dirs.push(dir);
  }

  return { dirs };
}
