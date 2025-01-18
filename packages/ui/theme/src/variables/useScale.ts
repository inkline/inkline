import { defaultDefinitionOptions, DefinitionOptions, divide, multiply, ref, variable } from '@inkline/core';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';

export function useScale(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const scaleMinorSecond = variable('scale-minor-second', 1.067, options);
    const scaleMajorSecond = variable('scale-major-second', 1.125, options);
    const scaleMinorThird = variable('scale-minor-third', 1.2, options);
    const scaleMajorThird = variable('scale-major-third', 1.25, options);
    const scalePerfectFourth = variable('scale-perfect-fourth', 1.333, options);
    const scaleAugmentedFourth = variable('scale-augmented-fourth', 1.414, options);
    const scalePerfectFifth = variable('scale-perfect-fifth', 1.5, options);
    const scaleGolden = variable('scale-golden', 1.618, options);

    // @TODO REMOVE
    const scale = variable('scale', ref(scaleMinorThird), options); // @TODO REMOVE

    // @TODO REMOVE
    const variants = {
        'pow-minus-2': createVariantFactoryFn((value) => divide(value, value, value)),
        'pow-minus-1': createVariantFactoryFn((value) => divide(value, value)),
        'pow-1': createVariantFactoryFn((value) => multiply(value, 1)),
        'pow-2': createVariantFactoryFn((value) => multiply(value, value)),
        'pow-3': createVariantFactoryFn((value) => multiply(value, value, value)),
        'pow-4': createVariantFactoryFn((value) => multiply(value, value, value, value)),
        'pow-5': createVariantFactoryFn((value) => multiply(value, value, value, value, value))
    };

    // @TODO REMOVE
    const { scalePow1, scalePow2, scalePow3, scalePow4, scalePow5 } =
        useVariantsFactory<'scale', keyof typeof variants>(scale, variants, options);

    return {
        scaleMinorSecond,
        scaleMajorSecond,
        scaleMinorThird,
        scaleMajorThird,
        scalePerfectFourth,
        scaleAugmentedFourth,
        scalePerfectFifth,
        scaleGolden,
        scale,
        scalePow1,
        scalePow2,
        scalePow3,
        scalePow4,
        scalePow5
    };
}
