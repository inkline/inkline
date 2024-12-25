/**
 * Get a deeply nested value based on a given path string
 *
 * @param object
 * @param path
 * @returns {ReturnType}
 */
export function getValueByPath<ReturnType = any, SourceType extends Record<string, any> = Record<string, any>>(object: SourceType, path: string): ReturnType {
    return path.split('.').reduce<Record<string, any>>((acc, part) => {
        return (acc && acc[part]) as Record<string, any>;
    }, object) as ReturnType;
}

/**
 * Set a deeply nested value based on a given path string
 *
 * @param object {SourceType}
 * @param path
 * @param value
 * @param initialize
 * @returns {SourceType}
 */
export function setValueByPath<SourceType extends Record<string, any> = Record<string, any>, ValueType = any>(
    object: SourceType,
    path: string,
    value: ValueType,
    initialize = true
): SourceType {
    const parts = path.split('.');
    const key = parts.pop();

    let target = object as Record<string, any>;
    parts.forEach((part) => {
        if (!(part in target) && initialize) {
            target[part] = {};
        }

        target = target[part] as Record<string, any>;
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
 * @returns {SourceType}
 */
export function setValuesAlongPath<SourceType = Record<string, any>, ValuesType extends Record<string, any> = Record<string, any>>(
    object: SourceType,
    path: string,
    values: ValuesType
): SourceType {
    if (path) {
        path.split('.').reduce<Record<string, Record<string, any>>>((acc, part) => {
            Object.keys(values).forEach((key) => {
                acc[part][key] = values[key] as ValuesType[keyof ValuesType];
            });

            return acc && acc[part];
        }, object as Record<string, any>);
    }

    Object.keys(values).forEach((key) => {
        (object as Record<string, any>)[key] = values[key] as ValuesType[keyof ValuesType];
    });

    return object;
}
