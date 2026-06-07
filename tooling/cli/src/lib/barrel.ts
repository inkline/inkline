import { resolve } from "node:path";
import type { BarrelGroup, TargetName } from "@inkline/compiler";

export interface BarrelEntry {
  readonly componentName: string;
  readonly fileName: string;
  readonly target: TargetName;
}

/** Collected barrel entries, keyed by target output directory, then by barrel file name. */
export type BarrelMap = Map<string, Map<string, BarrelEntry[]>>;

const DEFAULT_EXPORT_TARGETS: ReadonlySet<TargetName> = new Set([
  "solid",
  "vue",
  "svelte",
  "astro",
]);

/** Suffix appended to a component name when it is namespace-re-exported (e.g. `IButtonStories`). */
const NAMESPACE_SUFFIX = "Stories";

/**
 * Story render files live under a `stories/` directory (e.g. `components/input/stories/colors.ink.tsx`).
 * They must be compiled and emitted — the generated `.stories.ts` import them by relative path — but
 * never re-exported from a named barrel, where their generic names (`colors`, `sizes`, …) collide.
 */
export function isStoryRelDir(relDir: string): boolean {
  return relDir.split(/[/\\]/).includes("stories");
}

/**
 * Find the first barrel group that claims a compiled file living in `relDir`. A group matches when its
 * `match` segment appears as a path segment of `relDir`. The empty-string sentinel `""` matches any
 * non-story directory, reproducing the legacy "single index.ts of every component" behaviour.
 */
export function matchBarrelGroup(
  relDir: string,
  groups: readonly BarrelGroup[],
): BarrelGroup | undefined {
  const segments = relDir.split(/[/\\]/);
  return groups.find((group) =>
    group.match === "" ? !isStoryRelDir(relDir) : segments.includes(group.match),
  );
}

export function resolveTargetDir(
  target: string,
  outDir: string,
  targetOutDir: Partial<Record<string, string>>,
): string {
  return resolve(targetOutDir[target] ?? `${outDir}/${target}`);
}

/**
 * Route a single emitted file into the right named barrel. CSS artifacts and files that match no named
 * group (e.g. story render files) are skipped. Shared by the one-shot writer and the watch-mode rebuild
 * so the two paths can never diverge on which barrel a file belongs to.
 */
export function collectBarrelEntry(
  map: BarrelMap,
  targetDir: string,
  relDir: string,
  filePath: string,
  relFileName: string,
  componentName: string,
  target: TargetName,
  namedGroups: readonly BarrelGroup[],
): void {
  if (filePath.endsWith(".css")) return;
  const group = matchBarrelGroup(relDir, namedGroups);
  if (!group) return;
  const byFile = map.get(targetDir) ?? new Map<string, BarrelEntry[]>();
  const entries = byFile.get(group.file) ?? [];
  entries.push({ componentName, fileName: relFileName, target });
  byFile.set(group.file, entries);
  map.set(targetDir, byFile);
}

export function generateNamedBarrel(entries: BarrelEntry[]): string {
  const sorted = [...entries].sort((a, b) => a.componentName.localeCompare(b.componentName));
  return (
    sorted
      .map((e) => {
        if (DEFAULT_EXPORT_TARGETS.has(e.target)) {
          return `export { default as ${e.componentName} } from './${e.fileName}';`;
        }
        if (e.target === "angular") {
          return `export { ${e.componentName}Component as ${e.componentName} } from './${e.fileName}';`;
        }
        return `export { ${e.componentName} } from './${e.fileName}';`;
      })
      .join("\n") + "\n"
  );
}

/**
 * Generate a namespace barrel re-exporting whole modules under a per-component alias, e.g.
 * `export * as IButtonStories from './…/IButton.stories.ts';`. Used for stories, whose named exports
 * (`Default`, `Colors`, …) collide across components and so cannot be flat-re-exported.
 */
export function generateNamespaceBarrel(entries: BarrelEntry[]): string {
  const sorted = [...entries].sort((a, b) => a.componentName.localeCompare(b.componentName));
  return (
    sorted
      .map((e) => `export * as ${e.componentName}${NAMESPACE_SUFFIX} from './${e.fileName}';`)
      .join("\n") + "\n"
  );
}
