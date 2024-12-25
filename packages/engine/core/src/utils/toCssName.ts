import type { KebabCase } from 'type-fest';

export function toCssName<T extends string>(string: T): KebabCase<T> {
    return string
        .replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())
        .replace(
            /(_([a-z]))/g,
            (_, p0: string | null, p1: string | null) => '-' + (p1 ?? p0 ?? '')
        ) as KebabCase<T>;
}
