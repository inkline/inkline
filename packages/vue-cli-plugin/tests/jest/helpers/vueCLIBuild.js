import { jestExec } from './jestExec';
import { cwd } from '../config';
import fs from 'fs';
import rimraf from 'rimraf';
import path from 'path';

export function vueCLIBuild(mainFile, callback) {
    const dist = path.resolve(cwd, mainFile);

    // rimraf.sync(dist);

    return jestExec(`npm run build -- ${mainFile}`, { cwd }, () => {
        if (callback) {
            callback(dist);
        }

        // rimraf.sync(dist);
    })
}

// export function nuxtModuleCallback(distPath) {
//     const generatedPath = path.resolve(distPath, 'inkline.js');
//     const generatedContent = fs.readFileSync(generatedPath, 'utf8');
//
//     expect(generatedContent).toMatchSnapshot();
// }
