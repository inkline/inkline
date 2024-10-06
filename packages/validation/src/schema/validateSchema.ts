import { translate } from '@inkline/i18n';
import { validators } from '../register';
import { reservedValidationFields } from '../constants';
import type {
    ResolvedFormSchema,
    ResolvedFormField,
    FormError,
    Form,
    FormValue,
    FormSchema,
    FormField,
    FormValidator
} from '../types';
import {
    isFormFieldArray,
    isFormGroupArray,
    isFormField,
    isFormGroup
} from '../guards';

/**
 * Apply validators to the form input schema and set the value for the valid and invalid fields
 *
 * @param schema { FormField<T> | ResolvedFormField<T> }
 * @param path { string }
 * @param rootSchema { FormSchema<R> | ResolvedFormSchema<R> }
 * @returns { ResolvedFormField<T> }
 */
export async function validateFormField<T = FormValue, R extends Form = Form>(
    schema: FormField<T> | ResolvedFormField<T>,
    path = '',
    rootSchema?: FormSchema<R> | ResolvedFormSchema<R>
) {
    const errors: FormError[] = [];
    const resolvedSchema = {
        ...schema
    } as ResolvedFormField<T>;

    let valid = true;
    for (const rawValidator of resolvedSchema.validators || []) {
        const validator: FormValidator & {
            schema?: FormSchema<R> | ResolvedFormSchema<R>;
            path: string;
        } = {
            ...(typeof rawValidator === 'string' ? { name: rawValidator } : rawValidator),
            schema: rootSchema,
            path
        };

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
 * Validate each form field schema array item
 *
 * @param schema { FormField<T>[] | ResolvedFormField<T>[] }
 * @param path { string }
 * @param rootSchema { FormSchema<R> | ResolvedFormSchema<R> }
 * @returns { ResolvedFormField<T>[] }
 */
export async function validateFormFieldArray<T = FormValue, R extends Form = Form>(
    schema: FormField<T>[] | ResolvedFormField<T>[],
    path = '',
    rootSchema?: FormSchema<R> | ResolvedFormSchema<R>
) {
    return Promise.all(
        schema.map((item, index) => {
            return validateFormField<T>(item, path ? `${path}.${index}` : `${index}`, rootSchema);
        })
    );
}

/**
 * Validate each form group schema array item
 *
 * @param schema { FormSchema<T>[] | ResolvedFormSchema<T>[] }
 * @param path { string }
 * @param rootSchema { FormSchema<R> | ResolvedFormSchema<R> }
 * @returns { Promise<ResolvedFormSchema<T>[]> }
 */
export async function validateFormArray<T extends Form = Form, R extends Form = Form>(
    schema: FormSchema<T>[] | ResolvedFormSchema<T>[],
    path = '',
    rootSchema?: FormSchema<R> | ResolvedFormSchema<R>
) {
    return Promise.all(
        schema.map((item, index) => {
            return validateForm<T>(item, path ? `${path}.${index}` : `${index}`, rootSchema);
        })
    );
}

/**
 * Recursively validate form fields and compute valid and invalid status using depth first traversal
 *
 * @param schema { FormSchema<T> | ResolvedFormSchema<T> }
 * @param name { string }
 * @param rootSchema { FormSchema<R> | ResolvedFormSchema<R> }
 * @returns { Promise<ResolvedFormSchema<T>> }
 */
export async function validateForm<T extends Form = Form, R extends Form = Form>(
    schema: FormSchema<T> | ResolvedFormSchema<T>,
    name = '',
    rootSchema?: FormSchema<R> | ResolvedFormSchema<R>
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
        let fieldIsValid = true;

        if (isFormFieldArray(field)) {
            resolvedSchema[key] = (await validateFormFieldArray(
                field,
                name ? `${name}.${key as string}` : `${key as string}`,
                rootSchema
            )) as ResolvedFormSchema<T>[keyof T];
        } else if (isFormGroupArray(field)) {
            resolvedSchema[key] = (await validateFormArray(
                field,
                name ? `${name}.${key as string}` : `${key as string}`,
                rootSchema
            )) as unknown as ResolvedFormSchema<T>[keyof T];
        } else if (isFormField(field)) {
            resolvedSchema[key] = (await validateFormField<T[keyof T]>(
                field,
                name ? `${name}.${key as string}` : (key as string),
                rootSchema
            )) as ResolvedFormSchema<T>[keyof T];
        } else if (isFormGroup(field)) {
            resolvedSchema[key] = (await validateForm<T[keyof T]>(
                field as FormSchema<T[keyof T]>,
                name ? `${name}.${key as string}` : (key as string),
                rootSchema
            )) as ResolvedFormSchema<T>[keyof T];
        }

        if (Array.isArray(resolvedSchema[key])) {
            fieldIsValid = (resolvedSchema[key] as ResolvedFormSchema<T[keyof T]>[]).every(
                (item) => item.valid
            );
        } else {
            fieldIsValid = (resolvedSchema[key] as ResolvedFormSchema<T[keyof T]>).valid;
        }

        valid = valid && fieldIsValid;
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
    return validateForm<T>(schema, '', schema);
}
