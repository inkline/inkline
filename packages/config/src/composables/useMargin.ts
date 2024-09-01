import { divide, multiply, ref, variable } from '../tokens';
import { useSpacing } from './useSpacing';
import { useComposedSizeMultiplierVariantsFactory } from './useSizeMultiplier';
import {
    createComposedVariantFactoryFn,
    useComposedVariantsFactory
} from './useComposedVariantsFactory';
import { defaultDefinitionOptions } from '../constants';

export type MarginProperties =
    | 'margin-top'
    | 'margin-right'
    | 'margin-bottom'
    | 'margin-left'
    | 'margin';

export function useMarginBase(options = defaultDefinitionOptions) {
    const { spacing } = useSpacing();

    const marginTop = variable('margin-top', ref(spacing), options);
    const marginRight = variable('margin-right', ref(spacing), options);
    const marginBottom = variable('margin-bottom', ref(spacing), options);
    const marginLeft = variable('margin-left', ref(spacing), options);
    const margin = variable(
        'margin',
        [ref(marginTop), ref(marginRight), ref(marginBottom), ref(marginLeft)],
        options
    );

    return {
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        margin
    };
}

export function useMarginSizeVariants(options = defaultDefinitionOptions) {
    const { margin } = useMarginBase();

    const {
        marginTopXs,
        marginRightXs,
        marginLeftXs,
        marginBottomXs,
        marginXs,
        marginTopSm,
        marginRightSm,
        marginBottomSm,
        marginLeftSm,
        marginSm,
        marginTopMd,
        marginRightMd,
        marginBottomMd,
        marginLeftMd,
        marginMd,
        marginTopLg,
        marginRightLg,
        marginBottomLg,
        marginLeftLg,
        marginLg,
        marginTopXl,
        marginRightXl,
        marginBottomXl,
        marginLeftXl,
        marginXl
    } = useComposedSizeMultiplierVariantsFactory<MarginProperties, 'margin'>(margin, options);

    return {
        marginTopXs,
        marginRightXs,
        marginLeftXs,
        marginBottomXs,
        marginXs,
        marginTopSm,
        marginRightSm,
        marginBottomSm,
        marginLeftSm,
        marginSm,
        marginTopMd,
        marginRightMd,
        marginBottomMd,
        marginLeftMd,
        marginMd,
        marginTopLg,
        marginRightLg,
        marginBottomLg,
        marginLeftLg,
        marginLg,
        marginTopXl,
        marginRightXl,
        marginBottomXl,
        marginLeftXl,
        marginXl
    };
}

export function useMarginVariants(options = defaultDefinitionOptions) {
    const { margin } = useMarginBase();

    const variants = {
        '0.2': createComposedVariantFactoryFn((parts) => parts.map((part) => divide(part, 5))),
        '0.25': createComposedVariantFactoryFn((parts) => parts.map((part) => divide(part, 4))),
        '0.33': createComposedVariantFactoryFn((parts) => parts.map((part) => divide(part, 3))),
        '0.5': createComposedVariantFactoryFn((parts) => parts.map((part) => divide(part, 2))),
        '2': createComposedVariantFactoryFn((parts) => parts.map((part) => multiply(part, 2))),
        '3': createComposedVariantFactoryFn((parts) => parts.map((part) => multiply(part, 3))),
        '4': createComposedVariantFactoryFn((parts) => parts.map((part) => multiply(part, 4))),
        '5': createComposedVariantFactoryFn((parts) => parts.map((part) => multiply(part, 5)))
    };

    const {
        marginTop0_2,
        marginRight0_2,
        marginBottom0_2,
        marginLeft0_2,
        margin0_2,
        marginTop0_25,
        marginRight0_25,
        marginBottom0_25,
        marginLeft0_25,
        margin0_25,
        marginTop0_33,
        marginRight0_33,
        marginBottom0_33,
        marginLeft0_33,
        margin0_33,
        marginTop0_5,
        marginRight0_5,
        marginBottom0_5,
        marginLeft0_5,
        margin0_5,
        marginTop2,
        marginRight2,
        marginBottom2,
        marginLeft2,
        margin2,
        marginTop3,
        marginRight3,
        marginBottom3,
        marginLeft3,
        margin3,
        marginTop4,
        marginRight4,
        marginBottom4,
        marginLeft4,
        margin4,
        marginTop5,
        marginRight5,
        marginBottom5,
        marginLeft5,
        margin5
    } = useComposedVariantsFactory<MarginProperties, keyof typeof variants>(
        margin,
        variants,
        options
    );

    return {
        marginTop0_2,
        marginRight0_2,
        marginBottom0_2,
        marginLeft0_2,
        margin0_2,
        marginTop0_25,
        marginRight0_25,
        marginBottom0_25,
        marginLeft0_25,
        margin0_25,
        marginTop0_33,
        marginRight0_33,
        marginBottom0_33,
        marginLeft0_33,
        margin0_33,
        marginTop0_5,
        marginRight0_5,
        marginBottom0_5,
        marginLeft0_5,
        margin0_5,
        marginTop2,
        marginRight2,
        marginBottom2,
        marginLeft2,
        margin2,
        marginTop3,
        marginRight3,
        marginBottom3,
        marginLeft3,
        margin3,
        marginTop4,
        marginRight4,
        marginBottom4,
        marginLeft4,
        margin4,
        marginTop5,
        marginRight5,
        marginBottom5,
        marginLeft5,
        margin5
    };
}

export function useMargin(options = defaultDefinitionOptions) {
    return {
        ...useMarginBase(options),
        ...useMarginSizeVariants(options),
        ...useMarginVariants(options)
    };
}
