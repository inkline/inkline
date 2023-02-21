import { defaultConfig } from '../src';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'pathe';
import prettier from 'prettier';
import prettierConfig from '../.prettierrc';

function stringifyObject(obj: any) {
    return JSON.stringify(obj, null, 4);
}

// @ts-ignore
delete defaultConfig.generators;
// @ts-ignore
delete defaultConfig.resolvers;
// @ts-ignore
delete defaultConfig.build;

(async () => {
    const defaultsFilePath = resolve(__dirname, '../lib/examples/defaults.ts');
    const objectString = stringifyObject(defaultConfig);
    const exportObjectString = prettier.format(
        `import { defineConfig } from '@inkline/config';

export default defineConfig(${objectString});`,
        {
            parser: 'typescript',
            ...prettierConfig
        }
    );

    mkdirSync(dirname(defaultsFilePath), { recursive: true });
    writeFileSync(defaultsFilePath, exportObjectString);
})();
