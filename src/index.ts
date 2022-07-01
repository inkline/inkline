#! /usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { Commands } from './types';
import { generateCSS } from './commands';

// @ts-ignore
import packageJSON from '../package.json';

program
    .name(chalk.blue('inkline'))
    .description(packageJSON.description)
    .version(packageJSON.version);

const generate = program.command('generate')
    .description('Generate core and helper files for Inkline.');

generate
    .command(Commands.Generate.CSS.name)
    .description('Generate CSS variables based on your inkline configuration file.')
    .option('-c, --config <path>', 'Path to inkline configuration file.')
    .option('-o, --outputDir <path>', 'Path to output directory.')
    .option('-e, --extname <ext>', 'File extension to use for output files.')
    .action(async (type: string, options: Commands.Generate.CSS.Options) => {
        if (type === Commands.Generate.CSS.name) {
            await generateCSS(options);
        }
    });

program.parse();
