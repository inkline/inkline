import { execFile } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { createRequire } from "node:module";
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
  if (files.length === 0 || !conformance.lint.config) {
    return { pass: true, diagnostics: [], raw: "" };
  }

  const tmp = mkdtempSync(join(tmpdir(), "ink-lint-"));
  try {
    for (const file of files) {
      const dest = join(tmp, file.path);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, file.contents, "utf-8");
    }

    const filePaths = files.map((f) => join(tmp, f.path));

    if (conformance.lint.tool === "oxlint") {
      return await lintWithOxlint(conformance.lint.config, filePaths);
    }
    return await lintWithEslint(conformance.lint.config, filePaths, tmp);
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function resolveOxlintBin(): string {
  const require = createRequire(import.meta.url);
  const entry = require.resolve("oxlint");
  return join(dirname(dirname(entry)), "bin", "oxlint");
}

function lintWithOxlint(configPath: string, filePaths: string[]): Promise<LintResult> {
  const binPath = resolveOxlintBin();
  return new Promise((resolve) => {
    execFile(
      binPath,
      ["--config", configPath, "--format", "json", ...filePaths],
      { timeout: 30_000 },
      (_err, stdout, stderr) => {
        const raw = (stdout ?? "") + (stderr ?? "");
        try {
          const result = JSON.parse(stdout || "{}") as {
            diagnostics?: Array<{
              message: string;
              code: string;
              severity: string;
              filename: string;
              labels?: Array<{
                span?: { line?: number; column?: number; offset?: number; length?: number };
              }>;
            }>;
          };

          const diagnostics: Diagnostic[] = (result.diagnostics ?? [])
            .filter((d) => d.severity === "error" || d.severity === "warning")
            .map((d) => ({
              code: "INK0110" as const,
              severity: d.severity === "error" ? ("error" as const) : ("warning" as const),
              title: `oxlint: ${d.message}`,
              url: "https://docs.inkline.dev/diagnostics/INK0110",
              loc: {
                file: d.filename,
                line: d.labels?.[0]?.span?.line ?? 0,
                column: d.labels?.[0]?.span?.column ?? 0,
                offset: d.labels?.[0]?.span?.offset ?? 0,
                length: d.labels?.[0]?.span?.length ?? 0,
              },
            }));

          resolve({ pass: diagnostics.length === 0, diagnostics, raw });
        } catch {
          resolve({
            pass: raw === "",
            diagnostics: raw
              ? [
                  {
                    code: "INK0110",
                    severity: "error",
                    title: `oxlint: ${raw.trim()}`,
                    url: "https://docs.inkline.dev/diagnostics/INK0110",
                    loc: { file: "", line: 0, column: 0, offset: 0, length: 0 },
                  },
                ]
              : [],
            raw,
          });
        }
      },
    );
  });
}

async function lintWithEslint(
  configPath: string,
  filePaths: string[],
  cwd: string,
): Promise<LintResult> {
  const { ESLint } = (await import("eslint")) as { ESLint: typeof import("eslint").ESLint };
  const eslint = new ESLint({ overrideConfigFile: configPath, cwd });
  const results = await eslint.lintFiles(filePaths);

  const diagnostics: Diagnostic[] = [];
  for (const result of results) {
    for (const msg of result.messages) {
      diagnostics.push({
        code: "INK0110",
        severity: msg.severity === 2 ? "error" : "warning",
        title: `eslint(${msg.ruleId ?? "parse"}): ${msg.message}`,
        url: "https://docs.inkline.dev/diagnostics/INK0110",
        loc: {
          file: result.filePath,
          line: msg.line ?? 0,
          column: msg.column ?? 0,
          offset: 0,
          length: 0,
        },
      });
    }
  }

  const raw = diagnostics.map((d) => d.title).join("\n");
  return { pass: diagnostics.length === 0, diagnostics, raw };
}
