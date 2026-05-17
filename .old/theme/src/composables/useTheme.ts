import { useThemeVariables } from './useThemeVariables';
import { useThemeSelectors } from './useThemeSelectors';
import { useThemeUtilities } from './useThemeUtilities';
import { useThemeVariants } from './useThemeVariants';
import { defaultDefinitionOptions, DefinitionOptions } from '@inkline/core';

export function useTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useThemeVariables(options);
    useThemeSelectors(options);
    useThemeUtilities(options);
    useThemeVariants(options);
}
