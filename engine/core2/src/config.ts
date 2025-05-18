import type { Configuration, Options, ModuleOptions, SetupFunction } from './types';
import { createContext } from './context';

export function defineConfig(
    setup: SetupFunction,
    options: Options<ModuleOptions> = {}
): Configuration {
    const context = createContext();

    setup({ context });

    return {
        context,
        options
    };
}
