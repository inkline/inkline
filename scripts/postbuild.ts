/* eslint-disable quotes */

import shell from 'shelljs';
import path from 'path';

/**
 * Change directory to root
 */

shell.cd(path.resolve(__dirname, '..'));

/**
 * Copy files from src to lib
 */

shell.exec(`bash -c 'rsync -am --include="*."{vue,scss,html,md,js,d.ts} --include="*/" --exclude="*" src/ lib/'`);
shell.find('lib')
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
        shell.mv(file, file.replace('.js', '.mjs'));
    });

/**
 * Replace references in .vue files
 */

shell.exec(`find lib -type f -name *.vue -exec perl -i -pe"s/\\.ts\\" lang=\\"ts\\"/.mjs\\"/g" {} +`);
shell.exec(`find lib -type f -name *.vue -exec perl -i -pe"s/\\.js\\"/.mjs\\"/g" {} +`);

/**
 * Resolve sourcemaps
 */

shell.cp('-R', './src', './lib/src');
shell.exec(`bash -c 'find lib -type f -name *.mjs.map -exec perl -i -pe"s/..\\/src/src/g" {} +'`);

/**
 * Remove unnecessary files
 */

shell.rm(['./lib/main.*']);
shell.exec('find lib -name index.stories.* -type f -delete');
shell.exec('find lib -name __storybook__ -type d -exec rm -rf {} +');
shell.exec('find lib -name __tests__ -type d -exec rm -rf {} +');
shell.exec('find lib -name __mocks__ -type d -exec rm -rf {} +');

/**
 * Copy dist files
 */

shell.cp('./dist/inkline.umd.js', './lib/inkline.cjs');
shell.cp('./dist/style.css', './lib/inkline.css');
shell.cp('-R', './dist/assets', './lib/assets');

/**
 * Copy meta files
 */

shell.cp('./README.md', './lib/README.md');
shell.cp('./LICENSE', './lib/LICENSE');
