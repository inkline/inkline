/**
 * Get a deeply nested value based on a given path string
 *
 * @param object
 * @param path
 */
export function getValueByPath<T extends Record<string, any>> (object: T, path: string): any {
    return path.split('.').reduce((acc, part) => {
        return acc && acc[part];
    }, object);
}
