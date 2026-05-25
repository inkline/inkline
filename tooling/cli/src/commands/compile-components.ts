import { defineCommand } from "citty";
import { readFileSync, mkdirSync, watch } from "node:fs";
import { resolve, basename, extname, dirname, join } from "node:path";
import {
  compile,
  compileIncremental,
  createIncrementalState,
  type TargetName,
  type IncrementalState,
} from "@inkline/compiler";
import { loadInklineConfig } from "../lib/config.ts";
import { expandGlobs } from "../lib/glob.ts";
import { commonPrefix } from "../lib/common-prefix.ts";
import { generateBarrel, resolveTargetDir, type BarrelEntry } from "../lib/barrel.ts";
import { formatDiagnostic } from "../lib/diagnostics.ts";
import { writeIfChanged } from "../lib/writer.ts";
import { writeCompileOutput } from "../lib/writer.ts";

export default defineCommand({
  meta: { name: "components", description: "Compile .ink.tsx files to target frameworks" },
  args: {
    pattern: { type: "positional", description: "Glob pattern for .ink.tsx files", required: true },
    target: { type: "string", description: "Comma-separated targets" },
    "out-dir": { type: "string", description: "Default output directory", default: "dist" },
    "source-map": { type: "string", description: "external | inline | none", default: "external" },
    config: { type: "string", description: "Path to config file" },
    verbose: { type: "boolean", description: "Verbose plugin error logs", default: false },
    watch: { type: "boolean", description: "Watch and recompile on change", default: false },
  },
  async run({ args }) {
    const fileConfig = await loadInklineConfig(args.config);

    const targetStr = args.target ?? fileConfig.targets?.join(",");
    if (!targetStr) {
      console.error("Error: --target is required (or set targets in config file).");
      process.exitCode = 2;
      return;
    }

    const targets = targetStr.split(",").map((t) => t.trim()) as TargetName[];
    const outDir = fileConfig.outDir ?? args["out-dir"] ?? "dist";
    const targetOutDir = fileConfig.targetOutDir ?? {};
    const sourceMap = (args["source-map"] ?? fileConfig.sourceMap ?? "external") as
      | "external"
      | "inline"
      | "none";
    const verbose = args.verbose || fileConfig.verbose === true;

    const resolvedFiles = expandGlobs([...args._]);
    if (resolvedFiles.length === 0) {
      console.error("Error: no files matched the given patterns.");
      process.exitCode = 2;
      return;
    }

    let hasError = false;
    const barrelEntries = new Map<string, BarrelEntry[]>();
    const sourcePrefix = commonPrefix(resolvedFiles.map((f) => dirname(f)));

    for (const filePath of resolvedFiles) {
      const absPath = resolve(filePath);
      const source = readFileSync(absPath, "utf-8");
      const name = basename(absPath, extname(absPath)).replace(/\.ink$/, "");
      const relDir = dirname(filePath).slice(sourcePrefix.length);

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

      writeCompileOutput(result, name, outDir, targetOutDir, sourceMap, barrelEntries, relDir);
    }

    for (const [dir, entries] of barrelEntries) {
      const barrelPath = resolve(dir, "index.ts");
      writeIfChanged(barrelPath, generateBarrel(entries));
    }

    if (args.watch) {
      runWatch(resolvedFiles, targets, outDir, targetOutDir, sourceMap, verbose, fileConfig);
      return;
    }

    if (hasError) process.exitCode = 1;
  },
});

function runWatch(
  files: string[],
  targets: TargetName[],
  outDir: string,
  targetOutDir: Partial<Record<string, string>>,
  sourceMap: "external" | "inline" | "none",
  verbose: boolean,
  fileConfig: Partial<import("@inkline/compiler").InklineConfig>,
): void {
  console.log(`Watching ${files.length} file(s) for changes...\n`);
  let state: IncrementalState = createIncrementalState();
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  const sourcePrefix = commonPrefix(files.map((f) => dirname(f)));

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

    for (const [sourceFile, compileResult] of result.nextState.results) {
      const relDir = dirname(sourceFile).slice(resolve(sourcePrefix).length + 1);

      for (const [target, targetFiles] of Object.entries(compileResult.files)) {
        if (!targetFiles) continue;
        const targetDir = resolveTargetDir(target, outDir, targetOutDir);

        for (const file of targetFiles) {
          const outPath = resolve(targetDir, relDir, file.path);
          mkdirSync(dirname(outPath), { recursive: true });
          writeIfChanged(outPath, file.contents);
          if (file.sourceMap && sourceMap === "external") {
            writeIfChanged(`${outPath}.map`, file.sourceMap);
          }

          if (!file.path.endsWith(".css")) {
            const componentName = basename(file.path).split(".")[0]!;
            const relFileName = relDir ? join(relDir, file.path) : file.path;
            const entries = barrelEntries.get(targetDir) ?? [];
            entries.push({ componentName, fileName: relFileName, target: target as TargetName });
            barrelEntries.set(targetDir, entries);
          }
        }
      }
    }

    for (const [dir, entries] of barrelEntries) {
      writeIfChanged(resolve(dir, "index.ts"), generateBarrel(entries));
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
}
