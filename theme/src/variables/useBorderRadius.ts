import {
    css,
    defaultDefinitionOptions,
    DefinitionOptions,
    multiply,
    ref,
    TokenValue,
    variable
} from '@inkline/core';
import { useFluid } from './useFluid';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';

export function useBorderRadiusVariables(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { fluidBreakpoint } = useFluid(options);

    const borderRadiusMin = variable('border-radius-min', 6, options);
    const borderRadiusMax = variable('border-radius-max', 8, options);

    const variantMultipliers = {
        xs: 0.5,
        sm: 0.75,
        md: 1,
        lg: 1.25,
        xl: 1.5
    };

    const borderRadiusMinMaxVariants = {
        xs: createVariantFactoryFn((value) => multiply(value, variantMultipliers['xs'])),
        sm: createVariantFactoryFn((value) => multiply(value, variantMultipliers['sm'])),
        md: createVariantFactoryFn((value) => value),
        lg: createVariantFactoryFn((value) => multiply(value, variantMultipliers['lg'])),
        xl: createVariantFactoryFn((value) => multiply(value, variantMultipliers['xl']))
    };

    const {
        borderRadiusMinXs,
        borderRadiusMinSm,
        borderRadiusMinMd,
        borderRadiusMinLg,
        borderRadiusMinXl
    } = useVariantsFactory<'border-radius-min', keyof typeof borderRadiusMinMaxVariants>(
        borderRadiusMin,
        borderRadiusMinMaxVariants,
        options
    );

    const {
        borderRadiusMaxXs,
        borderRadiusMaxSm,
        borderRadiusMaxMd,
        borderRadiusMaxLg,
        borderRadiusMaxXl
    } = useVariantsFactory<'border-radius-max', keyof typeof borderRadiusMinMaxVariants>(
        borderRadiusMax,
        borderRadiusMinMaxVariants,
        options
    );

    const createBorderRadiusVariant = (borderRadiusMin: TokenValue, borderRadiusMax: TokenValue) =>
        createVariantFactoryFn(
            () =>
                css`calc(((${borderRadiusMin} / 16) * ${'1rem'}) + (${borderRadiusMax} - ${borderRadiusMin}) * ${ref(fluidBreakpoint)})`
        );
    const variants = {
        none: () => '0',
        xs: createBorderRadiusVariant(ref(borderRadiusMinXs), ref(borderRadiusMaxXs)),
        sm: createBorderRadiusVariant(ref(borderRadiusMinSm), ref(borderRadiusMaxSm)),
        md: createBorderRadiusVariant(ref(borderRadiusMinMd), ref(borderRadiusMaxMd)),
        lg: createBorderRadiusVariant(ref(borderRadiusMinLg), ref(borderRadiusMaxLg)),
        xl: createBorderRadiusVariant(ref(borderRadiusMinXl), ref(borderRadiusMaxXl)),
        full: () => '50%'
    };

    const {
        borderTopLeftRadiusXs,
        borderTopLeftRadiusSm,
        borderTopLeftRadiusMd,
        borderTopLeftRadiusLg,
        borderTopLeftRadiusXl,
        borderTopLeftRadiusFull
    } = useVariantsFactory<'border-top-left-radius', keyof typeof variants>(
        'border-top-left-radius',
        variants,
        options
    );

    const {
        borderTopRightRadiusXs,
        borderTopRightRadiusSm,
        borderTopRightRadiusMd,
        borderTopRightRadiusLg,
        borderTopRightRadiusXl,
        borderTopRightRadiusFull
    } = useVariantsFactory<'border-top-right-radius', keyof typeof variants>(
        'border-top-right-radius',
        variants,
        options
    );

    const {
        borderBottomRightRadiusXs,
        borderBottomRightRadiusSm,
        borderBottomRightRadiusMd,
        borderBottomRightRadiusLg,
        borderBottomRightRadiusXl,
        borderBottomRightRadiusFull
    } = useVariantsFactory<'border-bottom-right-radius', keyof typeof variants>(
        'border-bottom-right-radius',
        variants,
        options
    );

    const {
        borderBottomLeftRadiusXs,
        borderBottomLeftRadiusSm,
        borderBottomLeftRadiusMd,
        borderBottomLeftRadiusLg,
        borderBottomLeftRadiusXl,
        borderBottomLeftRadiusFull
    } = useVariantsFactory<'border-bottom-left-radius', keyof typeof variants>(
        'border-bottom-left-radius',
        variants,
        options
    );

    const borderRadiusXs = variable(
        'border-radius-xs',
        [
            ref(borderTopLeftRadiusXs),
            ref(borderTopRightRadiusXs),
            ref(borderBottomRightRadiusXs),
            ref(borderBottomLeftRadiusXs)
        ],
        options
    );

    const borderRadiusSm = variable(
        'border-radius-sm',
        [
            ref(borderTopLeftRadiusSm),
            ref(borderTopRightRadiusSm),
            ref(borderBottomRightRadiusSm),
            ref(borderBottomLeftRadiusSm)
        ],
        options
    );

    const borderRadiusMd = variable(
        'border-radius-md',
        [
            ref(borderTopLeftRadiusMd),
            ref(borderTopRightRadiusMd),
            ref(borderBottomRightRadiusMd),
            ref(borderBottomLeftRadiusMd)
        ],
        options
    );

    const borderRadiusLg = variable(
        'border-radius-lg',
        [
            ref(borderTopLeftRadiusLg),
            ref(borderTopRightRadiusLg),
            ref(borderBottomRightRadiusLg),
            ref(borderBottomLeftRadiusLg)
        ],
        options
    );

    const borderRadiusXl = variable(
        'border-radius-xl',
        [
            ref(borderTopLeftRadiusXl),
            ref(borderTopRightRadiusXl),
            ref(borderBottomRightRadiusXl),
            ref(borderBottomLeftRadiusXl)
        ],
        options
    );

    const borderRadiusFull = variable(
        'border-radius-full',
        [
            ref(borderTopLeftRadiusFull),
            ref(borderTopRightRadiusFull),
            ref(borderBottomRightRadiusFull),
            ref(borderBottomLeftRadiusFull)
        ],
        options
    );

    const borderTopLeftRadius = variable(
        'border-top-left-radius',
        ref(borderTopLeftRadiusMd),
        options
    );
    const borderTopRightRadius = variable(
        'border-top-right-radius',
        ref(borderTopRightRadiusMd),
        options
    );
    const borderBottomRightRadius = variable(
        'border-bottom-right-radius',
        ref(borderBottomRightRadiusMd),
        options
    );
    const borderBottomLeftRadius = variable(
        'border-bottom-left-radius',
        ref(borderBottomLeftRadiusMd),
        options
    );
    const borderRadius = variable(
        'border-radius',
        [
            ref(borderTopLeftRadius),
            ref(borderTopRightRadius),
            ref(borderBottomRightRadius),
            ref(borderBottomLeftRadius)
        ],
        options
    );

    const borderTopLeftRadiusMap = {
        default: borderTopLeftRadius,
        none: 0,
        xs: borderTopLeftRadiusXs,
        sm: borderTopLeftRadiusSm,
        md: borderTopLeftRadiusMd,
        lg: borderTopLeftRadiusLg,
        xl: borderTopLeftRadiusXl,
        full: borderTopLeftRadiusFull
    };

    const borderTopRightRadiusMap = {
        default: borderTopRightRadius,
        none: 0,
        xs: borderTopRightRadiusXs,
        sm: borderTopRightRadiusSm,
        md: borderTopRightRadiusMd,
        lg: borderTopRightRadiusLg,
        xl: borderTopRightRadiusXl,
        full: borderTopRightRadiusFull
    };

    const borderBottomRightRadiusMap = {
        default: borderBottomRightRadius,
        none: 0,
        xs: borderBottomRightRadiusXs,
        sm: borderBottomRightRadiusSm,
        md: borderBottomRightRadiusMd,
        lg: borderBottomRightRadiusLg,
        xl: borderBottomRightRadiusXl,
        full: borderBottomRightRadiusFull
    };

    const borderBottomLeftRadiusMap = {
        default: borderBottomLeftRadius,
        none: 0,
        xs: borderBottomLeftRadiusXs,
        sm: borderBottomLeftRadiusSm,
        md: borderBottomLeftRadiusMd,
        lg: borderBottomLeftRadiusLg,
        xl: borderBottomLeftRadiusXl,
        full: borderBottomLeftRadiusFull
    };

    const borderRadiusMap = {
        default: borderRadius,
        none: 0,
        xs: borderRadiusXs,
        sm: borderRadiusSm,
        md: borderRadiusMd,
        lg: borderRadiusLg,
        xl: borderRadiusXl,
        full: borderRadiusFull
    };

    return {
        borderRadiusMin,
        borderRadiusMax,
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
        borderRadius,
        borderTopLeftRadiusXs,
        borderTopRightRadiusXs,
        borderBottomRightRadiusXs,
        borderBottomLeftRadiusXs,
        borderRadiusXs,
        borderTopLeftRadiusSm,
        borderTopRightRadiusSm,
        borderBottomRightRadiusSm,
        borderBottomLeftRadiusSm,
        borderRadiusSm,
        borderTopLeftRadiusMd,
        borderTopRightRadiusMd,
        borderBottomRightRadiusMd,
        borderBottomLeftRadiusMd,
        borderRadiusMd,
        borderTopLeftRadiusLg,
        borderTopRightRadiusLg,
        borderBottomRightRadiusLg,
        borderBottomLeftRadiusLg,
        borderRadiusLg,
        borderTopLeftRadiusXl,
        borderTopRightRadiusXl,
        borderBottomRightRadiusXl,
        borderBottomLeftRadiusXl,
        borderRadiusXl,
        borderTopLeftRadiusFull,
        borderTopRightRadiusFull,
        borderBottomRightRadiusFull,
        borderBottomLeftRadiusFull,
        borderRadiusFull,
        borderRadiusMap,
        borderTopLeftRadiusMap,
        borderTopRightRadiusMap,
        borderBottomRightRadiusMap,
        borderBottomLeftRadiusMap
    };
}

export function useBorderRadius(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    return useBorderRadiusVariables(options);
}
