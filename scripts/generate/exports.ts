import glob from 'fast-glob';
import { basename, dirname, resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';

const baseDir = resolve(__dirname, '..', '..');
const srcDir = resolve(baseDir, 'src');
const packageJSONPath = resolve(baseDir, 'package.json');

const packageExports = new Map<
    string,
    string | { require?: string; import?: string; types?: string }
>([
    [
        '.',
        {
            require: './inkline.js',
            import: './inkline.mjs',
            types: './inkline.d.ts'
        }
    ],
    [
        './types',
        {
            types: './types/index.d.ts'
        }
    ],
    ['./*', './*']
]);

const defaultIgnore = [
    resolve(srcDir, '__storybook__', '**'),
    resolve(srcDir, '__mocks__', '**'),
    resolve(srcDir, 'playground', '**'),
    resolve(srcDir, 'stories', '**')
];

(async () => {
    const packageJSON = JSON.parse(await readFile(packageJSONPath, 'utf-8'));
    const tsFiles = await glob(resolve(srcDir, '**', '*.ts'), {
        ignore: [
            ...defaultIgnore,
            resolve(srcDir, '**', '*.{d,spec,stories}.ts'),
            resolve(srcDir, 'main.ts')
        ]
    });

    tsFiles.forEach((file) => {
        const exportFile = basename(file, '.ts');
        const exportDir = dirname(file).replace(srcDir, '');
        const importPath = `.${exportDir}/${exportFile}`;
        const exportPath = importPath.replace(/\/index$/, '');

        packageExports.set(exportPath, {
            require: `${importPath}.js`,
            import: `${importPath}.mjs`,
            types: `${importPath}.d.ts`
        });
    });

    packageJSON.exports = packageExports;

    await writeFile(
        packageJSONPath,
        JSON.stringify(
            packageJSON,
            (key, value) => {
                if (value instanceof Map) {
                    return Object.fromEntries(new Map([...value].sort()));
                } else {
                    return value;
                }
            },
            4
        ) + '\n'
    );
})();
