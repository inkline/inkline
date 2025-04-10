import { createFormFieldSchema } from './createSchema';
import type { FormValues, ResolvedFormSchema } from '@inkline/types';
import { defaultValidationStateValues } from '../constants';

export function createSchemaFromDefaults<T extends FormValues>(
    defaultValues: T
): ResolvedFormSchema<T> {
    const resolved = {
        ...defaultValidationStateValues
    } as ResolvedFormSchema<T>;

    for (const key of Object.keys(defaultValues) as (keyof T)[]) {
        const field = defaultValues[key];

        if (Array.isArray(field)) {
            resolved[key] = (field as T[keyof T][]).map((item) => {
                if (typeof item === 'object') {
                    return createSchemaFromDefaults(item);
                }

                return createFormFieldSchema({ value: item });
            }) as ResolvedFormSchema<T>[keyof T];
        } else if (typeof field === 'object') {
            resolved[key] = createSchemaFromDefaults(field) as ResolvedFormSchema<T>[keyof T];
        } else {
            resolved[key] = createFormFieldSchema({
                value: field
            }) as ResolvedFormSchema<T>[keyof T];
        }
    }

    return resolved;
}
