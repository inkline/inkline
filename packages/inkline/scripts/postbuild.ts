import * as shell from 'shelljs';
import glob from 'fast-glob';
import * as path from 'path';
import { postbuild } from '@inkline/build';

(async () => {
    /**
     * Change directory to root
     */

    const baseDir = path.resolve(__dirname, '..');
    const srcDir = path.resolve(baseDir, 'src');

    await postbuild(baseDir);

    const exampleFiles = await glob(path.resolve(srcDir, '**/examples/*.vue'));
    const storiesFiles = await glob(path.resolve(srcDir, 'stories/**/*.vue'));
    [...storiesFiles, ...exampleFiles].forEach((file) => {
        const destFile = file.replace('src', 'lib').replace('.vue', '.raw.vue');

        shell.cp(file, destFile);
    });

    /**
     * Remove unnecessary files
     */

    shell.rm(['./lib/main.*']);
    shell.exec('find lib -name index.stories.* -type f -delete');
    shell.exec('find lib -name __storybook__ -type d -exec rm -rf {} +');
    shell.exec('find lib -name __tests__ -type d -exec rm -rf {} +');

    /**
     * Copy dist files
     */

    shell.cp('./dist/inkline.umd.js', './lib/inkline.js');
    shell.cp('./dist/style.css', './lib/inkline.css');
    shell.cp('-R', './src/assets', './lib/assets');
})();
