import { useThemeVariables } from './useThemeVariables';
import { useThemeSelectors } from './useThemeSelectors';
import { defaultDefinitionOptions, DefinitionOptions } from '@inkline/core';

export function useTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useThemeVariables(options);
    useThemeSelectors(options);
}
