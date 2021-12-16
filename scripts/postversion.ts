import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { packageFolderPath, packageJSONPath } from './config';

(async () => {
    const packageJSON = await fs.promises.readFile(packageJSONPath);
    const contents = packageJSON.toString().replace('"main":', '"type": "module",\n  "main":');

    try {
        await fse.writeFile(path.resolve(packageFolderPath, 'package.json'), contents);
    } catch (err: any) {
        console.log(err.message);
    }
})();
