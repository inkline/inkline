#!/usr/bin/env node

import { readFileSync, writeFileSync, mkdirSync, existsSync, watch, globSync } from "node:fs";
import { resolve, dirname, basename, extname } from "node:path";
import { compile } from "../pipeline/compile.ts";
import {
  compileIncremental,
  createIncrementalState,
  type IncrementalState,
} from "../pipeline/incremental.ts";
import type { InklineConfig } from "../core/options.ts";
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
    console.log(`Usage: inkline build <glob...> [options]

Options:
  --target <name>[,<name>...]  Comma-separated targets. Required unless set in config.
  --out-dir <path>             Default output directory. Default: dist.
  --source-map <mode>          external | inline | none. Default: external.
  --config <path>              Path to config file. Auto-detects inkline.config.{ts,js,mjs}.
  --verbose                    Verbose plugin error logs.
  --watch                      Watch .ink.tsx files and recompile on change.

Glob patterns (e.g. 'src/**/*.ink.tsx') are expanded by the CLI.
Per-target output directories can be set via targetOutDir in the config file.
A barrel index.ts is auto-generated in each target output directory.`);
    return;
  }
  if (command === "diagnose") {
    console.log(`Usage: inkline diagnose <file> [options]

Options:
  --target <name>[,<name>...]  Comma-separated targets. Default: all.
  --config <path>              Path to config file. Auto-detects inkline.config.{ts,js,mjs}.`);
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

function expandGlobs(patterns: string[]): string[] {
  const files: string[] = [];
  for (const pattern of patterns) {
    if (/[*?{[]/.test(pattern)) {
      const matches = globSync(pattern) as string[];
      files.push(...matches);
    } else {
      files.push(pattern);
    }
  }
  return files;
}

function resolveTargetDir(
  target: string,
  outDir: string,
  targetOutDir: Partial<Record<string, string>>,
): string {
  return resolve(targetOutDir[target] ?? `${outDir}/${target}`);
}

interface BarrelEntry {
  readonly componentName: string;
  readonly fileName: string;
  readonly target: TargetName;
}

const DEFAULT_EXPORT_TARGETS: ReadonlySet<TargetName> = new Set([
  "solid",
  "vue",
  "svelte",
  "astro",
]);

function generateBarrel(entries: BarrelEntry[]): string {
  const sorted = [...entries].sort((a, b) => a.componentName.localeCompare(b.componentName));
  return (
    sorted
      .map((e) => {
        if (DEFAULT_EXPORT_TARGETS.has(e.target)) {
          return `export { default as ${e.componentName} } from './${e.fileName}';`;
        }
        if (e.target === "angular") {
          return `export { ${e.componentName}Component as ${e.componentName} } from './${e.fileName}';`;
        }
        return `export { ${e.componentName} } from './${e.fileName}';`;
      })
      .join("\n") + "\n"
  );
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

const CONFIG_NAMES = ["inkline.config.ts", "inkline.config.js", "inkline.config.mjs"];

async function loadConfig(explicitPath?: string): Promise<Partial<InklineConfig>> {
  let configPath: string | undefined;

  if (explicitPath) {
    configPath = resolve(explicitPath);
    if (!existsSync(configPath)) {
      console.error(`Config file not found: ${configPath}`);
      return {};
    }
  } else {
    for (const name of CONFIG_NAMES) {
      const candidate = resolve(process.cwd(), name);
      if (existsSync(candidate)) {
        configPath = candidate;
        break;
      }
    }
  }

  if (!configPath) return {};

  try {
    const mod = (await import(configPath)) as { default?: Partial<InklineConfig> };
    return mod.default ?? {};
  } catch (err) {
    console.error(
      `Failed to load config from ${configPath}: ${err instanceof Error ? err.message : err}`,
    );
    return {};
  }
}

async function runBuild(files: string[], flags: Record<string, string>): Promise<number> {
  const fileConfig = await loadConfig(flags.config);

  const targetStr = flags.target ?? fileConfig.targets?.join(",");
  if (!targetStr) {
    console.error("Error: --target is required (or set targets in config file).");
    return 2;
  }

  const targets = targetStr.split(",").map((t) => t.trim()) as TargetName[];
  const outDir = flags["out-dir"] ?? fileConfig.outDir ?? "dist";
  const targetOutDir = fileConfig.targetOutDir ?? {};
  const sourceMap = (flags["source-map"] ?? fileConfig.sourceMap ?? "external") as
    | "external"
    | "inline"
    | "none";
  const verbose = flags.verbose === "true" || fileConfig.verbose === true;

  const resolvedFiles = expandGlobs(files);
  if (resolvedFiles.length === 0) {
    console.error("Error: no files matched the given patterns.");
    return 2;
  }

  let hasError = false;
  const barrelEntries = new Map<string, BarrelEntry[]>();

  for (const filePath of resolvedFiles) {
    const absPath = resolve(filePath);
    const source = readFileSync(absPath, "utf-8");
    const name = basename(absPath, extname(absPath)).replace(/\.ink$/, "");

    const result = await compile(
      { fileName: absPath, source },
      {
        targets,
        outDir,
        sourceMap,
        verbose,
        plugins: fileConfig.plugins,
        targetOptions: fileConfig.targetOptions,
        registry: fileConfig.registry,
      },
    );

    for (const d of result.diagnostics) {
      console.error(formatDiagnostic(d));
      if (d.severity === "error") hasError = true;
    }

    for (const [target, targetFiles] of Object.entries(result.files)) {
      if (!targetFiles) continue;
      const targetDir = resolveTargetDir(target, outDir, targetOutDir);

      for (const file of targetFiles) {
        const fileName = basename(file.path);
        const outPath = resolve(targetDir, fileName);
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, file.contents, "utf-8");
        if (file.sourceMap && sourceMap === "external") {
          writeFileSync(`${outPath}.map`, file.sourceMap, "utf-8");
        }

        if (!file.path.endsWith(".css")) {
          const entries = barrelEntries.get(targetDir) ?? [];
          entries.push({ componentName: name, fileName, target: target as TargetName });
          barrelEntries.set(targetDir, entries);
        }
      }
    }
  }

  for (const [dir, entries] of barrelEntries) {
    const barrelPath = resolve(dir, "index.ts");
    writeFileSync(barrelPath, generateBarrel(entries), "utf-8");
  }

  if (flags.watch === "true") {
    return runWatch(resolvedFiles, targets, outDir, targetOutDir, sourceMap, verbose, fileConfig);
  }

  return hasError ? 1 : 0;
}

function runWatch(
  files: string[],
  targets: TargetName[],
  outDir: string,
  targetOutDir: Partial<Record<string, string>>,
  sourceMap: "external" | "inline" | "none",
  verbose: boolean,
  fileConfig: Partial<InklineConfig>,
): never {
  console.log(`Watching ${files.length} file(s) for changes...\n`);
  let state: IncrementalState = createIncrementalState();
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;

  const rebuild = async () => {
    const inputs = files.map((f) => {
      const absPath = resolve(f);
      return { fileName: absPath, source: readFileSync(absPath, "utf-8") };
    });

    const result = await compileIncremental(state, inputs, {
      targets,
      outDir,
      sourceMap,
      verbose,
      plugins: fileConfig.plugins,
      targetOptions: fileConfig.targetOptions,
      registry: fileConfig.registry,
    });

    state = result.nextState;

    for (const d of result.diagnostics) {
      console.error(formatDiagnostic(d));
    }

    const barrelEntries = new Map<string, BarrelEntry[]>();

    for (const [target, targetFiles] of Object.entries(result.files)) {
      if (!targetFiles) continue;
      const targetDir = resolveTargetDir(target, outDir, targetOutDir);

      for (const file of targetFiles) {
        const outPath = resolve(targetDir, file.path);
        mkdirSync(dirname(outPath), { recursive: true });
        writeFileSync(outPath, file.contents, "utf-8");
        if (file.sourceMap && sourceMap === "external") {
          writeFileSync(`${outPath}.map`, file.sourceMap, "utf-8");
        }

        if (!file.path.endsWith(".css")) {
          const componentName = basename(file.path).split(".")[0]!;
          const entries = barrelEntries.get(targetDir) ?? [];
          entries.push({ componentName, fileName: file.path, target: target as TargetName });
          barrelEntries.set(targetDir, entries);
        }
      }
    }

    for (const [dir, entries] of barrelEntries) {
      writeFileSync(resolve(dir, "index.ts"), generateBarrel(entries), "utf-8");
    }

    if (result.changed.length > 0) {
      console.log(`Rebuilt ${result.changed.length} file(s), skipped ${result.skipped.length}`);
    }
  };

  for (const filePath of files) {
    const absPath = resolve(filePath);
    watch(absPath, () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        rebuild().catch((err) => console.error("Rebuild error:", err));
      }, 100);
    });
  }

  return undefined as never;
}

async function runDiagnose(files: string[], flags: Record<string, string>): Promise<number> {
  const fileConfig = await loadConfig(flags.config);
  const targetStr = flags.target ?? fileConfig.targets?.join(",") ?? "react,solid,vue,svelte";
  const targets = targetStr.split(",").map((t) => t.trim()) as TargetName[];
  let hasError = false;

  for (const filePath of files) {
    const absPath = resolve(filePath);
    const source = readFileSync(absPath, "utf-8");
    const result = await compile(
      { fileName: absPath, source },
      { targets, sourceMap: "none", plugins: fileConfig.plugins, registry: fileConfig.registry },
    );

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
