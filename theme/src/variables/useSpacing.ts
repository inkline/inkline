import {
    css,
    defaultDefinitionOptions,
    DefinitionOptions,
    multiply,
    ref,
    TokenValue,
    variable
} from '@inkline/core';
import { useFluid } from './useFluid';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';
import { useFontSize } from './useFontSize';

export function useSpacingVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fluidBreakpoint } = useFluid(options);
    const { fontSizeMin, fontSizeMax } = useFontSize(options);

    const spacingMin = variable('spacing--min', ref(fontSizeMin), options);
    const spacingMax = variable('spacing--max', ref(fontSizeMax), options);

    const variantMultipliers = {
        '4xs': 0.0625,
        '3xs': 0.125,
        '2xs': 0.25,
        xs: 0.5,
        sm: 0.75,
        md: 1,
        lg: 1.5,
        xl: 2,
        '2xl': 4,
        '3xl': 6,
        '4xl': 8
    };

    const spacingMinMaxVariants = {
        '4xs': createVariantFactoryFn((value) => multiply(value, variantMultipliers['4xs'])),
        '3xs': createVariantFactoryFn((value) => multiply(value, variantMultipliers['3xs'])),
        '2xs': createVariantFactoryFn((value) => multiply(value, variantMultipliers['2xs'])),
        xs: createVariantFactoryFn((value) => multiply(value, variantMultipliers['xs'])),
        sm: createVariantFactoryFn((value) => multiply(value, variantMultipliers['sm'])),
        md: createVariantFactoryFn((value) => value),
        lg: createVariantFactoryFn((value) => multiply(value, variantMultipliers['lg'])),
        xl: createVariantFactoryFn((value) => multiply(value, variantMultipliers['xl'])),
        '2xl': createVariantFactoryFn((value) => multiply(value, variantMultipliers['2xl'])),
        '3xl': createVariantFactoryFn((value) => multiply(value, variantMultipliers['3xl'])),
        '4xl': createVariantFactoryFn((value) => multiply(value, variantMultipliers['4xl']))
    };

    const {
        spacingMin4Xs,
        spacingMin3Xs,
        spacingMin2Xs,
        spacingMinXs,
        spacingMinSm,
        spacingMinMd,
        spacingMinLg,
        spacingMinXl,
        spacingMin2Xl,
        spacingMin3Xl,
        spacingMin4Xl
    } = useVariantsFactory<'spacing--min', keyof typeof spacingMinMaxVariants>(
        spacingMin,
        spacingMinMaxVariants,
        options
    );

    const {
        spacingMax4Xs,
        spacingMax3Xs,
        spacingMax2Xs,
        spacingMaxXs,
        spacingMaxSm,
        spacingMaxMd,
        spacingMaxLg,
        spacingMaxXl,
        spacingMax2Xl,
        spacingMax3Xl,
        spacingMax4Xl
    } = useVariantsFactory<'spacing--max', keyof typeof spacingMinMaxVariants>(
        spacingMax,
        spacingMinMaxVariants,
        options
    );

    const createSpacingVariant = (spacingMin: TokenValue, spacingMax: TokenValue) =>
        createVariantFactoryFn(
            () =>
                css`calc(((${spacingMin} / 16) * ${'1rem'}) + (${spacingMax} - ${spacingMin}) * ${ref(fluidBreakpoint)})`
        );
    const variants = {
        '4xs': createSpacingVariant(ref(spacingMin4Xs), ref(spacingMax4Xs)),
        '3xs': createSpacingVariant(ref(spacingMin3Xs), ref(spacingMax3Xs)),
        '2xs': createSpacingVariant(ref(spacingMin2Xs), ref(spacingMax2Xs)),
        xs: createSpacingVariant(ref(spacingMinXs), ref(spacingMaxXs)),
        sm: createSpacingVariant(ref(spacingMinSm), ref(spacingMaxSm)),
        md: createSpacingVariant(ref(spacingMinMd), ref(spacingMaxMd)),
        lg: createSpacingVariant(ref(spacingMinLg), ref(spacingMaxLg)),
        xl: createSpacingVariant(ref(spacingMinXl), ref(spacingMaxXl)),
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
        spacing4Xs,
        spacing3Xs,
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
    } = useVariantsFactory<'spacing', keyof typeof variants>('spacing', variants, options);

    const spacing = variable('spacing', ref(spacingMd), options);

    const spacingMap = {
        default: spacing,
        none: 0,
        '0': 0,
        '4xs': spacing4Xs,
        '3xs': spacing3Xs,
        '2xs': spacing2Xs,
        xs: spacingXs,
        sm: spacingSm,
        md: spacingMd,
        lg: spacingLg,
        xl: spacingXl,
        '2xl': spacing2Xl,
        '3xl': spacing3Xl,
        '4xl': spacing4Xl,
        '2xs-xs': spacing2XsXs,
        'xs-sm': spacingXsSm,
        'xs-md': spacingXsMd,
        'xs-lg': spacingXsLg,
        'xs-xl': spacingXsXl,
        'sm-md': spacingSmMd,
        'sm-lg': spacingSmLg,
        'sm-xl': spacingSmXl,
        'md-lg': spacingMdLg,
        'md-xl': spacingMdXl,
        'lg-xl': spacingLgXl,
        'xl-2xl': spacingXl2Xl,
        '2xl-3xl': spacing2Xl3Xl,
        '3xl-4xl': spacing3Xl4Xl
    };

    return {
        spacingMin,
        spacingMax,
        spacing,
        spacing4Xs,
        spacing3Xs,
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
        spacing3Xl4Xl,
        spacingMap
    };
}

export function useSpacing(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useSpacingVariables(options);
}
