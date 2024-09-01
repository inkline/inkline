#! /usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import { watch } from "./watch.mjs";
import { generateExports } from "./generate/index.mjs";
import { loadTsconfig, resolveImports } from "./resolve/index.mjs";
import path from "path";
program.name(chalk.blue("@inkline/build"));
program.command("watch").option(
  "-s, --script <script>",
  'The script to run when changes are detected. Defaults to "build"'
).option("-p, --pattern <pattern...>", "The pattern to be used", ["src"]).description("Watch for changes in the configuration file and generate files accordingly.").action(async (options) => {
  const patterns = options.pattern.map((pattern) => path.resolve(process.cwd(), pattern));
  await watch(patterns, options.script ? `pnpm run ${options.script}` : "");
});
program.command("generate:exports").description("Generate exports for the package.").action(async () => {
  await generateExports(process.cwd());
});
program.command("resolve:imports").description("Resolve imports for the package.").action(async () => {
  const baseDir = process.cwd();
  const tsconfig = loadTsconfig(baseDir, "tsconfig.json");
  await resolveImports(baseDir, tsconfig);
});
program.parse();
