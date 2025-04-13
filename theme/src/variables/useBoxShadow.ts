import { defaultDefinitionOptions, DefinitionOptions, ref, variable } from '@inkline/core';

export function useBoxShadowVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const boxShadowOffsetXXs = variable('box-shadow-offset-x-xs', 0, options);
    const boxShadowOffsetYXs = variable('box-shadow-offset-y-xs', '0.125rem', options);
    const boxShadowBlurRadiusXs = variable('box-shadow-blur-radius-xs', '0.25rem', options);
    const boxShadowSpreadRadiusXs = variable('box-shadow-spread-radius-xs', '-0.125rem', options);
    const boxShadowColorXs = variable('box-shadow-color-xs', 'transparent', options);
    const boxShadowXs = variable(
        'box-shadow-xs',
        [
            ref(boxShadowOffsetXXs),
            ref(boxShadowOffsetYXs),
            ref(boxShadowBlurRadiusXs),
            ref(boxShadowSpreadRadiusXs),
            ref(boxShadowColorXs)
        ],
        options
    );

    const boxShadowOffsetXSm = variable('box-shadow-offset-x-sm', 0, options);
    const boxShadowOffsetYSm = variable('box-shadow-offset-y-sm', '0.25rem', options);
    const boxShadowBlurRadiusSm = variable('box-shadow-blur-radius-sm', '0.5rem', options);
    const boxShadowSpreadRadiusSm = variable('box-shadow-spread-radius-sm', '-0.25rem', options);
    const boxShadowColorSm = variable('box-shadow-color-sm', 'rgba(0, 0, 0, 0.075)', options);
    const boxShadowSm = variable(
        'box-shadow-sm',
        [
            ref(boxShadowOffsetXSm),
            ref(boxShadowOffsetYSm),
            ref(boxShadowBlurRadiusSm),
            ref(boxShadowSpreadRadiusSm),
            ref(boxShadowColorSm)
        ],
        options
    );

    const boxShadowOffsetXMd = variable('box-shadow-offset-x', 0, options);
    const boxShadowOffsetYMd = variable('box-shadow-offset-y', '0.5rem', options);
    const boxShadowBlurRadiusMd = variable('box-shadow-blur-radius', '1rem', options);
    const boxShadowSpreadRadiusMd = variable('box-shadow-spread-radius', '-0.75rem', options);
    const boxShadowColorMd = variable('box-shadow-color', 'rgba(0, 0, 0, 0.15)', options);
    const boxShadowMd = variable(
        'box-shadow',
        [
            ref(boxShadowOffsetXMd),
            ref(boxShadowOffsetYMd),
            ref(boxShadowBlurRadiusMd),
            ref(boxShadowSpreadRadiusMd),
            ref(boxShadowColorMd)
        ],
        options
    );

    const boxShadowOffsetXLg = variable('box-shadow-offset-x-lg', 0, options);
    const boxShadowOffsetYLg = variable('box-shadow-offset-y-lg', '1rem', options);
    const boxShadowBlurRadiusLg = variable('box-shadow-blur-radius-lg', '1.5rem', options);
    const boxShadowSpreadRadiusLg = variable('box-shadow-spread-radius-lg', '-1.5rem', options);
    const boxShadowColorLg = variable('box-shadow-color-lg', 'rgba(0, 0, 0, 0.2)', options);
    const boxShadowLg = variable(
        'box-shadow-lg',
        [
            ref(boxShadowOffsetXLg),
            ref(boxShadowOffsetYLg),
            ref(boxShadowBlurRadiusLg),
            ref(boxShadowSpreadRadiusLg),
            ref(boxShadowColorLg)
        ],
        options
    );

    const boxShadowOffsetXXl = variable('box-shadow-offset-x-xl', 0, options);
    const boxShadowOffsetYXl = variable('box-shadow-offset-y-xl', '1.5rem', options);
    const boxShadowBlurRadiusXl = variable('box-shadow-blur-radius-xl', '2rem', options);
    const boxShadowSpreadRadiusXl = variable('box-shadow-spread-radius-xl', '-2rem', options);
    const boxShadowColorXl = variable('box-shadow-color-xl', 'rgba(0, 0, 0, 0.25)', options);
    const boxShadowXl = variable(
        'box-shadow-xl',
        [
            ref(boxShadowOffsetXXl),
            ref(boxShadowOffsetYXl),
            ref(boxShadowBlurRadiusXl),
            ref(boxShadowSpreadRadiusXl),
            ref(boxShadowColorXl)
        ],
        options
    );

    const boxShadowOffsetX = variable('box-shadow-offset-x', ref(boxShadowOffsetXMd), options);
    const boxShadowOffsetY = variable('box-shadow-offset-y', ref(boxShadowOffsetYMd), options);
    const boxShadowBlurRadius = variable(
        'box-shadow-blur-radius',
        ref(boxShadowBlurRadiusMd),
        options
    );
    const boxShadowSpreadRadius = variable(
        'box-shadow-spread-radius',
        ref(boxShadowSpreadRadiusMd),
        options
    );
    const boxShadowColor = variable('box-shadow-color', ref(boxShadowColorMd), options);
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

    const boxShadowNone = variable('box-shadow-none', 'none', options);

    const boxShadowMap = {
        default: boxShadow,
        xs: boxShadowXs,
        sm: boxShadowSm,
        md: boxShadowMd,
        lg: boxShadowLg,
        xl: boxShadowXl,
        none: boxShadowNone
    };

    return {
        boxShadowOffsetX,
        boxShadowOffsetY,
        boxShadowBlurRadius,
        boxShadowSpreadRadius,
        boxShadowColor,
        boxShadow,
        boxShadowXs,
        boxShadowSm,
        boxShadowMd,
        boxShadowLg,
        boxShadowXl,
        boxShadowNone,
        boxShadowMap
    };
}

export function useBoxShadow(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useBoxShadowVariables(options);
}
