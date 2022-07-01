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

program.command('generate')
    .description('Generate core files for your Inkline project')
    .argument(Commands.Generate.CSS.name, 'Generate CSS based on configuration file.')
    .option('-c, --config <path>', 'Configuration file to use.')
    .action(async (type: string, options: Commands.Generate.CSS.Options) => {
        if (type === Commands.Generate.CSS.name) {
            await generateCSS(options);
        }
    });

program.parse();
