import { resolve } from "node:path";
import type { TargetName } from "@inkline/compiler";

export interface BarrelEntry {
  readonly componentName: string;
  readonly fileName: string;
  readonly target: TargetName;
}

const DEFAULT_EXPORT_TARGETS: ReadonlySet<TargetName> = new Set([
  "solid",
  "vue",
  "svelte",
  "astro",
]);

/**
 * Story render files live under a `stories/` directory (e.g. `components/input/stories/colors.ink.tsx`).
 * They must be compiled and emitted — the generated `.stories.ts` import them by relative path — but
 * never re-exported from the barrel, where their generic names (`colors`, `sizes`, …) collide.
 */
export function isStoryRelDir(relDir: string): boolean {
  return relDir.split(/[/\\]/).includes("stories");
}

export function resolveTargetDir(
  target: string,
  outDir: string,
  targetOutDir: Partial<Record<string, string>>,
): string {
  return resolve(targetOutDir[target] ?? `${outDir}/${target}`);
}

export function generateBarrel(entries: BarrelEntry[]): string {
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
