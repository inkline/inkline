import type { KebabCase } from 'type-fest';
import {
    CornersPropertyKeys,
    ExportedName,
    HSLAColorProperty,
    NamespacedKey,
    NamespaceType,
    SidesPropertyKeys,
    TokenValue,
    Variable
} from './types';
import { isNumberOrNumberString } from './typeGuards';
import parseColor from 'color';
import { toCamelCase } from '@inkline/utils';

/**
 * Arrays
 */

export function insertInBetweenElements<T>(array: T[], value: T): T[] {
    return array
        .reduce<T[]>((acc, curr) => {
            acc.push(curr, value);
            return acc;
        }, [])
        .slice(0, -1);
}

/**
 * Strings
 */

export function toCssName<T extends string>(string: T): KebabCase<T> {
    return string
        .replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())
        .replace(
            /(_([a-z]))/g,
            (_, p0: string | null, p1: string | null) => '-' + (p1 ?? p0 ?? '')
        ) as KebabCase<T>;
}

export function toExportedName<T extends string>(name: T): ExportedName<T> {
    return toCamelCase(name.replace(/-+/g, '-')) as ExportedName<T>;
}

export function toExportedVariable<Name extends string>(variable: Variable<Name>) {
    return {
        [toExportedName(variable.__name)]: variable
    };
}

export function resolveStringPropertyValue<Keys extends string, T extends Record<Keys, TokenValue>>(
    value: string,
    returnKeys: Keys[]
): T {
    const parts = (value ?? '').split(/\s+/);

    return returnKeys.reduce<T>((acc, key, index) => {
        (acc as Record<string, string>)[key] = parts[index];
        return acc;
    }, {} as T);
}

export function resolveStringSidesPropertyValue(
    value: string
): Record<SidesPropertyKeys, TokenValue> {
    const keys = ['top', 'right', 'bottom', 'left'] as const;
    const parts = (value ?? '').split(/\s+/);

    return keys.reduce(
        (acc, key, index) => {
            (acc as Record<string, string>)[key] = parts[index % 4] || parts[index % 2] || parts[0];
            return acc;
        },
        {} as Record<SidesPropertyKeys, TokenValue>
    );
}

export function resolveStringCornersPropertyValue(
    value: string
): Record<CornersPropertyKeys, TokenValue> {
    const keys = ['topLeft', 'topRight', 'bottomRight', 'bottomLeft'] as const;
    const parts = (value ?? '').split(/\s+/);

    return keys.reduce(
        (acc, key, index) => {
            (acc as Record<string, string>)[key] = parts[index];
            return acc;
        },
        {} as Record<CornersPropertyKeys, TokenValue>
    );
}

export function resolveStringColorPropertyValue(value: string): HSLAColorProperty {
    const { h, s, l, alpha: a } = parseColor(value).hsl().object();
    return {
        h,
        s: normalizePercentageValue(s),
        l: normalizePercentageValue(l),
        a: a ?? 1
    };
}

/**
 * Tokens
 */

export function normalizeTokenName(name: string): string {
    return name.replace(/([0-9])\.([0-9])/g, '$1_$2').replace(/\./g, '--');
}

export function createNamespacedTokenName<Namespace extends NamespaceType, Name extends string>(
    namespace: Namespace,
    name: Name
): NamespacedKey<Namespace, Name> {
    return [...(Array.isArray(namespace) ? namespace : [namespace]), name].join(
        '--'
    ) as NamespacedKey<Namespace, Name>;
}

export function normalizePercentageValue<T extends TokenValue>(value: T): T | string {
    return isNumberOrNumberString(value) ? `${value}%` : value;
}

/**
 * Hashing
 */

/**
 * cyrb53 (c) 2018 bryc (github.com/bryc)
 * License: Public domain
 * A fast and simple 64-bit (or 53-bit) string hash function with decent collision resistance.
 * Largely inspired by MurmurHash2/3, but with a focus on speed/simplicity.
 * See https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/52171480#52171480
 * https://github.com/bryc/code/blob/master/jshash/experimental/cyrb53.js
 */

function cyrb64(str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return [h2 >>> 0, h1 >>> 0];
}

export function hash(str: string, seed = 0): string {
    const [h2, h1] = cyrb64(str, seed);
    return h2.toString(36).padStart(7, '0') + h1.toString(36).padStart(7, '0');
}
