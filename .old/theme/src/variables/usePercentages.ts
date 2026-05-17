import { defaultDefinitionOptions, DefinitionOptions, variable } from '@inkline/core';

export function usePercentagesVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const percentage0 = variable('percentage--0', '0%', options);
    const percentage25 = variable('percentage--25', '25%', options);
    const percentage50 = variable('percentage--50', '50%', options);
    const percentage75 = variable('percentage--75', '75%', options);
    const percentage100 = variable('percentage--100', '100%', options);

    return {
        percentage0,
        percentage25,
        percentage50,
        percentage75,
        percentage100
    };
}

export function usePercentages(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return usePercentagesVariables(options);
}
