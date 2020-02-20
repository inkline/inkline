import { jestExec } from './jestExec';
import { extendPackage, injectImports, onCreateComplete } from './generatorFunctions';
import { cwd } from '../config';
import fs from 'fs';
import rimraf from 'rimraf';
import path from 'path';

export const vueCLIBuild = (mainFile, generator, options = {}) => async (done) => {
    const dist = path.resolve(cwd, 'dist-' + mainFile.replace('main.', ''));
    const main = path.resolve(cwd, 'src', 'main.js');
    const generatedMain = path.resolve(cwd, 'src', mainFile + '.js');

    rimraf.sync(dist);
    fs.copyFileSync(main, generatedMain);

    generator({
        entryFile: generatedMain,
        extendPackage,
        injectImports,
        onCreateComplete
    }, options);

    await jestExec(`npm run ${mainFile}`, { cwd }, () => {
        rimraf.sync(dist);
    }, done);
};
