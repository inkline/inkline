import Generator from '@vue/cli/lib/Generator';
import { jestExec } from './jestExec';
import { cwd } from '../config';
import fs from 'fs';
import rimraf from 'rimraf';
import path from 'path';
import generatorFn from '../../../generator';
import pkg from '../../app/package.json';

export const vueCLIBuild = (mainFile, callback) => async (done) => {
    const dist = path.resolve(cwd, 'src', mainFile + '.js');
    const main = path.resolve(cwd, 'src', 'main.js');

    // rimraf.sync(dist);

    fs.createReadStream(main).pipe(fs.createWriteStream(dist));

    const generator = new Generator('./tests/app', {
        pkg,
        plugins: [{
            id: 'inkline',
            apply: generatorFn,
            options: {}
        }]
    });

    await generator.generate();
    await jestExec(`npm run ${mainFile}`, { cwd }, () => {
        // rimraf.sync(dist);
        done();
    }, done);
};

// export function nuxtModuleCallback(distPath) {
//     const generatedPath = path.resolve(distPath, 'inkline.js');
//     const generatedContent = fs.readFileSync(generatedPath, 'utf8');
//
//     expect(generatedContent).toMatchSnapshot();
// }
