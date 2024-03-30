import {
    defineResolver,
    defineResolverValueFn,
    createFieldWithOptionalVariantsResolveFn,
    defineResolverVariantFn,
    codegenCssVariables
} from '../utils';
import {
    RawTheme,
    RawThemeSizeMultiplier,
    RawThemeSizeMultiplierVariant,
    RawThemeSizePercentage,
    ResolvedTheme,
    ResolvedThemeSizeMultiplier,
    ResolvedThemeSizePercentage,
    ResolvedThemeTypographyFontSize
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
    RawTheme['size']['multiplier'],
    ResolvedTheme['size']['multiplier']
>({
    key: 'size.multiplier',
    resolve: createFieldWithOptionalVariantsResolveFn(
        resolveSizeMultiplier,
        resolveSizeMultiplierVariant
    )
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
    RawTheme['size']['percentages'],
    ResolvedTheme['size']['percentages']
>({
    key: 'size.percentages',
    resolve: createFieldWithOptionalVariantsResolveFn(
        resolveSizePercentage,
        resolveSizePercentageVariant
    )
});
