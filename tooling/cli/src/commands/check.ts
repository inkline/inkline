import { defineCommand } from "citty";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { compile, resolveOptions, type DiagnosticSeverity } from "@inkline/compiler";
import { loadInklineConfig } from "../lib/config.ts";
import { buildCompileOptions, resolveOutDir, resolveTargets } from "../lib/compile-options.ts";
import { expandGlobs } from "../lib/glob.ts";
import {
  DEFAULT_REPORT_LEVEL,
  createBuildReporter,
  formatBuildSummary,
  resolveReportLevel,
} from "../lib/report.ts";
import {
  EXIT_COMPILE_ERROR,
  EXIT_USAGE_ERROR,
  reportConfigError,
  reportUnusableConfig,
} from "../lib/errors.ts";

export default defineCommand({
  meta: { name: "check", description: "Run diagnostics without writing output" },
  args: {
    pattern: { type: "positional", description: "Glob pattern for .ink.tsx files", required: true },
    target: { type: "string", description: "Comma-separated targets" },
    config: { type: "string", description: "Path to config file" },
    /** Chain arg (config `reportLevel`); no default — see the args note in `compile.ts` for why. */
    "report-level": {
      type: "string",
      description:
        "Lowest diagnostic severity to report: error | warning | info (default: warning)",
    },
    /** Chain arg (config `verbose`); no default — see the args note in `compile.ts` for why. */
    verbose: {
      type: "boolean",
      description: "Include the stack trace in error output",
    },
  },
  async run({ args }) {
    const { config: fileConfig, valid } = await loadInklineConfig(args.config);
    if (!valid) {
      reportUnusableConfig();
      return;
    }

    // Same chain as `compile`: `??` so an omitted flag defers to the config and `--no-verbose` wins.
    const verbose = args.verbose ?? fileConfig.verbose === true;
    const targets = resolveTargets(args.target, fileConfig);

    // Resolved together, and before any file is read, so a misspelled target and a misspelled level
    // land on the same path: a formatted diagnostic with help and a docs URL, not a stack trace
    // through bundled compiler internals. `compile` resolves both here for the same reason.
    let reportLevel: DiagnosticSeverity;
    try {
      resolveOptions({ targets, registry: fileConfig.registry });
      reportLevel = resolveReportLevel(args["report-level"], fileConfig, DEFAULT_REPORT_LEVEL);
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
    // mapper, and the diagnostics are reported through the same `report.ts` reporter at the same
    // resolved level, so the findings printed here are exactly the ones the build would print.
    const options = buildCompileOptions(fileConfig, {
      targets,
      outDir: resolveOutDir(undefined, fileConfig),
      sourceMap: "none",
      verbose,
    });

    // One reporter for the whole run, as in `compile`: deduplication has to span files, because a
    // finding raised by several targets — or by several files — is still one call site to fix.
    const reporter = createBuildReporter(reportLevel);
    const startedAt = performance.now();

    for (const filePath of resolvedFiles) {
      const absPath = resolve(filePath);
      const source = readFileSync(absPath, "utf-8");
      const result = await compile({ fileName: absPath, source }, options);

      // Only this file's text is offered, so a diagnostic pointing elsewhere gets no code frame —
      // the same bag `compile` hands the reporter, and the same rendering falls out of it.
      reporter.report(result.diagnostics, new Map([[absPath, source]]));
    }

    // `check` inspects every file it matched — nothing here can fail to be checked — so unlike
    // `compile`'s count of files that got through, this is the whole glob.
    console.log(
      formatBuildSummary({
        verb: "Checked",
        fileCount: resolvedFiles.length,
        elapsedMs: performance.now() - startedAt,
        level: reportLevel,
        counts: reporter.counts,
        withheld: reporter.withheld,
      }),
    );

    // Read off the reporter, which sets this before filtering and deduplication: an error withheld
    // by the reporting level is still a failed check.
    if (reporter.hasError) process.exitCode = EXIT_COMPILE_ERROR;
  },
});
