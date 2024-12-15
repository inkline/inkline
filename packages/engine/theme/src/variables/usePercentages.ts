import { variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';

export function usePercentages(options = defaultDefinitionOptions) {
    const percentage0 = variable('percentage-0', '0%', options);
    const percentage25 = variable('percentage-25', '25%', options);
    const percentage50 = variable('percentage-50', '50%', options);
    const percentage75 = variable('percentage-75', '75%', options);
    const percentage100 = variable('percentage-100', '100%', options);

    return {
        percentage0,
        percentage25,
        percentage50,
        percentage75,
        percentage100
    };
}
