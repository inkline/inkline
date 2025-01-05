import { css, DefinitionOptions, ref, variable } from '@inkline/core';

export function useFluid(options: DefinitionOptions) {
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
