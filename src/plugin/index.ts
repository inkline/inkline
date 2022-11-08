import { createUnplugin } from 'unplugin';
import { UserOptions } from './types';
import { watch } from './watch';
import { build } from './build';

export const plugin = createUnplugin((options: UserOptions = {}, { watchMode }) => {
    options.plugins?.forEach((plugin) => plugin.apply(options));

    if (watchMode) {
        watch(options);
    }

    return {
        name: 'inkline',
        enforce: 'pre',
        buildStart: async () => {
            await build(options);
        }
    };
});

export const vitePlugin = plugin.vite;
export const rollupPlugin = plugin.rollup;
export const webpackPlugin = plugin.webpack;
export const esbuildPlugin = plugin.esbuild;
