import glob from 'fast-glob';
import path from 'path';
import fs from 'fs/promises';

type ComponentEntry = {
    name: string;
    export: string;
    filePath: string;
}

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const rootDir = path.resolve(__dirname, '..', '..');
const componentsDir = path.resolve(rootDir, 'ui', 'components');

const componentFiles = await glob([path.resolve(componentsDir, '*/src/**/*.vue')], {
    ignore: ['**/examples/**/*']
});
const components: ComponentEntry[] = [];

componentFiles.forEach((file) => {
    let parts = file.split(path.sep);
    parts = parts.slice(parts.indexOf('components') + 1);

    const pathName = `@inkline/component-${parts[0]}`;
    const componentName = path.basename(file, '.vue');

    components.push({
        name: componentName,
        export: componentName,
        filePath: pathName
    });
});

components.sort((a, b) => a.name.localeCompare(b.name));

const resourcesDir = path.resolve(__dirname, '..', 'resources');
await fs.writeFile(
    path.resolve(resourcesDir, 'components.ts'),
    `export default ${JSON.stringify(components, null, 4)};`
);
