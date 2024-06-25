import { ResolverMeta, ResolveValueFn, ResolveVariantFn } from '../types';

export const createGenericVariantResolveFn =
    <RawValue, ResolvedValue>(
        resolveValue: ResolveValueFn<RawValue, ResolvedValue>,
        resolveVariant: ResolveVariantFn<RawValue, ResolvedValue> = resolveValue
    ) =>
    (value: RawValue, meta: ResolverMeta) => {
        if (meta.path[meta.path.length - 1] === 'default') {
            return resolveValue(value, meta);
        } else {
            return resolveVariant(value, meta);
        }
    };

export function resolveStringValue<T extends Record<string, any>>(
    value: string,
    returnKeys: string[],
    mode: 'default' | 'sides' = 'default'
): T {
    const parts = (value ?? '').split(/\s+/);

    return returnKeys.reduce<T>((acc, key, index) => {
        if (mode === 'default' && parts[index]) {
            (acc as Record<string, string>)[key] = parts[index];
        } else if (mode === 'sides') {
            (acc as Record<string, string>)[key] = parts[index % 4] || parts[index % 2] || parts[0];
        }

        return acc;
    }, {} as T);
}
