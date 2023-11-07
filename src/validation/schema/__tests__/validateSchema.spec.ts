import { createSchema, validateForm, validateFormField } from '@inkline/inkline/validation';
import type {
    FormValidator,
    ResolvedFormField
} from '@inkline/inkline';
import {
    defaultValidationFieldValues,
    defaultValidationStateValues
} from '@inkline/inkline';

describe('validation', () => {
    describe('validateFormInput()', () => {
        it('should validate schema without validators', () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: 'value',
                validators: []
            };

            const resolvedSchema = validateFormField(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
            expect(resolvedSchema.errors).toEqual([]);
        });

        it('should validate schema with validator object if validator passes', () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: 'value',
                validators: [{ name: 'required' }]
            };

            const resolvedSchema = validateFormField(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
            expect(resolvedSchema.errors).toEqual([]);
        });

        it('should validate schema with validator name string if validator passes', () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: 'value',
                validators: ['required']
            };

            const resolvedSchema = validateFormField(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
            expect(resolvedSchema.errors).toEqual([]);
        });

        it('should invalidate schema if validator fails', () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: '',
                validators: ['required']
            };

            const resolvedSchema = validateFormField(schema);

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

        it('should invalidate schema with custom message if validator fails', () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: '',
                validators: [{ name: 'required', message: 'Field is required' }]
            };
            const validator = schema.validators[0] as FormValidator;

            const resolvedSchema = validateFormField(schema);

            expect(resolvedSchema.errors).toEqual([
                {
                    name: validator.name,
                    message: validator.message,
                    path: ''
                }
            ]);
        });

        it('should invalidate schema with custom message function if validator fails', () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: '',
                validators: [{ name: 'required', message: () => 'Field is required' }]
            };
            const validator = schema.validators[0] as FormValidator;

            const resolvedSchema = validateFormField(schema);

            expect(resolvedSchema.errors).toEqual([
                {
                    name: validator.name,
                    message: validator.message(),
                    path: ''
                }
            ]);
        });

        it('should invalidate schema and provide path if validator fails', () => {
            const schema: ResolvedFormField<string> = {
                ...defaultValidationFieldValues,
                ...defaultValidationStateValues,
                value: '',
                validators: ['required']
            };
            const path = 'nested.field';

            const resolvedSchema = validateFormField(schema, path);

            expect(resolvedSchema.errors).toEqual([
                {
                    name: schema.validators[0],
                    message: expect.any(String),
                    path
                }
            ]);
        });
    });

    describe('validateForm()', () => {
        it('should validate schema if all fields are valid', () => {
            const schema = createSchema<{
                field: string;
            }>({
                field: {
                    value: 'value',
                    validators: ['required']
                }
            });

            const resolvedSchema = validateForm(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
        });

        it('should invalidate schema if not all fields are valid', () => {
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
            const resolvedSchema = validateForm(schema);

            expect(resolvedSchema.valid).toEqual(false);
            expect(resolvedSchema.invalid).toEqual(true);
        });

        it('should validate nested form groups recursively', () => {
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
            const resolvedSchema = validateForm(schema);

            expect(resolvedSchema.valid).toEqual(true);
            expect(resolvedSchema.invalid).toEqual(false);
            expect(resolvedSchema.group.valid).toEqual(true);
            expect(resolvedSchema.group.invalid).toEqual(false);
            expect(resolvedSchema.group.nested.valid).toEqual(true);
            expect(resolvedSchema.group.nested.invalid).toEqual(false);
        });

        it('should invalidate nested form groups recursively', () => {
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
            const resolvedSchema = validateForm(schema);

            expect(resolvedSchema.valid).toEqual(false);
            expect(resolvedSchema.invalid).toEqual(true);
            expect(resolvedSchema.group.valid).toEqual(false);
            expect(resolvedSchema.group.invalid).toEqual(true);
            expect(resolvedSchema.group.nested.valid).toEqual(false);
            expect(resolvedSchema.group.nested.invalid).toEqual(true);
        });

        it('should create nested path for nested fields', () => {
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
            const resolvedSchema = validateForm(schema);

            expect(resolvedSchema.group.nested.field.valid).toEqual(false);
            expect(resolvedSchema.group.nested.field.errors[0].path).toEqual('group.nested.field');
        });
    });
});
