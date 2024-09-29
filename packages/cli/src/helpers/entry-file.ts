import { InitEnv } from '../types';
import { resolve } from 'node:path';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { addAfterImports } from './insert';
import { Logger } from '@inkline/utils';
import { createAppRegEx, defaultPrettierConfig } from '../constants';
import prettier from 'prettier';

export function detectEntryFile(env: InitEnv): string | undefined {
    const possibleEntryFiles = [];

    if (env.hasSrcDir) {
        if (env.isTypescript) {
            possibleEntryFiles.push(resolve(env.cwd, 'src/main.ts'));
            possibleEntryFiles.push(resolve(env.cwd, 'src/app.ts'));
            possibleEntryFiles.push(resolve(env.cwd, 'src/index.ts'));
        }

        possibleEntryFiles.push(resolve(env.cwd, 'src/main.js'));
        possibleEntryFiles.push(resolve(env.cwd, 'src/app.js'));
        possibleEntryFiles.push(resolve(env.cwd, 'src/index.js'));
    }

    return possibleEntryFiles.find((file) => existsSync(file));
}

export async function addPluginToEntryFile(entryFile: string, _: InitEnv): Promise<boolean> {
    let entryFileContents = await readFile(entryFile, 'utf-8');

    if (createAppRegEx.test(entryFileContents)) {
        Logger.success(`Detected entry file.`);

        entryFileContents = entryFileContents.replace(
            createAppRegEx,
            (match) => `${match}.use(Inkline, { components })`
        );

        entryFileContents = addAfterImports(
            entryFileContents,
            [
                '',
                `import { Inkline, components } from '@inkline/vue';`,
                `import './css/variables/index.scss';`,
                `import '@inkline/vue/css/index.scss';`,
                `import '@inkline/vue/css/utilities.scss';`
            ].join('\n')
        );

        const formattedCode = await prettier.format(entryFileContents, defaultPrettierConfig);

        await writeFile(entryFile, formattedCode, 'utf-8');

        return true;
    }

    return false;
}
