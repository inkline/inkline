import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { packageFolder } from './config';


const remove = [
    {
        from: packageFolder,
        dir: true
    }
];

const mkdir = [
    {
        from: packageFolder
    }
];

const copy = [
    {
        from: path.resolve(__dirname, '..', 'lib'),
        to: packageFolder
    },
    {
        from: path.resolve(__dirname, '..', 'dist'),
        to: path.resolve(packageFolder, 'dist')
    },
    {
        from: path.resolve(__dirname, '..', 'README.md'),
        to: path.resolve(packageFolder, 'README.md')
    },
    {
        from: path.resolve(__dirname, '..', 'LICENSE'),
        to: path.resolve(packageFolder, 'LICENSE')
    }
];

(async () => {
    for (const entry of remove) {
        try {
            await fs.promises[entry.dir ? 'rmdir' : 'rm'](entry.from, { recursive: true });
        } catch (err) {
            console.log(err.message);
        }
    }

    for (const entry of mkdir) {
        try {
            await fs.promises.mkdir(entry.from, { recursive: true });
        } catch (err) {
            console.log(err.message);
        }
    }

    for (const entry of copy) {
        try {
            await fse.copy(entry.from, entry.to);
        } catch (err) {
            console.log(err.message);
        }
    }
})();
