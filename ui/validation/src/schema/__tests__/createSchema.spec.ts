import {
    createSchema,
    createFormArraySchema,
    createFormFieldSchema
} from '../index';
import {
    defaultValidationFieldValues,
    defaultValidationStateValues
} from '../../constants';

type FormType = { field: string };

// const formValues = {
//     field: 'value',
//     group: {
//         field: 'value'
//     },
//     array: [1, 2, 3],
//     groupArray: [{ test: 1 }]
// };
//
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const schemaValues = {
//     field: {
//         value: 'value'
//     },
//     group: {
//         field: {
//             value: 'value'
//         }
//     },
//     array: [{ value: 1 }, { value: 2 }, { value: 3 }],
//     groupArray: [
//         {
//             test: {
//                 value: 1
//             }
//         }
//     ]
// } satisfies FormSchema<typeof formValues>;
//
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const resolvedSchemaValues = {
//     field: {
//         value: 'value',
//         validators: [],
//         valid: true,
//         invalid: false,
//         untouched: true,
//         touched: false,
//         pristine: true,
//         dirty: false,
//         errors: []
//     },
//     group: {
//         field: {
//             value: 'value',
//             validators: [],
//             valid: true,
//             invalid: false,
//             untouched: true,
//             touched: false,
//             pristine: true,
//             dirty: false,
//             errors: []
//         },
//         valid: true,
//         invalid: false,
//         untouched: true,
//         touched: false,
//         pristine: true,
//         dirty: false,
//         errors: []
//     },
//     array: [
//         {
//             value: 1,
//             validators: [],
//             valid: true,
//             invalid: false,
//             untouched: true,
//             touched: false,
//             pristine: true,
//             dirty: false,
//             errors: []
//         },
//         {
//             value: 2,
//             validators: [],
//             valid: true,
//             invalid: false,
//             untouched: true,
//             touched: false,
//             pristine: true,
//             dirty: false,
//             errors: []
//         },
//         {
//             value: 3,
//             validators: [],
//             valid: true,
//             invalid: false,
//             untouched: true,
//             touched: false,
//             pristine: true,
//             dirty: false,
//             errors: []
//         }
//     ],
//     groupArray: [
//         {
//             test: {
//                 value: 1,
//                 validators: [],
//                 valid: true,
//                 invalid: false,
//                 untouched: true,
//                 touched: false,
//                 pristine: true,
//                 dirty: false,
//                 errors: []
//             },
//             valid: true,
//             invalid: false,
//             untouched: true,
//             touched: false,
//             pristine: true,
//             dirty: false,
//             errors: []
//         }
//     ],
//     valid: true,
//     invalid: false,
//     untouched: true,
//     touched: false,
//     pristine: true,
//     dirty: false,
//     errors: []
// } satisfies ResolvedFormSchema<typeof formValues>;

describe('validation', () => {
    describe('resolveFormField()', () => {
        it.each([
            ['undefined', undefined],
            ['null', null],
            ['number', 123],
            ['boolean', true],
            ['string', 'value'],
            ['object', { key: 'value' }],
            ['array', ['value']]
        ])('should return resolved form field with %s value', (_type, value) => {
            const field = { value };
            const resolvedField = createFormFieldSchema(field);

            expect(resolvedField).toEqual({
                ...defaultValidationStateValues,
                ...defaultValidationFieldValues,
                value: field.value
            });
        });
    });

    describe('resolveFormArray()', () => {
        it('should return resolved form fields array', () => {
            const array = [{ value: 'value1' }, { value: 'value2' }];
            const resolvedArray = createFormArraySchema<string>(array);

            expect(resolvedArray[0]).toEqual({
                ...defaultValidationStateValues,
                ...defaultValidationFieldValues,
                value: array[0].value
            });
            expect(resolvedArray[1]).toEqual({
                ...defaultValidationStateValues,
                ...defaultValidationFieldValues,
                value: array[1].value
            });
        });

        it('should return resolved form group array', () => {
            const array = [{ key: { value: 'value1' } }, { key: { value: 'value2' } }];
            const resolvedArray = createFormArraySchema<{ key: string }>(array);

            expect(resolvedArray[0]).toEqual({
                ...defaultValidationStateValues,
                key: {
                    ...defaultValidationStateValues,
                    ...defaultValidationFieldValues,
                    value: array[0].key.value
                }
            });
            expect(resolvedArray[1]).toEqual({
                ...defaultValidationStateValues,
                key: {
                    ...defaultValidationStateValues,
                    ...defaultValidationFieldValues,
                    value: array[1].key.value
                }
            });
        });
    });

    describe('createSchema()', () => {
        it('should add default validation values to root', () => {
            const resolvedSchema = createSchema<FormType>({
                field: {}
            });

            expect(resolvedSchema).toEqual(expect.objectContaining(defaultValidationStateValues));
        });

        it('should determine that schema key is field using keys', () => {
            const resolvedSchema = createSchema<FormType>({
                field: {}
            });

            expect(resolvedSchema.field).toEqual({
                ...defaultValidationStateValues,
                ...defaultValidationFieldValues,
                value: undefined,
                validators: []
            });
        });

        it('should determine that schema key is field using validators', () => {
            const schema = {
                field: {
                    validators: []
                }
            };
            const resolvedSchema = createSchema<FormType>(schema);

            expect(resolvedSchema.field).toEqual({
                ...defaultValidationStateValues,
                ...defaultValidationFieldValues,
                value: undefined,
                validators: schema.field.validators
            });
        });

        it('should determine that schema key is field using value', () => {
            const schema = {
                field: {
                    value: undefined
                }
            };
            const resolvedSchema = createSchema<FormType>(schema);

            expect(resolvedSchema.field).toEqual({
                ...defaultValidationStateValues,
                ...defaultValidationFieldValues,
                value: schema.field.value,
                validators: []
            });
        });

        it('should keep field value', () => {
            const schema = {
                field: {
                    value: 'example'
                }
            };
            const resolvedSchema = createSchema<FormType>(schema);

            expect(resolvedSchema.field).toEqual({
                ...defaultValidationStateValues,
                ...defaultValidationFieldValues,
                value: schema.field.value,
                validators: []
            });
        });

        it('should keep field validators', () => {
            const schema = {
                field: {
                    validators: ['required']
                }
            };
            const resolvedSchema = createSchema<FormType>(schema);

            expect(resolvedSchema.field).toEqual({
                ...defaultValidationStateValues,
                ...defaultValidationFieldValues,
                value: undefined,
                validators: schema.field.validators
            });
        });

        it('should determine that schema key is group', () => {
            const schema = {
                group: {
                    field: {
                        value: undefined
                    }
                }
            };
            const resolvedSchema = createSchema<{
                group: {
                    field: string;
                };
            }>(schema);

            expect(resolvedSchema).toEqual({
                ...defaultValidationStateValues,
                group: {
                    ...defaultValidationStateValues,
                    field: {
                        ...defaultValidationStateValues,
                        ...defaultValidationFieldValues,
                        value: schema.group.field.value,
                        validators: []
                    }
                }
            });
        });
    });
});
