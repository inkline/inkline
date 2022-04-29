import * as shell from 'shelljs';
import { resolve } from 'path';

/**
 * Change directory to root
 */

shell.cd(resolve(__dirname, '..'));

/**
 * Remove build files
 */

shell.rm('-R', ['./lib']);
