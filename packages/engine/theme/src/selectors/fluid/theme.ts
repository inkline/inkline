import { media, multiply, ref, selector, variable } from '@inkline/core';
import { useFluid } from '../../variables';

export function useFluidTheme() {
    const { fluidMaxWidth } = useFluid();

    media(`screen and (min-width: ${fluidMaxWidth.__value as number}px)`,
        selector(':root', variable('fluid--screen', multiply(ref(fluidMaxWidth), '1px'), {
            default: true
        }))
    );
}
