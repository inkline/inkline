import { FormBuilder } from "@inkline/validation/src/factories/FormBuilder";

describe('Factories', () => {
    describe('FormBuilder', () => {
        let formBuilder;

        beforeEach(() => {
            formBuilder = new FormBuilder();
        });

        describe('defaultFormState', () => {
            it('should be defined', () => {
                expect(formBuilder.defaultFormState).toBeDefined();
            });

            it('should be untouched, pristine and valid', () => {
                expect(formBuilder.defaultFormState.untouched).toEqual(true);
                expect(formBuilder.defaultFormState.pristine).toEqual(true);
                expect(formBuilder.defaultFormState.valid).toEqual(true);
            });

            it('should not be touched, dirty and invalid', () => {
                expect(formBuilder.defaultFormState.touched).toEqual(false);
                expect(formBuilder.defaultFormState.dirty).toEqual(false);
                expect(formBuilder.defaultFormState.invalid).toEqual(false);
            });

            it('should have no errors', () => {
                expect(formBuilder.defaultFormState.errors).toEqual({});
            });
        });

        describe('defaultFormControlState', () => {
            it('should be defined', () => {
                expect(formBuilder.defaultFormControlState).toBeDefined();
            });

            it('should validate on input', () => {
                expect(formBuilder.defaultFormControlState.validateOn).toEqual('input');
            });

            it('should have empty value field', () => {
                expect(formBuilder.defaultFormControlState).toHaveProperty('value');
                expect(formBuilder.defaultFormControlState.value).toEqual('');
            });
        });

        describe('validators', () => {
            it('should be defined', () => {
                expect(formBuilder.validators).toBeDefined();
            });
        });

        describe('factory()', () => {
            it('should be defined', () => {
                expect(formBuilder.factory).toBeDefined();
            });

            it('should create a new form if isGroup', () => {
                const spy = jest.spyOn(formBuilder, 'form');

                formBuilder.factory([], {}, true);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith([], {});
            });

            it('should create a new form control if not isGroup', () => {
                const spy = jest.spyOn(formBuilder, 'formControl');

                formBuilder.factory([], {}, false);

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith([], {});
            });
        });

        describe('formControl()', () => {
            it('should be defined', () => {
                expect(formBuilder.formControl).toBeDefined();
            });

            it('should include schema', () => {
               const formControl = formBuilder.formControl([], { value: 'abc' });

                expect(formControl).toHaveProperty('value');
                expect(formControl.value).toEqual('abc');
            });

            it('should include default form state', () => {
               const formControl = formBuilder.formControl([], {});

               Object.keys(formBuilder.defaultFormState).forEach((property) => {
                   expect(formControl).toHaveProperty(property);
                   expect(formControl[property]).toEqual(formBuilder.defaultFormState[property]);
               });
            });

            it('should include default form control state', () => {
               const formControl = formBuilder.formControl([], {});

               Object.keys(formBuilder.defaultFormControlState).forEach((property) => {
                   expect(formControl).toHaveProperty(property);
                   expect(formControl[property]).toEqual(formBuilder.defaultFormControlState[property]);
               });
            });

            it('should have id', () => {
                const formControl = formBuilder.formControl([], {});

                expect(formControl).toHaveProperty('name');
            });

            it('should construct id based on name nesting', () => {
                const formControl = formBuilder.formControl(['a', 'b', 'c'], {});

                expect(formControl).toHaveProperty('name');
                expect(formControl.name).toEqual('a.b.c');
            });

            it('should set validators as enabled by default', () => {
                const formControl = formBuilder.formControl(['input'], {
                    validators: [
                        { type: 'required' },
                        { type: 'other', enabled: false },
                    ]
                });

                expect(formControl.validators[0].enabled).toEqual(true);
                expect(formControl.validators[1].enabled).toEqual(false);
            });

            describe('touch()', () => {
                let formSchema;
                let validationOptions;

                beforeEach(() => {
                    formSchema = formBuilder.factory([], {
                        group: {
                            input: {
                                value: 'abc'
                            }
                        }
                    }, true);

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
                    getSchema: () => formBuilder.factory([], {
                        input: {
                            value: 'abc'
                        },
                        group: {
                            input: {
                                value: 'abc'
                            }
                        }
                    }, true)
                };

                it('should be defined', () => {
                    const formControl = formBuilder.formControl(['input'], {});

                    expect(formControl.validate).toBeDefined();
                });

                it('should return valid and empty errors object without validators', () => {
                    const formControl = formBuilder.formControl(['input'], {});
                    const validation = formControl.validate('', validationOptions);

                    expect(validation).toEqual({
                        valid: true,
                        errors: {
                            length: 0
                        }
                    });
                });

                it('should throw error if invalid validator rule provided', () => {
                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'invalidrule' }
                        ]
                    });

                    expect(() => (formControl.validate('', validationOptions))).toThrow();
                });

                it('should check if validator is enabled and call enabled function', () => {
                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'required', enabled: () => true }
                        ]
                    });
                    const spy = jest.spyOn(formControl.validators[0], 'enabled');

                    formControl.validate('', validationOptions);

                    expect(spy).toHaveBeenCalled();
                });

                it('should call each validator rule', () => {
                    formBuilder.validators['rule1'] = jest.fn();
                    formBuilder.validators['rule2'] = jest.fn();

                    const spy1 = jest.spyOn(formBuilder.validators, 'rule1');
                    const spy2 = jest.spyOn(formBuilder.validators, 'rule2');

                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'rule1' },
                            { rule: 'rule2' }
                        ]
                    });
                    formControl.validate('value', validationOptions);

                    expect(spy1).toHaveBeenCalled();
                    expect(spy1).toHaveBeenCalledWith('value', {
                        enabled: true, rule: "rule1"
                    }, validationOptions);

                    expect(spy2).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalledWith('value', {
                        enabled: true, rule: "rule2"
                    }, validationOptions);
                });

                it('should not call validator rule if not enabled', () => {
                    formBuilder.validators['rule1'] = jest.fn();
                    formBuilder.validators['rule2'] = jest.fn();

                    const spy1 = jest.spyOn(formBuilder.validators, 'rule1');
                    const spy2 = jest.spyOn(formBuilder.validators, 'rule2');

                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'rule1', enabled: false },
                            { rule: 'rule2' }
                        ]
                    });
                    formControl.validate('value', validationOptions);

                    expect(spy1).not.toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalledWith('value', {
                        enabled: true, rule: "rule2"
                    }, validationOptions);
                });

                it('should return valid if 1/1 rule is valid', () => {
                    formBuilder.validators['test'] = jest.fn()
                        .mockImplementation(() => true);

                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'test' }
                        ]
                    });
                    const validation = formControl.validate('value', validationOptions);

                    expect(validation).toEqual({
                        valid: true,
                        errors: {
                            length: 0
                        }
                    });
                });

                it('should return valid if n/n rules are valid', () => {
                    formBuilder.validators['test1'] = jest.fn()
                        .mockImplementation(() => true);
                    formBuilder.validators['test2'] = jest.fn()
                        .mockImplementation(() => true);

                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'test1' },
                            { rule: 'test2' }
                        ]
                    });
                    const validation = formControl.validate('value', validationOptions);

                    expect(validation).toEqual({
                        valid: true,
                        errors: {
                            length: 0
                        }
                    });
                });

                it('should return invalid if 1/1 rule is invalid', () => {
                    formBuilder.validators['test'] = jest.fn()
                        .mockImplementation(() => false);

                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'test', message: 'Invalid' }
                        ]
                    });
                    const validation = formControl.validate('value', validationOptions);

                    expect(validation).toEqual({
                        valid: false,
                        errors: {
                            test: 'Invalid',
                            length: 1
                        }
                    });
                });

                it('should return invalid if 1/n rules is invalid', () => {
                    formBuilder.validators['test1'] = jest.fn()
                        .mockImplementation(() => true);
                    formBuilder.validators['test2'] = jest.fn()
                        .mockImplementation(() => false);

                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'test1', message: 'Valid' },
                            { rule: 'test2', message: 'Invalid' }
                        ]
                    });
                    const validation = formControl.validate('value', validationOptions);

                    expect(validation).toEqual({
                        valid: false,
                        errors: {
                            test2: 'Invalid',
                            length: 1
                        }
                    });
                });

                it('should return invalid if n/n rules are invalid', () => {
                    formBuilder.validators['test1'] = jest.fn()
                        .mockImplementation(() => false);
                    formBuilder.validators['test2'] = jest.fn()
                        .mockImplementation(() => false);

                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'test1', message: 'Invalid 1' },
                            { rule: 'test2', message: 'Invalid 2' }
                        ]
                    });
                    const validation = formControl.validate('value', validationOptions);

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
                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'required', message: 'message' },
                        ]
                    });

                    formControl.validate('', validationOptions);

                    expect(formControl.errors).toEqual({
                        length: 1,
                        required: 'message'
                    });
                });

                it('should set valid status on schema list item', () => {
                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'required', message: 'message' },
                        ]
                    });

                    formControl.validate('value', validationOptions);

                    expect(formControl.valid).toEqual(true);
                    expect(formControl.invalid).toEqual(false);
                });

                it('should set valid status on schema list parent item', () => {
                    const formSchema = formBuilder.factory([], {
                        group: {
                            input: {
                                value: 'abc'
                            }
                        }
                    }, true);

                    const validationOptions = {
                        getSchema: () => formSchema
                    };

                    formSchema.group.input.validate('value', validationOptions);

                    expect(formSchema.valid).toEqual(true);
                    expect(formSchema.invalid).toEqual(false);
                });

                it('should set invalid status on schema list item', () => {
                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'required', message: 'message' },
                        ]
                    });

                    formControl.validate('', validationOptions);

                    expect(formControl.valid).toEqual(false);
                    expect(formControl.invalid).toEqual(true);
                });

                it('should set valid status on schema list parent items', () => {
                    const formSchema = formBuilder.factory([], {
                        group: {
                            input: {
                                value: 'abc',
                                validators: [
                                    { rule: 'required' }
                                ]
                            }
                        }
                    }, true);

                    const validationOptions = {
                        getSchema: () => formSchema
                    };

                    formSchema.group.input.validate('value', validationOptions);

                    expect(formSchema.valid).toEqual(true);
                    expect(formSchema.invalid).toEqual(false);
                });

                it('should set invalid status on schema list parent items', () => {
                    const formSchema = formBuilder.factory([], {
                        group: {
                            input: {
                                value: 'abc',
                                validators: [
                                    { rule: 'required' }
                                ]
                            }
                        }
                    }, true);

                    const validationOptions = {
                        getSchema: () => formSchema
                    };

                    formSchema.group.input.validate('', validationOptions);

                    expect(formSchema.valid).toEqual(false);
                    expect(formSchema.invalid).toEqual(true);
                });

                it('should set dirty status on schema list item', () => {
                    const formControl = formBuilder.formControl(['input'], {
                        validators: [
                            { rule: 'required', message: 'message' },
                        ]
                    });

                    formControl.validate('', validationOptions);

                    expect(formControl.dirty).toEqual(true);
                    expect(formControl.pristine).toEqual(false);
                });
            });
        });

        describe('form()', () => {
            it('should be defined', () => {
                expect(formBuilder.form).toBeDefined();
            });

            (new FormBuilder()).reservedSchemaFields.forEach((field) => {
                it(`should throw error if schema.${field} is specified`, () => {
                    const schema = {
                        [field]: {}
                    };

                    expect(() => formBuilder.factory(schema)).toThrowError();
                });
            });

            [
                { description: 'Object schema', schema: {} },
                { description: 'Array schema', schema: [] }
            ].forEach(({ description, schema }) => {
                describe(description, () => {
                    it('should return an object', () => {
                        const form = formBuilder.form([], schema);

                        expect(form.constructor).toEqual(schema.constructor);
                    });

                    it('should include default form state', () => {
                        const form = formBuilder.form([], schema);

                        Object.keys(formBuilder.defaultFormState).forEach((property) => {
                            expect(form).toHaveProperty(property);
                            expect(form[property]).toEqual(formBuilder.defaultFormState[property]);
                        });
                    });

                    it('should have name', () => {
                        const form = formBuilder.form([], schema);

                        expect(form).toHaveProperty('name');
                    });

                    it('should have fields', () => {
                        const form = formBuilder.form([], schema);

                        expect(form).toHaveProperty('fields');
                        expect(form.fields).toEqual([]);
                    });

                    it('should construct id based on name nesting', () => {
                        const form = formBuilder.form(['a', 'b', 'c'], schema);

                        expect(form).toHaveProperty('name');
                        expect(form.name).toEqual('a.b.c');
                    });
                });
            });

            describe('Object schema', () => {
                it('should include schema', () => {
                    const form = formBuilder.form([], { value: {} });

                    expect(form).toHaveProperty('value');
                });

                it('should call factory() for each form property', () => {
                    const spy = jest.spyOn(formBuilder, 'factory');

                    formBuilder.form([], {
                        field: {},
                        group: {
                            field: {}
                        }
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenNthCalledWith(1,
                        ['field'], {}, false);
                    expect(spy).toHaveBeenNthCalledWith(2,
                        ['group'], expect.objectContaining({}), true);
                    expect(spy).toHaveBeenNthCalledWith(3,
                        ['group', 'field'], {}, false);
                });

                it('should call factory() -> formControl() for empty objects', () => {
                    const spy = jest.spyOn(formBuilder, 'formControl');

                    formBuilder.form([], {
                        field: {},
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(['field'], {});
                });


                it('should call factory() -> formControl() for objects with "validators" property', () => {
                    const spy = jest.spyOn(formBuilder, 'formControl');

                    formBuilder.form([], {
                        field: {
                            validators: []
                        },
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(['field'], { validators: [] });
                });

                it('should call factory() -> from() for group objects', () => {
                    const spy = jest.spyOn(formBuilder, 'form');

                    formBuilder.form([], {
                        group: {
                            field: {}
                        },
                    });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenLastCalledWith(['group'], expect.objectContaining({}));
                });

                describe('validate()', () => {
                    it('should be defined', () => {
                        const form = formBuilder.form([], {});

                        expect(form.validate).toBeDefined();
                    });

                    it('should iterate each key and apply validate based on whether it\'s a field or a group', () => {
                        const form = formBuilder.form([], {
                            input: {},
                            group: {
                                input: {}
                            }
                        });

                        const spy1 = jest.spyOn(form.input, 'validate');
                        const spy2 = jest.spyOn(form.group, 'validate');
                        const spy3 = jest.spyOn(form.group.input, 'validate');

                        form.validate({ getSchema: () => form });

                        expect(spy1).toHaveBeenCalled();
                        expect(spy2).toHaveBeenCalled();
                        expect(spy3).toHaveBeenCalled();
                    });
                });

                describe('set()', () => {
                    const instance = { $set: (target, key, value) => target[key] = value };

                    it('should be defined', () => {
                        const form = formBuilder.form([], {});

                        expect(form.set).toBeDefined();
                    });

                    it('should throw error if instance not provided', () => {
                        const form = formBuilder.form([], {});

                        expect(() => form.set('field', {})).toThrowError();
                    });

                    it('should call factory() method', () => {
                        const spy = jest.spyOn(formBuilder, 'factory');
                        const form = formBuilder.form([], {});

                        form.set('field', {}, { instance });

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenLastCalledWith(['field'], {}, undefined);
                    });

                    it('should set a new form control field', () => {
                        const form = formBuilder.form([], {});

                        form.set('field', { validators: [] }, { instance });

                        expect(form.field).toBeDefined();
                        expect(form.field).toEqual(expect.objectContaining({
                            name: 'field',
                            value: ''
                        }));
                        expect(form.fields).toEqual(['field']);
                    });

                    it('should set a new form group field', () => {
                        const form = formBuilder.form([], {});

                        form.set('group', {}, { instance, group: true });

                        expect(form.group).toBeDefined();
                        expect(form.group).toEqual(expect.objectContaining({
                            name: 'group'
                        }));
                        expect(form.group.set).toEqual(expect.any(Function));
                        expect(form.fields).toEqual(['group']);
                    });
                });
            });

            describe('Array schema', () => {
                it('should include schema', () => {
                    const form = formBuilder.form([], [{}]);

                    expect(form.length).toEqual(1);
                });

                it('should call factory() for each form property', () => {
                    const spy = jest.spyOn(formBuilder, 'factory');

                    formBuilder.form([], [
                        {},
                        [
                            {}
                        ]
                    ]);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenNthCalledWith(1,
                        ['0'], {}, false);
                    expect(spy).toHaveBeenNthCalledWith(2,
                        ['1'], expect.arrayContaining([]), true);
                    expect(spy).toHaveBeenNthCalledWith(3,
                        ['1', '0'], {}, false);
                });

                it('should call factory() -> formControl() for empty objects', () => {
                    const spy = jest.spyOn(formBuilder, 'formControl');

                    formBuilder.form([], [
                        {}
                    ]);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(['0'], {});
                });


                it('should call factory() -> formControl() for objects with "validators" property', () => {
                    const spy = jest.spyOn(formBuilder, 'formControl');

                    formBuilder.form([], [
                        {
                            validators: []
                        },
                    ]);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(['0'], { validators: [] });
                });

                it('should call factory() -> from() for group objects', () => {
                    const spy = jest.spyOn(formBuilder, 'form');

                    formBuilder.form([], [
                        {
                            field: {}
                        }
                    ]);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenLastCalledWith(['0'], expect.objectContaining({}));
                });

                describe('add()', () => {
                    it('should be defined', () => {
                        const form = formBuilder.form([], []);

                        expect(form.add).toBeDefined();
                    });

                    it('should call factory() method', () => {
                        const spy = jest.spyOn(formBuilder, 'factory');
                        const form = formBuilder.form([], []);

                        form.add({});

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenLastCalledWith([0], {}, undefined);
                    });

                    it('should push a new form control field', () => {
                        const form = formBuilder.form([], []);

                        form.add({ validators: [] });

                        expect(form[0]).toBeDefined();
                        expect(form[0]).toEqual(expect.objectContaining({
                            name: '0',
                            value: ''
                        }));
                        expect(form.fields).toEqual([0]);
                    });

                    it('should push a new form group field', () => {
                        const form = formBuilder.form([], []);

                        form.add({}, true);

                        expect(form[0]).toBeDefined();
                        expect(form[0]).toEqual(expect.objectContaining({
                            name: '0'
                        }));
                        expect(form.fields).toEqual([0]);
                    });
                });

                describe('remove()', () => {
                    it('should be defined', () => {
                        const form = formBuilder.form([], []);

                        expect(form.remove).toBeDefined();
                    });

                    it('should call factory() method', () => {
                        const spy = jest.spyOn(formBuilder, 'factory');
                        const form = formBuilder.form([], []);

                        form.remove(0, 0, {});

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenLastCalledWith([0], {}, undefined);
                    });

                    it('should add a new form control field at given index', () => {
                        const form = formBuilder.form([], [{}, {}]);

                        form.remove(1, 0, { value: 'new', validators: [] });

                        expect(form[1]).toBeDefined();
                        expect(form[1]).toEqual(expect.objectContaining({ name: '1', value: 'new' }));
                        expect(form.length).toEqual(3);
                    });

                    it('should add a new form control field name at given index', () => {
                        const form = formBuilder.form([], [{}, {}]);

                        form.remove(1, 0, { value: 'new', validators: [] });

                        expect(form.fields.length).toEqual(3);
                        expect(form.fields).toEqual(['0', '1', '2']);
                    });

                    it('should delete a form control field at given index', () => {
                        const form = formBuilder.form([], [{}, {}, {}]);

                        form.remove(1, 1);

                        expect(form.length).toEqual(2);
                        expect(form.fields).toEqual(['0', '1']);
                    });
                });
            });
        });

        describe('getSchemaList()', () => {
            it('should be defined', () => {
                expect(formBuilder.getSchemaList).toBeDefined();
            });

            it('should return schema list for direct input', () => {
                const inputSchema = { name: 'input' };
                const rootSchema = { input: inputSchema };
                const schemaList = formBuilder.getSchemaList(inputSchema, rootSchema);

                expect(schemaList).toEqual([inputSchema, rootSchema]);
                expect(schemaList.length).toEqual(2);
            });

            it('should return schema list for nested input', () => {
                const inputSchema = { name: 'group.input' };
                const groupSchema = { input: inputSchema };
                const rootSchema = { group: groupSchema };
                const schemaList = formBuilder.getSchemaList(inputSchema, rootSchema);

                expect(schemaList).toEqual([inputSchema, groupSchema, rootSchema]);
                expect(schemaList.length).toEqual(3);
            });

            it('should throw error if input doesn\'t exist in root schema', () => {
                const inputSchema = { name: 'input' };
                const rootSchema = {};

                expect(() => formBuilder.getSchemaList(inputSchema, rootSchema)).toThrowError();
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
