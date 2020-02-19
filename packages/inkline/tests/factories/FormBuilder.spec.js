import * as validators from "@inkline/inkline/src/validators";
import { FormBuilder } from "@inkline/inkline/src/factories/FormBuilder";

describe('Factories', () => {
    describe('FormBuilder', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('defaultFormState', () => {
            it('should be defined', () => {
                expect(FormBuilder.defaultFormState).toBeDefined();
            });

            it('should be untouched, pristine and valid', () => {
                expect(FormBuilder.defaultFormState.untouched).toEqual(true);
                expect(FormBuilder.defaultFormState.pristine).toEqual(true);
                expect(FormBuilder.defaultFormState.valid).toEqual(true);
            });

            it('should not be touched, dirty and invalid', () => {
                expect(FormBuilder.defaultFormState.touched).toEqual(false);
                expect(FormBuilder.defaultFormState.dirty).toEqual(false);
                expect(FormBuilder.defaultFormState.invalid).toEqual(false);
            });

            it('should have no errors', () => {
                expect(FormBuilder.defaultFormState.errors).toEqual({});
            });
        });

        describe('defaultFormControlState', () => {
            it('should be defined', () => {
                expect(FormBuilder.defaultFormControlState).toBeDefined();
            });

            it('should validate on input', () => {
                expect(FormBuilder.defaultFormControlState.validateOn).toEqual('input');
            });

            it('should have empty value field', () => {
                expect(FormBuilder.defaultFormControlState).toHaveProperty('value');
                expect(FormBuilder.defaultFormControlState.value).toEqual('');
            });
        });

        describe('build()', () => {
            it('should be defined', () => {
                expect(FormBuilder.build).toBeDefined();
            });

            it('should create a new form if is group', () => {
                const spy = jest.spyOn(FormBuilder, 'form');

                FormBuilder.build('', {}, { group: true, root: true });

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('', {}, { group: true, root: true });
            });

            it('should create a new form control if is not group', () => {
                const spy = jest.spyOn(FormBuilder, 'formControl');

                FormBuilder.build('', {}, { group: false });

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('', {}, { group: false });
            });
        });

        describe('formControl()', () => {
            it('should be defined', () => {
                expect(FormBuilder.formControl).toBeDefined();
            });

            it('should include schema', () => {
                const formSchema = FormBuilder.formControl('', { value: 'abc' });

                expect(formSchema).toHaveProperty('value');
                expect(formSchema.value).toEqual('abc');
            });

            it('should include default form state', () => {
                const formSchema = FormBuilder.formControl('', {});

                Object.keys(FormBuilder.defaultFormState).forEach((property) => {
                    expect(formSchema).toHaveProperty(property);
                    expect(formSchema[property]).toEqual(FormBuilder.defaultFormState[property]);
                });
            });

            it('should include default form control state', () => {
                const formSchema = FormBuilder.formControl('', {});

                Object.keys(FormBuilder.defaultFormControlState).forEach((property) => {
                    expect(formSchema).toHaveProperty(property);
                    expect(formSchema[property]).toEqual(FormBuilder.defaultFormControlState[property]);
                });
            });

            it('should have id', () => {
                const formSchema = FormBuilder.formControl('', {});

                expect(formSchema).toHaveProperty('name');
            });

            it('should construct id based on name nesting', () => {
                const formSchema = FormBuilder.formControl('a.b.c', {});

                expect(formSchema).toHaveProperty('name');
                expect(formSchema.name).toEqual('a.b.c');
            });

            it('should set validators as enabled by default', () => {
                const formSchema = FormBuilder.formControl('input', {
                    validators: [
                        { rule: 'required' },
                        { rule: 'other', enabled: false },
                    ]
                });

                expect(formSchema.validators[0].enabled).toEqual(true);
                expect(formSchema.validators[1].enabled).toEqual(false);
            });

            describe('touch()', () => {
                let formSchema;
                let validationOptions;

                beforeEach(() => {
                    formSchema = FormBuilder.build('', {
                        group: {
                            input: {
                                value: 'abc'
                            }
                        }
                    }, { group: true, root: true });

                    validationOptions = {
                        getSchema: () => formSchema
                    };
                });

                it('should be defined', () => {
                    expect(formSchema.group.input.touch).toBeDefined();
                });

                it('should return truthy value', () => {
                    expect(formSchema.group.input.touch(validationOptions)).toEqual(true);
                });

                it('should be callable without getSchema', () => {
                    expect(formSchema.group.input.touch()).toEqual(true);
                });

                it('should set schema list items as touched', () => {
                    formSchema.group.input.touch(validationOptions);

                    expect(formSchema.touched).toEqual(true);
                    expect(formSchema.untouched).toEqual(false);
                    expect(formSchema.group.touched).toEqual(true);
                    expect(formSchema.group.untouched).toEqual(false);
                    expect(formSchema.group.input.touched).toEqual(true);
                    expect(formSchema.group.input.untouched).toEqual(false);
                });
            });

            describe('validate()', () => {
                const validationOptions = {
                    getSchema: () => FormBuilder.build('', {
                        input: {
                            value: 'abc'
                        },
                        group: {
                            input: {
                                value: 'abc'
                            }
                        }
                    }, { group: true, root: true })
                };

                it('should be defined', () => {
                    const formSchema = FormBuilder.formControl('input', {});

                    expect(formSchema.validate).toBeDefined();
                });

                it('should return valid and empty errors object without validators', () => {
                    const formSchema = FormBuilder.formControl('input', {});
                    const validation = formSchema.validate('', validationOptions);

                    expect(validation).toEqual({
                        valid: true,
                        errors: {
                            length: 0
                        }
                    });
                });

                it('should throw error if invalid validator rule provided', () => {
                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'invalidrule' }
                        ]
                    });

                    expect(() => (formSchema.validate('', validationOptions))).toThrow();
                });

                it('should check if validator is enabled and call enabled function', () => {
                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'required', enabled: () => true }
                        ]
                    });
                    const spy = jest.spyOn(formSchema.validators[0], 'enabled');

                    formSchema.validate('', validationOptions);

                    expect(spy).toHaveBeenCalled();
                });

                it('should call each validator rule', () => {
                    validators['rule1'] = jest.fn();
                    validators['rule2'] = jest.fn();

                    const spy1 = jest.spyOn(validators, 'rule1');
                    const spy2 = jest.spyOn(validators, 'rule2');

                    const formSchema = FormBuilder.build('', {
                        input: {
                            validators: [
                                { rule: 'rule1' },
                                { rule: 'rule2' }
                            ]
                        }
                    }, { group: true, root: true });
                    formSchema.input.validate('value', { getSchema: () => formSchema });

                    expect(spy1).toHaveBeenCalled();
                    expect(spy1).toHaveBeenCalledWith('value', {
                        enabled: true, rule: "rule1"
                    }, formSchema);

                    expect(spy2).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalledWith('value', {
                        enabled: true, rule: "rule2"
                    }, formSchema);
                });

                it('should not call validator rule if not enabled', () => {
                    validators['rule1'] = jest.fn();
                    validators['rule2'] = jest.fn();

                    const spy1 = jest.spyOn(validators, 'rule1');
                    const spy2 = jest.spyOn(validators, 'rule2');

                    const formSchema = FormBuilder.build('', {
                        input: {
                            validators: [
                                { rule: 'rule1', enabled: false },
                                { rule: 'rule2' }
                            ]
                        }
                    }, { root: true, group: true });
                    formSchema.input.validate('value');

                    expect(spy1).not.toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalledWith('value', {
                        enabled: true, rule: "rule2"
                    }, formSchema);
                });

                it('should return valid if 1/1 rule is valid', () => {
                    validators['test'] = jest.fn()
                        .mockImplementation(() => true);

                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'test' }
                        ]
                    });
                    const validation = formSchema.validate('value', validationOptions);

                    expect(validation).toEqual({
                        valid: true,
                        errors: {
                            length: 0
                        }
                    });
                });

                it('should return valid if n/n rules are valid', () => {
                    validators['test1'] = jest.fn()
                        .mockImplementation(() => true);
                    validators['test2'] = jest.fn()
                        .mockImplementation(() => true);

                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'test1' },
                            { rule: 'test2' }
                        ]
                    });
                    const validation = formSchema.validate('value', validationOptions);

                    expect(validation).toEqual({
                        valid: true,
                        errors: {
                            length: 0
                        }
                    });
                });

                it('should return invalid if 1/1 rule is invalid', () => {
                    validators['test'] = jest.fn()
                        .mockImplementation(() => false);

                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'test', message: 'Invalid' }
                        ]
                    });
                    const validation = formSchema.validate('value', validationOptions);

                    expect(validation).toEqual({
                        valid: false,
                        errors: {
                            test: 'Invalid',
                            length: 1
                        }
                    });
                });

                it('should return invalid if 1/n rules is invalid', () => {
                    validators['test1'] = jest.fn()
                        .mockImplementation(() => true);
                    validators['test2'] = jest.fn()
                        .mockImplementation(() => false);

                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'test1', message: 'Valid' },
                            { rule: 'test2', message: 'Invalid' }
                        ]
                    });
                    const validation = formSchema.validate('value', validationOptions);

                    expect(validation).toEqual({
                        valid: false,
                        errors: {
                            test2: 'Invalid',
                            length: 1
                        }
                    });
                });

                it('should return invalid if n/n rules are invalid', () => {
                    validators['test1'] = jest.fn()
                        .mockImplementation(() => false);
                    validators['test2'] = jest.fn()
                        .mockImplementation(() => false);

                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'test1', message: 'Invalid 1' },
                            { rule: 'test2', message: 'Invalid 2' }
                        ]
                    });
                    const validation = formSchema.validate('value', validationOptions);

                    expect(validation).toEqual({
                        valid: false,
                        errors: {
                            test1: 'Invalid 1',
                            test2: 'Invalid 2',
                            length: 2
                        }
                    });
                });

                it('should set errors on schema list item', () => {
                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'required', message: 'message' },
                        ]
                    });

                    formSchema.validate('', validationOptions);

                    expect(formSchema.errors).toEqual({
                        length: 1,
                        required: 'message'
                    });
                });

                it('should set valid status on schema list item', () => {
                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'required', message: 'message' },
                        ]
                    });

                    formSchema.validate('value', validationOptions);

                    expect(formSchema.valid).toEqual(true);
                    expect(formSchema.invalid).toEqual(false);
                });

                it('should set valid status on schema list parent item', () => {
                    const formSchema = FormBuilder.build('', {
                        group: {
                            input: {
                                value: 'abc'
                            }
                        }
                    }, { group: true, root: true });

                    const validationOptions = {
                        getSchema: () => formSchema
                    };

                    formSchema.group.input.validate('value', validationOptions);

                    expect(formSchema.valid).toEqual(true);
                    expect(formSchema.invalid).toEqual(false);
                });

                it('should be callable without getSchema option', () => {
                    const formSchema = FormBuilder.build('', {
                        input: {
                            validators: [
                                { rule: 'required', message: 'message' },
                            ]
                        }
                    }, { root: true, group: true });

                    expect(() => formSchema.input.validate('')).not.toThrow();
                });

                it('should set invalid status on schema list item', () => {
                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'required', message: 'message' },
                        ]
                    });

                    formSchema.validate('', validationOptions);

                    expect(formSchema.valid).toEqual(false);
                    expect(formSchema.invalid).toEqual(true);
                });

                it('should set valid status on schema list parent items', () => {
                    const formSchema = FormBuilder.build('', {
                        group: {
                            input: {
                                value: 'abc',
                                validators: [
                                    { rule: 'required' }
                                ]
                            }
                        }
                    }, { group: true, root: true });

                    const validationOptions = {
                        getSchema: () => formSchema
                    };

                    formSchema.group.input.validate('value', validationOptions);

                    expect(formSchema.valid).toEqual(true);
                    expect(formSchema.invalid).toEqual(false);
                });

                it('should set invalid status on schema list parent items', () => {
                    const formSchema = FormBuilder.build('', {
                        group: {
                            input: {
                                value: 'abc',
                                validators: [
                                    { rule: 'required' }
                                ]
                            }
                        }
                    }, { group: true, root: true });

                    const validationOptions = {
                        getSchema: () => formSchema
                    };

                    formSchema.group.input.validate('', validationOptions);

                    expect(formSchema.valid).toEqual(false);
                    expect(formSchema.invalid).toEqual(true);
                });

                it('should set dirty status on schema list item', () => {
                    const formSchema = FormBuilder.formControl('input', {
                        validators: [
                            { rule: 'required', message: 'message' },
                        ]
                    });

                    formSchema.validate('', validationOptions);

                    expect(formSchema.dirty).toEqual(true);
                    expect(formSchema.pristine).toEqual(false);
                });
            });
        });

        describe('form()', () => {
            it('should be defined', () => {
                expect(FormBuilder.form).toBeDefined();
            });

            FormBuilder.reservedSchemaFields.forEach((field) => {
                it(`should throw error if schema.${field} is specified`, () => {
                    const schema = {
                        [field]: {}
                    };

                    expect(() => FormBuilder.form('', schema)).toThrowError(`The field name "${field}" is a reserved Inkline Form Validation field name.`);
                });
            });

            [
                { description: 'Object schema', schema: {} },
                { description: 'Array schema', schema: [] }
            ].forEach(({ description, schema }) => {
                describe(description, () => {
                    it('should return an object', () => {
                        const formSchema = FormBuilder.form('', schema);

                        expect(formSchema.constructor).toEqual(schema.constructor);
                    });

                    it('should include default form state', () => {
                        const formSchema = FormBuilder.form('', schema);

                        Object.keys(FormBuilder.defaultFormState).forEach((property) => {
                            expect(formSchema).toHaveProperty(property);
                            expect(formSchema[property]).toEqual(FormBuilder.defaultFormState[property]);
                        });
                    });

                    it('should have name', () => {
                        const formSchema = FormBuilder.form('', schema);

                        expect(formSchema).toHaveProperty('name');
                    });

                    it('should have fields', () => {
                        const formSchema = FormBuilder.form('', schema);

                        expect(formSchema).toHaveProperty('fields');
                        expect(formSchema.fields).toEqual([]);
                    });

                    it('should construct id based on name nesting', () => {
                        const formSchema = FormBuilder.form('a.b.c', schema);

                        expect(formSchema).toHaveProperty('name');
                        expect(formSchema.name).toEqual('a.b.c');
                    });
                });
            });

            describe('Object schema', () => {
                it('should include schema', () => {
                    const formSchema = FormBuilder.form('', { value: {} });

                    expect(formSchema).toHaveProperty('value');
                });

                it('should call FormBuilder.build() for each form property', () => {
                    const spy = jest.spyOn(FormBuilder, 'build');

                    FormBuilder.form('', {
                        field: {},
                        group: {
                            field: {}
                        }
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenNthCalledWith(1,
                        'field', {}, { group: false });
                    expect(spy).toHaveBeenNthCalledWith(2,
                        'group', expect.objectContaining({}), { group: true });
                    expect(spy).toHaveBeenNthCalledWith(3,
                        'group.field', {}, { group: false });
                });

                it('should call FormBuilder.build() -> formControl() for empty objects', () => {
                    const spy = jest.spyOn(FormBuilder, 'formControl');

                    FormBuilder.form('', {
                        field: {},
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('field', {}, { group: false });
                });


                it('should call FormBuilder.build() -> formControl() for objects with "validators" property', () => {
                    const spy = jest.spyOn(FormBuilder, 'formControl');

                    FormBuilder.form('', {
                        field: {
                            validators: []
                        },
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('field', { validators: [] }, { group: false });
                });

                it('should call FormBuilder.build() -> from() for group objects', () => {
                    const spy = jest.spyOn(FormBuilder, 'form');

                    FormBuilder.form('', {
                        group: {
                            field: {}
                        },
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenLastCalledWith('group', expect.objectContaining({}), { group: true });
                });

                describe('validate()', () => {
                    it('should be defined', () => {
                        const formSchema = FormBuilder.form('', {});

                        expect(formSchema.validate).toBeDefined();
                    });

                    it('should be callable without getSchema option', () => {
                        const formSchema = FormBuilder.form('', {
                            input: {},
                            group: {
                                input: {}
                            }
                        }, { root: true });

                        expect(() => formSchema.validate()).not.toThrow();
                    });

                    it('should iterate each key and apply validate based on whether it\'s a field or a group', () => {
                        const formSchema = FormBuilder.form('', {
                            input: {},
                            group: {
                                input: {}
                            }
                        });

                        const spy1 = jest.spyOn(formSchema.input, 'validate');
                        const spy2 = jest.spyOn(formSchema.group, 'validate');
                        const spy3 = jest.spyOn(formSchema.group.input, 'validate');

                        formSchema.validate({ getSchema: () => formSchema });

                        expect(spy1).toHaveBeenCalled();
                        expect(spy2).toHaveBeenCalled();
                        expect(spy3).toHaveBeenCalled();
                    });
                });

                describe('set()', () => {
                    const instance = { $set: (target, key, value) => target[key] = value };

                    it('should be defined', () => {
                        const formSchema = FormBuilder.form('', {});

                        expect(formSchema.set).toBeDefined();
                    });

                    it('should throw error if instance not provided', () => {
                        const formSchema = FormBuilder.form('', {});

                        expect(() => formSchema.set('field', {})).toThrowError();
                    });

                    it('should call FormBuilder.build() method', () => {
                        const spy = jest.spyOn(FormBuilder, 'build');
                        const formSchema = FormBuilder.form('', {});

                        formSchema.set('field', {}, { instance });

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenLastCalledWith('field', {}, expect.any(Object));
                    });

                    it('should set a new form control field', () => {
                        const formSchema = FormBuilder.form('', {});

                        formSchema.set('field', { validators: [] }, { instance });

                        expect(formSchema.field).toBeDefined();
                        expect(formSchema.field).toEqual(expect.objectContaining({
                            name: 'field',
                            value: ''
                        }));
                        expect(formSchema.fields).toEqual(['field']);
                    });

                    it('should set a new form group field', () => {
                        const formSchema = FormBuilder.form('', {});

                        formSchema.set('group', {}, { instance, group: true });

                        expect(formSchema.group).toBeDefined();
                        expect(formSchema.group).toEqual(expect.objectContaining({
                            name: 'group'
                        }));
                        expect(formSchema.group.set).toEqual(expect.any(Function));
                        expect(formSchema.fields).toEqual(['group']);
                    });
                });
            });

            describe('Array schema', () => {
                it('should include schema', () => {
                    const formSchema = FormBuilder.form('', [{}]);

                    expect(formSchema.length).toEqual(1);
                });

                it('should call FormBuilder.build() for each form property', () => {
                    const spy = jest.spyOn(FormBuilder, 'build');

                    FormBuilder.form('', [
                        {},
                        [
                            {}
                        ]
                    ]);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenNthCalledWith(1,
                        '0', {}, { group: false });
                    expect(spy).toHaveBeenNthCalledWith(2,
                        '1', expect.arrayContaining([]), { group: true });
                    expect(spy).toHaveBeenNthCalledWith(3,
                        '1.0', {}, { group: false });
                });

                it('should call FormBuilder.build() -> formControl() for empty objects', () => {
                    const spy = jest.spyOn(FormBuilder, 'formControl');

                    FormBuilder.form('', [
                        {}
                    ]);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('0', {}, { group: false });
                });


                it('should call FormBuilder.build() -> formControl() for objects with "validators" property', () => {
                    const spy = jest.spyOn(FormBuilder, 'formControl');

                    FormBuilder.form('', [
                        {
                            validators: []
                        },
                    ]);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('0', { validators: [] }, { group: false });
                });

                it('should call FormBuilder.build() -> from() for group objects', () => {
                    const spy = jest.spyOn(FormBuilder, 'form');

                    FormBuilder.form('', [
                        {
                            field: {}
                        }
                    ]);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenLastCalledWith('0', expect.objectContaining({ field: {} }), { group: true });
                });

                describe('add()', () => {
                    it('should be defined', () => {
                        const formSchema = FormBuilder.form('', []);

                        expect(formSchema.add).toBeDefined();
                    });

                    it('should call FormBuilder.build() method', () => {
                        const spy = jest.spyOn(FormBuilder, 'build');
                        const formSchema = FormBuilder.form('', []);

                        formSchema.add({});

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenLastCalledWith('0', {}, {});
                    });

                    it('should push a new form control field', () => {
                        const formSchema = FormBuilder.form('', []);

                        formSchema.add({ validators: [] });

                        expect(formSchema[0]).toBeDefined();
                        expect(formSchema[0]).toEqual(expect.objectContaining({
                            name: '0',
                            value: ''
                        }));
                        expect(formSchema.fields).toEqual(['0']);
                    });

                    it('should push a new form group field', () => {
                        const formSchema = FormBuilder.form('', []);

                        formSchema.add({}, true);

                        expect(formSchema[0]).toBeDefined();
                        expect(formSchema[0]).toEqual(expect.objectContaining({
                            name: '0'
                        }));
                        expect(formSchema.fields).toEqual(['0']);
                    });
                });

                describe('remove()', () => {
                    it('should be defined', () => {
                        const formSchema = FormBuilder.form('', []);

                        expect(formSchema.remove).toBeDefined();
                    });

                    it('should call FormBuilder.build() method', () => {
                        const spy = jest.spyOn(FormBuilder, 'build');
                        const formSchema = FormBuilder.form('', []);

                        formSchema.remove(0, 0, {});

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenLastCalledWith('0', {}, {});
                    });

                    it('should add a new form control field at given index', () => {
                        const formSchema = FormBuilder.form('', [{}, {}]);

                        formSchema.remove(1, 0, { value: 'new', validators: [] });

                        expect(formSchema[1]).toBeDefined();
                        expect(formSchema[1]).toEqual(expect.objectContaining({ name: '1', value: 'new' }));
                        expect(formSchema.length).toEqual(3);
                    });

                    it('should add a new form control field name at given index', () => {
                        const formSchema = FormBuilder.form('', [{}, {}]);

                        formSchema.remove(1, 0, { value: 'new', validators: [] });

                        expect(formSchema.fields.length).toEqual(3);
                        expect(formSchema.fields).toEqual(['0', '1', '2']);
                    });

                    it('should delete a form control field at given index', () => {
                        const formSchema = FormBuilder.form('', [{}, {}, {}]);

                        formSchema.remove(1, 1);

                        expect(formSchema.length).toEqual(2);
                        expect(formSchema.fields).toEqual(['0', '1']);
                    });
                });
            });
        });

        describe('getSchemaList()', () => {
            it('should be defined', () => {
                expect(FormBuilder.getSchemaList).toBeDefined();
            });

            it('should return schema for standalone validation', () => {
                const inputSchema = { name: 'input' };
                const schemaList = FormBuilder.getSchemaList(inputSchema, inputSchema);

                expect(schemaList).toEqual([inputSchema]);
            });

            it('should return schema list for direct input', () => {
                const inputSchema = { name: 'input' };
                const rootSchema = { input: inputSchema };
                const schemaList = FormBuilder.getSchemaList(inputSchema, rootSchema);

                expect(schemaList).toEqual([inputSchema, rootSchema]);
                expect(schemaList.length).toEqual(2);
            });

            it('should return schema list for nested input', () => {
                const inputSchema = { name: 'group.input' };
                const groupSchema = { input: inputSchema };
                const rootSchema = { group: groupSchema };
                const schemaList = FormBuilder.getSchemaList(inputSchema, rootSchema);

                expect(schemaList).toEqual([inputSchema, groupSchema, rootSchema]);
                expect(schemaList.length).toEqual(3);
            });

            it('should throw error if input doesn\'t exist in root schema', () => {
                const inputSchema = { name: 'input' };
                const rootSchema = {};

                expect(() => FormBuilder.getSchemaList(inputSchema, rootSchema)).toThrowError();
            });
        });

        describe('getErrorMessage()', () => {
            it('should be defined', () => {
                expect(FormBuilder.getErrorMessage).toBeDefined();
            });

            [
                {
                    rule: 'alpha',
                    options: [
                        { expect: 'letters' },
                        { allowDashes: true, expect: 'letters and dashes' },
                        { allowSpaces: true, expect: 'letters and spaces' },
                        { allowDashes: true, allowSpaces: true, expect: 'letters, dashes and spaces' },
                    ]
                },
                {
                    rule: 'alphanumeric',
                    options: [
                        { expect: 'letters and numbers' },
                        { allowDashes: true, expect: 'letters, numbers and dashes' },
                        { allowSpaces: true, expect: 'letters, numbers and spaces' },
                        { allowDashes: true, allowSpaces: true, expect: 'letters, numbers, dashes and spaces' },
                    ]
                },
                {
                    rule: 'email',
                    options: [
                        { expect: 'valid email address' }
                    ]
                },
                {
                    rule: 'number',
                    options: [
                        { allowDecimal: false, allowNegative: false, expect: 'numbers' },
                        { allowDecimal: true, allowNegative: false, expect: 'decimal numbers' },
                        { allowDecimal: false, allowNegative: true, expect: 'positive or negative numbers' },
                        { allowDecimal: true, allowNegative: true, expect: 'positive or negative decimal numbers' },
                    ]
                },
                {
                    rule: 'max',
                    options: [
                        { value: 10, expect: 'up to a maximum of 10' }
                    ]
                },
                {
                    rule: 'maxLength',
                    options: [
                        { value: 10, expect: 'up to 10' }
                    ]
                },
                {
                    rule: 'min',
                    options: [
                        { value: 10, expect: 'up from a minimum of 10' }
                    ]
                },
                {
                    rule: 'minLength',
                    options: [
                        { value: 10, expect: 'at least 10' }
                    ]
                },
                {
                    rule: 'required',
                    options: [
                        { value: 10, expect: 'Please' }
                    ]
                },
            ].forEach((entry) => {
                it(`should return formatted error message for ${entry.rule} validator`, () => {
                    entry.options.forEach((option) => {
                        [ 'abc', ['a', 'b', 'c'] ].forEach((value) => {
                            const message = FormBuilder.getErrorMessage(value, { rule: entry.rule, ...option });

                            expect(message).toEqual(expect.stringContaining(option.expect));
                            if (value.constructor === Array) {
                                expect(message).toEqual(expect.stringContaining('select'));
                            } else {
                                expect(message).toEqual(expect.stringContaining('enter'));
                            }
                        });
                    })
                });
            });

            it('should return formatted error message for sameAs validator', () => {
                const message = FormBuilder.getErrorMessage('', { rule: 'sameAs' });

                expect(message).toEqual(expect.stringContaining('values match'));
            });

            it('should return formatted error message for custom validators', () => {
                const message = FormBuilder.getErrorMessage('', { rule: 'custom' });

                expect(message).toEqual(expect.stringContaining('correct value'));
            });
        });
    });
});
