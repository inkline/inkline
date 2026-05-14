import { execFile } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import type { GeneratedFile, TargetConformanceSpec } from "../codegen/context.ts";

export interface LintResult {
  readonly pass: boolean;
  readonly diagnostics: readonly Diagnostic[];
  readonly raw: string;
}

export async function lintEmittedForTarget(
  conformance: TargetConformanceSpec,
  files: readonly GeneratedFile[],
): Promise<LintResult> {
  if (files.length === 0) return { pass: true, diagnostics: [], raw: "" };

  const tmp = mkdtempSync(join(tmpdir(), "ink-lint-"));
  try {
    for (const file of files) {
      const dest = join(tmp, file.path);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, file.contents, "utf-8");
    }

    const configPath = resolve(conformance.lint.eslintConfig);
    const filePaths = files.map((f) => join(tmp, f.path));

    const raw = await runEslint(filePaths, configPath);
    if (raw === "") return { pass: true, diagnostics: [], raw };

    const diagnostics = parseEslintOutput(raw);
    return { pass: diagnostics.length === 0, diagnostics, raw };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function runEslint(files: string[], configPath: string): Promise<string> {
  return new Promise((resolve) => {
    execFile(
      "npx",
      ["eslint", "--no-eslintrc", "--config", configPath, "--format", "compact", ...files],
      { timeout: 30_000 },
      (err, stdout, stderr) => {
        resolve((stdout ?? "") + (stderr ?? ""));
      },
    );
  });
}

function parseEslintOutput(raw: string): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const lines = raw.split("\n").filter((l) => l.includes("Error -") || l.includes("Warning -"));

  for (const line of lines) {
    diagnostics.push({
      code: "INK0110",
      severity: line.includes("Error") ? "error" : "warning",
      title: `ESLint: ${line.trim()}`,
      url: "https://docs.inkline.dev/diagnostics/INK0110",
      loc: { file: "", line: 0, column: 0, offset: 0, length: 0 },
    });
  }

  return diagnostics;
}
