import * as shell from 'shelljs';
import { resolve } from 'path';

/**
 * Change directory to root
 */

shell.cd(resolve(__dirname, '..'));

/**
 * Copy package.json to lib
 */

shell.cp('./package.json', './lib/package.json');
