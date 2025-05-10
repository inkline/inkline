import type { Configuration, Options, ModuleOptions, SetupFunction } from './types';
import { createContext } from './context';

export function defineConfig(
    setup: SetupFunction,
    options: Options<ModuleOptions> = {}
): Configuration {
    const context = createContext();

    console.log('BEFORE SETUP', setup, options);

    setup({ context });

    console.log('AFTER SETUP', context, options);

    return {
        context,
        options
    };
}
