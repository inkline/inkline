import { expect } from "vitest";
import { builtinRegistry, type TargetName } from "@inkline/compiler";
import type { ComponentTestResult } from "./compile.ts";

export function assertConformance(result: ComponentTestResult): void {
  const failures: string[] = [];

  for (const [target, files] of Object.entries(result.files)) {
    if (!files || files.length === 0) continue;

    const targetDef = builtinRegistry.get(target as TargetName);
    if (!targetDef?.conformance?.invariants) continue;

    const codeFiles = files.filter((f) => !f.path.endsWith(".css") && !f.path.endsWith(".map"));

    for (const file of codeFiles) {
      for (const invariant of targetDef.conformance.invariants) {
        const diagnostics = invariant(file);
        for (const d of diagnostics) {
          failures.push(`[${target}] ${file.path}: ${d.title}`);
        }
      }
    }
  }

  if (failures.length > 0) {
    expect.fail(
      `Conformance failed with ${failures.length} violation(s):\n${failures.map((f) => `  ${f}`).join("\n")}`,
    );
  }
}
