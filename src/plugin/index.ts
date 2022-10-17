import { createUnplugin } from 'unplugin';
import {
    DEFAULT_CONFIG_FILE
} from './constants';
import {
    DEFAULT_OUTPUT_DIR,
    DEFAULT_OUTPUT_EXTNAME
} from '@inkline/config';
import { resolve } from 'pathe';
import { UserOptions } from './types';
import { watch } from './watch';

export const plugin = createUnplugin((options: UserOptions = {}) => {
    const configFile = options.configFile || resolve(process.cwd(), DEFAULT_CONFIG_FILE);
    const outputDir = options.outputDir || resolve(process.cwd(), DEFAULT_OUTPUT_DIR);
    const extName = options.extName || DEFAULT_OUTPUT_EXTNAME;

    watch({ configFile, outputDir, extName });

    return {
        name: 'inkline'
        // @TODO Add transform for inkline import to include [config, unocss, inkline]
    };
});

export const vitePlugin = plugin.vite;
export const rollupPlugin = plugin.rollup;
export const webpackPlugin = plugin.webpack;
export const esbuildPlugin = plugin.esbuild;
