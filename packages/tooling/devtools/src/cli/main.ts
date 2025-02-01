#! /usr/bin/env node

import chalk from 'chalk';
import { program } from 'commander';
import {
    componentBuild,
    componentManifest,
    componentWatch,
    eslint,
    test,
    tsupBuild,
    tsupWatch,
    viteBuild,
    viteWatch
} from './commands';

program.name(chalk.blue('@inkline/devtools'));

program.command('eslint').description('Run eslint on the package.').action(eslint);

const vite = program.command('vite');
vite.command('build')
    .description('Build the package.')
    .option('--vue', 'Build a Vue package.')
    .action(viteBuild);
vite.command('watch')
    .description('Watch for changes in the configuration file and generate files accordingly.')
    .option(
        '-s, --script <script>',
        'The script to run when changes are detected. Defaults to "build"'
    )
    .option('-p, --pattern <pattern...>', 'The pattern to be used', ['src'])
    .action(viteWatch);

const tsup = program.command('tsup');
tsup.command('build')
    .description('Build the package.')
    .option('--vue', 'Build a Vue package.')
    .action(tsupBuild);
tsup.command('watch')
    .description('Watch for changes in the configuration file and generate files accordingly.')
    .action(tsupWatch);

const component = program.command('component');
component.command('build').description('Build the component package.').action(componentBuild);
component
    .command('manifest')
    .description('Generate manifest files for component.')
    .option('--theme-only', 'Generate manifest for elements that only provide a theme file.')
    .action(componentManifest);
component
    .command('watch')
    .description('Watch for changes in the component files and generate files accordingly.')
    .option('-p, --pattern <pattern...>', 'The pattern to be used', [
        'src/**/*.ts',
        'src/**/*.vue',
        'src/**/*.json'
    ])
    .action(componentWatch);

program
    .command('test')
    .description('Run tests on the package.')
    .option('--watch', 'Watch for changes.')
    .option('--coverage', 'Generate coverage report.')
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
