import type {
    Form,
    FormField,
    FormSchema,
    ResolvedFormField,
    ResolvedFormSchema
} from '../types';
import {
    defaultValidationFieldValues,
    defaultValidationStateValues
} from '../constants';
import { isFormField, isFormGroup } from '../guards';

/**
 * Create form field schema
 *
 * @param field { FormField<T> }
 * @return { ResolvedFormField<T> }
 */
export function createFormFieldSchema<T>(field: FormField<T>): ResolvedFormField<T> {
    return {
        ...defaultValidationStateValues,
        ...defaultValidationFieldValues,
        ...field
    } as ResolvedFormField<T>;
}

/**
 * Create form array schema
 *
 * @param items { (FormSchema<T> | FormField<T>)[] }
 * @return { (ResolvedFormSchema<T> | ResolvedFormField<T>)[] }
 */
export function createFormArraySchema<T>(
    items: (FormSchema<T extends Form ? T : never> | FormField<T>)[]
): (ResolvedFormSchema<T extends Form ? T : never> | ResolvedFormField<T>)[] {
    return items.map((item) => {
        if (isFormGroup(item)) {
            return createSchema(item);
        }

        return createFormFieldSchema(item);
    });
}

/**
 * Recursively create form schema
 *
 * @param schema { FormSchema<T> }
 * @return { ResolvedFormSchema<T> }
 */
export function createFormSchema<T extends Form>(schema: FormSchema<T>): ResolvedFormSchema<T> {
    const resolved = {
        ...defaultValidationStateValues
    } as ResolvedFormSchema<T>;

    for (const key of Object.keys(schema) as (keyof T)[]) {
        const field = schema[key];

        if (Array.isArray(field)) {
            resolved[key] = createFormArraySchema<T[keyof T][number]>(
                field
            ) as ResolvedFormSchema<T>[keyof T];
        } else if (isFormGroup(field)) {
            resolved[key] = createSchema(
                field as FormSchema<T[keyof T]>
            ) as ResolvedFormSchema<T>[keyof T];
        } else if (isFormField(field)) {
            resolved[key] = createFormFieldSchema(field) as ResolvedFormSchema<T>[keyof T];
        }
    }

    return resolved;
}

/**
 * Alias for createFormSchema
 *
 * @param schema { FormSchema<T> }
 * @return { ResolvedFormSchema<T> }
 */
export function createSchema<T extends Form>(schema: FormSchema<T>): ResolvedFormSchema<T> {
    return createFormSchema(schema);
}
