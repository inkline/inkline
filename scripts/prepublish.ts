import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { packageFolderPath } from './config';

const remove = [
    {
        from: packageFolderPath,
        dir: true
    }
];

const mkdir = [
    {
        from: packageFolderPath
    }
];

const copy = [
    {
        from: path.resolve(__dirname, '..', 'lib'),
        to: packageFolderPath
    },
    {
        from: path.resolve(__dirname, '..', 'dist'),
        to: path.resolve(packageFolderPath, 'dist')
    },
    {
        from: path.resolve(__dirname, '..', 'README.md'),
        to: path.resolve(packageFolderPath, 'README.md')
    },
    {
        from: path.resolve(__dirname, '..', 'LICENSE'),
        to: path.resolve(packageFolderPath, 'LICENSE')
    }
];

(async () => {
    for (const entry of remove) {
        try {
            await fs.promises[entry.dir ? 'rmdir' : 'rm'](entry.from, { recursive: true });
        } catch (err: any) {
            console.log(err.message);
        }
    }

    for (const entry of mkdir) {
        try {
            await fs.promises.mkdir(entry.from, { recursive: true });
        } catch (err: any) {
            console.log(err.message);
        }
    }

    for (const entry of copy) {
        try {
            await fse.copy(entry.from, entry.to);
        } catch (err: any) {
            console.log(err.message);
        }
    }
})();
