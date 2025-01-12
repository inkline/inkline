import { loadConfig as c12, LoadConfigOptions } from 'c12';
import { Configuration } from './types';

export const defaultOutputDir = './src/theme';
export const defaultConfigFileNamespace = 'inkline';
export const defaultConfigFileBasename = `${defaultConfigFileNamespace}.config`;
export const defaultConfigFileExtName = '.ts';
export const defaultConsumerModule = 'css';

export const defaultConfig: Configuration = {
    themes: {},
    files: [],
    options: {}
};

export async function loadConfigFromFile(
    options: LoadConfigOptions<Configuration> = {}
): Promise<Configuration> {
    return await loadConfig({ name: defaultConfigFileNamespace, ...options });
}

export async function loadConfig(
    options: LoadConfigOptions<Configuration> = {}
): Promise<Configuration> {
    const { config } = await c12<Configuration>({
        name: undefined,
        defaults: defaultConfig,
        ...options
    });

    if (!config) {
        throw new Error('Could not load configuration.');
    }

    return config;
}
