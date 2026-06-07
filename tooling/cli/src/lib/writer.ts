import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, basename, join } from "node:path";
import type { BarrelGroup, CompileResult, TargetName } from "@inkline/compiler";
import { type BarrelMap, collectBarrelEntry, resolveTargetDir } from "./barrel.ts";

export function writeOutput(path: string, content: string): void {
  writeFileSync(path, content, "utf-8");
}

export function writeIfChanged(path: string, content: string): void {
  if (existsSync(path) && readFileSync(path, "utf-8") === content) return;
  writeOutput(path, content);
}

export function writeCompileOutput(
  result: CompileResult,
  componentName: string,
  outDir: string,
  targetOutDir: Partial<Record<string, string>>,
  sourceMap: "external" | "inline" | "none",
  barrelEntries: BarrelMap,
  namedGroups: readonly BarrelGroup[],
  relDir = "",
  write: (path: string, content: string) => void = writeIfChanged,
): void {
  for (const [target, targetFiles] of Object.entries(result.files)) {
    if (!targetFiles) continue;
    const targetDir = resolveTargetDir(target, outDir, targetOutDir);

    for (const file of targetFiles) {
      const fileName = basename(file.path);
      const outPath = resolve(targetDir, relDir, fileName);
      mkdirSync(dirname(outPath), { recursive: true });
      write(outPath, file.contents);
      if (file.sourceMap && sourceMap === "external") {
        write(`${outPath}.map`, file.sourceMap);
      }

      const relFileName = relDir ? join(relDir, fileName) : fileName;
      collectBarrelEntry(
        barrelEntries,
        targetDir,
        relDir,
        file.path,
        relFileName,
        componentName,
        target as TargetName,
        namedGroups,
      );
    }
  }
}
