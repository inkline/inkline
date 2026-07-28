import { defineCommand } from "citty";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { compile, resolveOptions } from "@inkline/compiler";
import { loadInklineConfig } from "../lib/config.ts";
import { buildCompileOptions, resolveOutDir, resolveTargets } from "../lib/compile-options.ts";
import { expandGlobs } from "../lib/glob.ts";
import { formatDiagnostic } from "../lib/diagnostics.ts";
import { EXIT_COMPILE_ERROR, EXIT_USAGE_ERROR, reportConfigError } from "../lib/errors.ts";

export default defineCommand({
  meta: { name: "check", description: "Run diagnostics without writing output" },
  args: {
    pattern: { type: "positional", description: "Glob pattern for .ink.tsx files", required: true },
    target: { type: "string", description: "Comma-separated targets" },
    config: { type: "string", description: "Path to config file" },
    verbose: {
      type: "boolean",
      description: "Include the stack trace in error output",
      default: false,
    },
  },
  async run({ args }) {
    const fileConfig = await loadInklineConfig(args.config);
    const verbose = args.verbose || fileConfig.verbose === true;
    const targets = resolveTargets(args.target, fileConfig);

    try {
      resolveOptions({ targets, registry: fileConfig.registry });
    } catch (err) {
      if (reportConfigError(err, verbose)) return;
      throw err;
    }

    const resolvedFiles = expandGlobs([...args._]);
    if (resolvedFiles.length === 0) {
      console.error("Error: no files matched the given patterns.");
      process.exitCode = EXIT_USAGE_ERROR;
      return;
    }

    // `check` writes nothing, so generating source maps would be pure waste — this is the one option
    // it is allowed to resolve differently from `compile`. Everything else comes from the shared
    // mapper so the diagnostics reported here are exactly the ones the build would report.
    const options = buildCompileOptions(fileConfig, {
      targets,
      outDir: resolveOutDir(undefined, fileConfig),
      sourceMap: "none",
      verbose,
    });

    let hasError = false;

    for (const filePath of resolvedFiles) {
      const absPath = resolve(filePath);
      const source = readFileSync(absPath, "utf-8");
      const result = await compile({ fileName: absPath, source }, options);

      for (const d of result.diagnostics) {
        console.error(formatDiagnostic(d));
        if (d.severity === "error") hasError = true;
      }
    }

    if (hasError) process.exitCode = EXIT_COMPILE_ERROR;
  },
});
