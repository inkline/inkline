import { defaultDefinitionOptions } from '../constants';
import { useBorder } from './useBorder';
import { useBorderRadius } from './useBorderRadius';
import { useBoxShadow } from './useBoxShadow';
import { useBreakpoints } from './useBreakpoints';
import { useColors } from './useColors';
import { useContrastTextColor } from './useContrastTextColor';
import { useFontFamily } from './useFontFamily';
import { useFontSize } from './useFontSize';
import { useFontWeight } from './useFontWeight';
import { useGrid } from './useGrid';
import { useLetterSpacing } from './useLetterSpacing';
import { useLineHeight } from './useLineHeight';
import { useMargin } from './useMargin';
import { usePadding } from './usePadding';
import { usePercentages } from './usePercentages';
import { useScaleRatio } from './useScaleRatio';
import { useSizeMultiplier } from './useSizeMultiplier';
import { useSpacing } from './useSpacing';
import { useTextAlign } from './useTextAlign';
import { useTextColor } from './useTextColor';
import { useTransition } from './useTransition';

export function useDefaultTheme(options = defaultDefinitionOptions) {
    return {
        ...useBorder(options),
        ...useBorderRadius(options),
        ...useBoxShadow(options),
        ...useBreakpoints(options),
        ...useColors(options),
        ...useContrastTextColor(options),
        ...useFontFamily(options),
        ...useFontSize(options),
        ...useFontWeight(options),
        ...useGrid(options),
        ...useLetterSpacing(options),
        ...useLineHeight(options),
        ...useMargin(options),
        ...usePadding(options),
        ...usePercentages(options),
        ...useScaleRatio(options),
        ...useSizeMultiplier(options),
        ...useSpacing(options),
        ...useTextAlign(options),
        ...useTextColor(options),
        ...useTransition(options)
    };
}
