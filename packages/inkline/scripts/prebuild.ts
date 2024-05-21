import shell from 'shelljs';
import path from 'path';

(async () => {
    const rootDir = path.resolve(__dirname, '..');
    const cjsDir = path.resolve(rootDir, 'tmp', 'cjs');

    shell.rm('-rf', cjsDir);
})();
