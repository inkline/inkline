import { createFormFieldSchema } from '@inkline/inkline/validation';
import { Form, ResolvedFormSchema } from '@inkline/inkline/types';
import { defaultValidationStateValues } from '@inkline/inkline/constants';

export function createSchemaFromDefaults<T extends Form>(defaultValues: T): ResolvedFormSchema<T> {
    const resolved = {
        ...defaultValidationStateValues
    } as ResolvedFormSchema<T>;

    for (const key of Object.keys(defaultValues) as (keyof T)[]) {
        const field = defaultValues[key];

        if (Array.isArray(field)) {
            resolved[key] = field.map((item: T[keyof T][number]) => {
                if (typeof item === 'object') {
                    return createSchemaFromDefaults(item);
                }

                return createFormFieldSchema({ value: item });
            });
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
