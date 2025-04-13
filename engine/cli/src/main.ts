#! /usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import { GenerateCommandOptions, InitCommandOptions, } from "./types";
import { generate, init } from './commands';
import { PackageJson } from "type-fest";

void (async () => {
    const { default: packageJson } = await import('../package.json') as { default: PackageJson};

    program
        .name(chalk.blue('inkline'))
        .description(packageJson.description ?? '')
        .version(packageJson.version ?? '1.0.0');

    program
        .command('init')
        .description('Initialize Inkline and create a configuration file.')
        .option('-m, --manual', 'Skip file processing and create a configuration file only.')
        .option('-d, --dev', 'Enable development mode.')
        .action(async (options: InitCommandOptions) => {
            await init(options);
        });

    program
        .command('generate')
        .description('Generate a theme based on your Inkline configuration file.')
        .option('-c, --config <path>', 'Path to Inkline configuration file.')
        .option('-o, --outputDir <path>', 'Path to output directory.')
        .action(async (options: GenerateCommandOptions) => {
            await generate(options);
        });

    program.parse();
})();
