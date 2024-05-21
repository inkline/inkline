import {
    defineResolver,
    defineResolverValueFn,
    defineResolverVariantFn,
    codegenCssVariables,
    createResolveFn
} from '../utils';
import {
    RawTheme,
    RawThemeSizeMultiplier,
    RawThemeSizeMultiplierVariant,
    RawThemeSizePercentage,
    RawThemeValueType,
    ResolvedTheme,
    ResolvedThemeSizeMultiplier,
    ResolvedThemeSizePercentage,
    ResolvedThemeTypographyFontSize,
    ResolvedThemeValueType
} from '../types';
import { sizeMultiplierModifiers } from './modifiers';

/**
 * Size multiplier
 */

export const resolveSizeMultiplier = defineResolverValueFn<
    RawThemeSizeMultiplier,
    ResolvedThemeSizeMultiplier
>((multiplier) => {
    return multiplier;
});

export const resolveSizeMultiplierVariant = defineResolverVariantFn<
    RawThemeSizeMultiplierVariant | RawThemeSizeMultiplier,
    ResolvedThemeSizeMultiplier
>((variant, meta) => {
    if (typeof variant === 'string' || typeof variant === 'number') {
        return resolveSizeMultiplier(variant, meta);
    }

    return Object.keys(variant).reduce<ResolvedThemeTypographyFontSize>((acc, modifierName) => {
        if (modifierName in sizeMultiplierModifiers) {
            return sizeMultiplierModifiers[modifierName as keyof typeof sizeMultiplierModifiers](
                acc,
                variant[modifierName]
            );
        }

        return acc;
    }, codegenCssVariables.get('size-multiplier'));
});

export const sizeMultiplierResolver = defineResolver<
    RawThemeValueType<RawTheme['size']['multiplier']>,
    RawThemeValueType<ResolvedTheme['size']['multiplier']>
>({
    key: /^size\.multiplier\.[^.]+$/,
    resolve: createResolveFn(resolveSizeMultiplier, resolveSizeMultiplierVariant)
});

/**
 * Size percentage
 */

export const resolveSizePercentage = defineResolverValueFn<
    RawThemeSizePercentage,
    ResolvedThemeSizePercentage
>((percentage) => {
    return typeof percentage === 'number' ? `${percentage}%` : percentage;
});

export const resolveSizePercentageVariant = defineResolverVariantFn<
    RawThemeSizePercentage,
    ResolvedThemeSizePercentage
>(resolveSizePercentage);

export const sizePercentagesResolver = defineResolver<
    RawThemeValueType<RawTheme['size']['percentages']>,
    ResolvedThemeValueType<ResolvedTheme['size']['percentages']>
>({
    key: /^size\.percentages\.[^.]+$/,
    resolve: createResolveFn(resolveSizePercentage, resolveSizePercentageVariant)
});
