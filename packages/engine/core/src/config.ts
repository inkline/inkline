import { Configuration, ConfigurationOptions, ModuleOptions, SetupFunction } from './types';
import { createContext } from './context';

export function defineConfig(
    setup: SetupFunction,
    options: ConfigurationOptions<ModuleOptions> = {}
): Configuration {
    const context = createContext();

    setup({ context });

    return {
        ...context,
        options
    };
}
