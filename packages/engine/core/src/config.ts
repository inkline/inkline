import { Configuration, ConfigurationOptions, ModuleOptions, SetupFunction } from './types';
import { state, setState } from './globals';

export function defineConfig(
    setup: SetupFunction,
    options: ConfigurationOptions<ModuleOptions> = {}
): Configuration {
    setState(setup, { themes: {}, files: [] });

    return {
        ...state,
        options
    };
}
