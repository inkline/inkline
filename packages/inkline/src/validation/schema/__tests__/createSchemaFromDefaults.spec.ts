import { createSchemaFromDefaults } from '@inkline/inkline/validation/schema';
import {
    defaultValidationFieldValues,
    defaultValidationStateValues
} from '@inkline/inkline/constants';

describe('validation', () => {
    describe('createSchemaFromDefaults()', () => {
        test('should create schema from default values', () => {
            const defaultValues = {
                field: 'string',
                group: {
                    field: 123
                },
                array: ['value1', 'value2']
            };

            const resolvedSchema = createSchemaFromDefaults<{
                field: string;
                group: {
                    field: number;
                };
                array: string[];
            }>(defaultValues);

            expect(resolvedSchema).toEqual({
                ...defaultValidationStateValues,
                field: {
                    ...defaultValidationStateValues,
                    ...defaultValidationFieldValues,
                    value: 'string'
                },
                group: {
                    ...defaultValidationStateValues,
                    field: {
                        ...defaultValidationStateValues,
                        ...defaultValidationFieldValues,
                        value: 123
                    }
                },
                array: [
                    {
                        ...defaultValidationStateValues,
                        ...defaultValidationFieldValues,
                        value: 'value1'
                    },
                    {
                        ...defaultValidationStateValues,
                        ...defaultValidationFieldValues,
                        value: 'value2'
                    }
                ]
            });
        });
    });
});
