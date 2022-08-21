import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { resolve } from 'pathe';
import { Commands } from '../types';
import { Logger } from '@grozav/logger';
import inspect from 'object-inspect';
import { defaultConfig } from '@inkline/config';

const defaultConfigFileContents = `import { defineConfig } from '@inkline/config';

export default defineConfig(${
    inspect({ theme: defaultConfig.theme }, { indent: '\t', depth: Infinity })
});
`;

export async function init (options: Commands.Init.Options) {
    try {
        const cwd = process.cwd();
        const isTypescript = existsSync(resolve(cwd, 'tsconfig.json'));
        const outputFilePath = resolve(cwd, isTypescript ? 'inkline.config.ts' : 'inkline.config.js');

        await writeFile(outputFilePath, defaultConfigFileContents);

        Logger.default(`Created ${outputFilePath}`);
        Logger.success(Commands.Init.messages.success);
    } catch (error) {
        Logger.error(Commands.Init.messages.error);
        Logger.log(error);
    }
}
