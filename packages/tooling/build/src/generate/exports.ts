import glob from 'fast-glob';
import { basename, dirname, resolve } from 'path';
import { readFile, writeFile } from 'fs/promises';

export type ExportsEntry = string | { require?: string; import?: string; types?: string };

export async function generateExports(
    baseDir: string,
    options: {
        ignore?: string[];
        exports?: Map<string, ExportsEntry>;
    } = {}
) {
    const srcDir = resolve(baseDir, 'src');
    const packageJSONPath = resolve(baseDir, 'package.json');

    const packageExports = new Map<string, ExportsEntry>(options.exports ?? []);
    const defaultIgnore = [
        resolve(srcDir, '__storybook__', '**'),
        resolve(srcDir, '__mocks__', '**'),
        resolve(srcDir, '__tests__', '**'),
        resolve(srcDir, 'playground', '**'),
        resolve(srcDir, '**', '*.{d,spec,stories}.ts')
    ];

    packageExports.set('./*', './*');

    const packageJSON = JSON.parse(await readFile(packageJSONPath, 'utf-8'));
    const tsFiles = await glob(resolve(srcDir, '**', '*.ts'), {
        cwd: __dirname,
        ignore: [...(options.ignore ?? []), ...defaultIgnore]
    });

    tsFiles.forEach((file) => {
        const fileName = basename(file, '.ts');
        const exportDir = dirname(file).replace(srcDir, '');
        const importDir = dirname(file).replace(srcDir, '/lib');
        const importPath = `.${importDir}/${fileName}`;
        const exportPath = `.${exportDir}/${fileName}`.replace(/\/index$/, '');

        packageExports.set(exportPath, {
            require: `${importPath}.js`,
            import: `${importPath}.mjs`,
            types: `${importPath}.d.ts`
        });
    });

    const scssFiles = await glob(resolve(srcDir, '**', '*.scss'), {
        cwd: __dirname
    });

    scssFiles.forEach((file) => {
        const fileName = basename(file);
        const exportDir = dirname(file).replace(srcDir, '');
        const importDir = dirname(file).replace(srcDir, '/lib');
        const importPath = `.${importDir}/${fileName}`;
        const exportPath = `.${exportDir}/${fileName}`.replace(/\/index$/, '');

        packageExports.set(exportPath, {
            require: importPath,
            import: importPath
        });

        if (!fileName.startsWith('_')) {
            packageExports.set(exportPath.replace('scss', 'css'), {
                require: importPath.replace('scss', 'css'),
                import: importPath.replace('scss', 'css')
            });
        }
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
}
