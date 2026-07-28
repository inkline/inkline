import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import { ALL_TARGETS, type GeneratedFile, type TargetName } from "../codegen/context.ts";
import { compile, type AnalyzedModule } from "../pipeline/compile.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// This module lives at `src/testing/` in the repo but at `dist/` once packed,
// while the fixtures ship under `src/__fixtures__` in both layouts.
const REPO_FIXTURES_DIR = resolve(__dirname, "..", "__fixtures__");
const PACKED_FIXTURES_DIR = resolve(__dirname, "..", "src", "__fixtures__");

export const FIXTURES_DIR: string = existsSync(REPO_FIXTURES_DIR)
  ? REPO_FIXTURES_DIR
  : PACKED_FIXTURES_DIR;

export interface CompiledFixture {
  readonly ir?: AnalyzedModule;
  readonly files: Readonly<Partial<Record<TargetName, readonly GeneratedFile[]>>>;
  readonly diagnostics: readonly Diagnostic[];
}

export async function compileFixture(
  name: string,
  targets: readonly TargetName[] = ALL_TARGETS,
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
