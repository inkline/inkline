import { Configuration, ConfigurationOptions, ModuleOptions, SetupFunction } from './types';
import { createContext } from './context';
import { defaultDefinitionOptions } from './constants';

export function defineConfig(
    setup: SetupFunction,
    options: ConfigurationOptions<ModuleOptions> = {}
): Configuration {
    const context = createContext();

    setup({ ...defaultDefinitionOptions, context });

    return {
        ...context,
        options
    };
}
