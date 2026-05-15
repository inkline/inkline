import { expect } from "vitest";
import type { GeneratedFile, TargetName } from "@inkline/compiler";
import type { ComponentTestResult } from "./compile.ts";

const EXPECTED_EXTENSIONS: Record<TargetName, string> = {
  react: ".tsx",
  solid: ".tsx",
  qwik: ".tsx",
  vue: ".vue",
  svelte: ".svelte",
  angular: ".ts",
  astro: ".astro",
};

export function expectCompilationSuccess(result: ComponentTestResult): void {
  if (result.errors.length > 0) {
    const messages = result.errors.map((d) => `  [${d.code}] ${d.title}`).join("\n");
    expect.fail(`Compilation produced ${result.errors.length} error(s):\n${messages}`);
  }
}

export function expectDiagnostics(result: ComponentTestResult, codes: readonly string[]): void {
  const actual = result.diagnostics.map((d) => d.code);
  for (const code of codes) {
    expect(actual).toContain(code);
  }
}

export function expectNoDiagnostics(result: ComponentTestResult): void {
  if (result.diagnostics.length > 0) {
    const messages = result.diagnostics.map((d) => `  [${d.code}] ${d.title}`).join("\n");
    expect.fail(`Expected zero diagnostics, got ${result.diagnostics.length}:\n${messages}`);
  }
}

export function expectCorrectFileExtensions(result: ComponentTestResult): void {
  for (const [target, files] of Object.entries(result.files)) {
    if (!files || files.length === 0) continue;
    const expectedExt = EXPECTED_EXTENSIONS[target as TargetName];
    if (!expectedExt) continue;

    const mainFile = files.find((f) => !f.path.endsWith(".css") && !f.path.endsWith(".map"));
    if (mainFile) {
      expect(mainFile.path, `${target} main file should end with ${expectedExt}`).toMatch(
        new RegExp(`\\${expectedExt}$`),
      );
    }
  }
}

export function expectOutputContains(files: readonly GeneratedFile[], substring: string): void {
  const mainFile = files.find((f) => !f.path.endsWith(".css") && !f.path.endsWith(".map"));
  expect(mainFile, "Expected at least one non-CSS/sourcemap file").toBeDefined();
  expect(mainFile!.contents).toContain(substring);
}

export function expectOutputNotContains(files: readonly GeneratedFile[], substring: string): void {
  const mainFile = files.find((f) => !f.path.endsWith(".css") && !f.path.endsWith(".map"));
  expect(mainFile, "Expected at least one non-CSS/sourcemap file").toBeDefined();
  expect(mainFile!.contents).not.toContain(substring);
}

export function expectImports(
  files: readonly GeneratedFile[],
  module: string,
  names: readonly string[],
): void {
  const mainFile = files.find((f) => !f.path.endsWith(".css") && !f.path.endsWith(".map"));
  expect(mainFile, "Expected at least one non-CSS/sourcemap file").toBeDefined();

  for (const name of names) {
    const pattern = new RegExp(`import\\b[^;]*\\b${name}\\b[^;]*from\\s+["']${module}["']`);
    expect(mainFile!.contents, `Expected import { ${name} } from "${module}"`).toMatch(pattern);
  }
}
