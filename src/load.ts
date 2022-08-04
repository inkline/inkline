import { Configuration, ResolvedConfiguration } from './types';
import { loadConfig as c12, LoadConfigOptions } from 'c12';
import { defaultConfig } from './defaults';
import { resolve } from './resolve';
import { PartialDeep } from 'type-fest';

export async function loadConfig (
    overrides: PartialDeep<Configuration>
): Promise<ResolvedConfiguration> {
    let { config } = await c12<Configuration>({
        name: undefined,
        defaults: defaultConfig,
        overrides: overrides as Configuration
    });

    config = resolve(config);

    return config as ResolvedConfiguration;
}

export async function loadConfigFromFile (
    options: LoadConfigOptions<ResolvedConfiguration> = {}
): Promise<ResolvedConfiguration> {
    let { config } = await c12<Configuration>({
        name: 'inkline',
        defaults: defaultConfig,
        ...options
    });

    config = resolve(config);

    console.log(config.theme);

    return config as ResolvedConfiguration;
}
