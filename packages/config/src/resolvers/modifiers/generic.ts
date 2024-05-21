import type { RawThemeGenericValue, RawThemeGenericVariant } from '../../types';

export function addModifier(
    rawValue: RawThemeGenericValue,
    variantValue: RawThemeGenericVariant['add']
) {
    return `calc(${rawValue} + ${variantValue})`;
}

export function subtractModifier(
    rawValue: RawThemeGenericValue,
    variantValue: RawThemeGenericVariant['subtract']
) {
    return `calc(${rawValue} - ${variantValue})`;
}

export function multiplyModifier(
    rawValue: RawThemeGenericValue,
    variantValue: RawThemeGenericVariant['multiply']
) {
    return `calc(${rawValue} * ${variantValue})`;
}

export function divideModifier(
    rawValue: RawThemeGenericValue,
    variantValue: RawThemeGenericVariant['divide']
) {
    return `calc(${rawValue} / ${variantValue})`;
}
