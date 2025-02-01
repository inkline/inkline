import { defaultDefinitionOptions, DefinitionOptions } from '@inkline/core';
import { variable } from '@inkline/core';

export function useTextAlignVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const textAlign = variable('text-align', 'left', options);
    const textAlignLeft = variable('text-align-left', 'left', options);
    const textAlignCenter = variable('text-align-center', 'center', options);
    const textAlignRight = variable('text-align-right', 'right', options);
    const textAlignJustify = variable('text-align-justify', 'justify', options);

    return {
        textAlign,
        textAlignLeft,
        textAlignCenter,
        textAlignRight,
        textAlignJustify
    };
}

export function useTextAlign(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useTextAlignVariables(options);
}
