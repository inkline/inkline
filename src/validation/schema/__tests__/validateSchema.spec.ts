import {
    createFormArraySchema,
    createFormFieldSchema,
    createSchema,
    validateForm,
    validateFormArray,
    validateFormField,
    validateFormFieldArray
} from '@inkline/inkline/validation';
import type { FormValidator, ResolvedFormField, ResolvedFormSchema } from '@inkline/inkline';
import { defaultValidationFieldValues, defaultValidationStateValues } from '@inkline/inkline';

describe('validation', () => {
    describe('validateFormInput()', () => {
        it('should validate schema without validators', async () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: 'value',
                validators: []
            };

            const resolvedSchema = await validateFormField(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
            expect(resolvedSchema.errors).toEqual([]);
        });

        it('should validate schema with validator object if validator passes', async () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: 'value',
                validators: [{ name: 'required' }]
            };

            const resolvedSchema = await validateFormField(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
            expect(resolvedSchema.errors).toEqual([]);
        });

        it('should validate schema with validator name string if validator passes', async () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: 'value',
                validators: ['required']
            };

            const resolvedSchema = await validateFormField(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
            expect(resolvedSchema.errors).toEqual([]);
        });

        it('should invalidate schema if validator fails', async () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: '',
                validators: ['required']
            };

            const resolvedSchema = await validateFormField(schema);

            expect(resolvedSchema.valid).toEqual(false);
            expect(resolvedSchema.invalid).toEqual(true);
            expect(resolvedSchema.errors).toEqual([
                {
                    name: schema.validators[0],
                    message: expect.any(String),
                    path: ''
                }
            ]);
        });

        it('should invalidate schema with custom message if validator fails', async () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: '',
                validators: [{ name: 'required', message: 'Field is required' }]
            };
            const validator = schema.validators[0] as FormValidator;

            const resolvedSchema = await validateFormField(schema);

            expect(resolvedSchema.errors).toEqual([
                {
                    name: validator.name,
                    message: validator.message,
                    path: ''
                }
            ]);
        });

        it('should invalidate schema with custom message function if validator fails', async () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: '',
                validators: [{ name: 'required', message: () => 'Field is required' }]
            };
            const validator = schema.validators[0] as FormValidator;

            const resolvedSchema = await validateFormField(schema);

            expect(resolvedSchema.errors).toEqual([
                {
                    name: validator.name,
                    message: validator.message(),
                    path: ''
                }
            ]);
        });

        it('should invalidate schema and provide path if validator fails', async () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: '',
                validators: ['required']
            };
            const path = 'nested.field';

            const resolvedSchema = await validateFormField(schema, path);

            expect(resolvedSchema.errors).toEqual([
                {
                    name: schema.validators[0],
                    message: expect.any(String),
                    path
                }
            ]);
        });
    });

    describe('validateFormFieldArray()', () => {
        it('should call validateFormField for each form field', async () => {
            const schema = createFormArraySchema<string>([
                {
                    value: '',
                    validators: ['required']
                },
                {
                    value: 'value',
                    validators: ['required']
                }
            ]);

            const resolvedSchema = await validateFormFieldArray(schema);

            expect(resolvedSchema).toHaveLength(2);
            expect(resolvedSchema[0].valid).toEqual(false);
            expect(resolvedSchema[0].invalid).toEqual(true);
            expect(resolvedSchema[0].errors).toEqual([
                {
                    name: resolvedSchema[0].validators[0],
                    message: expect.any(String),
                    path: '0'
                }
            ]);
            expect(resolvedSchema[1].valid).toEqual(true);
            expect(resolvedSchema[1].invalid).toEqual(false);
        });
    });

    describe('validateFormArray()', () => {
        it('should call validateForm for each form field', async () => {
            const schema = createFormArraySchema<{ field: string }>([
                {
                    field: {
                        value: '',
                        validators: ['required']
                    }
                },
                {
                    field: {
                        value: 'value',
                        validators: ['required']
                    }
                }
            ]) as ResolvedFormSchema<{ field: string }>[];

            const resolvedSchema = await validateFormArray(schema);

            expect(resolvedSchema).toHaveLength(2);
            expect(resolvedSchema[0].valid).toEqual(false);
            expect(resolvedSchema[0].invalid).toEqual(true);
            expect(resolvedSchema[0].field.errors).toEqual([
                {
                    name: resolvedSchema[0].field.validators[0],
                    message: expect.any(String),
                    path: '0.field'
                }
            ]);
            expect(resolvedSchema[1].valid).toEqual(true);
            expect(resolvedSchema[1].invalid).toEqual(false);
        });
    });

    describe('validateForm()', () => {
        it('should validate schema if all fields are valid', async () => {
            const schema = createSchema<{
                field: string;
            }>({
                field: {
                    value: 'value',
                    validators: ['required']
                }
            });

            const resolvedSchema = await validateForm(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
        });

        it('should invalidate schema if not all fields are valid', async () => {
            const schema = createSchema<{
                field1: string;
                field2: string;
            }>({
                field1: {
                    value: 'value',
                    validators: ['required']
                },
                field2: {
                    value: '',
                    validators: ['required']
                }
            });
            const resolvedSchema = await validateForm(schema);

            expect(resolvedSchema.valid).toEqual(false);
            expect(resolvedSchema.invalid).toEqual(true);
        });

        it('should validate nested form groups recursively', async () => {
            const schema = createSchema<{
                group: {
                    nested: {
                        field: string;
                    };
                };
            }>({
                group: {
                    nested: {
                        field: {
                            value: 'value',
                            validators: ['required']
                        }
                    }
                }
            });
            const resolvedSchema = await validateForm(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
            expect(resolvedSchema.group.valid).toEqual(true);
            expect(resolvedSchema.group.invalid).toEqual(false);
            expect(resolvedSchema.group.nested.valid).toEqual(true);
            expect(resolvedSchema.group.nested.invalid).toEqual(false);
        });

        it('should invalidate nested form groups recursively', async () => {
            const schema = createSchema<{
                group: {
                    nested: {
                        field: string;
                    };
                };
            }>({
                group: {
                    nested: {
                        field: {
                            value: '',
                            validators: ['required']
                        }
                    }
                }
            });
            const resolvedSchema = await validateForm(schema);

            expect(resolvedSchema.valid).toEqual(false);
            expect(resolvedSchema.invalid).toEqual(true);
            expect(resolvedSchema.group.valid).toEqual(false);
            expect(resolvedSchema.group.invalid).toEqual(true);
            expect(resolvedSchema.group.nested.valid).toEqual(false);
            expect(resolvedSchema.group.nested.invalid).toEqual(true);
        });

        it('should create nested path for nested fields', async () => {
            const schema = createSchema<{
                group: {
                    nested: {
                        field: string;
                    };
                };
            }>({
                group: {
                    nested: {
                        field: {
                            value: '',
                            validators: ['required']
                        }
                    }
                }
            });
            const resolvedSchema = await validateForm(schema);

            expect(resolvedSchema.group.nested.field.valid).toEqual(false);
            expect(resolvedSchema.group.nested.field.errors[0].path).toEqual('group.nested.field');
        });

        it('should validate nested form groups recursively', async () => {
            const schema = createSchema<{
                group: {
                    nested: {
                        field: string;
                    };
                };
            }>({
                group: {
                    nested: {
                        field: {
                            value: 'value',
                            validators: ['required']
                        }
                    }
                }
            });
            const resolvedSchema = await validateForm(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
            expect(resolvedSchema.group.valid).toEqual(true);
            expect(resolvedSchema.group.invalid).toEqual(false);
            expect(resolvedSchema.group.nested.valid).toEqual(true);
            expect(resolvedSchema.group.nested.invalid).toEqual(false);
        });

        it('should validate form field arrays items', async () => {
            const schema = createSchema<{
                array: string[];
            }>({
                array: [
                    {
                        value: 'value',
                        validators: ['required']
                    },
                    {
                        value: '',
                        validators: ['required']
                    }
                ]
            });
            const resolvedSchema = await validateForm(schema);

            expect(resolvedSchema.valid).toEqual(false);
            expect(resolvedSchema.invalid).toEqual(true);
            expect(resolvedSchema.array[0].valid).toEqual(true);
            expect(resolvedSchema.array[1].valid).toEqual(false);
        });

        it('should validate form group arrays items', async () => {
            const schema = createSchema<{
                array: Array<{
                    field: string;
                }>;
            }>({
                array: [
                    {
                        field: {
                            value: 'value',
                            validators: ['required']
                        }
                    },
                    {
                        field: {
                            value: '',
                            validators: ['required']
                        }
                    }
                ]
            });
            const resolvedSchema = await validateForm(schema);

            expect(resolvedSchema.valid).toEqual(false);
            expect(resolvedSchema.invalid).toEqual(true);
            expect(resolvedSchema.array[0].valid).toEqual(true);
            expect(resolvedSchema.array[0].field.valid).toEqual(true);
            expect(resolvedSchema.array[1].valid).toEqual(false);
            expect(resolvedSchema.array[1].field.valid).toEqual(false);
        });
    });
});
