import {
    createFormArraySchema,
    createSchema,
    validateForm,
    validateFormArray,
    validateFormField,
    validateFormFieldArray,
} from '../index';
import { required } from '../../validators';
import { FormValidator, FormValidatorMessageFn, ResolvedFormField, ResolvedFormSchema } from "../../types";
import { defaultValidationFieldValues, defaultValidationStateValues } from '../../constants';

vi.mock('../../validators', async () => {
    const actual = await vi.importActual('../../validators');

    return {
        ...actual,
        required: vi.fn().mockImplementation(actual.required as ReturnType<typeof vi.fn>)
    };
});

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
                validators: ['required']
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
                    message: 'Please enter a value for this field.',
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
                    message: (validator.message as FormValidatorMessageFn)(),
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
                    message: 'Please enter a value for this field.',
                    path
                }
            ]);
        });

        describe('rootSchema', () => {
            it('should should provide rootSchema to validator', async () => {
                const schema: ResolvedFormField<string> = {
                    ...defaultValidationFieldValues,
                    ...defaultValidationStateValues,
                    value: '',
                    validators: ['required']
                };
                const rootSchema: ResolvedFormSchema<{ field: string }> = {
                    ...defaultValidationFieldValues,
                    ...defaultValidationStateValues,
                    field: schema
                };
                const path = 'field';

                await validateFormField(schema, path, rootSchema);

                expect(required).toHaveBeenCalledWith(schema.value, {
                    name: schema.validators[0],
                    path,
                    schema: rootSchema
                });
            });
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
                    message: 'Please enter a value for this field.',
                    path: '0'
                }
            ]);
            expect(resolvedSchema[1].valid).toEqual(true);
            expect(resolvedSchema[1].invalid).toEqual(false);
        });

        describe('rootSchema', () => {
            it('should should pass rootSchema to validateFormFieldSchema', async () => {
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
                const rootSchema: ResolvedFormSchema<{ array: string[] }> = {
                    ...defaultValidationFieldValues,
                    ...defaultValidationStateValues,
                    array: schema
                };
                const path = 'array';

                await validateFormFieldArray(schema, path, rootSchema);

                expect(required).toHaveBeenCalledWith(schema[0].value, {
                    name: schema[0].validators[0],
                    path: `${path}.0`,
                    schema: rootSchema
                });
                expect(required).toHaveBeenCalledWith(schema[1].value, {
                    name: schema[1].validators[0],
                    path: `${path}.1`,
                    schema: rootSchema
                });
            });
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
                    message: 'Please enter a value for this field.',
                    path: '0.field'
                }
            ]);
            expect(resolvedSchema[1].valid).toEqual(true);
            expect(resolvedSchema[1].invalid).toEqual(false);
        });

        describe('rootSchema', () => {
            it('should should pass rootSchema to validateFormSchema', async () => {
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

                const rootSchema: ResolvedFormSchema<{ array: Array<{ field: string }> }> = {
                    ...defaultValidationFieldValues,
                    ...defaultValidationStateValues,
                    array: schema
                };
                const path = 'field';

                await validateFormArray(schema, path, rootSchema);

                expect(required).toHaveBeenCalledWith(schema[0].field.value, {
                    name: schema[0].field.validators[0],
                    path: `${path}.0.field`,
                    schema: rootSchema
                });
                expect(required).toHaveBeenCalledWith(schema[1].field.value, {
                    name: schema[1].field.validators[0],
                    path: `${path}.1.field`,
                    schema: rootSchema
                });
            });
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

        describe('rootSchema', () => {
            it('should pass root schema to validateFormField', async () => {
                const schema = createSchema<{
                    field: string;
                }>({
                    field: {
                        value: 'value',
                        validators: ['required']
                    }
                });
                const rootSchema: ResolvedFormSchema<{
                    group: {
                        field: string;
                    };
                }> = {
                    ...defaultValidationStateValues,
                    group: schema
                };

                const path = 'group';

                await validateForm(schema, path, rootSchema);

                expect(required).toHaveBeenCalledWith(schema.field.value, {
                    name: schema.field.validators[0],
                    path: `${path}.field`,
                    schema: rootSchema
                });
            });

            it('should pass root schema to validateForm', async () => {
                const schema = createSchema<{
                    nested: {
                        field: string;
                    };
                }>({
                    nested: {
                        field: {
                            value: 'value',
                            validators: ['required']
                        }
                    }
                });
                const rootSchema: ResolvedFormSchema<{
                    group: {
                        nested: {
                            field: string;
                        };
                    };
                }> = {
                    ...defaultValidationStateValues,
                    group: schema
                };

                const path = 'group';

                await validateForm(schema, path, rootSchema);

                expect(required).toHaveBeenCalledWith(schema.nested.field.value, {
                    name: schema.nested.field.validators[0],
                    path: `${path}.nested.field`,
                    schema: rootSchema
                });
            });

            it('should pass root schema to validateFormFieldArray', async () => {
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
                const rootSchema: ResolvedFormSchema<{
                    group: {
                        array: string[];
                    };
                }> = {
                    ...defaultValidationStateValues,
                    group: schema
                };

                const path = 'group';

                await validateForm(schema, path, rootSchema);

                expect(required).toHaveBeenCalledWith(schema.array[0].value, {
                    name: schema.array[0].validators[0],
                    path: `${path}.array.0`,
                    schema: rootSchema
                });
                expect(required).toHaveBeenCalledWith(schema.array[1].value, {
                    name: schema.array[1].validators[0],
                    path: `${path}.array.1`,
                    schema: rootSchema
                });
            });

            it('should pass root schema to validateFormArray', async () => {
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
                const rootSchema: ResolvedFormSchema<{
                    group: {
                        array: Array<{
                            field: string;
                        }>;
                    };
                }> = {
                    ...defaultValidationStateValues,
                    group: schema
                };

                const path = 'group';

                await validateForm(schema, path, rootSchema);

                expect(required).toHaveBeenCalledWith(schema.array[0].field.value, {
                    name: schema.array[0].field.validators[0],
                    path: `${path}.array.0.field`,
                    schema: rootSchema
                });
                expect(required).toHaveBeenCalledWith(schema.array[1].field.value, {
                    name: schema.array[1].field.validators[0],
                    path: `${path}.array.1.field`,
                    schema: rootSchema
                });
            });
        });
    });
});
