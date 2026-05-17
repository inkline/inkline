import { createUnplugin, UnpluginOptions } from 'unplugin';
import { PluginUserOptions } from './types';
import { createInklineLoaderContext } from '@inkline/loader';
import { sep } from 'path';
import { BLOCKLISTED_ENVIRONMENTS } from './constants';

export const unplugin = createUnplugin<PluginUserOptions | undefined>(
    (options = {}): UnpluginOptions => {
        const ctx = createInklineLoaderContext(options);

        return {
            name: 'inkline',
            enforce: 'post',
            transform(code) {
                ctx.transform(code);
                return null;
            },
            vite: {
                configResolved(config) {
                    const isBlockListedCommand = process.argv
                        .map((arg) => arg.split(sep).pop() ?? '')
                        .some((arg) =>
                            BLOCKLISTED_ENVIRONMENTS.find((command) => arg.includes(command))
                        );
                    if (isBlockListedCommand) {
                        return;
                    }

                    const isDevMode = config.command !== 'build' && !process.argv.includes('build');
                    ctx.initialize({
                        watch: isDevMode
                    });
                },
                configureServer(server) {
                    ctx.setupServer(server.watcher);
                }
            }
        };
    }
);

export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
export const rspackPlugin = unplugin.rspack;
export const farmPlugin = unplugin.farm;

export default unplugin;
