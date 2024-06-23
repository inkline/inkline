#! /usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import { watch } from './watch';
import { generateExports } from './generate';
import { loadTsconfig } from './paths/loadTsconfig';
import { resolveImportPath } from './paths/resolveImports';

program.name(chalk.blue('@inkline/build'));

program
    .command('watch')
    .option(
        '-s, --script <script>',
        'The script to run when changes are detected. Defaults to "build"'
    )
    .description('Watch for changes in the configuration file and generate files accordingly.')
    .action(async (options: { script: string }) => {
        await watch(process.cwd(), options.script);
    });

program
    .command('generate:exports')
    .description('Generate exports for the package.')
    .action(async () => {
        await generateExports(process.cwd());
    });

program
    .command('resolve:imports')
    .description('Resolve imports for the package.')
    .action(async () => {
        const tsconfig = loadTsconfig(process.cwd(), 'tsconfig.json');
    });

program.parse();
