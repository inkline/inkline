import { divide, multiply, ref, variable, defaultDefinitionOptions } from '@inkline/core';
import { useScaleRatio } from './useScaleRatio';
import type { DefinitionOptions,  Variable } from '@inkline/core';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';
import {
    createComposedVariantFactoryFn,
    useComposedVariantsFactory
} from './useComposedVariantsFactory';

export type SizeMultiplierKeys = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export const allSizeMultiplierKeys: SizeMultiplierKeys[] = [
    'xxs',
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    'xxl'
];

export const defaultSizeMultiplierKeys: SizeMultiplierKeys[] = ['xs', 'sm', 'md', 'lg', 'xl'];

export function useSizeMultiplier(options = defaultDefinitionOptions) {
    const { scaleRatioPow1, scaleRatioPow2, scaleRatioPow3 } = useScaleRatio();

    const sizeMultiplier = variable('size-multiplier', 1, options);

    const variants = {
        xxs: createVariantFactoryFn((value) => divide(value, ref(scaleRatioPow3))),
        xs: createVariantFactoryFn((value) => divide(value, ref(scaleRatioPow2))),
        sm: createVariantFactoryFn((value) => divide(value, ref(scaleRatioPow1))),
        md: createVariantFactoryFn((value) => value),
        lg: createVariantFactoryFn((value) => multiply(value, ref(scaleRatioPow1))),
        xl: createVariantFactoryFn((value) => multiply(value, ref(scaleRatioPow2))),
        xxl: createVariantFactoryFn((value) => multiply(value, ref(scaleRatioPow3)))
    };

    const {
        sizeMultiplierXxs,
        sizeMultiplierXs,
        sizeMultiplierSm,
        sizeMultiplierMd,
        sizeMultiplierLg,
        sizeMultiplierXl,
        sizeMultiplierXxl
    } = useVariantsFactory<'size-multiplier', keyof typeof variants>(
        sizeMultiplier,
        variants,
        options
    );

    return {
        sizeMultiplier,
        sizeMultiplierXxs,
        sizeMultiplierXs,
        sizeMultiplierSm,
        sizeMultiplierMd,
        sizeMultiplierLg,
        sizeMultiplierXl,
        sizeMultiplierXxl
    };
}

export function useKeyMappedSizeMultiplier(): Record<SizeMultiplierKeys, Variable> {
    const {
        sizeMultiplierXxs,
        sizeMultiplierXs,
        sizeMultiplierSm,
        sizeMultiplierMd,
        sizeMultiplierLg,
        sizeMultiplierXl,
        sizeMultiplierXxl
    } = useSizeMultiplier();

    return {
        xxs: sizeMultiplierXxs,
        xs: sizeMultiplierXs,
        sm: sizeMultiplierSm,
        md: sizeMultiplierMd,
        lg: sizeMultiplierLg,
        xl: sizeMultiplierXl,
        xxl: sizeMultiplierXxl
    };
}

export function useSizeMultiplierVariantsFactory<RootKey extends string>(
    target: Variable,
    options?: { keys?: SizeMultiplierKeys[] } & DefinitionOptions
) {
    const keys = options?.keys ?? defaultSizeMultiplierKeys;
    const sizeMultipliersKeyMap = useKeyMappedSizeMultiplier();
    const variants = keys.reduce<Record<string, ReturnType<typeof createVariantFactoryFn>>>(
        (acc, key) => {
            acc[key] = createVariantFactoryFn((value) =>
                multiply(value, ref(sizeMultipliersKeyMap[key]))
            );
            return acc;
        },
        {}
    );

    return useVariantsFactory<RootKey, SizeMultiplierKeys>(target, variants, {
        default: options?.default
    });
}

export function useComposedSizeMultiplierVariantsFactory<
    RootKey extends string,
    Name extends string
>(composed: Variable<Name>, options?: { keys?: SizeMultiplierKeys[] } & DefinitionOptions) {
    const keys = options?.keys ?? defaultSizeMultiplierKeys;
    const sizeMultipliersKeyMap = useKeyMappedSizeMultiplier();
    const variants = keys.reduce<Record<string, ReturnType<typeof createComposedVariantFactoryFn>>>(
        (acc, key) => {
            acc[key] = createComposedVariantFactoryFn((values) =>
                values.map((value) => multiply(value, ref(sizeMultipliersKeyMap[key])))
            );
            return acc;
        },
        {}
    );

    return useComposedVariantsFactory<RootKey, SizeMultiplierKeys>(composed, variants, {
        default: options?.default
    });
}
