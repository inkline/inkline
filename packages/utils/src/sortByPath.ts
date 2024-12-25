import { getValueByPath } from './valueByPath';

/**
 * Sort an array of objects by path
 *
 * @param path
 * @returns {function(*=, *=): number}
 */
export function sortByPath<T extends Record<string, any>>(path: string): (a: T, b: T) => number {
    return (a, b) => {
        return getValueByPath(a, path) > getValueByPath(b, path)
            ? 1
            : getValueByPath(a, path) < getValueByPath(b, path)
            ? -1
            : 0;
    };
}
