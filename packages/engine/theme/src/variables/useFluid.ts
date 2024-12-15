import { css, defaultDefinitionOptions, divide, multiply, ref, variable } from '@inkline/core';
import { createVariantFactoryFn } from './useVariantsFactory';

export function useFluid(options = defaultDefinitionOptions) {
    const fluidMinWidth = variable('fluid--min-width', 320, options);
    const fluidMaxWidth = variable('fluid--max-width', 1440, options);
    const fluidScreen = variable('fluid--screen', '100vw', options);
    const fluidBreakpoint = variable(
        'fluid--breakpoint',
        css`calc((${ref(fluidScreen)} - ${ref(fluidMinWidth)} / 16 * ${'1rem'}) / (${ref(fluidMaxWidth)} - ${ref(fluidMinWidth)}))`,
        options
    );

    return {
        fluidMinWidth,
        fluidMaxWidth,
        fluidScreen,
        fluidBreakpoint
    };
}


export const fluidScaleVariants = {
    'pow-minus-2': createVariantFactoryFn((value) => divide(value, value, value)),
    'pow-minus-1': createVariantFactoryFn((value) => divide(value, value)),
    'pow-1': createVariantFactoryFn((value) => multiply(value, 1)),
    'pow-2': createVariantFactoryFn((value) => multiply(value, value)),
    'pow-3': createVariantFactoryFn((value) => multiply(value, value, value)),
    'pow-4': createVariantFactoryFn((value) => multiply(value, value, value, value)),
    'pow-5': createVariantFactoryFn((value) => multiply(value, value, value, value, value))
};
