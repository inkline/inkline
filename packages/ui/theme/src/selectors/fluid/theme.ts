import { defaultDefinitionOptions, DefinitionOptions, media, multiply, ref, selector, variable } from '@inkline/core';
import { useFluid } from '../../variables';

/**
 * Selectors
 */

export function useFluidThemeSelectors(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fluidMaxWidth } = useFluid(options);

    media(`screen and (min-width: ${fluidMaxWidth.__value as number}px)`,
        selector(':root', variable('fluid--screen', multiply(ref(fluidMaxWidth), '1px'), options), options), options
    );
}

/**
 * Composables
 */

export function useFluidTheme(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    useFluidThemeSelectors(options);
}
