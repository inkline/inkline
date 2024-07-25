import { loadConfig as c12, LoadConfigOptions } from 'c12';
import { Configuration, ConfigurationOptions, ModuleOptions, SetupFunction } from './types';
import { ScssGeneratorOptions } from './generators';
import { themes } from './themes';

export const defaultOutputDir = './src/theme';
export const defaultConfigFileNamespace = 'inkline';
export const defaultConfigFileBasename = `${defaultConfigFileNamespace}.config`;
export const defaultConfigFileExtName = '.ts';
export const defaultConsumerModule = 'scss';

export const defaultConfig: Configuration = {
    themes,
    options: {}
};

export function defineConfig(
    setup: SetupFunction,
    options: ConfigurationOptions<ModuleOptions> = {}
): Configuration {
    setup();

    return {
        themes,
        options
    };
}

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
