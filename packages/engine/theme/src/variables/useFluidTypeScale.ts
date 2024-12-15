import { defaultDefinitionOptions, ref, variable } from '@inkline/core';
import { useVariantsFactory } from './useVariantsFactory';
import { useScale } from './useScale';
import { fluidScaleVariants } from './useFluid';

export function useFluidTypeScale(options = defaultDefinitionOptions) {
    const { scaleMinorThird, scalePerfectFourth } = useScale();

    const typeScaleMin = variable('type-scale-min', ref(scaleMinorThird), options);
    const typeScaleMax = variable('type-scale-max', ref(scalePerfectFourth), options);

    const {
        typeScaleMinPowMinus2,
        typeScaleMinPowMinus1,
        typeScaleMinPow1,
        typeScaleMinPow2,
        typeScaleMinPow3,
        typeScaleMinPow4,
        typeScaleMinPow5
    } =
        useVariantsFactory<'type-scale-min', keyof typeof fluidScaleVariants>(typeScaleMin, fluidScaleVariants, options);

    const typeScaleMinMap = {
        '-2': typeScaleMinPowMinus2,
        '-1': typeScaleMinPowMinus1,
        '1': typeScaleMinPow1,
        '2': typeScaleMinPow2,
        '3': typeScaleMinPow3,
        '4': typeScaleMinPow4,
        '5': typeScaleMinPow5
    };

    const {
        typeScaleMaxPowMinus2,
        typeScaleMaxPowMinus1,
        typeScaleMaxPow1,
        typeScaleMaxPow2,
        typeScaleMaxPow3,
        typeScaleMaxPow4,
        typeScaleMaxPow5
    } = useVariantsFactory<'type-scale-max', keyof typeof fluidScaleVariants>(typeScaleMax, fluidScaleVariants, options);

    const typeScaleMaxMap = {
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
