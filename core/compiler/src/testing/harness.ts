import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import { ALL_TARGETS, type GeneratedFile, type TargetName } from "../codegen/context.ts";
import { compile, type AnalyzedModule } from "../pipeline/compile.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// This module lives at `src/testing/` in the repo but at `dist/` once packed, so every
// path anchored here needs both layouts. The fixtures ship under `src/__fixtures__` in
// the tarball, which puts them one level up only in the repo — that tells the two apart.
const IS_REPO_LAYOUT = existsSync(resolve(__dirname, "..", "__fixtures__"));

export const PACKAGE_ROOT: string = IS_REPO_LAYOUT
  ? resolve(__dirname, "..", "..")
  : resolve(__dirname, "..");

export const FIXTURES_DIR: string = IS_REPO_LAYOUT
  ? resolve(__dirname, "..", "__fixtures__")
  : resolve(PACKAGE_ROOT, "src", "__fixtures__");

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
  if (!existsSync(filePath)) {
    throw new Error(
      `Fixture "${fileName}" not found in ${FIXTURES_DIR}. ` +
        `Fixtures ship with @inkline/compiler under src/__fixtures__; ` +
        `an empty directory means the package was built without them.`,
    );
  }
  const source = readFileSync(filePath, "utf-8");

  const result = await compile({ fileName: filePath, source }, { targets });

  return {
    ir: result.module,
    files: result.files,
    diagnostics: result.diagnostics,
  };
}
