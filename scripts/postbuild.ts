import * as shell from 'shelljs';
import { resolve } from 'path';

/**
 * Change directory to root
 */

shell.cd(resolve(__dirname, '..'));

// shell.rm('-r', 'lib/**/__tests__');

shell.sed('-i', '// #!', '#!', 'lib/index.js');
shell.sed('-i', '../package.json', './package.json', ['lib/index.js', 'lib/index.mjs']);

shell.cp('./README.md', 'lib');
shell.cp('./LICENSE', 'lib');
