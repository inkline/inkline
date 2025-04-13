import fs from 'fs/promises';
import path from 'path';
import { parse } from './parse';
import prettier from 'prettier';
import type { Options as PrettierOptions } from 'prettier';
import prettierConfig from '@inkline/eslint-config/.prettierrc';
import { Logger } from '@inkline/logger';

export async function command() {
    const rootDir = process.cwd();
    const inputDir = path.resolve(rootDir, 'src');
    const outputDir = path.resolve(rootDir, 'src');

    const manifest = await parse(inputDir);

    const output = `import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = ${JSON.stringify(manifest, null, 4)};

export default manifest;`;
    const formattedOutput = await prettier.format(output, {
        parser: 'typescript',
        ...(prettierConfig as PrettierOptions)
    });

    const outputPath = path.resolve(outputDir, 'manifest.ts');
    await fs.writeFile(outputPath, formattedOutput, 'utf-8');

    Logger.info(`Generated manifest file.`);
}
