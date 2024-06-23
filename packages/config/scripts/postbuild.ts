import { postbuild } from '@inkline/build';
import * as path from 'path';

(async () => {
    const baseDir = path.resolve(__dirname, '..');

    await postbuild(baseDir);
})();
