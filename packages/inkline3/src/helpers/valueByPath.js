/**
 * Get a deeply nested value based on a given path string
 *
 * @param object
 * @param path
 * @returns {T}
 */
export function getValueByPath(object, path) {
    return path.split('.').reduce((acc, part) => {
        return acc && acc[part];
    }, object);
}

/**
 * Set a deeply nested value based on a given path string
 *
 * @param object
 * @param path
 * @param key
 * @param value
 * @returns {T}
 */
export function setValueByPath(object, path, key, value) {
    getValueByPath(object, path)[key] = value;

    return object;
}

/**
 * Set a deeply nested value along given path string
 *
 * @param object
 * @param path
 * @param values
 * @returns {T}
 */
export function setValuesAlongPath(object, path, values) {
    path.split('.').reduce((acc, part) => {
        Object.keys(values).forEach((key) => {
            acc[key] = values[key];
        });

        return acc && acc[part];
    }, object);

    Object.keys(values).forEach((key) => {
        object[key] = values[key];
    });

    return object;
}
