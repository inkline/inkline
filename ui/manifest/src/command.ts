import fs from 'fs/promises';
import path from 'path';
import { parse } from './parse';
import prettier from 'prettier';
import type { Options as PrettierOptions } from 'prettier';
import prettierConfig from '@inkline/eslint-config/.prettierrc';
import { Logger } from '@inkline/logger';

export async function command() {
    const srcDir = path.resolve(process.cwd(), 'src');
    const manifestPath = path.resolve(srcDir, 'manifest.ts');

    const manifest = await parse(srcDir);

    const output = `import type { ComponentManifest } from '@inkline/types';

export const manifest: ComponentManifest[] = ${JSON.stringify(manifest, null, 4)};

export default manifest;`;
    const formattedOutput = await prettier.format(output, {
        parser: 'typescript',
        ...(prettierConfig as PrettierOptions)
    });

    await fs.writeFile(manifestPath, formattedOutput, 'utf-8');

    Logger.info(`Generated manifest file.`);
}
