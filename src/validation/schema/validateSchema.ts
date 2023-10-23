import { validators } from '@inkline/inkline/validation/register';
import { reservedValidationFields } from '@inkline/inkline/constants';
import { translate } from '@inkline/inkline/i18n';
import {
    FormValidator,
    ResolvedFormSchema,
    ResolvedFormField,
    FormError,
    Form,
    isFormFieldArray,
    isFormGroupArray,
    isFormField,
    isFormGroup,
    FormValue,
    FormSchema,
    FormField
} from '@inkline/inkline/types';

/**
 * Apply validators to the form input schema and set the value for the valid and invalid fields
 *
 * @param schema { FormField<T> }
 * @param path { string }
 * @returns { FormField<T> }
 */
export function validateFormField<T = FormValue>(schema: FormField<T>, path = '') {
    const errors: FormError[] = [];
    const resolvedSchema = {
        ...schema
    } as ResolvedFormField<T>;

    const valid = (schema.validators || []).reduce(
        (acc: boolean, rawValidator: FormValidator | string) => {
            const validator =
                typeof rawValidator === 'string' ? { name: rawValidator } : rawValidator;

            const validationResult = validators[validator.name](
                schema.value as FormValue,
                validator
            );

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
 * @param schema { FormSchema<T> }
 * @param name { string }
 * @returns { FormSchema<T> }
 */
export function validateForm<T extends Form = Form>(
    schema: FormSchema<T> | ResolvedFormSchema<T>,
    name = ''
) {
    const resolvedSchema = {
        ...schema
    } as ResolvedFormSchema<T>;

    const valid = Object.keys(schema)
        .filter((key) => !reservedValidationFields.includes(key))
        .reduce((acc, key: keyof T) => {
            const field = resolvedSchema[key] as ResolvedFormSchema<T[keyof T]>;

            if (isFormFieldArray(field)) {
                resolvedSchema[key] = field.map((item, index) => {
                    return validateFormField<T[keyof T]>(
                        item,
                        name ? `${name}.${index}.${key as string}` : `${index}.${key as string}`
                    );
                }) as unknown as ResolvedFormSchema<T>[keyof T];
            } else if (isFormGroupArray(field)) {
                resolvedSchema[key] = field.map((item, index) => {
                    return validateForm<T[keyof T]>(
                        item,
                        name ? `${name}.${index}.${key as string}` : `${index}.${key as string}`
                    );
                }) as ResolvedFormSchema<T>[keyof T];
            } else if (isFormField(field)) {
                resolvedSchema[key] = validateFormField<T[keyof T]>(
                    field,
                    name ? `${name}.${key as string}` : (key as string)
                ) as ResolvedFormSchema<T>[keyof T];
            } else if (isFormGroup(field)) {
                resolvedSchema[key] = validateForm<T[keyof T]>(
                    field as FormSchema<T[keyof T]>,
                    name ? `${name}.${key as string}` : (key as string)
                ) as ResolvedFormSchema<T>[keyof T];
            }

            return acc && (field as ResolvedFormField<T[keyof T]>).valid;
        }, true);

    resolvedSchema.valid = valid;
    resolvedSchema.invalid = !valid;

    return resolvedSchema;
}

/**
 * Alias for validateFormGroup
 *
 * @param schema { FormSchema }
 * @returns { FormSchema }
 */
export async function validateSchema<T extends Form = Form>(
    schema: FormSchema<T> | ResolvedFormSchema<T>
) {
    return validateForm<T>(schema);
}
