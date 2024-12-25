import { createSchema, serializeSchema } from '../index';

describe('validation', () => {
    describe('serializeSchema', () => {
        it('should serialize form fields', () => {
            type FormType = { field1: string; field2: string };

            const schema = createSchema<FormType>({
                field1: { value: 'value1' },
                field2: { value: 'value2' }
            });

            const serialized = serializeSchema<FormType>(schema);

            expect(serialized).toEqual({ field1: 'value1', field2: 'value2' });
        });

        it('should serialize form groups', () => {
            type FormType = { group1: { field1: string }; group2: { field2: string } };

            const schema = createSchema<FormType>({
                group1: {
                    field1: { value: 'value1' }
                },
                group2: {
                    field2: { value: 'value2' }
                }
            });

            const serialized = serializeSchema<FormType>(schema);

            expect(serialized).toEqual({
                group1: { field1: 'value1' },
                group2: { field2: 'value2' }
            });
        });

        it('should serialize field array', () => {
            type FormType = { array: string[] };

            const schema = createSchema<FormType>({
                array: [{ value: 'value1' }, { value: 'value2' }]
            });

            const serialized = serializeSchema<FormType>(schema);

            expect(serialized).toEqual({ array: ['value1', 'value2'] });
        });

        it('should serialize group array', () => {
            type FormType = { array: { field1: string }[] };

            const schema = createSchema<FormType>({
                array: [
                    {
                        field1: { value: 'value1' }
                    },
                    {
                        field1: { value: 'value2' }
                    }
                ]
            });

            const serialized = serializeSchema<FormType>(schema);

            expect(serialized).toEqual({
                array: [{ field1: 'value1' }, { field1: 'value2' }]
            });
        });
    });
});
