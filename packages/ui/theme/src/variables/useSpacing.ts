import { css, defaultDefinitionOptions, DefinitionOptions, multiply, ref, TokenValue, variable } from '@inkline/core';
import { useFluid } from './useFluid';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';
import { useFontSize } from './useFontSize';

export function useSpacingVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fluidBreakpoint } = useFluid(options);
    const { fontSizeMin, fontSizeMax } = useFontSize(options);

    const spacingMin = variable('spacing-min', ref(fontSizeMin), options);
    const spacingMax = variable('spacing-max', ref(fontSizeMax), options);

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

    const spacingMinMaxVariants = {
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
    } = useVariantsFactory<'spacing-min', keyof typeof spacingMinMaxVariants>(spacingMin, spacingMinMaxVariants, options);


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
    } = useVariantsFactory<'spacing-max', keyof typeof spacingMinMaxVariants>(spacingMax, spacingMinMaxVariants, options);

    const createSpacingVariant = (spacingMin: TokenValue, spacingMax: TokenValue) => createVariantFactoryFn(() => css`calc(((${spacingMin} / 16) * ${'1rem'}) + (${spacingMax} - ${spacingMin}) * ${ref(fluidBreakpoint)})`);
    const variants = {
        '2xs': createSpacingVariant(ref(spacingMin2Xs), ref(spacingMax2Xs)),
        'xs': createSpacingVariant(ref(spacingMinXs), ref(spacingMaxXs)),
        'sm': createSpacingVariant(ref(spacingMinSm), ref(spacingMaxSm)),
        'md': createSpacingVariant(ref(spacingMinMd), ref(spacingMaxMd)),
        'lg': createSpacingVariant(ref(spacingMinLg), ref(spacingMaxLg)),
        'xl': createSpacingVariant(ref(spacingMinXl), ref(spacingMaxXl)),
        '2xl': createSpacingVariant(ref(spacingMin2Xl), ref(spacingMax2Xl)),
        '3xl': createSpacingVariant(ref(spacingMin3Xl), ref(spacingMax3Xl)),
        '4xl': createSpacingVariant(ref(spacingMin4Xl), ref(spacingMax4Xl)),
        '2xs-xs': createSpacingVariant(ref(spacingMin2Xs), ref(spacingMaxXs)),
        'xs-sm': createSpacingVariant(ref(spacingMinXs), ref(spacingMaxSm)),
        'xs-md': createSpacingVariant(ref(spacingMinXs), ref(spacingMaxMd)),
        'xs-lg': createSpacingVariant(ref(spacingMinXs), ref(spacingMaxLg)),
        'xs-xl': createSpacingVariant(ref(spacingMinXs), ref(spacingMaxXl)),
        'sm-md': createSpacingVariant(ref(spacingMinSm), ref(spacingMaxMd)),
        'sm-lg': createSpacingVariant(ref(spacingMinSm), ref(spacingMaxLg)),
        'sm-xl': createSpacingVariant(ref(spacingMinSm), ref(spacingMaxXl)),
        'md-lg': createSpacingVariant(ref(spacingMinMd), ref(spacingMaxLg)),
        'md-xl': createSpacingVariant(ref(spacingMinMd), ref(spacingMaxXl)),
        'lg-xl': createSpacingVariant(ref(spacingMinLg), ref(spacingMaxXl)),
        'xl-2xl': createSpacingVariant(ref(spacingMinXl), ref(spacingMax2Xl)),
        '2xl-3xl': createSpacingVariant(ref(spacingMin2Xl), ref(spacingMax3Xl)),
        '3xl-4xl': createSpacingVariant(ref(spacingMin3Xl), ref(spacingMax4Xl))
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
        spacingXsMd,
        spacingXsLg,
        spacingXsXl,
        spacingSmMd,
        spacingSmLg,
        spacingSmXl,
        spacingMdLg,
        spacingMdXl,
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
        spacingXsMd,
        spacingXsLg,
        spacingXsXl,
        spacingSmMd,
        spacingSmLg,
        spacingSmXl,
        spacingMdLg,
        spacingMdXl,
        spacingLgXl,
        spacingXl2Xl,
        spacing2Xl3Xl,
        spacing3Xl4Xl
    };
}

export function useSpacing(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useSpacingVariables(options);
}
