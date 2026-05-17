import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import type { GeneratedFile, TargetName } from "../codegen/context.ts";
import { compile, type AnalyzedModule } from "../pipeline/compile.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = resolve(__dirname, "..", "__fixtures__");

export interface CompiledFixture {
  readonly ir?: AnalyzedModule;
  readonly files: Readonly<Partial<Record<TargetName, readonly GeneratedFile[]>>>;
  readonly diagnostics: readonly Diagnostic[];
}

export async function compileFixture(
  name: string,
  targets: readonly TargetName[] = ["react", "solid", "vue", "svelte"],
): Promise<CompiledFixture> {
  const fileName = `${name}.ink.tsx`;
  const filePath = resolve(FIXTURES_DIR, fileName);
  const source = readFileSync(filePath, "utf-8");

  const result = await compile({ fileName: filePath, source }, { targets });

  return {
    ir: result.module,
    files: result.files,
    diagnostics: result.diagnostics,
  };
}
