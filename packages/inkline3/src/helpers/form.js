import { reservedValidationFields } from '@inkline/inkline/src/constants';
import * as validators from "@inkline/inkline/src/validators";

export function validateFormInput(schema) {
    schema.valid = (schema.validators || []).reduce((acc, validator) => {
        validator = typeof validator === 'string'
            ? { name: validator }
            : validator;

        return acc && validators[validator.name](schema.value, validator);
    }, true);
    schema.invalid = !schema.valid;

    return schema;
}

export function validateFormGroup(schema) {
    schema.valid = Object.keys(schema)
        .filter((k) => !reservedValidationFields.includes(k))
        .reduce((acc, key) => {
            if (Object.keys(schema[key]).length === 0 || schema[key].validators || schema[key].value) {
                schema[key] = validateFormInput({ ...schema[key] });
            } else {
                schema[key] = validateFormGroup({ ...schema[key] });
            }

            return acc && schema[key].valid;
        }, true);
    schema.invalid = !schema.valid;

    return schema;
}
