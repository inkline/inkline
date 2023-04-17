import path from 'path';
import shell from 'shelljs';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { Logger } from '@grozav/logger';

const rootDirPath = path.resolve(__dirname, '..', '..');
const libDirPath = path.resolve(rootDirPath, 'lib');
const tmpDirPath = path.resolve(rootDirPath, 'tmp');
const packageJsonPath = path.resolve(rootDirPath, 'package.json');

const nuxtAppName = 'nuxt';
const nuxtDirPath = path.resolve(tmpDirPath, nuxtAppName);

let inklinePackPath;

(async () => {
    Logger.default('Cleaning up..');
    shell.rm('-r', [tmpDirPath, libDirPath]);

    Logger.default('Building..');
    shell.exec('npm run build');
    shell.cp(packageJsonPath, libDirPath);

    Logger.default('Packing inkline..');
    shell.exec('npm pack', { cwd: libDirPath });
    inklinePackPath = shell.find(path.resolve(libDirPath, '*.tgz'))[0];

    if (!existsSync(tmpDirPath)) {
        await mkdir(tmpDirPath);
    }

    await Promise.all([nuxt()]);
})();

async function nuxt() {
    Logger.default('Running Nuxt tests..');
    return new Promise((resolve) => {
        shell.exec(`npx nuxi init ${nuxtAppName}`, {
            cwd: tmpDirPath
        });

        shell.exec(`npx inkline init`, {
            cwd: nuxtDirPath
        });

        resolve(true);
    });
}
