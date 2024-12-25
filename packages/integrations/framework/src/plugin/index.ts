import { createUnplugin, UnpluginFactory } from 'unplugin';
import { sep } from 'node:path';
import { UserOptions } from './types';
import { watch } from './watch';
import { build } from './build';

const blockListedEnvironments = ['vitest', 'jest'];

export const unpluginFactory: UnpluginFactory<UserOptions | undefined> = (options = {}, meta) => ({
    name: 'inkline',
    buildStart: async () => {
        const isBlockListedCommand = process.argv
            .map((arg) => arg.split(sep).pop() ?? '')
            .some((arg) => blockListedEnvironments.find((command) => arg.includes(command)));
        if (isBlockListedCommand) {
            return;
        }

        let isDevMode = options.watch || false;
        if (meta.framework === 'vite' && !isDevMode) {
            isDevMode = !process.argv.includes('build');
        }

        if (isDevMode) {
            await watch(options);
        } else {
            await build(options);
        }
    }
});

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory);

export default unplugin;

export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
export const rspackPlugin = unplugin.rspack;
export const farmPlugin = unplugin.farm;
