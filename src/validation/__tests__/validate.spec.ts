import { validateFormGroup, validateFormInput } from '@inkline/inkline/validation';

describe('validation', () => {
    describe('validateFormInput()', () => {
        it('should validate schema without validators', () => {
            const schema: any = {
                value: 'value'
            };

            validateFormInput(schema);

            expect(schema.valid).toEqual(true);
            expect(schema.invalid).toEqual(false);
            expect(schema.errors).toEqual([]);
        });

        it('should validate schema with validator object if validator passes', () => {
            const schema: any = {
                value: 'value',
                validators: [
                    { name: 'required' }
                ]
            };

            validateFormInput(schema);

            expect(schema.valid).toEqual(true);
            expect(schema.invalid).toEqual(false);
            expect(schema.errors).toEqual([]);
        });

        it('should validate schema with validator name string if validator passes', () => {
            const schema: any = {
                value: 'value',
                validators: ['required']
            };

            validateFormInput(schema);

            expect(schema.valid).toEqual(true);
            expect(schema.invalid).toEqual(false);
            expect(schema.errors).toEqual([]);
        });

        it('should invalidate schema if validator fails', () => {
            const schema: any = {
                value: '',
                validators: ['required']
            };

            validateFormInput(schema);

            expect(schema.valid).toEqual(false);
            expect(schema.invalid).toEqual(true);
            expect(schema.errors).toEqual([
                {
                    name: schema.validators[0],
                    message: expect.any(String),
                    path: ''
                }
            ]);
        });

        it('should invalidate schema with custom message if validator fails', () => {
            const schema: any = {
                value: '',
                validators: [
                    { name: 'required', message: 'Field is required' }
                ]
            };

            validateFormInput(schema);

            expect(schema.errors).toEqual([
                {
                    name: schema.validators[0].name,
                    message: schema.validators[0].message,
                    path: ''
                }
            ]);
        });

        it('should invalidate schema with custom message function if validator fails', () => {
            const schema: any = {
                value: '',
                validators: [
                    { name: 'required', message: () => 'Field is required' }
                ]
            };

            validateFormInput(schema);

            expect(schema.errors).toEqual([
                {
                    name: schema.validators[0].name,
                    message: schema.validators[0].message(),
                    path: ''
                }
            ]);
        });

        it('should invalidate schema and provide path if validator fails', () => {
            const schema: any = {
                value: '',
                validators: ['required']
            };
            const path = 'nested.field';

            validateFormInput(schema, path);

            expect(schema.errors).toEqual([
                {
                    name: schema.validators[0],
                    message: expect.any(String),
                    path
                }
            ]);
        });
    });

    describe('validateFormGroup()', () => {
        it('should validate schema if all fields are valid', () => {
            const schema: any = {
                field: {
                    value: 'value',
                    validators: ['required']
                }
            };

            validateFormGroup(schema);

            expect(schema.valid).toEqual(true);
            expect(schema.invalid).toEqual(false);
        });

        it('should invalidate schema if not all fields are valid', () => {
            const schema: any = {
                field1: {
                    value: 'value',
                    validators: ['required']
                },
                field2: {
                    value: '',
                    validators: ['required']
                }
            };

            validateFormGroup(schema);

            expect(schema.valid).toEqual(false);
            expect(schema.invalid).toEqual(true);
        });

        it('should validate nested form groups recursively', () => {
            const schema: any = {
                group: {
                    nested: {
                        field: {
                            value: 'value',
                            validators: ['required']
                        }
                    }
                }
            };

            validateFormGroup(schema);

            expect(schema.valid).toEqual(true);
            expect(schema.invalid).toEqual(false);
            expect(schema.group.valid).toEqual(true);
            expect(schema.group.invalid).toEqual(false);
            expect(schema.group.nested.valid).toEqual(true);
            expect(schema.group.nested.invalid).toEqual(false);
        });

        it('should invalidate nested form groups recursively', () => {
            const schema: any = {
                group: {
                    nested: {
                        field: {
                            value: '',
                            validators: ['required']
                        }
                    }
                }
            };

            validateFormGroup(schema);

            expect(schema.valid).toEqual(false);
            expect(schema.invalid).toEqual(true);
            expect(schema.group.valid).toEqual(false);
            expect(schema.group.invalid).toEqual(true);
            expect(schema.group.nested.valid).toEqual(false);
            expect(schema.group.nested.invalid).toEqual(true);
        });

        it('should create nested path for nested fields', () => {
            const schema: any = {
                group: {
                    nested: {
                        field: {
                            value: '',
                            validators: ['required']
                        }
                    }
                }
            };

            validateFormGroup(schema);

            expect(schema.group.nested.field.valid).toEqual(false);
            expect(schema.group.nested.field.errors[0].path).toEqual('group.nested.field');
        });
    });
});
