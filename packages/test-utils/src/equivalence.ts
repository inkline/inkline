import { expect } from "vitest";
import type { TargetName } from "@inkline/compiler";
import type { ComponentTestResult } from "./compile.ts";
import { mountForTarget, isMountable, type MountResult } from "./mount.ts";
import { normalizeHtml } from "./normalize.ts";

export interface EquivalenceOptions {
  targets?: readonly TargetName[];
  props?: Record<string, unknown>;
  normalizeHtml?: (html: string) => string;
}

export interface EquivalenceResult {
  readonly equivalent: boolean;
  readonly htmlByTarget: Readonly<Partial<Record<TargetName, string>>>;
  readonly normalizedByTarget: Readonly<Partial<Record<TargetName, string>>>;
  readonly warnings: readonly string[];
}

export async function assertHtmlEquivalence(
  result: ComponentTestResult,
  options?: EquivalenceOptions,
): Promise<void> {
  const eq = await checkEquivalence(result, options);

  if (!eq.equivalent) {
    const entries = Object.entries(eq.normalizedByTarget);
    const detail = entries.map(([t, html]) => `  ${t}: ${html}`).join("\n");
    expect.fail(`HTML not equivalent across targets:\n${detail}`);
  }
}

export async function mountComponent(
  result: ComponentTestResult,
  target: TargetName,
  props?: Record<string, unknown>,
): Promise<MountResult> {
  const files = result.filesFor(target);
  const mainFile = files.find((f) => !f.path.endsWith(".css") && !f.path.endsWith(".map"));
  if (!mainFile) {
    throw new Error(`No main component file found for target "${target}"`);
  }
  return mountForTarget(target, mainFile, props);
}

async function checkEquivalence(
  result: ComponentTestResult,
  options?: EquivalenceOptions,
): Promise<EquivalenceResult> {
  const normalize = options?.normalizeHtml ?? normalizeHtml;
  const allTargets = (Object.keys(result.files) as TargetName[]).filter(isMountable);
  const targets = options?.targets ?? allTargets;

  const htmlByTarget: Partial<Record<TargetName, string>> = {};
  const normalizedByTarget: Partial<Record<TargetName, string>> = {};
  const allWarnings: string[] = [];

  for (const target of targets) {
    const files = result.files[target];
    if (!files || files.length === 0) continue;

    const mainFile = files.find((f) => !f.path.endsWith(".css") && !f.path.endsWith(".map"));
    if (!mainFile) continue;

    try {
      const mounted = await mountForTarget(target, mainFile, options?.props);
      htmlByTarget[target] = mounted.html;
      normalizedByTarget[target] = normalize(mounted.html);
      allWarnings.push(...mounted.warnings.map((w) => `[${target}] ${w}`));
    } catch {
      htmlByTarget[target] = `<!-- mount error for ${target} -->`;
      normalizedByTarget[target] = "";
    }
  }

  const normalizedValues = Object.values(normalizedByTarget).filter(Boolean);
  const equivalent =
    normalizedValues.length > 1 && normalizedValues.every((v) => v === normalizedValues[0]);

  return { equivalent, htmlByTarget, normalizedByTarget, warnings: allWarnings };
}
