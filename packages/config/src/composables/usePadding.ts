import { divide, multiply, ref, variable } from '../tokens';
import { useSpacing } from './useSpacing';
import { useComposedSizeMultiplierVariantsFactory } from './useSizeMultiplier';
import {
    createComposedVariantFactoryFn,
    useComposedVariantsFactory
} from './useComposedVariantsFactory';
import { defaultDefinitionOptions } from '../constants';

export type PaddingProperties =
    | 'padding-top'
    | 'padding-right'
    | 'padding-bottom'
    | 'padding-left'
    | 'padding';

export function usePadding(options = defaultDefinitionOptions) {
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

export function usePaddingVariants(options = defaultDefinitionOptions) {
    const { padding } = usePadding();

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
    } = useComposedSizeMultiplierVariantsFactory<PaddingProperties>(padding, options);

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
        paddingTop02,
        paddingRight02,
        paddingBottom02,
        paddingLeft02,
        padding02,
        paddingTop025,
        paddingRight025,
        paddingBottom025,
        paddingLeft025,
        padding025,
        paddingTop033,
        paddingRight033,
        paddingBottom033,
        paddingLeft033,
        padding033,
        paddingTop05,
        paddingRight05,
        paddingBottom05,
        paddingLeft05,
        padding05,
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
        paddingXl,
        paddingTop02,
        paddingRight02,
        paddingBottom02,
        paddingLeft02,
        padding02,
        paddingTop025,
        paddingRight025,
        paddingBottom025,
        paddingLeft025,
        padding025,
        paddingTop033,
        paddingRight033,
        paddingBottom033,
        paddingLeft033,
        padding033,
        paddingTop05,
        paddingRight05,
        paddingBottom05,
        paddingLeft05,
        padding05,
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
