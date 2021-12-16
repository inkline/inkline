import fs from 'fs';
import path from 'path';
import { packageFolderPath } from './config';

const remove = [
    {
        from: path.resolve(__dirname, '..', 'lib'),
        dir: true
    },
    {
        from: path.resolve(__dirname, '..', 'dist'),
        dir: true
    },
    {
        from: packageFolderPath,
        dir: true
    }
];

(async () => {
    for (const entry of remove) {
        try {
            await fs.promises[entry.dir ? 'rmdir' : 'rm'](entry.from, { recursive: true });
        } catch (error: any) {
            console.log(error.message);
        }
    }
})();
