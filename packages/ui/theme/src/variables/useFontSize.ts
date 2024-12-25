import { css, ref, TokenValue, variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';
import { useFluid } from './useFluid';
import { useFluidTypeScale } from './useFluidTypeScale';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';

export function useFontSize(options = defaultDefinitionOptions) {
    const { fluidBreakpoint } = useFluid();
    const {
        typeScaleMinMap,
        typeScaleMaxMap
    } = useFluidTypeScale();

    const fontSizeMin = variable('font-size-min', 18, options);
    const fontSizeMax = variable('font-size-max', 20, options);

    const createFontSizeVariant = (minScale: TokenValue, maxScale: TokenValue) => createVariantFactoryFn(() => css`calc((${ref(fontSizeMin)}${minScale !== 1 ? css` *${' '}${minScale}` : ''} / 16 * ${'1rem'}) + (${ref(fontSizeMax)}${maxScale !== 1 ? css` *${' '}${maxScale}` : ''} - ${ref(fontSizeMin)}${minScale !== 1 ? css` *${' '}${minScale}` : ''}) * ${ref(fluidBreakpoint)})`);
    const variants = {
        'xs': createFontSizeVariant(ref(typeScaleMinMap['-2']), ref(typeScaleMaxMap['-2'])),
        'sm': createFontSizeVariant(ref(typeScaleMinMap['-1']), ref(typeScaleMaxMap['-1'])),
        'md': createFontSizeVariant(1, 1),
        'lg': createFontSizeVariant(ref(typeScaleMinMap['1']), ref(typeScaleMaxMap['1'])),
        'xl': createFontSizeVariant(ref(typeScaleMinMap['2']), ref(typeScaleMaxMap['2'])),
        '2xl': createFontSizeVariant(ref(typeScaleMinMap['3']), ref(typeScaleMaxMap['3'])),
        '3xl': createFontSizeVariant(ref(typeScaleMinMap['4']), ref(typeScaleMaxMap['4'])),
        '4xl': createFontSizeVariant(ref(typeScaleMinMap['5']), ref(typeScaleMaxMap['5']))
    };

    const {
        fontSizeXs,
        fontSizeSm,
        fontSizeMd,
        fontSizeLg,
        fontSizeXl,
        fontSize2Xl,
        fontSize3Xl,
        fontSize4Xl
    } =
        useVariantsFactory<'font-size', keyof typeof variants>('font-size', variants, options);

    const fontSize = variable('font-size', ref(fontSizeMd), options);

    return {
        fontSizeMin,
        fontSizeMax,
        fontSize,
        fontSizeXs,
        fontSizeSm,
        fontSizeMd,
        fontSizeLg,
        fontSizeXl,
        fontSize2Xl,
        fontSize3Xl,
        fontSize4Xl
    };
}
