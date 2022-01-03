import fse from 'fs-extra';
import path from 'path';
import { packageFolderPath } from './config';

const copy = [
    {
        from: path.resolve(__dirname, '..', 'package.json'),
        to: path.resolve(packageFolderPath, 'package.json')
    }
];

(async () => {
    for (const entry of copy) {
        try {
            await fse.copyFile(entry.from, entry.to);
        } catch (err: any) {
            console.log(err.message);
        }
    }
})();
