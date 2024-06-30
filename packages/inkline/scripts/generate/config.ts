import { build } from '@inkline/config';
import { resolve } from 'path';
import { rm } from 'node:fs/promises';

(async () => {
    const baseDir = resolve(__dirname, '..', '..');
    const configFile = resolve(baseDir, 'inkline.config.ts');
    const outputDir = resolve(baseDir, 'src', 'css', 'variables');

    await rm(outputDir, { recursive: true, force: true });
    await build({
        configFile,
        outputDir
    });
})();
