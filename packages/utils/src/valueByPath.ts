/**
 * Get a deeply nested value based on a given path string
 *
 * @param object
 * @param path
 * @returns {T}
 */
export function getValueByPath(object: any, path: string): any {
    return path.split('.').reduce((acc, part) => {
        return acc && acc[part];
    }, object);
}

/**
 * Set a deeply nested value based on a given path string
 *
 * @param object
 * @param path
 * @param value
 * @param initialize
 * @returns {T}
 */
export function setValueByPath(
    object: Record<string, any>,
    path: string,
    value: any,
    initialize = true
): Record<string, any> {
    const parts = path.split('.');
    const key = parts.pop();

    let target = object;
    parts.forEach((part) => {
        if (!target.hasOwnProperty(part) && initialize) {
            target[part] = {};
        }

        target = target[part];
    });

    if (target && key) {
        target[key] = value;
    }

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
export function setValuesAlongPath<T = Record<string, any>>(
    object: T,
    path: string,
    values: any
): T {
    if (path) {
        path.split('.').reduce((acc, part) => {
            Object.keys(values).forEach((key) => {
                acc[part][key] = values[key];
            });

            return acc && acc[part];
        }, object as Record<string, any>);
    }

    Object.keys(values).forEach((key) => {
        (object as Record<string, any>)[key] = values[key];
    });

    return object;
}
