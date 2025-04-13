import type { KebabCase } from "type-fest";

export function toKebabCase<T extends string>(string: T): KebabCase<T> {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase() as KebabCase<T>;
}
