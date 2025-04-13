import type { ComponentProps, VariantProps } from '@inkline/types';
import { toVariantList, unfold } from '../utils';
import { merge } from '@inkline/utils';
import { getValueByPath } from '@inkline/utils';
import { variantValueReferenceMarker } from '../constants';

const variantsCache = new Map<string, ComponentProps>();

export function resolveVariantByName(
    variants: Record<string, VariantProps>,
    variantName: string,
    visited: Set<string> = new Set()
): ComponentProps {
    if (variantsCache.has(variantName)) {
        return variantsCache.get(variantName)!;
    }

    if (visited.has(variantName)) {
        throw new Error(`Circular reference detected for variant key: ${variantName}`);
    }

    visited.add(variantName);

    const variant = variants[variantName];
    if (!variant) {
        return {};
    }

    const resolved = resolveVariant(variants, variant, visited);

    variantsCache.set(variantName, resolved);

    return resolved;
}

/**
 * Unfold the variant to get all properties and resolve extensions recursively
 */
export function resolveVariant(
    variants: Record<string, VariantProps>,
    variant: VariantProps,
    visited: Set<string> = new Set()
): ComponentProps {
    const { extends: variantExtends, ...currentVariant } = variant;
    let resolved: ComponentProps;
    if (variantExtends) {
        const extensions = toVariantList(variantExtends);
        resolved = extensions.reduce<ComponentProps>((acc, extension) => {
            const parentVariant = resolveVariantByName(variants, extension, visited);

            return merge(acc, parentVariant, currentVariant);
        }, {});
    } else {
        resolved = currentVariant;
    }

    resolveReferenceValues(variants, resolved);

    return resolved;
}

/**
 * Resolve reference strings in the variant object
 *
 * Reference strings are in the format of `{{variantName.propertyName}}`
 */
export function resolveReferenceValues(
    variants: Record<string, VariantProps>,
    resolved: ComponentProps
) {
    Object.entries(resolved).forEach(([key, value]) => {
        if (typeof value !== 'string' || !value.startsWith(variantValueReferenceMarker)) {
            return;
        }

        const variantsPath = value.slice(2, -2).trim();
        const variantsPathParts = variantsPath.split('.');

        const targetVariantName = variantsPathParts.shift();
        if (!targetVariantName) {
            return;
        }

        const targetVariant = resolveVariantByName(variants, targetVariantName);
        resolved[key] = getValueByPath(targetVariant, variantsPathParts);
    });
}
