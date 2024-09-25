import { isObject } from './typeGuards';

export const reservedChildElementKeys = [
    'alignContent',
    'alignItems',
    'alignSelf',
    'animation',
    'appearance',
    'background',
    'border',
    'borderRadius',
    'bottom',
    'bottomLeft',
    'bottomRight',
    'boxShadow',
    'clip',
    /clip.*/,
    'color',
    'cursor',
    'display',
    /flex.*/,
    'fontFamily',
    'fontSize',
    'fontWeight',
    'gap',
    'height',
    'justifyContent',
    'left',
    'letterSpacing',
    'lineHeight',
    'margin',
    /mask.*/,
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'opacity',
    'order',
    /overflow[XY]?/,
    'padding',
    'placeContent',
    'placeItems',
    'placeSelf',
    'pointerEvents',
    'position',
    'resize',
    'right',
    'textAlign',
    'textDecoration',
    'textTransform',
    'top',
    'topLeft',
    'topRight',
    'transform',
    'transition',
    'userSelect',
    'whiteSpace',
    'width',
    'zIndex'
];

export const isReservedChildElementKey = (key: string): boolean =>
    reservedChildElementKeys.some((reservedKey) =>
        typeof reservedKey === 'string' ? reservedKey === key : reservedKey.test(key)
    );

export function createAppliedModifier<T, V>(
    fn: (rawValue: T, variantValue: V) => T
): (rawValue: T, variantValue: V) => void | T {
    return (rawValue, variantValue) => {
        if (isObject<Record<string, string>>(rawValue)) {
            Object.keys(rawValue).forEach((key) => {
                (rawValue as Record<string, unknown>)[key] = fn(rawValue[key] as T, variantValue);
            });
            return;
        }

        return fn(rawValue, variantValue);
    };
}

export function createSetModifier<T, V>(
    keys: string | string[]
): (rawValue: T, variantValue: V) => void {
    return (rawValue, variantValue) => {
        const setKeys = Array.isArray(keys) ? keys : [keys];
        for (const key of setKeys) {
            (rawValue as Record<string, unknown>)[key] = variantValue;
        }
    };
}

export const addModifier = createAppliedModifier<any, number | string | boolean | undefined>(
    (rawValue, variantValue) => `calc(${rawValue as string} + ${variantValue})`
);

export const subtractModifier = createAppliedModifier<any, number | string | boolean | undefined>(
    (rawValue, variantValue) => `calc(${rawValue as string} - ${variantValue})`
);

export const multiplyModifier = createAppliedModifier<any, number | string | boolean | undefined>(
    (rawValue, variantValue) => `calc(${rawValue as string} * ${variantValue})`
);

export const divideModifier = createAppliedModifier<any, number | string | boolean | undefined>(
    (rawValue, variantValue) => `calc(${rawValue as string} / ${variantValue})`
);
