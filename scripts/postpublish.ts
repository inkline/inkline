import fs from 'fs';
import path from 'path';
import { packageFolder } from './config';

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
        from: packageFolder,
        dir: true
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
})();
