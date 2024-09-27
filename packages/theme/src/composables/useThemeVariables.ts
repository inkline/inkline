import { defaultDefinitionOptions } from "@inkline/core";
import { useDarkThemeVariables, useDefaultThemeVariables } from "../variables";

export function useThemeVariables(options = defaultDefinitionOptions) {
    const defaultThemeVariables = useDefaultThemeVariables(options);
    const darkThemeVariables = useDarkThemeVariables(options);

    return {
        ...darkThemeVariables,
        ...defaultThemeVariables
    };
}
