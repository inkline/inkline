import { defaultDefinitionOptions } from '@inkline/core';
import { useDefaultThemeVariables } from './useDefaultThemeVariables';
import { useDarkThemeVariables } from './useDarkThemeVariables';

export function useThemeVariables(options = defaultDefinitionOptions) {
    const defaultThemeVariables = useDefaultThemeVariables(options);
    const darkThemeVariables = useDarkThemeVariables(options);

    return {
        ...darkThemeVariables,
        ...defaultThemeVariables
    };
}
