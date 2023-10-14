import { FormSchema, FormField, FormGroup } from '@inkline/inkline';

export function isFormField(schema: FormSchema[string]): schema is FormField {
    return (
        Object.keys(schema).length === 0 ||
        schema.hasOwnProperty('value') ||
        schema.hasOwnProperty('validators')
    );
}

export function isFormFieldArray(schema: FormSchema[string]): schema is FormField[] {
    return Array.isArray(schema) && (schema as FormField[]).every(isFormField);
}

export function isFormGroup(schema: FormSchema[string]): schema is FormGroup {
    return !isFormField(schema);
}

export function isFormGroupArray(schema: FormSchema[string]): schema is FormGroup[] {
    return Array.isArray(schema) && (schema as FormGroup[]).every(isFormGroup);
}
