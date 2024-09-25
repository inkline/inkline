import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'pathe';

(async () => {
    const baseDir = resolve(__dirname, '..', '..');
    const defaultsFilePath = resolve(baseDir, 'lib/defaults.ts');
    const exportObjectString = readFileSync(resolve(baseDir, 'inkline.config.ts'), 'utf-8').replace(
        './src',
        '@inkline/config'
    );

    mkdirSync(dirname(defaultsFilePath), { recursive: true });
    writeFileSync(defaultsFilePath, exportObjectString);
})();
