import type { DefinitionOptions, Theme } from '../types';
import { isTheme } from '../typeGuards';
import { theme } from '../tokens';

export function isVariableDefined(name: string, themeOrOptions: Theme | DefinitionOptions) {
    if (isTheme(themeOrOptions)) {
        return themeOrOptions.__keys.variables.has(name);
    }

    const defaultTheme = theme('default', themeOrOptions);

    return defaultTheme.__keys.variables.has(name);
}
