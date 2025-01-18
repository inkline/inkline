import { defaultDefinitionOptions, DefinitionOptions, variable } from '@inkline/core';

export function useLineHeight(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const lineHeight = variable('line-height', 1.5, options);

    return {
        lineHeight
    };
}
