import { validators } from '@inkline/inkline/validation/validators';
import { reservedValidationFields } from '@inkline/inkline/constants';
import { translate } from '@inkline/inkline/i18n';

/**
 * Apply validators to the form input schema and set the value for the valid and invalid fields
 *
 * @param schema
 * @param path
 * @returns {*}
 */
export function validateFormInput(schema: any, path = '') {
    const errors: any[] = [];

    schema.valid = (schema.validators || []).reduce((acc: boolean, rawValidator: any) => {
        const validator = typeof rawValidator === 'string' ? { name: rawValidator } : rawValidator;

        const valid = validators[validator.name](schema.value, validator);
        if (!valid) {
            const { name, message, ...params } = validator;
            const i18nParams = {
                name: path.split('.').pop(),
                value: schema.value,
                ...params
            };

            const errorMessage =
                (message instanceof Function ? message() : message) ||
                translate(`validation.${name}`, i18nParams);

            errors.push({ name, message: errorMessage, path });
        }

        return acc && valid;
    }, true);
    schema.invalid = !schema.valid;
    schema.errors = errors;

    return schema;
}

/**
 * Recursively validate form fields and compute valid and invalid status using depth first traversal
 *
 * @param schema
 * @param name
 * @returns {*}
 */
export function validateFormGroup(schema: any, name = '') {
    schema.valid = Object.keys(schema)
        .filter((key) => !reservedValidationFields.includes(key))
        .reduce((acc, key) => {
            if (
                Object.keys(schema[key]).length === 0 ||
                schema[key].validators ||
                schema[key].value
            ) {
                schema[key] = validateFormInput(schema[key], `${name}` ? `${name}.${key}` : key);
            } else {
                schema[key] = validateFormGroup(schema[key], `${name}` ? `${name}.${key}` : key);
            }

            return acc && schema[key].valid;
        }, true);
    schema.invalid = !schema.valid;

    return schema;
}

/**
 * Alias for validateFormGroup
 *
 * @param schema
 * @returns {*}
 */
export function validate(schema: any) {
    return validateFormGroup(schema);
}
