import {
    defaultDefinitionOptions,
    DefinitionOptions,
    divide,
    multiply,
    ref,
    variable
} from '@inkline/core';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';
import { useScale } from './useScale';

export const fluidScaleVariants = {
    'pow-minus-4': createVariantFactoryFn((value) => divide(1, value, value, value, value)),
    'pow-minus-3': createVariantFactoryFn((value) => divide(1, value, value, value)),
    'pow-minus-2': createVariantFactoryFn((value) => divide(1, value, value)),
    'pow-minus-1': createVariantFactoryFn((value) => divide(1, value)),
    'pow-1': createVariantFactoryFn((value) => multiply(value, 1)),
    'pow-2': createVariantFactoryFn((value) => multiply(value, value)),
    'pow-3': createVariantFactoryFn((value) => multiply(value, value, value)),
    'pow-4': createVariantFactoryFn((value) => multiply(value, value, value, value)),
    'pow-5': createVariantFactoryFn((value) => multiply(value, value, value, value, value))
};

export function useFluidTypeScaleVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { scaleMinorThird, scaleMajorThird } = useScale(options);

    const typeScaleMin = variable('type-scale--min', ref(scaleMinorThird), options);
    const typeScaleMax = variable('type-scale--max', ref(scaleMajorThird), options);

    const {
        typeScaleMinPowMinus4,
        typeScaleMinPowMinus3,
        typeScaleMinPowMinus2,
        typeScaleMinPowMinus1,
        typeScaleMinPow1,
        typeScaleMinPow2,
        typeScaleMinPow3,
        typeScaleMinPow4,
        typeScaleMinPow5
    } = useVariantsFactory<'type-scale--min', keyof typeof fluidScaleVariants>(
        typeScaleMin,
        fluidScaleVariants,
        options
    );

    const typeScaleMinMap = {
        '-4': typeScaleMinPowMinus4,
        '-3': typeScaleMinPowMinus3,
        '-2': typeScaleMinPowMinus2,
        '-1': typeScaleMinPowMinus1,
        '1': typeScaleMinPow1,
        '2': typeScaleMinPow2,
        '3': typeScaleMinPow3,
        '4': typeScaleMinPow4,
        '5': typeScaleMinPow5
    };

    const {
        typeScaleMaxPowMinus4,
        typeScaleMaxPowMinus3,
        typeScaleMaxPowMinus2,
        typeScaleMaxPowMinus1,
        typeScaleMaxPow1,
        typeScaleMaxPow2,
        typeScaleMaxPow3,
        typeScaleMaxPow4,
        typeScaleMaxPow5
    } = useVariantsFactory<'type-scale--max', keyof typeof fluidScaleVariants>(
        typeScaleMax,
        fluidScaleVariants,
        options
    );

    const typeScaleMaxMap = {
        '-4': typeScaleMaxPowMinus4,
        '-3': typeScaleMaxPowMinus3,
        '-2': typeScaleMaxPowMinus2,
        '-1': typeScaleMaxPowMinus1,
        '1': typeScaleMaxPow1,
        '2': typeScaleMaxPow2,
        '3': typeScaleMaxPow3,
        '4': typeScaleMaxPow4,
        '5': typeScaleMaxPow5
    };

    return {
        typeScaleMin,
        typeScaleMinMap,
        typeScaleMax,
        typeScaleMaxMap
    };
}

export function useFluidTypeScale(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useFluidTypeScaleVariables(options);
}
