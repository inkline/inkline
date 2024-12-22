import { css, multiply, ref, TokenValue, variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';
import { useFluid } from './useFluid';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';

export function useSpacing(options = defaultDefinitionOptions) {
    const { fluidBreakpoint } = useFluid();

    const spacingMin = variable('spacing-min', 18, options);
    const spacingMax = variable('spacing-max', 20, options);

    const variantMultipliers = {
        '2xs': 0.25,
        'xs': 0.5,
        'sm': 0.75,
        'md': 1,
        'lg': 1.5,
        'xl': 2,
        '2xl': 4,
        '3xl': 6,
        '4xl': 8
    };

    const spacingVariants = {
        '2xs': createVariantFactoryFn((value) => multiply(value, variantMultipliers['2xs'])),
        'xs': createVariantFactoryFn((value) => multiply(value, variantMultipliers['xs'])),
        'sm': createVariantFactoryFn((value) => multiply(value, variantMultipliers['sm'])),
        'md': createVariantFactoryFn((value) => value),
        'lg': createVariantFactoryFn((value) => multiply(value, variantMultipliers['lg'])),
        'xl': createVariantFactoryFn((value) => multiply(value, variantMultipliers['xl'])),
        '2xl': createVariantFactoryFn((value) => multiply(value, variantMultipliers['2xl'])),
        '3xl': createVariantFactoryFn((value) => multiply(value, variantMultipliers['3xl'])),
        '4xl': createVariantFactoryFn((value) => multiply(value, variantMultipliers['4xl']))
    };

    const {
        spacingMin2Xs,
        spacingMinXs,
        spacingMinSm,
        spacingMinMd,
        spacingMinLg,
        spacingMinXl,
        spacingMin2Xl,
        spacingMin3Xl,
        spacingMin4Xl
    } = useVariantsFactory<'spacing-min', keyof typeof spacingVariants>(spacingMin, spacingVariants, options);


    const {
        spacingMax2Xs,
        spacingMaxXs,
        spacingMaxSm,
        spacingMaxMd,
        spacingMaxLg,
        spacingMaxXl,
        spacingMax2Xl,
        spacingMax3Xl,
        spacingMax4Xl
    } = useVariantsFactory<'spacing-max', keyof typeof spacingVariants>(spacingMax, spacingVariants, options);

    const createSpacingVariant = (spacingMin: TokenValue, spacingMax: TokenValue) => createVariantFactoryFn(() => css`calc(((${spacingMin} / 16) * 1 rem) + (${spacingMax} - ${spacingMin}) * ${ref(fluidBreakpoint)})`);
    const variants = {
        '2xs': createSpacingVariant(spacingMin2Xs, spacingMax2Xs),
        'xs': createSpacingVariant(spacingMinXs, spacingMaxXs),
        'sm': createSpacingVariant(spacingMinSm, spacingMaxSm),
        'md': createSpacingVariant(spacingMinMd, spacingMaxMd),
        'lg': createSpacingVariant(spacingMinLg, spacingMaxLg),
        'xl': createSpacingVariant(spacingMinXl, spacingMaxXl),
        '2xl': createSpacingVariant(spacingMin2Xl, spacingMax2Xl),
        '3xl': createSpacingVariant(spacingMin3Xl, spacingMax3Xl),
        '4xl': createSpacingVariant(spacingMin4Xl, spacingMax4Xl),
        '2xs-xs': createSpacingVariant(spacingMin2Xs, spacingMaxXs),
        'xs-sm': createSpacingVariant(spacingMinXs, spacingMaxSm),
        'sm-md': createSpacingVariant(spacingMinSm, spacingMaxMd),
        'md-lg': createSpacingVariant(spacingMinMd, spacingMaxLg),
        'lg-xl': createSpacingVariant(spacingMinLg, spacingMaxXl),
        'xl-2xl': createSpacingVariant(spacingMinXl, spacingMax2Xl),
        '2xl-3xl': createSpacingVariant(spacingMin2Xl, spacingMax3Xl),
        '3xl-4xl': createSpacingVariant(spacingMin3Xl, spacingMax4Xl)
    };

    const {
        spacing2Xs,
        spacingXs,
        spacingSm,
        spacingMd,
        spacingLg,
        spacingXl,
        spacing2Xl,
        spacing3Xl,
        spacing4Xl,
        spacing2XsXs,
        spacingXsSm,
        spacingSmMd,
        spacingMdLg,
        spacingLgXl,
        spacingXl2Xl,
        spacing2Xl3Xl,
        spacing3Xl4Xl
    } =
        useVariantsFactory<'spacing', keyof typeof variants>('spacing', variants, options);

    const spacing = variable('spacing', ref(spacingMd), options);

    return {
        spacingMin,
        spacingMax,
        spacing,
        spacing2Xs,
        spacingXs,
        spacingSm,
        spacingMd,
        spacingLg,
        spacingXl,
        spacing2Xl,
        spacing3Xl,
        spacing4Xl,
        spacing2XsXs,
        spacingXsSm,
        spacingSmMd,
        spacingMdLg,
        spacingLgXl,
        spacingXl2Xl,
        spacing2Xl3Xl,
        spacing3Xl4Xl
    };
}
