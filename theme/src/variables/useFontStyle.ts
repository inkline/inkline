import { defaultDefinitionOptions, DefinitionOptions, variable } from '@inkline/core';

export function useFontStyleVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const fontStyleNormal = variable('font-style-normal', 'normal', options);
    const fontStyleItalic = variable('font-style-italic', 'italic', options);
    const fontStyleOblique = variable('font-style-oblique', 'oblique', options);

    return {
        fontStyleNormal,
        fontStyleItalic,
        fontStyleOblique
    };
}

export function useFontStyle(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useFontStyleVariables(options);
}
