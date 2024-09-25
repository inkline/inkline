import { multiply, ref, variable } from '@inkline/core';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';
import { defaultDefinitionOptions } from '@inkline/core';

export function useScaleRatio(options = defaultDefinitionOptions) {
    const scaleRatioMinorSecond = variable('scale-ratio-minor-second', 1.067, options);
    const scaleRatioMajorSecond = variable('scale-ratio-major-second', 1.125, options);
    const scaleRatioMinorThird = variable('scale-ratio-minor-third', 1.2, options);
    const scaleRatioMajorThird = variable('scale-ratio-major-third', 1.25, options);
    const scaleRatioPerfectFourth = variable('scale-ratio-perfect-fourth', 1.333, options);
    const scaleRatioAugmentedFourth = variable('scale-ratio-augmented-fourth', 1.414, options);
    const scaleRatioPerfectFifth = variable('scale-ratio-perfect-fifth', 1.5, options);
    const scaleRatioGolden = variable('scale-ratio-golden', 1.618, options);

    const scaleRatio = variable('scale-ratio', ref(scaleRatioMinorThird), options);

    const variants = {
        'pow-1': createVariantFactoryFn((value) => multiply(value, 1)),
        'pow-2': createVariantFactoryFn((value) => multiply(value, value)),
        'pow-3': createVariantFactoryFn((value) => multiply(value, value, value)),
        'pow-4': createVariantFactoryFn((value) => multiply(value, value, value, value)),
        'pow-5': createVariantFactoryFn((value) => multiply(value, value, value, value, value))
    };

    const { scaleRatioPow1, scaleRatioPow2, scaleRatioPow3, scaleRatioPow4, scaleRatioPow5 } =
        useVariantsFactory<'scale-ratio', keyof typeof variants>(scaleRatio, variants, options);

    return {
        scaleRatioMinorSecond,
        scaleRatioMajorSecond,
        scaleRatioMinorThird,
        scaleRatioMajorThird,
        scaleRatioPerfectFourth,
        scaleRatioAugmentedFourth,
        scaleRatioPerfectFifth,
        scaleRatioGolden,
        scaleRatio,
        scaleRatioPow1,
        scaleRatioPow2,
        scaleRatioPow3,
        scaleRatioPow4,
        scaleRatioPow5
    };
}
