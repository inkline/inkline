import { execFile } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import type { Diagnostic } from "../core/diagnostics/codes.ts";
import type { GeneratedFile, TargetConformanceSpec } from "../codegen/context.ts";

export interface TypecheckResult {
  readonly pass: boolean;
  readonly diagnostics: readonly Diagnostic[];
  readonly raw: string;
}

export async function typecheckEmittedForTarget(
  conformance: TargetConformanceSpec,
  files: readonly GeneratedFile[],
): Promise<TypecheckResult> {
  if (files.length === 0) return { pass: true, diagnostics: [], raw: "" };

  const tmp = mkdtempSync(join(tmpdir(), "ink-typecheck-"));
  try {
    const emittedDir = join(tmp, "__emitted__");
    mkdirpSync(emittedDir);

    for (const file of files) {
      const dest = join(emittedDir, file.path);
      mkdirpSync(dirname(dest));
      writeFileSync(dest, file.contents, "utf-8");
    }

    const tsconfigSrc = resolve(conformance.typecheck.tsconfig);
    const tsconfigDest = join(tmp, "tsconfig.json");
    writeFileSync(
      tsconfigDest,
      JSON.stringify({
        extends: tsconfigSrc,
        compilerOptions: { noEmit: true },
        include: ["./__emitted__/**/*"],
      }),
      "utf-8",
    );

    const raw = await runTsc(tmp);
    if (raw === "") return { pass: true, diagnostics: [], raw };

    const diagnostics = parseTscOutput(raw, files);
    return { pass: diagnostics.length === 0, diagnostics, raw };
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function mkdirpSync(dir: string): void {
  const { mkdirSync } = require("node:fs") as typeof import("node:fs");
  mkdirSync(dir, { recursive: true });
}

function runTsc(cwd: string): Promise<string> {
  return new Promise((resolve) => {
    execFile(
      "npx",
      ["tsc", "--noEmit", "--pretty", "false"],
      { cwd, timeout: 30_000 },
      (err, stdout, stderr) => {
        resolve((stdout ?? "") + (stderr ?? ""));
      },
    );
  });
}

function parseTscOutput(raw: string, _files: readonly GeneratedFile[]): Diagnostic[] {
  const diagnostics: Diagnostic[] = [];
  const lines = raw.split("\n").filter((l) => l.includes("error TS"));

  for (const line of lines) {
    diagnostics.push({
      code: "INK0110",
      severity: "error",
      title: `TypeScript: ${line.trim()}`,
      url: "https://docs.inkline.dev/diagnostics/INK0110",
      loc: { file: "", line: 0, column: 0, offset: 0, length: 0 },
    });
  }

  return diagnostics;
}
