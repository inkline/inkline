import { defineCommand } from "citty";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { compile, type TargetName } from "@inkline/compiler";
import { loadInklineConfig } from "../lib/config.ts";
import { formatDiagnostic } from "../lib/diagnostics.ts";

export default defineCommand({
  meta: { name: "check", description: "Run diagnostics without writing output" },
  args: {
    file: { type: "positional", description: "File to check", required: true },
    target: { type: "string", description: "Comma-separated targets" },
    config: { type: "string", description: "Path to config file" },
  },
  async run({ args }) {
    const fileConfig = await loadInklineConfig(args.config);
    const targetStr = args.target ?? fileConfig.targets?.join(",") ?? "react,solid,vue,svelte";
    const targets = targetStr.split(",").map((t) => t.trim()) as TargetName[];
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
        console.error(formatDiagnostic(d));
        if (d.severity === "error") hasError = true;
      }
    }

    if (hasError) process.exitCode = 1;
  },
});
