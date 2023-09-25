import { reservedValidationFields } from '@inkline/inkline/constants';

/**
 * Update schema recursively with given values
 *
 * @param schema
 * @param values
 * @returns {*}
 */
export function update(schema: any, values: any) {
    Object.entries(values).forEach(([key, value]) => {
        schema[key] = value;
    });

    Object.keys(schema)
        .filter((key) => !reservedValidationFields.includes(key))
        .forEach((key) => {
            if (typeof schema[key] === 'object' || Array.isArray(schema[key])) {
                schema[key] = update(schema[key], values);
            }
        });

    return schema;
}
