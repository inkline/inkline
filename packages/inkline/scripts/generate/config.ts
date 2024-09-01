import { build } from '@inkline/config';
import { resolve } from 'path';

(async () => {
    const baseDir = resolve(__dirname, '..', '..');
    const configFile = resolve(baseDir, 'inkline.config.ts');
    const outputDir = resolve(baseDir, 'src', 'themes');

    await build({
        configFile,
        outputDir
    });
})();
