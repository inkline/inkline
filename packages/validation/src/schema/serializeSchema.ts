import type { Form, FormField, FormSchema, FormValue, ResolvedFormSchema } from "../types";
import { isFormField, isFormGroup } from '../guards';
import { reservedValidationFields } from '../constants';

export function serializeSchema<T extends Form>(schema: FormSchema<T> | ResolvedFormSchema<T>): T {
    const serializedSchema = {} as T;

    Object.keys(schema).forEach((key: keyof T) => {
        if (
            !Object.prototype.hasOwnProperty.call(schema, key) ||
            reservedValidationFields.includes(key as string)
        ) {
            return;
        }
        const schemaField = schema[key];

        if (Array.isArray(schemaField)) {
            serializedSchema[key] = schemaField.map(
                (
                    item: FormSchema<T[keyof T][number]> | FormField<T[keyof T][number]>
                ): T[keyof T][number] => {
                    if (isFormGroup(item)) {
                        return serializeSchema(item) as FormValue;
                    }

                    return item.value as FormValue;
                }
            ) as T[keyof T];
        } else if (isFormGroup(schemaField as FormSchema<T[keyof T]> | FormField<T[keyof T]>)) {
            serializedSchema[key] = serializeSchema(
                schemaField as FormSchema<T[keyof T]>
            );
        } else if (isFormField(schemaField as FormSchema<T[keyof T]> | FormField<T[keyof T]>)) {
            serializedSchema[key] = schemaField.value as T[keyof T];
        }
    });

    return serializedSchema;
}
