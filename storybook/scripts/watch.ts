import { resolve } from 'path';
import { createRequire } from 'node:module';
import { createWatcher, PluginUserOptions } from '@inkline/plugin';
import { BuildOptions, Configuration } from '@inkline/config';
import { buildConfiguration } from '@inkline/config';
import { Logger } from '@inkline/logger';

const require = createRequire(import.meta.url);

require.extensions['.css'] = function (module) {
    module.exports = {};
};

require.extensions['.vue'] = function (module) {
    module.exports = {};
};

const __dirname = new URL('.', import.meta.url).pathname;

const baseDir = resolve(__dirname, '..');
const packagesDir = resolve(baseDir, '..', 'packages');

export async function build(options: PluginUserOptions) {
    Object.keys(require.cache).forEach((key) => {
        if (key.startsWith(packagesDir) || key.startsWith(baseDir)) {
            delete require.cache[key];
        }
    });

    try {
        const { default: configuration } = require(resolve(baseDir, `inkline.config.ts`)) as {
            default: Configuration;
        };

        await buildConfiguration(configuration, options as BuildOptions);

        Logger.success(`inkline.config.ts built successfully.`);
    } catch (e) {
        Logger.error(`inkline.config.ts build failed:`);
        console.log((e as Error).message);
    }
}

await (async () => {
    const watch = createWatcher(build);

    await watch({
        outputDir: resolve(__dirname, '..', 'src', 'theme')
    });
})();
