#! /usr/bin/env node

import chalk from "chalk";
import path from "path";
import { program } from "commander";
import { eslint, test, tsupBuild, tsupWatch, viteBuild, viteWatch } from "./commands";
import type { WatchCommandOptions } from "./types";

program.name(chalk.blue("@inkline/devtools"));

program
    .command("eslint")
    .description("Run eslint on the package.")
    .action(eslint);

const vite = program
    .command("vite");
vite
    .command("build")
    .description("Build the package.")
    .action(viteBuild);
vite
    .command("watch")
    .option(
        "-s, --script <script>",
        "The script to run when changes are detected. Defaults to \"build\""
    )
    .option("-p, --pattern <pattern...>", "The pattern to be used", ["src"])
    .description("Watch for changes in the configuration file and generate files accordingly.")
    .action(async (options: WatchCommandOptions) => {
        const patterns = options.pattern.map((pattern) => path.resolve(process.cwd(), pattern));
        await viteWatch(patterns, options.script);
    });

const tsup = program
    .command("tsup");
tsup
    .command("build")
    .description("Build the package.")
    .action(tsupBuild);
tsup
    .command("watch")
    .description("Watch for changes in the configuration file and generate files accordingly.")
    .action(tsupWatch);


program
    .command("test")
    .option("--watch", "Watch for changes.")
    .option("--coverage", "Generate coverage report.")
    .description("Run tests on the package.")
    .action(test);

// program
//     .command('generate:exports')
//     .description('Generate exports for the package.')
//     .action(async () => {
//         await generateExports(process.cwd());
//     });
//
// program
//     .command('resolve:imports')
//     .description('Resolve imports for the package.')
//     .action(async () => {
//         const baseDir = process.cwd();
//         const tsconfig = loadTsconfig(baseDir, 'tsconfig.json');
//
//         await resolveImports(baseDir, tsconfig);
//     });

program.parse();
