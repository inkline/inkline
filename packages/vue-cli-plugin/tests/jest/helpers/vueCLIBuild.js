import { jestSpawn } from './jestSpawn';
import { extendPackage, injectImports, onCreateComplete } from './generatorFunctions';
import Generator from '@vue/cli/lib/Generator';
import fs from 'fs';
import rimraf from 'rimraf';
import path from 'path';

export const vueCLIBuild = (mainFolder, apply, options = {}) => async (done) => {
    const ext = options.typescript ? 'ts' : 'js';
    const cwd = path.resolve(__dirname, '..', '..', options.typescript ? 'app-ts' : 'app');
    const dist = path.resolve(cwd, 'dist-' + mainFolder);

    const templatesDir = path.resolve(cwd, 'templates');
    const targetDir = path.resolve(cwd, 'srcset', mainFolder);

    const mainTemplate = path.resolve(templatesDir, `main.${ext}`);
    const packageTemplate = path.resolve(templatesDir, 'package.json');

    const mainGenerated = path.resolve(targetDir, 'src', `main.${ext}`);
    const packageGenerated = path.resolve(targetDir, 'package.json');
    const vueConfigGenerated = path.resolve(targetDir, 'vue.config.js');

    // Remove existing dist folder
    rimraf.sync(dist);

    // Remove existing vue.config.js
    rimraf.sync(vueConfigGenerated);

    // Copy main file from template to target
    fs.copyFileSync(mainTemplate, mainGenerated);

    // Copy package file from template to target
    fs.copyFileSync(packageTemplate, packageGenerated);

    const pkg = JSON.parse(fs.readFileSync(packageGenerated, 'utf-8'));
    const main = fs.readFileSync(mainGenerated, 'utf-8');

    const generator = new Generator(targetDir, {
        pkg,
        plugins: [
            {
                id: '../../../../',
                options,
                apply
            }
        ],
        files: {
            [`src/main.${ext}`]: main,
        }
    });

    await generator.generate();

    const newPkg = JSON.parse(fs.readFileSync(packageGenerated, 'utf-8'));
    expect(newPkg).toMatchSnapshot();

    const newMain = fs.readFileSync(mainGenerated, 'utf-8');
    expect(newMain).toMatchSnapshot();

    if (options.customizable) {
        const newVueConfig = fs.readFileSync(vueConfigGenerated, 'utf-8');
        expect(newVueConfig).toMatchSnapshot();
    }

    await jestSpawn('npm', ['run', mainFolder], { cwd }, () => {
        rimraf.sync(dist);

        if (options.customizable) {
            rimraf.sync(vueConfigGenerated);
        }
    }, done);
};
