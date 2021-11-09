import { getValueByPath } from './valueByPath';

/**
 * Sort an array of objects by path
 *
 * @param path
 * @returns {function(*=, *=): number}
 */
export function sortByPath<T> (path: string): (a: T, b: T) => number {
    return (a, b) => {
        return (getValueByPath(a, path) > getValueByPath(b, path))
            ? 1
            : (getValueByPath(a, path) < getValueByPath(b, path)) ? -1 : 0;
    };
}
