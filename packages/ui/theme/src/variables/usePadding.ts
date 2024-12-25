import { ref, variable } from '@inkline/core';
import { useSpacing } from './useSpacing';
import { useComposedSizeMultiplierVariantsFactory } from './useSizeMultiplier';
import { defaultDefinitionOptions } from '@inkline/core';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';

export type PaddingProperties =
    | 'padding-top'
    | 'padding-right'
    | 'padding-bottom'
    | 'padding-left'
    | 'padding';

export function usePaddingBase(options = defaultDefinitionOptions) {
    const {
        spacing2Xs,
        spacingXs,
        spacingSm,
        spacingMd,
        spacingLg,
        spacingXl,
        spacing2Xl,
        spacing3Xl,
        spacing4Xl
    } = useSpacing();

    const variants = {
        '2xs': createVariantFactoryFn(() => ref(spacing2Xs)),
        'xs': createVariantFactoryFn(() => ref(spacingXs)),
        'sm': createVariantFactoryFn(() => ref(spacingSm)),
        'md': createVariantFactoryFn(() => ref(spacingMd)),
        'lg': createVariantFactoryFn(() => ref(spacingLg)),
        'xl': createVariantFactoryFn(() => ref(spacingXl)),
        '2xl': createVariantFactoryFn(() => ref(spacing2Xl)),
        '3xl': createVariantFactoryFn(() => ref(spacing3Xl)),
        '4xl': createVariantFactoryFn(() => ref(spacing4Xl))
    };

    const {
        paddingTop2Xs,
        paddingTopXs,
        paddingTopSm,
        paddingTopMd,
        paddingTopLg,
        paddingTopXl,
        paddingTop2Xl,
        paddingTop3Xl,
        paddingTop4Xl
    } = useVariantsFactory<'padding-top', keyof typeof variants>('padding-top', variants, options);
    const paddingTop = variable('padding-top', ref(paddingTopMd), options);

    const {
        paddingRight2Xs,
        paddingRightXs,
        paddingRightSm,
        paddingRightMd,
        paddingRightLg,
        paddingRightXl,
        paddingRight2Xl,
        paddingRight3Xl,
        paddingRight4Xl
    } = useVariantsFactory<'padding-right', keyof typeof variants>('padding-right', variants, options);
    const paddingRight = variable('padding-right', ref(paddingRightMd), options);

    const {
        paddingBottom2Xs,
        paddingBottomXs,
        paddingBottomSm,
        paddingBottomMd,
        paddingBottomLg,
        paddingBottomXl,
        paddingBottom2Xl,
        paddingBottom3Xl,
        paddingBottom4Xl
    } = useVariantsFactory<'padding-bottom', keyof typeof variants>('padding-bottom', variants, options);
    const paddingBottom = variable('padding-bottom', ref(paddingBottomMd), options);

    const {
        paddingLeft2Xs,
        paddingLeftXs,
        paddingLeftSm,
        paddingLeftMd,
        paddingLeftLg,
        paddingLeftXl,
        paddingLeft2Xl,
        paddingLeft3Xl,
        paddingLeft4Xl
    } = useVariantsFactory<'padding-left', keyof typeof variants>('padding-left', variants, options);
    const paddingLeft = variable('padding-left', ref(paddingLeftMd), options);

    const composedVariants = {
        '2xs': createVariantFactoryFn(() => [ref(paddingTop2Xs), ref(paddingRight2Xs), ref(paddingBottom2Xs), ref(paddingLeft2Xs)]),
        'xs': createVariantFactoryFn(() => [ref(paddingTopXs), ref(paddingRightXs), ref(paddingBottomXs), ref(paddingLeftXs)]),
        'sm': createVariantFactoryFn(() => [ref(paddingTopSm), ref(paddingRightSm), ref(paddingBottomSm), ref(paddingLeftSm)]),
        'md': createVariantFactoryFn(() => [ref(paddingTopMd), ref(paddingRightMd), ref(paddingBottomMd), ref(paddingLeftMd)]),
        'lg': createVariantFactoryFn(() => [ref(paddingTopLg), ref(paddingRightLg), ref(paddingBottomLg), ref(paddingLeftLg)]),
        'xl': createVariantFactoryFn(() => [ref(paddingTopXl), ref(paddingRightXl), ref(paddingBottomXl), ref(paddingLeftXl)]),
        '2xl': createVariantFactoryFn(() => [ref(paddingTop2Xl), ref(paddingRight2Xl), ref(paddingBottom2Xl), ref(paddingLeft2Xl)]),
        '3xl': createVariantFactoryFn(() => [ref(paddingTop3Xl), ref(paddingRight3Xl), ref(paddingBottom3Xl), ref(paddingLeft3Xl)]),
        '4xl': createVariantFactoryFn(() => [ref(paddingTop4Xl), ref(paddingRight4Xl), ref(paddingBottom4Xl), ref(paddingLeft4Xl)])
    };

    const {
        padding2Xs,
        paddingXs,
        paddingSm,
        paddingMd,
        paddingLg,
        paddingXl,
        padding2Xl,
        padding3Xl,
        padding4Xl
    } = useVariantsFactory<'padding', keyof typeof composedVariants>('padding', composedVariants, options);

    const padding = variable(
        'padding',
        ref(paddingMd),
        options
    );

    return {
        paddingTop,
        paddingTop2Xs,
        paddingTopXs,
        paddingTopSm,
        paddingTopMd,
        paddingTopLg,
        paddingTopXl,
        paddingTop2Xl,
        paddingTop3Xl,
        paddingTop4Xl,
        paddingRight,
        paddingRight2Xs,
        paddingRightXs,
        paddingRightSm,
        paddingRightMd,
        paddingRightLg,
        paddingRightXl,
        paddingRight2Xl,
        paddingRight3Xl,
        paddingRight4Xl,
        paddingBottom,
        paddingBottom2Xs,
        paddingBottomXs,
        paddingBottomSm,
        paddingBottomMd,
        paddingBottomLg,
        paddingBottomXl,
        paddingBottom2Xl,
        paddingBottom3Xl,
        paddingBottom4Xl,
        paddingLeft,
        paddingLeft2Xs,
        paddingLeftXs,
        paddingLeftSm,
        paddingLeftMd,
        paddingLeftLg,
        paddingLeftXl,
        paddingLeft2Xl,
        paddingLeft3Xl,
        paddingLeft4Xl,
        padding,
        padding2Xs,
        paddingXs,
        paddingSm,
        paddingMd,
        paddingLg,
        paddingXl,
        padding2Xl,
        padding3Xl,
        padding4Xl
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

export function usePadding(options = defaultDefinitionOptions) {
    return {
        ...usePaddingBase(options),
        ...usePaddingSizeVariants(options)
    };
}
