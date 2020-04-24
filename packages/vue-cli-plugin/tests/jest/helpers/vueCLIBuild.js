import { jestExec } from './jestExec';
import { extendPackage, injectImports, onCreateComplete } from './generatorFunctions';
import fs from 'fs';
import rimraf from 'rimraf';
import path from 'path';

export const vueCLIBuild = (mainFile, generator, options = {}) => async (done) => {
    const ext = options.typescript ? 'ts' : 'js';
    const cwd = path.resolve(__dirname, '..', '..', options.typescript ? 'app-ts' : 'app');
    const dist = path.resolve(cwd, 'dist-' + mainFile.replace('main.', ''));
    const main = path.resolve(cwd, 'src', `main.${ext}`);
    const generatedMain = path.resolve(cwd, 'src', `${mainFile}.${ext}`);

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
