import type { DefinitionOptions, Theme } from '../types';
import { isTheme } from '../typeGuards';

export function isVariableDefined(name: string, themeOrOptions: Theme | DefinitionOptions) {
    if (isTheme(themeOrOptions)) {
        return themeOrOptions.__keys.variables.has(name);
    }

    return themeOrOptions.context.themes.default.__keys.variables.has(name);
}
