import { loadConfig as c12, LoadConfigOptions } from 'c12';
import type { Configuration } from '@inkline/core';
import { createContext } from '@inkline/core';
import * as esbuild from 'esbuild';

export const defaultOutputDir = './theme';
export const defaultConfigFileNamespace = 'inkline';
export const defaultConfigFileBasename = `${defaultConfigFileNamespace}.config`;
export const defaultConfigFileExtname = '.ts';
export const defaultConsumerModule = 'css';

export const defaultConfig: Configuration = {
    context: createContext(),
    options: {}
};

type CustomLoadConfigOptions = LoadConfigOptions<Configuration> & { dev?: boolean };

export async function loadConfigFromFile(
    options: CustomLoadConfigOptions = {}
): Promise<Configuration> {
    return await loadConfig({ name: defaultConfigFileNamespace, ...options });
}

export async function loadConfig(options: CustomLoadConfigOptions = {}): Promise<Configuration> {
    const { config } = await c12<Configuration>({
        name: undefined,
        defaults: defaultConfig,
        jitiOptions: {
            fsCache: false,
            moduleCache: false,
            transform(opts) {
                const result = esbuild.buildSync({
                    stdin: {
                        contents: opts.source,
                        resolveDir: '.',
                        sourcefile: 'inline.ts',
                        loader: 'ts'
                    },
                    bundle: true,
                    write: false,
                    platform: 'node',
                    format: 'cjs',
                    loader: {
                        '.js': 'js',
                        '.ts': 'ts',
                        '.json': 'json',
                        '.css': 'empty',
                        '.vue': 'empty',
                        '.node': 'empty'
                    }
                });

                const output = result.outputFiles?.[0].text;
                return {
                    code: output
                };
            },
            extensions: ['.js', '.mjs', '.cjs', '.ts', '.mts', '.cts', '.json', '.css', '.vue']
        },
        ...options
    });

    if (!config) {
        throw new Error('Could not load configuration.');
    }

    return config;
}
