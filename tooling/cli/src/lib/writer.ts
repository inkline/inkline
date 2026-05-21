import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname, basename } from "node:path";
import type { CompileResult, TargetName } from "@inkline/compiler";
import { type BarrelEntry, resolveTargetDir } from "./barrel.ts";

export function writeCompileOutput(
  result: CompileResult,
  componentName: string,
  outDir: string,
  targetOutDir: Partial<Record<string, string>>,
  sourceMap: "external" | "inline" | "none",
  barrelEntries: Map<string, BarrelEntry[]>,
): void {
  for (const [target, targetFiles] of Object.entries(result.files)) {
    if (!targetFiles) continue;
    const targetDir = resolveTargetDir(target, outDir, targetOutDir);

    for (const file of targetFiles) {
      const fileName = basename(file.path);
      const outPath = resolve(targetDir, fileName);
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, file.contents, "utf-8");
      if (file.sourceMap && sourceMap === "external") {
        writeFileSync(`${outPath}.map`, file.sourceMap, "utf-8");
      }

      if (!file.path.endsWith(".css")) {
        const entries = barrelEntries.get(targetDir) ?? [];
        entries.push({ componentName, fileName, target: target as TargetName });
        barrelEntries.set(targetDir, entries);
      }
    }
  }
}
