#! /usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { Commands } from './types';
import { generateCSS, generateSCSS, init } from './commands';

// @ts-ignore
import packageJSON from '../package.json';

program
    .name(chalk.blue('inkline'))
    .description(packageJSON.description)
    .version(packageJSON.version);

program.command(Commands.Init.name)
    .description('Initialize Inkline and create a configuration file.')
    .action(async (type: string, options: Commands.Init.Options) => {
        await init(options);
    });

const generate = program.command('generate')
    .description('Generate core and helper files for Inkline.');

generate
    .command(Commands.Generate.CSS.name)
    .description('Generate CSS variables based on your inkline configuration file.')
    .option('-c, --config <path>', 'Path to inkline configuration file.')
    .option('-o, --outputDir <path>', 'Path to output directory.')
    .action(async (options: Commands.Generate.CSS.Options) => {
        await generateCSS(options);
    });

generate
    .command(Commands.Generate.SCSS.name)
    .description('Generate SCSS variables based on your inkline configuration file.')
    .option('-c, --config <path>', 'Path to inkline configuration file.')
    .option('-o, --outputDir <path>', 'Path to output directory.')
    .action(async (options: Commands.Generate.SCSS.Options) => {
        await generateSCSS(options);
    });

program.parse();
