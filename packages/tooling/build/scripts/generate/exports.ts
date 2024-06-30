import * as path from 'path';
import { generateExports } from '../../src';

(async () => {
    const baseDir = path.resolve(__dirname, '..', '..');

    await generateExports(baseDir);
})();
