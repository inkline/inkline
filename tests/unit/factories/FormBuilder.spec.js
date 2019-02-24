import { FormBuilder } from "@inkline/inkline/factories/FormBuilder";

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

            it('should have $name', () => {
                const formControl = formBuilder.formControl([], {});

                expect(formControl).toHaveProperty('$name');
            });

            it('should construct $name based on name nesting', () => {
                const formControl = formBuilder.formControl(['a', 'b', 'c'], {});

                expect(formControl).toHaveProperty('$name');
                expect(formControl.$name).toEqual('a.b.c');
            });

            describe('$validate()', () => {
                const validationOptions = {
                    getSchema: () => formBuilder.factory([], {
                        group: {
                            input: {
                                value: 'abc'
                            }
                        }
                    }, true)
                };

                it('should be defined', () => {
                    const formControl = formBuilder.formControl([], {});

                    expect(formControl.$validate).toBeDefined();
                });

                it('should return valid and empty errors object without validators', () => {
                    const formControl = formBuilder.formControl([], {});
                    const validation = formControl.$validate('', validationOptions);

                    expect(validation).toEqual({
                        valid: true,
                        errors: {
                            length: 0
                        }
                    });
                });

                it('should throw error if invalid validator rule provided', () => {
                    const formControl = formBuilder.formControl([], {
                        validators: [
                            { rule: 'invalidrule' }
                        ]
                    });

                    expect(() => (formControl.$validate('', validationOptions))).toThrow();
                });

                it('should call each validator rule', () => {
                    formBuilder.validators['rule1'] = jest.fn();
                    formBuilder.validators['rule2'] = jest.fn();

                    const spy1 = jest.spyOn(formBuilder.validators, 'rule1');
                    const spy2 = jest.spyOn(formBuilder.validators, 'rule2');

                    const formControl = formBuilder.formControl([], {
                        validators: [
                            { rule: 'rule1' },
                            { rule: 'rule2' }
                        ]
                    });
                    formControl.$validate('value', validationOptions);

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

                    const formControl = formBuilder.formControl([], {
                        validators: [
                            { rule: 'rule1', enabled: false },
                            { rule: 'rule2' }
                        ]
                    });
                    formControl.$validate('value', validationOptions);

                    expect(spy1).not.toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalled();
                    expect(spy2).toHaveBeenCalledWith('value', {
                        enabled: true, rule: "rule2"
                    }, validationOptions);
                });

                it('should return valid if 1/1 rule is valid', () => {
                    formBuilder.validators['test'] = jest.fn()
                        .mockImplementation(() => true);

                    const formControl = formBuilder.formControl([], {
                        validators: [
                            { rule: 'test' }
                        ]
                    });
                    const validation = formControl.$validate('value', validationOptions);

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

                    const formControl = formBuilder.formControl([], {
                        validators: [
                            { rule: 'test1' },
                            { rule: 'test2' }
                        ]
                    });
                    const validation = formControl.$validate('value', validationOptions);

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

                    const formControl = formBuilder.formControl([], {
                        validators: [
                            { rule: 'test', message: 'Invalid' }
                        ]
                    });
                    const validation = formControl.$validate('value', validationOptions);

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

                    const formControl = formBuilder.formControl([], {
                        validators: [
                            { rule: 'test1', message: 'Valid' },
                            { rule: 'test2', message: 'Invalid' }
                        ]
                    });
                    const validation = formControl.$validate('value', validationOptions);

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

                    const formControl = formBuilder.formControl([], {
                        validators: [
                            { rule: 'test1', message: 'Invalid 1' },
                            { rule: 'test2', message: 'Invalid 2' }
                        ]
                    });
                    const validation = formControl.$validate('value', validationOptions);

                    expect(validation).toEqual({
                        valid: false,
                        errors: {
                            test1: 'Invalid 1',
                            test2: 'Invalid 2',
                            length: 2
                        }
                    });
                });
            });
        });

        describe('form()', () => {
            it('should be defined', () => {
                expect(formBuilder.form).toBeDefined();
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

                    it('should have $name', () => {
                        const form = formBuilder.form([], schema);

                        expect(form).toHaveProperty('$name');
                    });

                    it('should construct $name based on name nesting', () => {
                        const form = formBuilder.form(['a', 'b', 'c'], schema);

                        expect(form).toHaveProperty('$name');
                        expect(form.$name).toEqual('a.b.c');
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

                describe('$set()', () => {
                    const instance = { $set: (target, key, value) => target[key] = value };

                    it('should be defined', () => {
                        const form = formBuilder.form([], {});

                        expect(form.$set).toBeDefined();
                    });

                    it('should throw error if instance not provided', () => {
                        const form = formBuilder.form([], {});

                        expect(() => form.$set('field', {})).toThrowError();
                    });

                    it('should call factory() method', () => {
                        const spy = jest.spyOn(formBuilder, 'factory');
                        const form = formBuilder.form([], {});

                        form.$set('field', {}, { instance });

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenLastCalledWith(['field'], {}, undefined);
                    });

                    it('should set a new form control field', () => {
                        const form = formBuilder.form([], {});

                        form.$set('field', { validators: [] }, { instance });

                        expect(form.field).toBeDefined();
                        expect(form.field).toEqual(expect.objectContaining({
                            $name: 'field',
                            value: ''
                        }));
                    });

                    it('should set a new form group field', () => {
                        const form = formBuilder.form([], {});

                        form.$set('group', {}, { instance, group: true });

                        expect(form.group).toBeDefined();
                        expect(form.group).toEqual(expect.objectContaining({
                            $name: 'group'
                        }));
                        expect(form.group.$set).toEqual(expect.any(Function));
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

                describe('$push()', () => {
                    it('should be defined', () => {
                        const form = formBuilder.form([], []);

                        expect(form.$push).toBeDefined();
                    });

                    it('should call factory() method', () => {
                        const spy = jest.spyOn(formBuilder, 'factory');
                        const form = formBuilder.form([], []);

                        form.$push({});

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenLastCalledWith([0], {}, undefined);
                    });

                    it('should push a new form control field', () => {
                        const form = formBuilder.form([], []);

                        form.$push({ validators: [] });

                        expect(form[0]).toBeDefined();
                        expect(form[0]).toEqual(expect.objectContaining({
                            $name: '0',
                            value: ''
                        }));
                    });

                    it('should push a new form group field', () => {
                        const form = formBuilder.form([], []);

                        form.$push({}, true);

                        expect(form[0]).toBeDefined();
                        expect(form[0]).toEqual(expect.objectContaining({
                            $name: '0'
                        }));
                    });
                });

                describe('$splice()', () => {
                    it('should be defined', () => {
                        const form = formBuilder.form([], []);

                        expect(form.$splice).toBeDefined();
                    });

                    it('should call factory() method', () => {
                        const spy = jest.spyOn(formBuilder, 'factory');
                        const form = formBuilder.form([], []);

                        form.$splice(0, 0, {});

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenLastCalledWith([0], {}, undefined);
                    });

                    it('should add a new form control field at chosen index', () => {
                        const form = formBuilder.form([], [{}, {}]);

                        form.$splice(1, 0, { value: 'new', validators: [] });

                        expect(form[1]).toBeDefined();
                        expect(form[1]).toEqual(expect.objectContaining({
                            $name: '1',
                            value: 'new'
                        }));
                        expect(form.length).toEqual(3);
                    });

                    it('should set form name using current schema length', () => {
                        const form = formBuilder.form([], [{}, {}, {}]);

                        form.$splice(1, 0, { value: 'new', validators: [] });

                        expect(form.length).toEqual(4);
                        expect(form[0]).toEqual(expect.objectContaining({ $name: '0', value: '' }));
                        expect(form[1]).toEqual(expect.objectContaining({ $name: '1', value: 'new' }));
                        expect(form[2]).toEqual(expect.objectContaining({ $name: '2', value: '' }));
                        expect(form[3]).toEqual(expect.objectContaining({ $name: '3', value: '' }));
                    });

                });
            });
        });

        // describe('getSchemaTree()', () => {
        //     it('should be defined', () => {
        //         expect(formBuilder.getSchemaTree).toBeDefined();
        //     });
        //
        //     it('should return schema tree from input', () => {
        //         const schemaTree = formBuilder.getSchemaTree(inputWrapper.vm);
        //
        //         expect(schemaTree).toEqual([wrapper.vm.schema, inputWrapper.vm.schema]);
        //         expect(schemaTree.length).toEqual(2);
        //     });
        //
        //     it('should return schema tree from nested input', () => {
        //         inputWrapper.setData({ name: 'group.input' });
        //
        //         const schemaTree = wrapper.vm.getSchemaTree(inputWrapper.vm);
        //
        //         expect(schemaTree).toEqual([wrapper.vm.schema, wrapper.vm.schema.group, inputWrapper.vm.schema]);
        //         expect(schemaTree.length).toEqual(3);
        //     });
            //
            // it('should set the all schema tree entries as touched on "blur"', () => {
            //     inputWrapper.setData({ name: 'group.input' });
            //     const schemaTree = wrapper.vm.getSchemaTree(inputWrapper.vm);
            //
            //     wrapper.vm.add(inputWrapper.vm);
            //     inputWrapper.vm.$emit('blur');
            //
            //     schemaTree.forEach((schema) => {
            //         expect(schema.touched).toEqual(true);
            //         expect(schema.untouched).toEqual(false);
            //     });
            // });
            //
            // it('should add the input schema\'s validateOn event listener to input', () => {
            //     const spy = jest.spyOn(inputWrapper.vm, '$on');
            //
            //     wrapper.vm.add(inputWrapper.vm);
            //
            //     expect(spy).toHaveBeenCalled();
            //     expect(spy).toHaveBeenCalledWith('input', expect.any(Function));
            // });
            //
            // it('should set all schema tree entries as dirty and valid on validateOn event', () => {
            //     inputWrapper.setData({ name: 'group.input' });
            //     const schemaTree = wrapper.vm.getSchemaTree(inputWrapper.vm);
            //
            //     wrapper.vm.add(inputWrapper.vm);
            //     inputWrapper.vm.$emit(inputWrapper.vm.schema.validateOn, true);
            //
            //     schemaTree.forEach((schema) => {
            //         expect(schema.errors).toEqual({});
            //         expect(schema.valid).toEqual(true);
            //         expect(schema.invalid).toEqual(false);
            //         expect(schema.dirty).toEqual(true);
            //         expect(schema.pristine).toEqual(false);
            //     });
            // });
        // });
    });
});
