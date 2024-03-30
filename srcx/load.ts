import { Configuration, ResolvedConfiguration } from './types';
import { loadConfig as c12, LoadConfigOptions } from 'c12';
import { defaultConfig } from './defaults';
import { resolve } from './resolve';
import { PartialDeep } from 'type-fest';

export async function loadConfig(
    overrides: PartialDeep<Configuration>
): Promise<ResolvedConfiguration> {
    const { config } = await c12<Configuration>({
        name: undefined,
        defaults: defaultConfig,
        overrides: overrides as Configuration
    });

    return resolve(config as Configuration);
}

export async function loadConfigFromFile(
    options: LoadConfigOptions<Configuration> = {}
): Promise<ResolvedConfiguration> {
    const { config } = await c12<Configuration>({
        name: 'inkline',
        defaults: defaultConfig,
        ...options
    });

    return resolve(config as Configuration);
}
