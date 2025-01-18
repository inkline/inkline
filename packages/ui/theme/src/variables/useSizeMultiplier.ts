import { defaultDefinitionOptions, divide, multiply, ref, variable } from '@inkline/core';
import { useScale } from './useScale';
import type { DefinitionOptions, Variable } from '@inkline/core';
import { createVariantFactoryFn, useVariantsFactory } from './useVariantsFactory';
import {
    createComposedVariantFactoryFn,
    useComposedVariantsFactory
} from './useComposedVariantsFactory';

export type SizeMultiplierKeys = `${number}xs` | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | `${number}xl`;

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

export function useSizeMultiplier(userOptions: DefinitionOptions) {
    const options = { ...defaultDefinitionOptions, ...userOptions };

    const { scalePow1, scalePow2, scalePow3 } = useScale(options);

    const sizeMultiplier = variable('size-multiplier', 1, options);

    const variants = {
        xxs: createVariantFactoryFn((value) => divide(value, ref(scalePow3))),
        xs: createVariantFactoryFn((value) => divide(value, ref(scalePow2))),
        sm: createVariantFactoryFn((value) => divide(value, ref(scalePow1))),
        md: createVariantFactoryFn((value) => value),
        lg: createVariantFactoryFn((value) => multiply(value, ref(scalePow1))),
        xl: createVariantFactoryFn((value) => multiply(value, ref(scalePow2))),
        xxl: createVariantFactoryFn((value) => multiply(value, ref(scalePow3)))
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

export function useKeyMappedSizeMultiplier(options: DefinitionOptions): Record<SizeMultiplierKeys, Variable> {
    const {
        sizeMultiplierXxs,
        sizeMultiplierXs,
        sizeMultiplierSm,
        sizeMultiplierMd,
        sizeMultiplierLg,
        sizeMultiplierXl,
        sizeMultiplierXxl
    } = useSizeMultiplier(options);

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
    options: { keys?: SizeMultiplierKeys[] } & DefinitionOptions
) {
    const keys = options?.keys ?? defaultSizeMultiplierKeys;
    const sizeMultipliersKeyMap = useKeyMappedSizeMultiplier(options);
    const variants = keys.reduce<Record<string, ReturnType<typeof createVariantFactoryFn>>>(
        (acc, key) => {
            acc[key] = createVariantFactoryFn((value) =>
                multiply(value, ref(sizeMultipliersKeyMap[key]))
            );
            return acc;
        },
        {}
    );

    return useVariantsFactory<RootKey, SizeMultiplierKeys>(target, variants, options);
}

export function useComposedSizeMultiplierVariantsFactory<
    RootKey extends string,
    Name extends string
>(composed: Variable<Name>, options: { keys?: SizeMultiplierKeys[] } & DefinitionOptions) {
    const keys = options?.keys ?? defaultSizeMultiplierKeys;
    const sizeMultipliersKeyMap = useKeyMappedSizeMultiplier(options);
    const variants = keys.reduce<Record<string, ReturnType<typeof createComposedVariantFactoryFn>>>(
        (acc, key) => {
            acc[key] = createComposedVariantFactoryFn((values) =>
                values.map((value) => multiply(value, ref(sizeMultipliersKeyMap[key])))
            );
            return acc;
        },
        {}
    );

    return useComposedVariantsFactory<RootKey, SizeMultiplierKeys>(composed, variants, options);
}
