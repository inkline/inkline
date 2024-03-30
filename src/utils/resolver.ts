import type {
    RawTheme,
    RawThemeVariantsWithDefault,
    ResolvedTheme,
    ResolvedThemeVariantsWithDefault,
    Resolver,
    ResolverMeta,
    ResolveValueFn,
    ResolveVariantFn
} from '../types';
import { matchKey } from './matchKey';

export function defineResolver<RawValue, ResolvedValue>(
    resolver: Resolver<RawValue, ResolvedValue>
): Resolver<RawValue, ResolvedValue> {
    return resolver;
}

export function defineResolverValueFn<RawValue, ResolvedValue>(
    fn: ResolveValueFn<RawValue, ResolvedValue>
): ResolveValueFn<RawValue, ResolvedValue> {
    return fn;
}

export function defineResolverVariantFn<RawVariant, ResolvedValue>(
    fn: ResolveVariantFn<RawVariant, ResolvedValue>
): ResolveVariantFn<RawVariant, ResolvedValue> {
    return fn;
}

export const createFieldWithOptionalVariantsResolveFn =
    <RawValue, RawVariant, Resolved>(
        resolveValue: ResolveValueFn<RawValue, Resolved>,
        resolveVariant: ResolveVariantFn<RawVariant, Resolved>
    ) =>
    (
        valueOrVariants: RawThemeVariantsWithDefault<RawValue, RawVariant>,
        meta: ResolverMeta
    ): ResolvedThemeVariantsWithDefault<Resolved> => {
        if (
            typeof valueOrVariants !== 'object' ||
            !(valueOrVariants && 'default' in valueOrVariants)
        ) {
            return { default: resolveValue(valueOrVariants, meta) };
        } else {
            const { default: defaultValue, ...variants } = valueOrVariants;
            const resolvedDefaultValue = resolveValue(defaultValue, meta);
            const resolvedVariants = Object.entries(variants).reduce<Record<string, Resolved>>(
                (acc, [variantName, variant]) => {
                    acc[variantName] = resolveVariant(variant as RawVariant, {
                        ...meta,
                        path: [...meta.path, variantName]
                    });

                    return acc;
                },
                {}
            );

            return {
                ...resolvedVariants,
                ...(defaultValue ? { default: resolvedDefaultValue } : {})
            } as ResolvedThemeVariantsWithDefault<Resolved>;
        }
    };

export const createFieldWithoutVariantsResolveFn =
    <RawValue, ResolvedValue>(resolveValue: ResolveValueFn<RawValue, ResolvedValue>) =>
    (value: RawValue, meta: ResolverMeta): ResolvedValue => {
        return resolveValue(value, meta);
    };

export const createMultipleFieldsWithOptionalVariantsResolveFn =
    <RawValue, RawVariant, ResolvedValue>(
        resolveValue: ResolveValueFn<RawValue, ResolvedValue>,
        resolveVariant: ResolveVariantFn<RawVariant, ResolvedValue>
    ) =>
    (
        fields: Record<string, RawThemeVariantsWithDefault<RawValue, RawVariant>>,
        meta: ResolverMeta
    ) => {
        return Object.entries(fields).reduce<
            Record<string, ResolvedThemeVariantsWithDefault<ResolvedValue>>
        >((acc, [fieldName, fieldOrVariants]) => {
            acc[fieldName] = createFieldWithOptionalVariantsResolveFn<
                RawValue,
                RawVariant,
                ResolvedValue
            >(resolveValue, resolveVariant)(fieldOrVariants, {
                ...meta,
                path: [...meta.path, fieldName]
            });

            return acc;
        }, {});
    };
