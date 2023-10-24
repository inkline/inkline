import { Form, FormField, FormSchema } from '@inkline/inkline';

export function isFormField<T extends Form>(
    schema: FormSchema<T[keyof T]> | FormField<T[keyof T]>
): schema is FormField<T[keyof T]> {
    return (
        Object.keys(schema).length === 0 ||
        schema.hasOwnProperty('value') ||
        schema.hasOwnProperty('validators')
    );
}

export function isFormFieldArray<T extends Form>(
    schema: FormSchema<T[keyof T]> | FormField<T[keyof T][number]>[]
): schema is FormField<T[keyof T]>[] {
    return Array.isArray(schema) && schema.every(isFormField);
}

export function isFormGroup<T extends Form>(
    schema: FormSchema<T[keyof T]> | FormField<T[keyof T]>
): schema is FormSchema<T[keyof T]> {
    return !isFormField(schema);
}

export function isFormGroupArray<T extends Form>(
    schema: FormSchema<T[keyof T]> | FormSchema<T[keyof T][number]>[]
): schema is FormSchema<T[keyof T][number]>[] {
    return Array.isArray(schema) && schema.every(isFormGroup);
}
