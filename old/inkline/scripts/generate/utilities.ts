import shell from 'shelljs';
import glob from 'fast-glob';
import path from 'path';
import prettier from 'prettier';
import { readFile, writeFile } from 'fs/promises';

const baseDir = path.resolve(__dirname, '..', '..');
const cssDir = path.resolve(baseDir, 'src', 'css');
const outputFile = path.resolve(cssDir, 'utilities.scss');
const unocssDir = path.resolve(baseDir, '..', 'integrations', 'unocss');
const unocssPlaygroundDir = path.resolve(unocssDir, 'src', 'playground');
const unocssDistDir = path.resolve(unocssPlaygroundDir, 'dist');
const prettierConfigFile = path.resolve(baseDir, '.prettierrc');

(async () => {
    await shell.exec('npm run build:vite', { cwd: unocssDir });
    const [cssFile] = await glob(path.resolve(unocssDistDir, '**/*.css'));
    const css = await readFile(cssFile, 'utf-8');
    const prettierConfig = await import(prettierConfigFile);

    const code = css.replace(/^[^_]*\._/, '._');
    const result = await prettier.format(code, { parser: 'scss', ...prettierConfig });

    await writeFile(outputFile, result);
})();
