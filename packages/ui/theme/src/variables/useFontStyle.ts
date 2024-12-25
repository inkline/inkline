import { variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';

export function useFontStyle(options = defaultDefinitionOptions) {
    const fontStyleNormal = variable('font-style-normal', 'normal', options);
    const fontStyleItalic = variable('font-style-italic', 'italic', options);
    const fontStyleOblique = variable('font-style-oblique', 'oblique', options);

    return {
        fontStyleNormal,
        fontStyleItalic,
        fontStyleOblique
    };
}
