import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { resolve } from 'pathe';
import { Commands } from '../types';
import { Logger } from '@grozav/logger';
import { defaultConfig } from '@inkline/config';

const interpolateString = (string: string) => string.replace(/'/g, '\\\'');
const exampleConfiguration = `import { defineConfig } from '@inkline/config';

export default defineConfig({
    theme: {
        color: {
            red: '${defaultConfig.theme.color!.red}',
            orange: '${defaultConfig.theme.color!.orange}',
            yellow: '${defaultConfig.theme.color!.yellow}',
            green: '${defaultConfig.theme.color!.green}',
            teal: '${defaultConfig.theme.color!.teal}',
            blue: '${defaultConfig.theme.color!.blue}',
            purple: '${defaultConfig.theme.color!.purple}',
            pink: '${defaultConfig.theme.color!.pink}',
            white: '${defaultConfig.theme.color!.white}',
            black: '${defaultConfig.theme.color!.black}',
            primary: '<% theme.color.blue %>',
            secondary: '<% theme.color.purple %>',
            info: '<% theme.color.teal %>',
            success: '<% theme.color.green %>',
            warning: '<% theme.color.yellow %>',
            danger: '<% theme.color.red %>'
        },
        margin: '${defaultConfig.theme.margin}',
        padding: '${defaultConfig.theme.padding}',
        border: '${defaultConfig.theme.border}',
        typography: {
            fontFamily: {
                primary: {
                    base: '${interpolateString(defaultConfig.theme.typography!.fontFamily!.primary!.base!)}',
                    monospace: '${interpolateString(defaultConfig.theme.typography!.fontFamily!.primary!.monospace!)}',
                    print: '${interpolateString(defaultConfig.theme.typography!.fontFamily!.primary!.print!)}'
                },
                secondary: {
                    base: 'var(--font-family-primary-base)',
                    monospace: 'var(--font-family-primary-monospace)',
                    print: 'var(--font-family-primary-print)'
                }
            },
            fontSize: '${defaultConfig.theme.typography!.fontSize}',
            lineHeight: ${defaultConfig.theme.typography!.lineHeight},
            letterSpacing: ${defaultConfig.theme.typography!.letterSpacing}
        }
    }
});
`;

export async function init (options: Commands.Init.Options) {
    try {
        const cwd = process.cwd();
        const isTypescript = existsSync(resolve(cwd, 'tsconfig.json'));
        const outputFilePath = resolve(cwd, isTypescript ? 'inkline.config.ts' : 'inkline.config.js');

        await writeFile(outputFilePath, exampleConfiguration);

        Logger.default(`Created ${outputFilePath}`);
        Logger.success(Commands.Init.messages.success);
    } catch (error) {
        Logger.error(Commands.Init.messages.error);
        Logger.log(error);
    }
}
