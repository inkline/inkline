import { resolve } from 'path';
import { createRequire } from 'node:module';
import { createInklineLoaderContext } from '@inkline/loader';

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

const ctx = createInklineLoaderContext({
    outputDir: resolve(__dirname, '..', 'src', 'theme')
});

export async function build() {
    console.log(`${ctx.configFile} changed, rebuilding...`);

    Object.keys(require.cache).forEach((key) => {
        if (key.startsWith(packagesDir) || key.startsWith(baseDir)) {
            delete require.cache[key];
        }
    });

    await ctx.build();
}

await (async () => {
    await ctx.watch(build);
})();
