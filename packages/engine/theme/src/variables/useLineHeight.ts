import { variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';

export function useLineHeight(options = defaultDefinitionOptions) {
    const lineHeight = variable('line-height', 1.5, options);

    return {
        lineHeight
    };
}
