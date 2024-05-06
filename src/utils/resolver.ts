import type { Resolver, ResolverMeta, ResolveValueFn, ResolveVariantFn } from '../types';

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

export const createResolveFn =
    <RawValue, RawVariant, ResolvedValue>(
        resolveValue: ResolveValueFn<RawValue, ResolvedValue>,
        resolveVariant: ResolveVariantFn<RawVariant, ResolvedValue>
    ) =>
    (value: RawValue | RawVariant, meta: ResolverMeta) => {
        if (meta.path[meta.path.length - 1] === 'default') {
            return resolveValue(value as RawValue, meta);
        } else {
            return resolveVariant(value as RawVariant, meta);
        }
    };
