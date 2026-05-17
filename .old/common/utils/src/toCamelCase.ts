import type { CamelCase } from 'type-fest';

export function toCamelCase<T extends string>(string: T): CamelCase<T> {
    return string
        .replace(/-+/g, '-')
        .replace(/-([a-zA-Z0-9])/g, (g) => g[1].toUpperCase())
        .replace(/(\d+)([a-z]+)/g, (_, digits: string, letters: string) =>
            `${digits}${letters.charAt(0).toUpperCase()}${letters.slice(1)}`
        ) as CamelCase<T>;
}
