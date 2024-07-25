import { stat } from 'fs/promises';
import { defaultIndent } from './constants';

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

export function toCamelCase(string: string): string {
    return string.replace(/-([a-zA-Z0-9])/g, (g) => g[1].toUpperCase());
}

export function toKebabCase(string: string): string {
    return string
        .replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())
        .replace(
            /(_([a-z]))/g,
            (_, p0: string | null, p1: string | null) => '-' + (p1 ?? p0 ?? '')
        );
}

export function addDefaultIndentToLine(string: string): string {
    return `${defaultIndent}${string}`;
}

export function indentLines(string: string): string {
    return string.split('\n').map(addDefaultIndentToLine).join('\n');
}

/**
 * Tokens
 */

export function normalizeTokenName(name: string): string {
    return name.replace(/([0-9])\.([0-9])/g, '$1_$2').replace(/\./g, '--');
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
