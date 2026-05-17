import type { ComponentManifestCssVariable } from 'inkline';

export function parseDesignTokenValue(variable: ComponentManifestCssVariable): string {
    let resolvedValue;
    if (variable.value) {
        resolvedValue =
            typeof variable.value === 'string'
                ? variable.value
                : variable.value.map(parseDesignTokenValue).join(' ');
    }

    if (resolvedValue) {
        return variable.name ? `var(${variable.name}, ${resolvedValue})` : resolvedValue;
    } else {
        return `var(${variable.name})`;
    }
}
