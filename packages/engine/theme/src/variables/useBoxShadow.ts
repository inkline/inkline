import { ref, variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';

export function useBoxShadow(options = defaultDefinitionOptions) {
    const boxShadowOffsetX = variable('box-shadow-offset-x', 0, options);
    const boxShadowOffsetY = variable('box-shadow-offset-y', '0.5rem', options);
    const boxShadowBlurRadius = variable('box-shadow-blur-radius', '1rem', options);
    const boxShadowSpreadRadius = variable('box-shadow-spread-radius', '-0.75rem', options);
    const boxShadowColor = variable('box-shadow-color', 'rgba(0, 0, 0, 0.15)', options);
    const boxShadow = variable(
        'box-shadow',
        [
            ref(boxShadowOffsetX),
            ref(boxShadowOffsetY),
            ref(boxShadowBlurRadius),
            ref(boxShadowSpreadRadius),
            ref(boxShadowColor)
        ],
        options
    );

    return {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor,
        boxShadow
    };
}
