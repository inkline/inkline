import { DefinitionOptions, variable } from '@inkline/core';

export function useLineHeight(options: DefinitionOptions) {
    const lineHeight = variable('line-height', 1.5, options);

    return {
        lineHeight
    };
}
