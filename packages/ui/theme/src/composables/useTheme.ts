import { useThemeVariables } from './useThemeVariables';
import { useThemeSelectors } from './useThemeSelectors';
import { DefinitionOptions } from '@inkline/core';

export function useTheme(options: DefinitionOptions) {
    useThemeVariables(options);
    useThemeSelectors(options);
}
