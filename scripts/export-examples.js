const glob = require('glob');
const fs = require('fs');
const path = require('path');

glob(path.resolve(__dirname, '*.vue'), (error, files) => {
    const fileExports = [];

    files.forEach((file) => {
        const basename = path.basename(file);
        const parent = path.dirname(file).split(path.sep).reverse()[1];
        const pascalCased = parent[0].toUpperCase()
            + parent.slice(1)
            + basename[0].toUpperCase()
            + basename.slice(1)
                .replace('.vue', '')
                .replace(/-([a-z])/g,  (g) => g[1].toUpperCase());

        fileExports.push(`export { default as ${pascalCased}Example } from './${basename}'`);
        fileExports.push(`export { default as ${pascalCased}ExampleHTML } from './${basename.replace('.vue', '.html')}'`);
    });

    fs.writeFileSync(path.resolve(__dirname, 'index.js'), fileExports.join('\n'));
});
