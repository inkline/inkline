import fs from 'fs';
import path from 'path';

const rename = [
    {
        from: path.resolve(__dirname, '..', 'dist', 'inkline.es.js'),
        to: path.resolve(__dirname, '..', 'dist', 'inkline.js'),
    },
    {
        from: path.resolve(__dirname, '..', 'dist', 'style.css'),
        to: path.resolve(__dirname, '..', 'dist', 'inkline.css'),
    }
];

const remove = [
    {
        from: path.resolve(__dirname, '..', 'dist', 'images'),
        dir: true
    }
];

(async () => {
    for (const entry of rename) {
        try {
            await fs.promises.rename(entry.from, entry.to);
        } catch (err: any) {
            console.log(err.message);
        }
    }

    for (const entry of remove) {
        try {
            await fs.promises[entry.dir ? 'rmdir' : 'rm'](entry.from, { recursive: true });
        } catch (err: any) {
            console.log(err.message);
        }
    }
})();
