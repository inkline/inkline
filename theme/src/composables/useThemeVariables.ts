import { defaultDefinitionOptions, DefinitionOptions } from '@inkline/core';
import { useDefaultThemeVariables } from './useDefaultThemeVariables';
import { useDarkThemeVariables } from './useDarkThemeVariables';

export function useThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const defaultThemeVariables = useDefaultThemeVariables(options);
    const darkThemeVariables = useDarkThemeVariables(options);

    return {
        ...darkThemeVariables,
        ...defaultThemeVariables
    };
}
