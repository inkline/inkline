import { build } from '../src';
import { resolve } from 'pathe';
import { rm, cp } from 'node:fs/promises';

(async () => {
    const outputDir = resolve(__dirname, '..', '.inkline/css');
    const configFile = resolve(__dirname, '..', 'inkline.config.ts');
    const variablesDir = resolve(__dirname, '..', '..', 'inkline/src/css/variables');

    await rm(outputDir, { recursive: true, force: true });
    await build({
        configFile,
        outputDir
    });

    await rm(variablesDir, { recursive: true, force: true });
    await cp(outputDir, variablesDir, { recursive: true });
})();
