import { createUnplugin } from 'unplugin';
import { UserOptions } from './types';
import { watch } from './watch';
import { build } from './build';

export const plugin = createUnplugin((options: UserOptions = {}, { watchMode }) => {
    if (watchMode) {
        watch(options);
    } else {
        build(options);
    }

    return {
        name: 'inkline'
    };
});

export const vitePlugin = plugin.vite;
export const rollupPlugin = plugin.rollup;
export const webpackPlugin = plugin.webpack;
export const esbuildPlugin = plugin.esbuild;
