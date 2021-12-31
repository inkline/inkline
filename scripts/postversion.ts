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
            const buffer = await fse.readFile(entry.from);
            const contents = buffer.toString()
                .replace('"module": "inkline.js",', '"type": "module",\n  "module": "inkline.js",');

            await fse.writeFile(entry.to, contents);
        } catch (err: any) {
            console.log(err.message);
        }
    }
})();
