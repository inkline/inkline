import type { DefinitionOptions, Theme } from '../types';
import { isTheme } from '../typeGuards';

export function isUtilityDefined(name: string, themeOrOptions: Theme | DefinitionOptions) {
    if (isTheme(themeOrOptions)) {
        return themeOrOptions.__keys.utilities.includes(name);
    }

    return themeOrOptions.context.themes.default.__keys.utilities.includes(name);
}
