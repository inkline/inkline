/**
 * Capitalize first letter of a string
 *
 * @param string
 * @returns {string}
 */
export function capitalize<T extends string>(value: T): Capitalize<T> {
    return (value.charAt(0).toUpperCase() + value.slice(1)) as Capitalize<T>;
}
