import shell from 'shelljs';
import path from 'path';

/**
 * Change directory to root
 */

shell.cd(path.resolve(__dirname, '..'));

/**
 * Copy package.json to lib
 */

shell.cp('./package.json', './lib/package.json');
