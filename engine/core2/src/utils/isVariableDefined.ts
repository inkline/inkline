import type { DefinitionOptions, Theme } from '../types';
import { isTheme } from '../typeGuards';
import { theme } from '../tokens';

export function isVariableDefined(name: string, themeOrOptions: Theme | DefinitionOptions) {
    if (isTheme(themeOrOptions)) {
        return themeOrOptions.__keys.variables.includes(name);
    }

    const defaultTheme = theme('default', themeOrOptions);

    if (!defaultTheme.__keys.variables.includes(name) && name === 'color--primary') {
        console.log(
            `Variable "${name}" is not defined in the default theme.`,
            JSON.stringify(
                defaultTheme.__keys.variables.filter((v) => v.startsWith('color')),
                null,
                2
            )
        );
    }

    return defaultTheme.__keys.variables.includes(name);
}
