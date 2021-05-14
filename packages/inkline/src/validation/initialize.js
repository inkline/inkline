import { defaultValidationValues, reservedValidationFields } from "@inkline/inkline/src/constants";

/**
 * Initialize raw form schema by adding required default fields if they do not exist
 *
 * @param schema
 * @returns {*}
 */
export function initialize(schema) {
    Object.entries(defaultValidationValues).forEach(([key, value]) => {
        if (!schema.hasOwnProperty(key)) {
            schema[key] = value;
        }
    });

    Object.keys(schema)
        .filter((key) => !reservedValidationFields.includes(key))
        .forEach((key) => {
            if (typeof schema[key] === 'object' || Array.isArray(schema[key])) {
                schema[key] = initialize(schema[key])
            }
        });

    return schema;
}
