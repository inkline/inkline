import * as shell from 'shelljs';
import { resolve } from 'path';

/**
 * Change directory to root
 */

shell.cd(resolve(__dirname, '..'));

shell.rm('-r', 'lib/**/__tests__');

shell.cp('./README.md', 'lib');
shell.cp('./LICENSE', 'lib');
