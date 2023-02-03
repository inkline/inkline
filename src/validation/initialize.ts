import {
    defaultValidationValues,
    reservedValidationFields,
    defaultFieldValidationValues
} from '@inkline/inkline/constants';

/**
 * Initialize raw form schema by adding required default fields if they do not exist
 *
 * @param schema
 * @returns {*}
 */
export function initialize(schema: any) {
    const isField =
        Object.keys(schema).length === 0 ||
        Array.isArray(schema.validators) ||
        schema.hasOwnProperty('value');
    const defaultValues = isField
        ? { ...defaultValidationValues, ...defaultFieldValidationValues }
        : defaultValidationValues;

    Object.entries(defaultValues).forEach(([key, value]) => {
        if (!schema.hasOwnProperty(key)) {
            schema[key] = value;
        }
    });

    Object.keys(schema)
        .filter((key) => !reservedValidationFields.includes(key))
        .forEach((key) => {
            if (typeof schema[key] === 'object' || Array.isArray(schema[key])) {
                schema[key] = initialize(schema[key]);
            }
        });

    return schema;
}
