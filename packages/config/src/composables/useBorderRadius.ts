import { ref, variable } from '../tokens';
import { useComposedSizeMultiplierVariantsFactory } from './useSizeMultiplier';
import { defaultDefinitionOptions } from '../constants';

export type BorderRadiusProperties =
    | 'border-top-left-radius'
    | 'border-top-right-radius'
    | 'border-bottom-right-radius'
    | 'border-bottom-left-radius'
    | 'border-radius';

export function useBorderRadiusBase(options = defaultDefinitionOptions) {
    const borderTopLeftRadius = variable('border-top-left-radius', '0.25rem', options);
    const borderTopRightRadius = variable('border-top-right-radius', '0.25rem', options);
    const borderBottomRightRadius = variable('border-bottom-right-radius', '0.25rem', options);
    const borderBottomLeftRadius = variable('border-bottom-left-radius', '0.25rem', options);
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

    return {
        borderTopLeftRadius,
        borderTopRightRadius,
        borderBottomRightRadius,
        borderBottomLeftRadius,
        borderRadius
    };
}

export function useBorderRadiusVariants(options = defaultDefinitionOptions) {
    const { borderRadius } = useBorderRadiusBase();

    const {
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
        borderRadiusXl
    } = useComposedSizeMultiplierVariantsFactory<BorderRadiusProperties>(borderRadius, options);

    return {
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
        borderRadiusXl
    };
}

export function useBorderRadius(options = defaultDefinitionOptions) {
    return {
        ...useBorderRadiusBase(options),
        ...useBorderRadiusVariants(options)
    };
}
