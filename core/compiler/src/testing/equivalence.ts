import type { TargetName } from "../codegen/context.ts";
import { compileFixture } from "./harness.ts";
import { mountForTarget, type MountResult } from "./mount.ts";

export interface EquivalenceResult {
  readonly equivalent: boolean;
  readonly htmlByTarget: Readonly<Partial<Record<TargetName, string>>>;
  readonly normalizedByTarget: Readonly<Partial<Record<TargetName, string>>>;
  readonly warnings: readonly string[];
}

export async function runScenarioAcrossTargets(
  fixtureName: string,
  targets: readonly TargetName[] = ["react", "solid", "vue", "svelte"],
  props?: Record<string, unknown>,
): Promise<EquivalenceResult> {
  const compiled = await compileFixture(fixtureName, targets);
  const htmlByTarget: Partial<Record<TargetName, string>> = {};
  const normalizedByTarget: Partial<Record<TargetName, string>> = {};
  const allWarnings: string[] = [];

  for (const targetName of targets) {
    const files = compiled.files[targetName];
    if (!files || files.length === 0) continue;

    const mainFile = files[0]!;
    let result: MountResult;
    try {
      result = await mountForTarget(targetName, mainFile, props);
    } catch {
      htmlByTarget[targetName] = `<!-- mount error for ${targetName} -->`;
      normalizedByTarget[targetName] = "";
      continue;
    }

    htmlByTarget[targetName] = result.html;
    normalizedByTarget[targetName] = normalizeHtml(result.html);
    allWarnings.push(...result.warnings.map((w) => `[${targetName}] ${w}`));
  }

  const normalizedValues = Object.values(normalizedByTarget).filter(Boolean);
  const equivalent =
    normalizedValues.length > 1 && normalizedValues.every((v) => v === normalizedValues[0]);

  return { equivalent, htmlByTarget, normalizedByTarget, warnings: allWarnings };
}

function normalizeHtml(html: string): string {
  return html
    .replace(/\s+/g, " ")
    .replace(/\s*(<\/?[^>]+>)\s*/g, "$1")
    .replace(/\s([\w-]+)=""/g, " $1")
    .replace(/ (class|style)="([^"]*)"/g, (_, attr, val) => {
      const sorted = (val as string).split(/\s+/).filter(Boolean).sort().join(" ");
      return ` ${attr}="${sorted}"`;
    })
    .trim();
}
