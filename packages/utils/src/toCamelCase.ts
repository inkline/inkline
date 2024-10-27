import type { CamelCase } from "type-fest";

export function toCamelCase<T extends string>(string: T): CamelCase<T> {
    return string.replace(/-([a-zA-Z0-9])/g, (g) => g[1].toUpperCase()) as CamelCase<T>;
}
