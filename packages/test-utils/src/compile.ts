import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  compile,
  builtinRegistry,
  type CompileResult,
  type InklineConfig,
  type TargetName,
  type GeneratedFile,
  type Diagnostic,
} from "@inkline/compiler";

export interface ComponentTestResult {
  readonly result: CompileResult;
  readonly ok: boolean;
  readonly errors: readonly Diagnostic[];
  readonly diagnostics: readonly Diagnostic[];
  readonly files: CompileResult["files"];
  filesFor(target: TargetName): readonly GeneratedFile[];
}

export interface CompileComponentOptions {
  targets?: readonly TargetName[];
  config?: Partial<InklineConfig>;
}

function buildResult(result: CompileResult): ComponentTestResult {
  const errors = result.diagnostics.filter((d) => d.severity === "error");
  return {
    result,
    ok: errors.length === 0,
    errors,
    diagnostics: result.diagnostics,
    files: result.files,
    filesFor(target: TargetName): readonly GeneratedFile[] {
      const files = result.files[target];
      if (!files) {
        throw new Error(
          `No files generated for target "${target}". ` +
            `Available targets: ${Object.keys(result.files).join(", ") || "(none)"}`,
        );
      }
      return files;
    },
  };
}

export async function compileComponent(
  filePath: string,
  options?: CompileComponentOptions,
): Promise<ComponentTestResult> {
  const absolutePath = resolve(filePath);
  const source = readFileSync(absolutePath, "utf-8");

  const targets = options?.targets ?? builtinRegistry.list();

  const result = await compile(
    { fileName: absolutePath, source },
    { targets: [...targets], ...options?.config },
  );

  return buildResult(result);
}

export async function compileSource(
  source: string,
  options?: CompileComponentOptions & { fileName?: string },
): Promise<ComponentTestResult> {
  const fileName = options?.fileName ?? "Test.ink.tsx";
  const targets = options?.targets ?? builtinRegistry.list();

  const result = await compile({ fileName, source }, { targets: [...targets], ...options?.config });

  return buildResult(result);
}
