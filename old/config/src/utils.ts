import { stat } from 'fs/promises';
import { defaultIndent } from './constants';
import type { CamelCase, KebabCase } from 'type-fest';
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

export function toCamelCase<T extends string>(string: T): CamelCase<T> {
    return string.replace(/-([a-zA-Z0-9])/g, (g) => g[1].toUpperCase()) as CamelCase<T>;
}

export function toKebabCase<T extends string>(string: T): KebabCase<T> {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() as KebabCase<T>;
}

export function toExportedName<T extends string>(name: T): ExportedName<T> {
    return toCamelCase(name.replace(/-+/g, '-')) as ExportedName<T>;
}

export function toExportedVariable<Name extends string>(variable: Variable<Name>) {
    return {
        [toExportedName(variable.__name)]: variable
    };
}

export function toCssName<T extends string>(string: T): KebabCase<T> {
    return string
        .replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())
        .replace(
            /(_([a-z]))/g,
            (_, p0: string | null, p1: string | null) => '-' + (p1 ?? p0 ?? '')
        ) as KebabCase<T>;
}

export function capitalize<T extends string>(value: T): Capitalize<T> {
    return (value.charAt(0).toUpperCase() + value.slice(1)) as Capitalize<T>;
}

export function addDefaultIndentToLine(string: string): string {
    return `${defaultIndent}${string}`;
}

export function indentLines(string: string): string {
    return string.split('\n').map(addDefaultIndentToLine).join('\n');
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
 * Files
 */

export async function exists(file: string) {
    try {
        await stat(file);
        return true;
    } catch {
        return false;
    }
}
