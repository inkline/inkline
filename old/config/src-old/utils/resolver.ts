import { ClassificationType, ResolverMeta, ResolveValueFn, ResolveVariantFn } from '../types';
import { filterPathByClassification } from './meta';

export const createGenericVariantResolveFn =
    <RawValue, ResolvedValue>(
        resolveValue: ResolveValueFn<RawValue, ResolvedValue>,
        resolveVariant: ResolveVariantFn<RawValue, ResolvedValue> = resolveValue
    ) =>
    (value: RawValue, meta: ResolverMeta) => {
        const isElementValue =
            filterPathByClassification(
                meta,
                (_path, _part, { type }) => type === ClassificationType.Element
            ).length > 0;

        if (meta.path[meta.path.length - 1] === 'default' || isElementValue) {
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
