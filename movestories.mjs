import glob from 'glob';
import path from "path";
import { readFile, writeFile } from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import shell from 'shelljs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const files = glob.sync('./src/components/**/examples/*');

files.forEach(async (file) => {
    const target = path.resolve(__dirname, 'storybook', 'vue', file.replace('/examples', ''));
    let contents = await readFile(file);

    if (path.basename(target) === 'index.stories.ts') {
        contents = contents.toString();
        contents = contents.replace(/import (.+) from '..\/index.vue';/, 'import { $1 } from \'@inkline/inkline/components\';')
        contents = contents.replace('createStory,', '');
        contents = contents.replace('\'@inkline/inkline/__storybook__\';', '\'@inkline/inkline/__storybook__\';\nimport { createStory } from \'@inkline/paper\';');
        contents = contents.replace(
            /export const (.+) = \(\) => (.+);/g,
            'export const $1 = createStory($2);'
        )
    }

    if (path.basename(target).endsWith('.vue')) {
        const component = path.basename(path.dirname(target));
        let template = await readFile(path.resolve(path.dirname(file), path.basename(file).replace('.vue', '.html')));
        template = template.toString();

        if (template[template.length - 1] === '\n') {
            template = template.slice(0, -1);
        }

        contents = contents.toString();
        contents = `<script lang="ts">
import { ${component} } from '@inkline/inkline/components';

export default {
    components: {
        ${component}
    }
};
</script>\n${contents}`;
        contents = contents.replace(/<template src=".+" \/>/, `<template>
${template.toString().split('\n').map((line) => `    ${line}`).join('\n')}
</template>`)
    }

    shell.mkdir('-p', path.dirname(target));
    await writeFile(target, contents);
});
