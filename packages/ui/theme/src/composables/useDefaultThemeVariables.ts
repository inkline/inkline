import { DefinitionOptions, defaultDefinitionOptions } from '@inkline/core';
import {
    useBorder,
    useBorderRadius,
    useBoxShadow,
    useBreakpoints,
    useColors,
    useContrastTextColor,
    useFontFamily,
    useFontSize,
    useFontWeight,
    useGrid,
    useLetterSpacing,
    useLineHeight,
    usePercentages,
    useScale,
    useSizeMultiplier,
    useSpacing,
    useTextAlign,
    useTextColor,
    useTransition,
    useFluid, useFluidTypeScale
} from '../variables';

export function useDefaultThemeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return {
        ...useBorder(options),
        ...useBorderRadius(options),
        ...useBoxShadow(options),
        ...useBreakpoints(options),
        ...useColors(options),
        ...useContrastTextColor(options),
        ...useFluid(options),
        ...useFluidTypeScale(options),
        ...useFontFamily(options),
        ...useFontSize(options),
        ...useFontWeight(options),
        ...useGrid(options),
        ...useLetterSpacing(options),
        ...useLineHeight(options),
        ...usePercentages(options),
        ...useScale(options),
        ...useSizeMultiplier(options),
        ...useSpacing(options),
        ...useTextAlign(options),
        ...useTextColor(options),
        ...useTransition(options)
    };
}
