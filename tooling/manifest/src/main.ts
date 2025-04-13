#! /usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import { command } from './command';

if (process.argv.length === 2) {
    process.argv.push('build');
}

program.name(chalk.blue('@inkline/devtools'));

program.command('build').description('Build the manifest.').action(command);

program.parse();
