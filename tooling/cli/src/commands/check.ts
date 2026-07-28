import { defineCommand } from "citty";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { compile, resolveOptions, type TargetName } from "@inkline/compiler";
import { loadInklineConfig } from "../lib/config.ts";
import { formatDiagnostic } from "../lib/diagnostics.ts";
import { EXIT_COMPILE_ERROR, reportConfigError } from "../lib/errors.ts";

export default defineCommand({
  meta: { name: "check", description: "Run diagnostics without writing output" },
  args: {
    file: { type: "positional", description: "File to check", required: true },
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
    const targetStr = args.target ?? fileConfig.targets?.join(",") ?? "react,solid,vue,svelte";
    const targets = targetStr
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean) as TargetName[];

    try {
      resolveOptions({ targets, registry: fileConfig.registry });
    } catch (err) {
      if (reportConfigError(err, verbose)) return;
      throw err;
    }

    let hasError = false;

    const files = [...args._];
    for (const filePath of files) {
      const absPath = resolve(filePath);
      const source = readFileSync(absPath, "utf-8");
      const result = await compile(
        { fileName: absPath, source },
        { targets, sourceMap: "none", plugins: fileConfig.plugins, registry: fileConfig.registry },
      );

      for (const d of result.diagnostics) {
        console.error(formatDiagnostic(d, { source: d.loc.file === absPath ? source : undefined }));
        if (d.severity === "error") hasError = true;
      }
    }

    if (hasError) process.exitCode = EXIT_COMPILE_ERROR;
  },
});
