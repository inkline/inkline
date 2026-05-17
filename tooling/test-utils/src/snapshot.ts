import type { TargetName } from "@inkline/compiler";
import type { ComponentTestResult } from "./compile.ts";

export function snapshotOutput(
  result: ComponentTestResult,
  options?: { targets?: readonly TargetName[] },
): Record<string, string> {
  const output: Record<string, string> = {};
  const targets = options?.targets ?? (Object.keys(result.files) as TargetName[]);

  for (const target of targets) {
    const files = result.files[target];
    if (!files) continue;

    for (const file of files) {
      if (file.path.endsWith(".map")) continue;
      output[`${target}/${file.path}`] = file.contents;
    }
  }

  return output;
}
