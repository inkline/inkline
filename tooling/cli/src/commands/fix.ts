import { defineCommand } from "citty";
import { readFileSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { declareModels, type ModelEdit } from "@inkline/compiler/codemod";
import { expandGlobs } from "../lib/glob.ts";
import { EXIT_COMPILE_ERROR, EXIT_USAGE_ERROR } from "../lib/errors.ts";

/**
 * The write half of the diagnostics `check` reports. Today that is INK0094 alone: `options.models`
 * is machine-owned output derived from the setup body's `defineModel` calls, so the author never
 * writes or maintains it — this does, from the same facts the compiler extracts at parse.
 *
 * A fix is a command, never a build step: the bundler plugin compiles source, it does not mutate
 * it. The loop is the same shape as formatting — the check tells you, one command fixes it.
 */
export default defineCommand({
  meta: { name: "fix", description: "Rewrite authored files to satisfy the fixable diagnostics" },
  args: {
    pattern: { type: "positional", description: "Glob pattern for .ink.tsx files", required: true },
    check: {
      type: "boolean",
      description: "Report what would change and write nothing; exits non-zero if anything would",
    },
  },
  run({ args }) {
    const files = expandGlobs([...args._]);
    if (files.length === 0) {
      console.error("Error: no files matched the given patterns.");
      process.exitCode = EXIT_USAGE_ERROR;
      return;
    }

    const dryRun = args.check === true;
    let changed = 0;
    let editCount = 0;

    for (const file of files) {
      const absPath = resolve(file);
      const source = readFileSync(absPath, "utf-8");
      const { output, edits } = declareModels(absPath, source);
      if (edits.length === 0) continue;

      changed += 1;
      editCount += edits.length;
      if (!dryRun) writeFileSync(absPath, output, "utf-8");
      console.log(`${relative(process.cwd(), absPath)}  ${edits.map(describe).join(" ")}`);
    }

    if (changed === 0) {
      console.log(`Checked ${files.length} file(s); options.models is up to date.`);
      return;
    }

    console.log(
      `\n${dryRun ? "Would update" : "Updated"} ${changed} file(s), ${editCount} model declaration(s), ${files.length} scanned.`,
    );

    // Under `--check` the run found work that has not been done — the same failure a pre-commit
    // hook or a CI gate is asking about. Writing the files is a success, not a finding.
    if (dryRun) {
      console.error("Run `inkline fix` to apply these changes.");
      process.exitCode = EXIT_COMPILE_ERROR;
    }
  },
});

function describe(edit: ModelEdit): string {
  if (edit.kind === "add") return `+${edit.name}: ${edit.to}`;
  if (edit.kind === "remove") return `-${edit.name}`;
  return `~${edit.name}: ${edit.from}→${edit.to}`;
}
