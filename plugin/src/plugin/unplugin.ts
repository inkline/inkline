import type { ViteDevServer, ResolvedConfig } from 'vite';
import { createUnplugin, UnpluginOptions } from 'unplugin';
import { PluginUserOptions } from './types';
import { createInklineContext } from './context';

export const unplugin = createUnplugin<PluginUserOptions | undefined>(
    (options = {}): UnpluginOptions => {
        const ctx = createInklineContext(options);

        return {
            name: 'inkline',
            enforce: 'post',
            transform(code) {
                ctx.transform(code);
                return null;
            },
            vite: {
                configResolved(config) {
                    ctx.initialize(config as unknown as ResolvedConfig);
                },
                configureServer(server) {
                    ctx.setupServer(server as unknown as ViteDevServer);
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
