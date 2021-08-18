/**
 * Sort an array of objects by path
 *
 * @param path
 * @returns {function(*=, *=): number}
 */
export declare function sortByPath<T>(path: string): (a: T, b: T) => number;
