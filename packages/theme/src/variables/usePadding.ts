import { divide, multiply, ref, variable } from '@inkline/core';
import { useSpacing } from './useSpacing';
import { useComposedSizeMultiplierVariantsFactory } from './useSizeMultiplier';
import {
    createComposedVariantFactoryFn,
    useComposedVariantsFactory
} from './useComposedVariantsFactory';
import { defaultDefinitionOptions } from '@inkline/core';

export type PaddingProperties =
    | 'padding-top'
    | 'padding-right'
    | 'padding-bottom'
    | 'padding-left'
    | 'padding';

export function usePaddingBase(options = defaultDefinitionOptions) {
    const { spacing } = useSpacing();

    const paddingTop = variable('padding-top', ref(spacing), options);
    const paddingRight = variable('padding-right', ref(spacing), options);
    const paddingBottom = variable('padding-bottom', ref(spacing), options);
    const paddingLeft = variable('padding-left', ref(spacing), options);
    const padding = variable(
        'padding',
        [ref(paddingTop), ref(paddingRight), ref(paddingBottom), ref(paddingLeft)],
        options
    );

    return {
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        padding
    };
}

export function usePaddingSizeVariants(options = defaultDefinitionOptions) {
    const { padding } = usePaddingBase();

    const {
        paddingTopXs,
        paddingRightXs,
        paddingLeftXs,
        paddingBottomXs,
        paddingXs,
        paddingTopSm,
        paddingRightSm,
        paddingBottomSm,
        paddingLeftSm,
        paddingSm,
        paddingTopMd,
        paddingRightMd,
        paddingBottomMd,
        paddingLeftMd,
        paddingMd,
        paddingTopLg,
        paddingRightLg,
        paddingBottomLg,
        paddingLeftLg,
        paddingLg,
        paddingTopXl,
        paddingRightXl,
        paddingBottomXl,
        paddingLeftXl,
        paddingXl
    } = useComposedSizeMultiplierVariantsFactory<PaddingProperties, 'padding'>(padding, options);

    return {
        paddingTopXs,
        paddingRightXs,
        paddingLeftXs,
        paddingBottomXs,
        paddingXs,
        paddingTopSm,
        paddingRightSm,
        paddingBottomSm,
        paddingLeftSm,
        paddingSm,
        paddingTopMd,
        paddingRightMd,
        paddingBottomMd,
        paddingLeftMd,
        paddingMd,
        paddingTopLg,
        paddingRightLg,
        paddingBottomLg,
        paddingLeftLg,
        paddingLg,
        paddingTopXl,
        paddingRightXl,
        paddingBottomXl,
        paddingLeftXl,
        paddingXl
    };
}

export function usePaddingVariants(options = defaultDefinitionOptions) {
    const { padding } = usePaddingBase();

    const variants = {
        '0.2': createComposedVariantFactoryFn((values) => values.map((value) => divide(value, 5))),
        '0.25': createComposedVariantFactoryFn((values) => values.map((value) => divide(value, 4))),
        '0.33': createComposedVariantFactoryFn((values) => values.map((value) => divide(value, 3))),
        '0.5': createComposedVariantFactoryFn((values) => values.map((value) => divide(value, 2))),
        '2': createComposedVariantFactoryFn((values) => values.map((value) => multiply(value, 2))),
        '3': createComposedVariantFactoryFn((values) => values.map((value) => multiply(value, 3))),
        '4': createComposedVariantFactoryFn((values) => values.map((value) => multiply(value, 4))),
        '5': createComposedVariantFactoryFn((values) => values.map((value) => multiply(value, 5)))
    };

    const {
        paddingTop0_2,
        paddingRight0_2,
        paddingBottom0_2,
        paddingLeft0_2,
        padding0_2,
        paddingTop0_25,
        paddingRight0_25,
        paddingBottom0_25,
        paddingLeft0_25,
        padding0_25,
        paddingTop0_33,
        paddingRight0_33,
        paddingBottom0_33,
        paddingLeft0_33,
        padding0_33,
        paddingTop0_5,
        paddingRight0_5,
        paddingBottom0_5,
        paddingLeft0_5,
        padding0_5,
        paddingTop2,
        paddingRight2,
        paddingBottom2,
        paddingLeft2,
        padding2,
        paddingTop3,
        paddingRight3,
        paddingBottom3,
        paddingLeft3,
        padding3,
        paddingTop4,
        paddingRight4,
        paddingBottom4,
        paddingLeft4,
        padding4,
        paddingTop5,
        paddingRight5,
        paddingBottom5,
        paddingLeft5,
        padding5
    } = useComposedVariantsFactory<PaddingProperties, keyof typeof variants>(
        padding,
        variants,
        options
    );

    return {
        paddingTop0_2,
        paddingRight0_2,
        paddingBottom0_2,
        paddingLeft0_2,
        padding0_2,
        paddingTop0_25,
        paddingRight0_25,
        paddingBottom0_25,
        paddingLeft0_25,
        padding0_25,
        paddingTop0_33,
        paddingRight0_33,
        paddingBottom0_33,
        paddingLeft0_33,
        padding0_33,
        paddingTop0_5,
        paddingRight0_5,
        paddingBottom0_5,
        paddingLeft0_5,
        padding0_5,
        paddingTop2,
        paddingRight2,
        paddingBottom2,
        paddingLeft2,
        padding2,
        paddingTop3,
        paddingRight3,
        paddingBottom3,
        paddingLeft3,
        padding3,
        paddingTop4,
        paddingRight4,
        paddingBottom4,
        paddingLeft4,
        padding4,
        paddingTop5,
        paddingRight5,
        paddingBottom5,
        paddingLeft5,
        padding5
    };
}

export function usePadding(options = defaultDefinitionOptions) {
    return {
        ...usePaddingBase(options),
        ...usePaddingSizeVariants(options),
        ...usePaddingVariants(options)
    };
}
