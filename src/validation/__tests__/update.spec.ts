import { update } from '@inkline/inkline/validation';

describe('validation', () => {
    describe('update()', () => {
        it('should recursively update values in schema', () => {
            const schema: any = {
                group: {
                    nested1: {
                        untouched: true,
                        touched: false
                    },
                    nested2: {
                        untouched: true,
                        touched: false
                    },
                    untouched: true,
                    touched: false
                },
                array: [
                    {
                        untouched: true,
                        touched: false
                    },
                    {
                        untouched: true,
                        touched: false
                    }
                ],
                field1: {
                    untouched: true,
                    touched: false
                },
                field2: {
                    untouched: true,
                    touched: false
                },
                untouched: true,
                touched: false
            };

            const values = {
                untouched: false,
                touched: true
            };

            update(schema, values);

            Object.entries(values).forEach(([key, value]) => {
                expect(schema[key]).toEqual(value);
                expect(schema.field1[key]).toEqual(value);
                expect(schema.field2[key]).toEqual(value);
                expect(schema.group[key]).toEqual(value);
                expect(schema.group.nested1[key]).toEqual(value);
                expect(schema.group.nested2[key]).toEqual(value);
                expect(schema.array[0][key]).toEqual(value);
                expect(schema.array[1][key]).toEqual(value);
            });
        });
    });
});
