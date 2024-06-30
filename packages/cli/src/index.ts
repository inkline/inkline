#! /usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import { Commands, PackageJsonSchema } from "./types";
import { generateScss, init } from './commands';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const packageJson = require('../package.json') as PackageJsonSchema;

program
    .name(chalk.blue('inkline'))
    .description(packageJson.description ?? '')
    .version(packageJson.version ?? '1.0.0');

program
    .command(Commands.Init.name)
    .description('Initialize Inkline and create a configuration file.')
    .option('-m, --manual', 'Skip file processing and create a configuration file only.')
    .option('-d, --dev', 'Enable development mode.')
    .action(async (options: Commands.Init.Options) => {
        await init(options);
    });

const generate = program
    .command('generate')
    .description('Generate core and helper files for Inkline.');

generate
    .command(Commands.Generate.Scss.name)
    .description('Generate SCSS variables based on your inkline configuration file.')
    .option('-c, --config <path>', 'Path to inkline configuration file.')
    .option('-o, --outputDir <path>', 'Path to output directory.')
    .action(async (options: Commands.Generate.Scss.Options) => {
        await generateScss(options);
    });

program.parse();
