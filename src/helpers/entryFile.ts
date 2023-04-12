import { InitEnv } from '../types';
import { resolve } from 'pathe';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { addAfterImports } from './addAfter';
import { Logger } from '@grozav/logger';
import prettier from 'prettier';
import { defaultPrettierConfig, manualInstallationUrl } from '../constants';

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

export async function addPluginToEntryFile(entryFile: string, env: InitEnv): Promise<boolean> {
    const entryFileContents = await readFile(entryFile, 'utf-8');
    let entryFileLines = entryFileContents.split('\n');

    const createAppRegEx = /createApp\([^)]*\)/;
    const createAppLineIndex = entryFileLines.findIndex((line) => createAppRegEx.test(line));

    if (createAppLineIndex !== -1) {
        Logger.success(`Detected entry file.`);

        entryFileLines[createAppLineIndex] = entryFileLines[createAppLineIndex].replace(
            createAppRegEx,
            (match) => `${match}.use(Inkline, { components })`
        );
        entryFileLines = addAfterImports(entryFileLines, [
            '',
            `import { Inkline, components } from '@inkline/inkline';`,
            `import './css/variables/index.scss';`,
            `import '@inkline/inkline/css/index.scss';`,
            `import '@inkline/inkline/css/utilities.scss';`
        ]);

        const formattedCode = prettier.format(entryFileLines.join('\n'), defaultPrettierConfig);

        await writeFile(entryFile, formattedCode, 'utf-8');

        return true;
    }

    return false;
}
