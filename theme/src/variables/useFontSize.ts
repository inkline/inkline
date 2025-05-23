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
import { useFluidTypeScale } from './useFluidTypeScale';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';

export function useFontSizeVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fluidBreakpoint } = useFluid(options);
    const { typeScaleMinMap, typeScaleMaxMap } = useFluidTypeScale(options);

    const fontSizeMin = variable('font-size--min', 16, options);
    const fontSizeMax = variable('font-size--max', 18, options);

    const fontSizeMinVariants = {
        '2xs': createVariantFactoryFn((value) => multiply(value, ref(typeScaleMinMap['-3']))),
        xs: createVariantFactoryFn((value) => multiply(value, ref(typeScaleMinMap['-2']))),
        sm: createVariantFactoryFn((value) => multiply(value, ref(typeScaleMinMap['-1']))),
        md: createVariantFactoryFn((value) => value),
        lg: createVariantFactoryFn((value) => multiply(value, ref(typeScaleMinMap['1']))),
        xl: createVariantFactoryFn((value) => multiply(value, ref(typeScaleMinMap['2']))),
        '2xl': createVariantFactoryFn((value) => multiply(value, ref(typeScaleMinMap['3']))),
        '3xl': createVariantFactoryFn((value) => multiply(value, ref(typeScaleMinMap['4']))),
        '4xl': createVariantFactoryFn((value) => multiply(value, ref(typeScaleMinMap['5'])))
    };

    const {
        fontSizeMin2Xs,
        fontSizeMinXs,
        fontSizeMinSm,
        fontSizeMinMd,
        fontSizeMinLg,
        fontSizeMinXl,
        fontSizeMin2Xl,
        fontSizeMin3Xl,
        fontSizeMin4Xl
    } = useVariantsFactory<'font-size--min', keyof typeof fontSizeMinVariants>(
        fontSizeMin,
        fontSizeMinVariants,
        options
    );

    const fontSizeMaxVariants = {
        '2xs': createVariantFactoryFn((value) => multiply(value, ref(typeScaleMaxMap['-3']))),
        xs: createVariantFactoryFn((value) => multiply(value, ref(typeScaleMaxMap['-2']))),
        sm: createVariantFactoryFn((value) => multiply(value, ref(typeScaleMaxMap['-1']))),
        md: createVariantFactoryFn((value) => value),
        lg: createVariantFactoryFn((value) => multiply(value, ref(typeScaleMaxMap['1']))),
        xl: createVariantFactoryFn((value) => multiply(value, ref(typeScaleMaxMap['2']))),
        '2xl': createVariantFactoryFn((value) => multiply(value, ref(typeScaleMaxMap['3']))),
        '3xl': createVariantFactoryFn((value) => multiply(value, ref(typeScaleMaxMap['4']))),
        '4xl': createVariantFactoryFn((value) => multiply(value, ref(typeScaleMaxMap['5'])))
    };

    const {
        fontSizeMax2Xs,
        fontSizeMaxXs,
        fontSizeMaxSm,
        fontSizeMaxMd,
        fontSizeMaxLg,
        fontSizeMaxXl,
        fontSizeMax2Xl,
        fontSizeMax3Xl,
        fontSizeMax4Xl
    } = useVariantsFactory<'font-size--max', keyof typeof fontSizeMaxVariants>(
        fontSizeMax,
        fontSizeMaxVariants,
        options
    );

    const createFontSizeVariant = (fontSizeMin: TokenValue, fontSizeMax: TokenValue) =>
        createVariantFactoryFn(
            () =>
                css`calc(((${fontSizeMin} / 16) * ${'1rem'}) + (${fontSizeMax} - ${fontSizeMin}) * ${ref(fluidBreakpoint)})`
        );
    const variants = {
        '2xs': createFontSizeVariant(ref(fontSizeMin2Xs), ref(fontSizeMax2Xs)),
        xs: createFontSizeVariant(ref(fontSizeMinXs), ref(fontSizeMaxXs)),
        sm: createFontSizeVariant(ref(fontSizeMinSm), ref(fontSizeMaxSm)),
        md: createFontSizeVariant(ref(fontSizeMinMd), ref(fontSizeMaxMd)),
        lg: createFontSizeVariant(ref(fontSizeMinLg), ref(fontSizeMaxLg)),
        xl: createFontSizeVariant(ref(fontSizeMinXl), ref(fontSizeMaxXl)),
        '2xl': createFontSizeVariant(ref(fontSizeMin2Xl), ref(fontSizeMax2Xl)),
        '3xl': createFontSizeVariant(ref(fontSizeMin3Xl), ref(fontSizeMax3Xl)),
        '4xl': createFontSizeVariant(ref(fontSizeMin4Xl), ref(fontSizeMax4Xl))
    };

    const {
        fontSize2Xs,
        fontSizeXs,
        fontSizeSm,
        fontSizeMd,
        fontSizeLg,
        fontSizeXl,
        fontSize2Xl,
        fontSize3Xl,
        fontSize4Xl
    } = useVariantsFactory<'font-size', keyof typeof variants>('font-size', variants, options);

    const fontSizeInherit = variable('font-size--inherit', 'inherit', options);

    const fontSize = variable('font-size', ref(fontSizeMd), options);

    const fontSizeMap = {
        default: fontSize,
        inherit: fontSizeInherit,
        '2xs': fontSize2Xs,
        xs: fontSizeXs,
        sm: fontSizeSm,
        md: fontSizeMd,
        lg: fontSizeLg,
        xl: fontSizeXl,
        '2xl': fontSize2Xl,
        '3xl': fontSize3Xl,
        '4xl': fontSize4Xl
    };

    return {
        fontSizeMin,
        fontSizeMax,
        fontSize,
        fontSize2Xs,
        fontSizeXs,
        fontSizeSm,
        fontSizeMd,
        fontSizeLg,
        fontSizeXl,
        fontSize2Xl,
        fontSize3Xl,
        fontSize4Xl,
        fontSizeMap
    };
}

export function useFontSize(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useFontSizeVariables(options);
}
