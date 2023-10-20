import { validators } from '@inkline/inkline/validation/register';
import { reservedValidationFields } from '@inkline/inkline/constants';
import { translate } from '@inkline/inkline/i18n';
import {
    FormValidator,
    ResolvedFormSchema,
    ResolvedFormSchemaField,
    FormError,
    Form,
    isFormFieldArray,
    isFormGroupArray,
    isFormField,
    isFormGroup
} from '@inkline/inkline/types';

/**
 * Apply validators to the form input schema and set the value for the valid and invalid fields
 *
 * @param schema { ResolvedFormSchemaField<T> }
 * @param path { string }
 * @returns { ResolvedFormSchemaField<T> }
 */
export function validateFormField<T>(schema: ResolvedFormSchemaField<T>, path = '') {
    const errors: FormError[] = [];
    const resolvedSchema = {
        ...schema
    };

    const valid = (schema.validators || []).reduce(
        (acc: boolean, rawValidator: FormValidator | string) => {
            const validator =
                typeof rawValidator === 'string' ? { name: rawValidator } : rawValidator;

            const validationResult = validators[validator.name](schema.value, validator);

            if (!validationResult) {
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

            return acc && validationResult;
        },
        true
    );

    resolvedSchema.valid = valid;
    resolvedSchema.invalid = !valid;
    resolvedSchema.errors = errors;

    return resolvedSchema;
}

/**
 * Recursively validate form fields and compute valid and invalid status using depth first traversal
 *
 * @param schema { ResolvedFormSchema<T> }
 * @param name { string }
 * @returns { ResolvedFormSchema<T> }
 */
export function validateForm<T extends Form>(schema: ResolvedFormSchema<T>, name = '') {
    const resolvedSchema = {
        ...schema
    };

    const valid = Object.keys(resolvedSchema)
        .filter((key) => !reservedValidationFields.includes(key))
        .reduce((acc, key: keyof typeof resolvedSchema) => {
            const field = resolvedSchema[key];

            if (isFormFieldArray(field)) {
                resolvedSchema[key] = field.map((item, index) => {
                    return validateFormField<T[keyof T]>(
                        item,
                        name ? `${name}.${index}.${key as string}` : `${index}.${key as string}`
                    );
                });
            } else if (isFormGroupArray(field)) {
                resolvedSchema[key] = field.map((item, index) => {
                    return validateForm<T[keyof T]>(
                        item,
                        name ? `${name}.${index}.${key as string}` : `${index}.${key as string}`
                    );
                });
            } else if (isFormField(field)) {
                resolvedSchema[key] = validateFormField<T[keyof T]>(
                    field,
                    name ? `${name}.${key as string}` : (key as string)
                );
            } else if (isFormGroup(field)) {
                resolvedSchema[key] = validateForm<T[keyof T]>(
                    field,
                    name ? `${name}.${key as string}` : (key as string)
                );
            }

            return acc && resolvedSchema[key].valid;
        }, true);

    resolvedSchema.valid = valid;
    resolvedSchema.invalid = !valid;

    return resolvedSchema;
}

/**
 * Alias for validateFormGroup
 *
 * @param schema { ResolvedFormSchema }
 * @returns { ResolvedFormSchema }
 */
export async function validateSchema<T extends Form>(schema: ResolvedFormSchema<T>) {
    return validateForm<T>(schema);
}
