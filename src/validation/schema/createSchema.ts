import type {
    Form,
    FormField,
    FormSchema,
    ResolvedFormField,
    ResolvedFormSchema
} from '@inkline/inkline/types';
import {
    defaultValidationFieldValues,
    defaultValidationStateValues
} from '@inkline/inkline/constants';
import { isFormField, isFormGroup } from '@inkline/inkline/types';

export function createFormFieldSchema<T>(field: FormField<T>): ResolvedFormField<T> {
    return {
        ...defaultValidationStateValues,
        ...defaultValidationFieldValues,
        ...field
    } as ResolvedFormField<T>;
}

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

export function createSchema<T extends Form>(schema: FormSchema<T>): ResolvedFormSchema<T> {
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
