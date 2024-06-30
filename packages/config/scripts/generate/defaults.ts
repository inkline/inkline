import { writeFileSync, readFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'pathe';

(async () => {
    const baseDir = resolve(__dirname, '..', '..');
    const defaultsFilePath = resolve(baseDir, 'lib/templates/defaults.ts');
    const exportObjectString = readFileSync(
        resolve(baseDir, 'src/templates/defaults.ts'),
        'utf-8'
    ).replace('../utils', '@inkline/config');

    mkdirSync(dirname(defaultsFilePath), { recursive: true });
    writeFileSync(defaultsFilePath, exportObjectString);
})();
