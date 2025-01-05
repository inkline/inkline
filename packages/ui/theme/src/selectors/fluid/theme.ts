import { DefinitionOptions, media, multiply, ref, selector, variable } from '@inkline/core';
import { useFluid } from '../../variables';

export function useFluidTheme(options: DefinitionOptions) {
    const { fluidMaxWidth } = useFluid(options);

    media(`screen and (min-width: ${fluidMaxWidth.__value as number}px)`,
        selector(':root', variable('fluid--screen', multiply(ref(fluidMaxWidth), '1px'), options), options), options
    );
}
