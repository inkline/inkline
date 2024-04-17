import { defaultConfig } from '../src/presets';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'pathe';
import prettier from 'prettier';
import prettierConfig from '../.prettierrc';

function stringifyObject(obj: any) {
    return JSON.stringify(obj, null, 4);
}

(async () => {
    const defaultsFilePath = resolve(__dirname, '../lib/examples/defaults.ts');
    const { generators, resolvers, aggregators, dependencies, build, ...config } = defaultConfig;
    const objectString = stringifyObject(config);
    const exportObjectString = await prettier.format(
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
