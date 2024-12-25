import { css, ref, TokenValue, variable } from '@inkline/core';
import { defaultDefinitionOptions } from '@inkline/core';
import { useFluid } from './useFluid';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';

export function useSpacing(options = defaultDefinitionOptions) {
    const { fluidBreakpoint } = useFluid();

    const spacingMin = variable('spacing-min', 18, options);
    const spacingMax = variable('spacing-max', 20, options);

    const createSpacingVariant = (value: TokenValue) => createVariantFactoryFn(() => css`calc((${ref(spacingMin)} / 16 * ${'1rem'} + (${ref(spacingMax)} - ${ref(spacingMin)}) * ${ref(fluidBreakpoint)}) ${typeof value === 'number' && value !== 1 ? ` * ${value}` : ''})`);
    const variants = {
        '2xs': createSpacingVariant(0.25),
        'xs': createSpacingVariant(0.5),
        'sm': createSpacingVariant(0.75),
        'md': createSpacingVariant(1),
        'lg': createSpacingVariant(1.5),
        'xl': createSpacingVariant(2),
        '2xl': createSpacingVariant(4),
        '3xl': createSpacingVariant(6),
        '4xl': createSpacingVariant(8)
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
        spacing4Xl
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
        spacing4Xl
    };
}
