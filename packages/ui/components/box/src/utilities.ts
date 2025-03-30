import { ComponentProps, ComponentVariant } from '@inkline/types';
import { toCamelCase, merge } from '@inkline/utils';

const variantsCache = new Map<string, ComponentProps>();

export function resolveVariant(
    variants: Record<string, ComponentVariant>,
    key: string,
    visited: Set<string> = new Set()
): ComponentProps {
    if (variantsCache.has(key)) {
        return variantsCache.get(key)!;
    }

    if (visited.has(key)) {
        throw new Error(`Circular reference detected for variant key: ${key}`);
    }

    visited.add(key);

    const variant = variants[key];
    if (!variant) {
        return {};
    }

    let resolved: ComponentProps;
    if (variant.extends) {
        const extensions = Array.isArray(variant.extends) ? variant.extends : [variant.extends];
        resolved = extensions.reduce<ComponentProps>((acc, extension) => {
            const parentKey = toCamelCase(extension);
            const parentVariant = resolveVariant(variants, parentKey, visited);
            const { extends: _ignore, ...childVariant } = variant;

            return merge(acc, parentVariant, childVariant);
        }, {});
    } else {
        resolved = variant;
    }

    variantsCache.set(key, resolved);

    return resolved;
}
