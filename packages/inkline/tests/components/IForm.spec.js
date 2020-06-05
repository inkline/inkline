import { shallowMount } from '@vue/test-utils';
import { IForm } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IForm', () => {
        let wrapper;

        const $inkline = {
            config: {
                validation: {
                    on: ['input']
                }
            }
        };

        beforeEach(() => {
            wrapper = shallowMount(IForm, {
                methods: {
                    created: IForm.created,
                    provide: IForm.provide
                },
                mocks: {
                    $inkline
                },
            });
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('inline', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.inline).toBeDefined();
                    expect(wrapper.vm.inline).toEqual(false);
                });
            });

            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual(null);
                });
            });
        });

        describe('provide()', () => {
            it('should return object containing parentForm as current instance', () => {
                expect(wrapper.vm.provide()).toEqual({ parentForm: wrapper.vm });
            });
        });

        describe('methods', () => {
            let inputWrapper;

            beforeEach(() => {
                jest.clearAllMocks();

                wrapper.setProps({
                    value: {
                        input: {
                            validateOn: 'input',
                            touch: () => ({}),
                            validate: () => ({ errors: {}, valid: true })
                        },
                        group: {
                            input: {}
                        }
                    }
                });

                inputWrapper = shallowMount({
                    data () {
                        return {
                            name: 'input',
                            schema: wrapper.vm.value.input
                        }
                    },
                    render () {},
                });
            });

            describe('getSchema()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.getSchema).toBeDefined();
                });

                it('should return form schema', () => {
                    const schema = {
                        input: {}
                    };

                    wrapper.setProps({ value: schema });

                    expect(wrapper.vm.getSchema()).toEqual(schema);
                });
            });

            describe('onFormControlInput()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onFormControlInput).toBeDefined();
                });

                it('should return a function', () => {
                    expect(wrapper.vm.onFormControlInput(inputWrapper.vm)).toEqual(expect.any(Function));
                });

                it('should set form control schema value', () => {
                    const callback = wrapper.vm.onFormControlInput(inputWrapper.vm);
                    const value = 'abc';

                    callback(value);

                    expect(inputWrapper.vm.schema.value).toEqual(value);
                    expect(wrapper.vm.value.input.value).toEqual('abc');
                });

                it('should emit input event', () => {
                    const callback = wrapper.vm.onFormControlInput(inputWrapper.vm);
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    callback('abc');

                    expect(spy).toHaveBeenCalledWith('input', wrapper.vm.value);
                });
            });

            describe('onFormControlBlur()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onFormControlBlur).toBeDefined();
                });

                it('should return a function', () => {
                    expect(wrapper.vm.onFormControlBlur(inputWrapper.vm)).toEqual(expect.any(Function));
                });

                it('should emit input event', () => {
                    const callback = wrapper.vm.onFormControlBlur(inputWrapper.vm);
                    const spy = jest.spyOn(inputWrapper.vm.schema, 'touch');

                    callback('abc');

                    expect(spy).toHaveBeenCalledWith({ getSchema: wrapper.vm.getSchema });
                });
            });

            describe('onFormControlValidate()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onFormControlValidate).toBeDefined();
                });

                it('should return a function with existing event', () => {
                    expect(wrapper.vm.onFormControlValidate(inputWrapper.vm, 'input')).toEqual(expect.any(Function));
                });

                it('should return a function custom event', () => {
                    expect(wrapper.vm.onFormControlValidate(inputWrapper.vm, 'custom')).toEqual(expect.any(Function));
                });

                it('should call form control validate function', () => {
                    const callback = wrapper.vm.onFormControlValidate(inputWrapper.vm);
                    const spy = jest.spyOn(inputWrapper.vm.schema, 'validate');
                    const value = 'abc';

                    callback(value);

                    expect(spy).toHaveBeenCalledWith(value, { getSchema: wrapper.vm.getSchema });
                });

                it('should emit validate event', () => {
                    const callback = wrapper.vm.onFormControlValidate(inputWrapper.vm);
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    callback('abc');

                    expect(spy).toHaveBeenCalledWith('validate', wrapper.vm.value);
                });
            });

            describe('getFormControlValidationEvents()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.getFormControlValidationEvents).toBeDefined();
                });

                it('should return a form control validation event as array', () => {
                    const validateOn = 'input';

                    inputWrapper.setProps({
                        schema: {
                            validateOn
                        }
                    });

                    const events = wrapper.vm.getFormControlValidationEvents(inputWrapper.vm);

                    expect(events).toEqual([validateOn]);
                });

                it('should return a form control\'s multiple validation events as array', () => {
                    const validateOn = ['input', 'blur'];

                    inputWrapper.setData({
                        schema: {
                            validateOn
                        }
                    });

                    const events = wrapper.vm.getFormControlValidationEvents(inputWrapper.vm);

                    expect(events).toEqual(validateOn);
                });

                it('should return default validation event if validateOn not specified', (done) => {
                    inputWrapper.setData({
                        schema: {
                            validateOn: null
                        }
                    });

                    inputWrapper.vm.$inkline = {
                        config: {
                            validation: {
                                validateOn: ['input']
                            }
                        }
                    };

                    inputWrapper.vm.$nextTick(() => {
                        const events = wrapper.vm.getFormControlValidationEvents(inputWrapper.vm);

                        expect(events).toEqual(wrapper.vm.$inkline.config.validation.validateOn);

                        done();
                    });
                });
            });

            describe('add()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.add).toBeDefined();
                });

                it('should add "input" event listener to form control', () => {
                    const formSpy = jest.spyOn(wrapper.vm, 'onFormControlInput');
                    const inputSpy = jest.spyOn(inputWrapper.vm, '$on');

                    wrapper.vm.add(inputWrapper.vm);

                    expect(formSpy).toHaveBeenCalled();
                    expect(inputSpy).toHaveBeenNthCalledWith(1, 'input', expect.any(Function));
                });

                it('should add "blur" event listener to form control', () => {
                    const formSpy = jest.spyOn(wrapper.vm, 'onFormControlBlur');
                    const inputSpy = jest.spyOn(inputWrapper.vm, '$on');

                    wrapper.vm.add(inputWrapper.vm);

                    expect(formSpy).toHaveBeenCalled();
                    expect(inputSpy).toHaveBeenNthCalledWith(2, 'blur', expect.any(Function));
                });

                it('should add validation event listener to form control', () => {
                    const formSpy1 = jest.spyOn(wrapper.vm, 'getFormControlValidationEvents');
                    const formSpy2 = jest.spyOn(wrapper.vm, 'onFormControlValidate');
                    const inputSpy = jest.spyOn(inputWrapper.vm, '$on');

                    wrapper.vm.add(inputWrapper.vm);

                    expect(formSpy1).toHaveBeenCalled();
                    expect(formSpy2).toHaveBeenCalled();
                    expect(inputSpy).toHaveBeenNthCalledWith(1, 'input', expect.any(Function));
                });


                it('should set the all schema tree entries as touched on "blur"', () => {
                    const spy = jest.spyOn(inputWrapper.vm.schema, 'touch');

                    wrapper.vm.add(inputWrapper.vm);
                    inputWrapper.vm.$emit('blur');

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith({ getSchema: wrapper.vm.getSchema });
                });

                it('should add the input schema\'s validateOn event listener to input', () => {
                    const spy = jest.spyOn(inputWrapper.vm, '$on');

                    wrapper.vm.add(inputWrapper.vm);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', expect.any(Function));
                });

                it('should add the input schema\'s multiple validateOn event listeners to input', () => {
                    const spy = jest.spyOn(inputWrapper.vm, '$on');

                    inputWrapper.vm.schema.validateOn = ['input', 'blur'];
                    wrapper.vm.add(inputWrapper.vm);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', expect.any(Function));
                    expect(spy).toHaveBeenCalledWith('blur', expect.any(Function));
                });

                it('should add the input schema\'s custom event listeners to input', () => {
                    const spy = jest.spyOn(inputWrapper.vm, '$on');

                    inputWrapper.vm.schema.validateOn = ['custom'];
                    wrapper.vm.add(inputWrapper.vm);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('custom', expect.any(Function));
                });

                it('should call inputSchema validate() on validateOn event', () => {
                    const spy = jest.spyOn(inputWrapper.vm.schema, 'validate');

                    wrapper.vm.add(inputWrapper.vm);
                    inputWrapper.vm.$emit('input', 10);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(10, { getSchema: wrapper.vm.getSchema });
                });
            });

            describe('remove()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.remove).toBeDefined();
                });

                it('should remove "input" event listener to form control', () => {
                    const formSpy = jest.spyOn(wrapper.vm, 'onFormControlInput');
                    const inputSpy = jest.spyOn(inputWrapper.vm, '$off');

                    wrapper.vm.remove(inputWrapper.vm);

                    expect(formSpy).toHaveBeenCalled();
                    expect(inputSpy).toHaveBeenNthCalledWith(1, 'input', expect.any(Function));
                });

                it('should remove "blur" event listener to form control', () => {
                    const formSpy = jest.spyOn(wrapper.vm, 'onFormControlBlur');
                    const inputSpy = jest.spyOn(inputWrapper.vm, '$off');

                    wrapper.vm.remove(inputWrapper.vm);

                    expect(formSpy).toHaveBeenCalled();
                    expect(inputSpy).toHaveBeenNthCalledWith(2, 'blur', expect.any(Function));
                });

                it('should remove validation event listener to form control', () => {
                    const formSpy1 = jest.spyOn(wrapper.vm, 'getFormControlValidationEvents');
                    const formSpy2 = jest.spyOn(wrapper.vm, 'onFormControlValidate');
                    const inputSpy = jest.spyOn(inputWrapper.vm, '$off');

                    wrapper.vm.remove(inputWrapper.vm);

                    expect(formSpy1).toHaveBeenCalled();
                    expect(formSpy2).toHaveBeenCalled();
                    expect(inputSpy).toHaveBeenNthCalledWith(1, 'input', expect.any(Function));
                });
            });
        });

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-inline" class if "inline" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-inline': false }));
                wrapper.setProps({ inline: true });
                expect(rule()).toEqual(expect.objectContaining({ '-inline': true }));
            });
        });
    });
});
