/**
 * Apply validators to the form input schema and set the value for the valid and invalid fields
 *
 * @param schema
 * @param path
 * @returns {*}
 */
export declare function validateFormInput(schema: any, path?: string): any;
/**
 * Recursively validate form fields and compute valid and invalid status using depth first traversal
 *
 * @param schema
 * @param name
 * @returns {*}
 */
export declare function validateFormGroup(schema: any, name?: string): any;
/**
 * Alias for validateFormGroup
 *
 * @param schema
 * @returns {*}
 */
export declare function validate(schema: any): any;
