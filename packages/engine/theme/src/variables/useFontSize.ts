import { css, ref, variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';
import { useFluid } from './useFluid';
import { useFluidTypeScale } from './useFluidTypeScale';

export function useFontSize(options = defaultDefinitionOptions) {
    const { fluidBreakpoint } = useFluid();
    const {
        typeScaleMinMap,
        typeScaleMaxMap
    } = useFluidTypeScale();

    const fontSizeMin = variable('font-size-min', 17, options);
    const fontSizeMax = variable('font-size-max', 20, options);

    const fontSizeXs = variable('font-size-xs', css`calc((${ref(fontSizeMin)} * ${ref(typeScaleMinMap['-2'])} / 16 * ${'1rem'}) + (${ref(fontSizeMax)} * ${ref(typeScaleMaxMap['-2'])} - ${ref(fontSizeMin)} * ${ref(typeScaleMinMap['-2'])}) * ${ref(fluidBreakpoint)})`, options);
    const fontSizeSm = variable('font-size-sm', css`calc((${ref(fontSizeMin)} * ${ref(typeScaleMinMap['-1'])} / 16 * ${'1rem'}) + (${ref(fontSizeMax)} * ${ref(typeScaleMaxMap['-1'])} - ${ref(fontSizeMin)} * ${ref(typeScaleMinMap['-1'])}) * ${ref(fluidBreakpoint)})`, options);
    const fontSizeMd = variable('font-size-md', css`calc((${ref(fontSizeMin)} / 16 * ${'1rem'}) + (${ref(fontSizeMax)} - ${ref(fontSizeMin)}) * ${ref(fluidBreakpoint)})`, options);
    const fontSizeLg = variable('font-size-lg', css`calc((${ref(fontSizeMin)} * ${ref(typeScaleMinMap['1'])} / 16 * ${'1rem'}) + (${ref(fontSizeMax)} * ${ref(typeScaleMaxMap['1'])} - ${ref(fontSizeMin)} * ${ref(typeScaleMinMap['1'])}) * ${ref(fluidBreakpoint)})`, options);
    const fontSizeXl = variable('font-size-xl', css`calc((${ref(fontSizeMin)} * ${ref(typeScaleMinMap['2'])} / 16 * ${'1rem'}) + (${ref(fontSizeMax)} * ${ref(typeScaleMaxMap['2'])} - ${ref(fontSizeMin)} * ${ref(typeScaleMinMap['2'])}) * ${ref(fluidBreakpoint)})`, options);
    const fontSize2Xl = variable('font-size-2xl', css`calc((${ref(fontSizeMin)} * ${ref(typeScaleMinMap['3'])} / 16 * ${'1rem'}) + (${ref(fontSizeMax)} * ${ref(typeScaleMaxMap['3'])} - ${ref(fontSizeMin)} * ${ref(typeScaleMinMap['3'])}) * ${ref(fluidBreakpoint)})`, options);
    const fontSize3Xl = variable('font-size-3xl', css`calc((${ref(fontSizeMin)} * ${ref(typeScaleMinMap['4'])} / 16 * ${'1rem'}) + (${ref(fontSizeMax)} * ${ref(typeScaleMaxMap['4'])} - ${ref(fontSizeMin)} * ${ref(typeScaleMinMap['4'])}) * ${ref(fluidBreakpoint)})`, options);
    const fontSize4Xl = variable('font-size-4xl', css`calc((${ref(fontSizeMin)} * ${ref(typeScaleMinMap['5'])} / 16 * ${'1rem'}) + (${ref(fontSizeMax)} * ${ref(typeScaleMaxMap['5'])} - ${ref(fontSizeMin)} * ${ref(typeScaleMinMap['5'])}) * ${ref(fluidBreakpoint)})`, options);

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
