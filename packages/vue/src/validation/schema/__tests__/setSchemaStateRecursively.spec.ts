import { createSchema, setSchemaStateRecursively } from '@inkline/inkline/validation';
import type { FormState } from '@inkline/inkline/types';

describe('validation', () => {
    describe('setSchemaStateRecursively()', () => {
        it('should recursively update values in schema', () => {
            let resolvedSchema = createSchema<{
                group: {
                    nested1: string;
                    nested2: string;
                };
                array: string[];
                field1: string;
                field2: string;
            }>({
                group: {
                    nested1: {},
                    nested2: {}
                },
                array: [{}, {}],
                field1: {},
                field2: {}
            });

            const values: Partial<FormState> = {
                untouched: false,
                touched: true
            };

            resolvedSchema = setSchemaStateRecursively(resolvedSchema, values);

            expect(resolvedSchema).toMatchObject(values);
            expect(resolvedSchema.field1).toMatchObject(values);
            expect(resolvedSchema.field2).toMatchObject(values);
            expect(resolvedSchema.group).toMatchObject(values);
            expect(resolvedSchema.group.nested1).toMatchObject(values);
            expect(resolvedSchema.group.nested2).toMatchObject(values);
            expect(resolvedSchema.array[0]).toMatchObject(values);
            expect(resolvedSchema.array[1]).toMatchObject(values);
        });
    });
});
