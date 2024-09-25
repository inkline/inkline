import { variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';
import { useSizeMultiplierVariantsFactory } from './useSizeMultiplier';

export function useFontSize(options = defaultDefinitionOptions) {
    const fontSize = variable('font-size', '1rem', options);

    const { fontSizeXs, fontSizeSm, fontSizeMd, fontSizeLg, fontSizeXl } =
        useSizeMultiplierVariantsFactory(fontSize, options);

    return {
        fontSize,
        fontSizeXs,
        fontSizeSm,
        fontSizeMd,
        fontSizeLg,
        fontSizeXl
    };
}
