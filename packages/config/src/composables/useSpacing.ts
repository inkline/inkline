import { divide, multiply, variable } from '../tokens';
import { useSizeMultiplierVariantsFactory } from './useSizeMultiplier';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';
import { defaultDefinitionOptions } from '../constants';

export function useSpacing(options = defaultDefinitionOptions) {
    const spacing = variable('spacing', '1rem', options);

    const { spacingXs, spacingSm, spacingMd, spacingLg, spacingXl } =
        useSizeMultiplierVariantsFactory<'spacing'>(spacing, options);

    const variants = {
        '0.2': createVariantFactoryFn((value) => divide(value, 5)),
        '0.25': createVariantFactoryFn((value) => divide(value, 4)),
        '0.33': createVariantFactoryFn((value) => divide(value, 3)),
        '0.5': createVariantFactoryFn((value) => divide(value, 2)),
        '2': createVariantFactoryFn((value) => multiply(value, 2)),
        '3': createVariantFactoryFn((value) => multiply(value, 3)),
        '4': createVariantFactoryFn((value) => multiply(value, 4)),
        '5': createVariantFactoryFn((value) => multiply(value, 5))
    };

    const { spacing02, spacing025, spacing033, spacing05, spacing2, spacing3, spacing4, spacing5 } =
        useVariantsFactory<'spacing', keyof typeof variants>(spacing, variants, options);

    return {
        spacing,
        spacing02,
        spacing025,
        spacing033,
        spacing05,
        spacing2,
        spacing3,
        spacing4,
        spacing5,
        spacingXs,
        spacingSm,
        spacingMd,
        spacingLg,
        spacingXl
    };
}
