#! /usr/bin/env node
import chalk from "chalk";
import { program } from "commander";
import { watch } from "./watch.mjs";
import { generateExports } from "./generate/index.mjs";
program.name(chalk.blue("@inkline/build"));
program.command("watch").option(
  "-s, --script <script>",
  'The script to run when changes are detected. Defaults to "build"'
).description("Watch for changes in the configuration file and generate files accordingly.").action(async (options) => {
  await watch(process.cwd(), options.script);
});
program.command("generate:exports").description("Generate exports for the package.").action(async () => {
  await generateExports(process.cwd());
});
program.parse();
