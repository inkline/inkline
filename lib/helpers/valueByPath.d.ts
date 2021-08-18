/**
 * Get a deeply nested value based on a given path string
 *
 * @param object
 * @param path
 * @returns {T}
 */
export declare function getValueByPath(object: any, path: string): any;
/**
 * Set a deeply nested value based on a given path string
 *
 * @param object
 * @param path
 * @param key
 * @param value
 * @returns {T}
 */
export declare function setValueByPath(object: any, path: string, key: string, value: any): any;
/**
 * Set a deeply nested value along given path string
 *
 * @param object
 * @param path
 * @param values
 * @returns {T}
 */
export declare function setValuesAlongPath(object: any, path: string, values: any): any;
