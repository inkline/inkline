#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname, basename, extname } from "node:path";
import { compile } from "../pipeline/compile.ts";
import type { TargetName } from "../codegen/context.ts";
import type { Diagnostic } from "../core/diagnostics/codes.ts";

function printVersion(): void {
  const pkg = JSON.parse(
    readFileSync(resolve(import.meta.dirname!, "..", "..", "package.json"), "utf-8"),
  );
  console.log(`inkline v${pkg.version}`);
}

function printHelp(command?: string): void {
  if (command === "build") {
    console.log(`Usage: inkline build <glob> [options]

Options:
  --target <name>[,<name>...]  Comma-separated targets. Required.
  --out-dir <path>             Output directory. Default: dist.
  --source-map <mode>          external | inline | none. Default: external.
  --verbose                    Verbose plugin error logs.`);
    return;
  }
  if (command === "diagnose") {
    console.log(`Usage: inkline diagnose <file> [options]

Options:
  --target <name>[,<name>...]  Comma-separated targets. Default: all.`);
    return;
  }
  console.log(`Usage: inkline <command> [options]

Commands:
  build <glob>     Compile .ink.tsx files to target frameworks.
  diagnose <file>  Check a file for diagnostics without writing output.
  version          Print version.
  help [command]   Show help.`);
}

function formatDiagnostic(d: Diagnostic): string {
  const loc =
    d.loc.file !== "<unknown>" ? `${d.loc.file}:${d.loc.line}:${d.loc.column}` : "<unknown>";
  let msg = `${loc}  ${d.severity}  ${d.code}  ${d.title}`;
  if (d.help) msg += `\n    help: ${d.help}`;
  if (d.url) msg += `\n    docs: ${d.url}`;
  return msg;
}

function parseArgs(argv: string[]): {
  command: string;
  files: string[];
  flags: Record<string, string>;
} {
  const command = argv[0] ?? "help";
  const files: string[] = [];
  const flags: Record<string, string> = {};

  for (let i = 1; i < argv.length; i++) {
    const arg = argv[i]!;
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const val = argv[i + 1];
      if (val && !val.startsWith("--")) {
        flags[key] = val;
        i++;
      } else {
        flags[key] = "true";
      }
    } else {
      files.push(arg);
    }
  }

  return { command, files, flags };
}

async function runBuild(files: string[], flags: Record<string, string>): Promise<number> {
  const targetStr = flags.target;
  if (!targetStr) {
    console.error("Error: --target is required.");
    return 2;
  }

  const targets = targetStr.split(",").map((t) => t.trim()) as TargetName[];
  const outDir = flags["out-dir"] ?? "dist";
  const sourceMap = (flags["source-map"] ?? "external") as "external" | "inline" | "none";
  const verbose = flags.verbose === "true";

  let hasError = false;

  for (const filePath of files) {
    const absPath = resolve(filePath);
    const source = readFileSync(absPath, "utf-8");
    const name = basename(absPath, extname(absPath)).replace(/\.ink$/, "");

    const result = await compile(
      { fileName: absPath, source },
      { targets, outDir, sourceMap, verbose },
    );

    for (const d of result.diagnostics) {
      console.error(formatDiagnostic(d));
      if (d.severity === "error") hasError = true;
    }

    for (const [target, targetFiles] of Object.entries(result.files)) {
      if (!targetFiles) continue;
      for (const file of targetFiles) {
        const outPath = resolve(
          outDir,
          target,
          file.path.includes("/") ? basename(file.path) : `${name}${extname(file.path) || ".tsx"}`,
        );
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, file.contents, "utf-8");
        if (file.sourceMap && sourceMap === "external") {
          writeFileSync(`${outPath}.map`, file.sourceMap, "utf-8");
        }
      }
    }
  }

  return hasError ? 1 : 0;
}

async function runDiagnose(files: string[], flags: Record<string, string>): Promise<number> {
  const targetStr = flags.target ?? "react,solid,vue,svelte";
  const targets = targetStr.split(",").map((t) => t.trim()) as TargetName[];
  let hasError = false;

  for (const filePath of files) {
    const absPath = resolve(filePath);
    const source = readFileSync(absPath, "utf-8");
    const result = await compile({ fileName: absPath, source }, { targets, sourceMap: "none" });

    for (const d of result.diagnostics) {
      console.error(formatDiagnostic(d));
      if (d.severity === "error") hasError = true;
    }
  }

  return hasError ? 1 : 0;
}

async function main(): Promise<void> {
  const { command, files, flags } = parseArgs(process.argv.slice(2));

  try {
    let exitCode: number;

    switch (command) {
      case "build":
        exitCode = await runBuild(files, flags);
        break;
      case "diagnose":
        exitCode = await runDiagnose(files, flags);
        break;
      case "version":
        printVersion();
        exitCode = 0;
        break;
      case "help":
        printHelp(files[0]);
        exitCode = 0;
        break;
      default:
        console.error(`Unknown command: ${command}`);
        printHelp();
        exitCode = 2;
        break;
    }

    process.exitCode = exitCode;
  } catch (err) {
    console.error("Internal error:", err instanceof Error ? err.message : err);
    process.exitCode = 3;
  }
}

void main();
