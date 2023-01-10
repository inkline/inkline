#! /usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import { Commands } from './types';
import { generateCss, generateScss, init } from './commands';

// @ts-ignore
import packageJSON from '../package.json' assert { type: 'json' };

program
    .name(chalk.blue('inkline'))
    .description(packageJSON.description)
    .version(packageJSON.version);

program
    .command(Commands.Init.name)
    .description('Initialize Inkline and create a configuration file.')
    .option('-m, --manual', 'Skip file processing and create a configuration file only.')
    .action(async (type: string, options: Commands.Init.Options) => {
        await init(options);
    });

const generate = program
    .command('generate')
    .description('Generate core and helper files for Inkline.');

generate
    .command(Commands.Generate.Css.name)
    .description('Generate CSS variables based on your inkline configuration file.')
    .option('-c, --config <path>', 'Path to inkline configuration file.')
    .option('-o, --outputDir <path>', 'Path to output directory.')
    .action(async (options: Commands.Generate.Css.Options) => {
        await generateCss(options);
    });

generate
    .command(Commands.Generate.Scss.name)
    .description('Generate SCSS variables based on your inkline configuration file.')
    .option('-c, --config <path>', 'Path to inkline configuration file.')
    .option('-o, --outputDir <path>', 'Path to output directory.')
    .action(async (options: Commands.Generate.Scss.Options) => {
        await generateScss(options);
    });

program.parse();
