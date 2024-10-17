import { reservedValidationFields } from '../constants';
import type { Form, FormState, FormValue, ResolvedFormSchema } from '@inkline/types';

/**
 * Update schema recursively with given values
 *
 * @param schema { ResolvedFormSchema }
 * @param values { Record<ReservedFormKeys, boolean> }
 * @returns { ResolvedFormSchema }
 */
export function setSchemaStateRecursively<T extends Form>(
    schema: ResolvedFormSchema<T>,
    values: Record<string, any>
) {
    const resolvedSchema = {
        ...schema
    };

    Object.keys(values).forEach((key: keyof T) => {
        const value = values[key as keyof FormState] as FormValue;
        if (!Array.isArray(schema)) {
            resolvedSchema[key] = value as ResolvedFormSchema<T>[keyof T];
        }
    });

    Object.keys(schema)
        .filter((key) => !reservedValidationFields.includes(key))
        .forEach((key: keyof T) => {
            const field = schema[key];
            if (typeof schema[key] === 'object' || Array.isArray(schema[key])) {
                resolvedSchema[key] = setSchemaStateRecursively(
                    field as ResolvedFormSchema<T[keyof T]>,
                    values
                ) as ResolvedFormSchema<T>[keyof T];
            }
        });

    return resolvedSchema;
}
