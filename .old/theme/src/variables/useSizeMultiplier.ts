import { defaultDefinitionOptions, divide, multiply, ref, variable } from '@inkline/core';
import { useScale } from './useScale';
import type { DefinitionOptions } from '@inkline/core';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';

export function useSizeMultiplierVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { scalePow1, scalePow2, scalePow3 } = useScale(options);

    const sizeMultiplier = variable('size-multiplier', 1, options);

    const variants = {
        '2xs': createVariantFactoryFn((value) => divide(value, ref(scalePow3))),
        xs: createVariantFactoryFn((value) => divide(value, ref(scalePow2))),
        sm: createVariantFactoryFn((value) => divide(value, ref(scalePow1))),
        md: createVariantFactoryFn((value) => value),
        lg: createVariantFactoryFn((value) => multiply(value, ref(scalePow1))),
        xl: createVariantFactoryFn((value) => multiply(value, ref(scalePow2))),
        '2xl': createVariantFactoryFn((value) => multiply(value, ref(scalePow3)))
    };

    const {
        sizeMultiplier2Xs,
        sizeMultiplierXs,
        sizeMultiplierSm,
        sizeMultiplierMd,
        sizeMultiplierLg,
        sizeMultiplierXl,
        sizeMultiplier2Xl
    } = useVariantsFactory<'size-multiplier', keyof typeof variants>(
        sizeMultiplier,
        variants,
        options
    );

    return {
        sizeMultiplier,
        sizeMultiplier2Xs,
        sizeMultiplierXs,
        sizeMultiplierSm,
        sizeMultiplierMd,
        sizeMultiplierLg,
        sizeMultiplierXl,
        sizeMultiplier2Xl
    };
}

export function useSizeMultiplier(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useSizeMultiplierVariables(options);
}
