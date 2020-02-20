import fs from 'fs';

export function extendPackage() {}

export function injectImports(file, string) {
    const content = fs.readFileSync(file, { encoding: 'utf-8' });
    const lines = content.split(/\r?\n/g).reverse();
    const lastImportIndex = lines.findIndex(line => line.match(/^import/));

    lines[lastImportIndex] += '\n' + string;

    fs.writeFileSync(file, lines.reverse().join('\n'), { encoding: 'utf-8' });
}

export function onCreateComplete(callback) {
    callback();
}
