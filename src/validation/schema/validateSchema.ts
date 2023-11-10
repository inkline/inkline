import { validators } from '@inkline/inkline/validation/register';
import { reservedValidationFields } from '@inkline/inkline/constants';
import { translate } from '@inkline/inkline/i18n';
import type {
    ResolvedFormSchema,
    ResolvedFormField,
    FormError,
    Form,
    FormValue,
    FormSchema,
    FormField
} from '@inkline/inkline/types';
import {
    isFormFieldArray,
    isFormGroupArray,
    isFormField,
    isFormGroup
} from '@inkline/inkline/types';

/**
 * Apply validators to the form input schema and set the value for the valid and invalid fields
 *
 * @param schema { FormField<T> }
 * @param path { string }
 * @returns { FormField<T> }
 */
export async function validateFormField<T = FormValue>(schema: FormField<T>, path = '') {
    const errors: FormError[] = [];
    const resolvedSchema = {
        ...schema
    } as ResolvedFormField<T>;

    let valid = true;
    for (const rawValidator of resolvedSchema.validators || []) {
        const validator = typeof rawValidator === 'string' ? { name: rawValidator } : rawValidator;

        const valueIsValid = await validators[validator.name](
            resolvedSchema.value as FormValue,
            validator
        );

        if (!valueIsValid) {
            const { name, message, ...params } = validator;
            const i18nParams = {
                name: path.split('.').pop(),
                value: schema.value,
                params
            };

            const errorMessage =
                (message instanceof Function ? message() : message) ||
                translate(`validation.${name}`, i18nParams);

            errors.push({ name, message: errorMessage, path });
        }

        valid = valid && valueIsValid;
    }

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
export async function validateForm<T extends Form = Form>(
    schema: FormSchema<T> | ResolvedFormSchema<T>,
    name = ''
) {
    const resolvedSchema = {
        ...schema
    } as ResolvedFormSchema<T>;

    let valid = true;
    const resolvedSchemaKeys = Object.keys(resolvedSchema).filter(
        (key) => !reservedValidationFields.includes(key)
    ) as Array<keyof T>;
    for (const key of resolvedSchemaKeys) {
        const field = resolvedSchema[key] as ResolvedFormSchema<T[keyof T]>;

        if (isFormFieldArray(field)) {
            resolvedSchema[key] = (await Promise.all(
                field.map((item, index) => {
                    return validateFormField<T[keyof T]>(
                        item,
                        name ? `${name}.${index}.${key as string}` : `${index}.${key as string}`
                    );
                })
            )) as unknown as ResolvedFormSchema<T>[keyof T];
        } else if (isFormGroupArray(field)) {
            resolvedSchema[key] = (await Promise.all(
                field.map((item, index) => {
                    return validateForm<T[keyof T]>(
                        item,
                        name ? `${name}.${index}.${key as string}` : `${index}.${key as string}`
                    );
                })
            )) as unknown as ResolvedFormSchema<T>[keyof T];
        } else if (isFormField(field)) {
            resolvedSchema[key] = (await validateFormField<T[keyof T]>(
                field,
                name ? `${name}.${key as string}` : (key as string)
            )) as ResolvedFormSchema<T>[keyof T];
        } else if (isFormGroup(field)) {
            resolvedSchema[key] = (await validateForm<T[keyof T]>(
                field as FormSchema<T[keyof T]>,
                name ? `${name}.${key as string}` : (key as string)
            )) as ResolvedFormSchema<T>[keyof T];
        }

        valid = valid && (resolvedSchema[key] as ResolvedFormField<T[keyof T]>).valid;
    }

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
