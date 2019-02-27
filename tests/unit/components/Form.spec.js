import { shallowMount } from '@vue/test-utils';
import Form from '@inkline/inkline/src/components/Form';
import { $form } from '@inkline/inkline/src/prototypes/form'

describe('Components', () => {
    describe('Form', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Form, {
                methods: {
                    created: Form.created,
                    provide: Form.provide
                }
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

            describe('schema', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.schema).toBeDefined();
                    expect(wrapper.vm.schema).toEqual({});
                });
            });
        });

        describe('data()', () => {
            describe('validationOptions', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.validationOptions).toBeDefined();
                });

                it('should have getSchema() that returns form schema', () => {
                    const schema = {
                        input: {}
                    };

                    wrapper.setProps({ schema });

                    expect(wrapper.vm.validationOptions.getSchema).toEqual(expect.any(Function));
                    expect(wrapper.vm.validationOptions.getSchema()).toEqual(schema);
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
                wrapper.setProps({
                    schema: $form({
                        input: {},
                        group: {
                            input: {}
                        }
                    })
                });

                inputWrapper = shallowMount({
                    data () {
                        return {
                            name: 'input',
                            schema: {
                                validateOn: 'input',
                                $touch: () => ({}),
                                $validate: () => ({ errors: {}, valid: true })
                            }
                        }
                    },
                    render () {}
                });
            });

            describe('add()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.add).toBeDefined();
                });

                it('should add "blur" event listener to input', () => {
                    const spy = jest.spyOn(inputWrapper.vm, '$on');

                    wrapper.vm.add(inputWrapper.vm);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('blur', expect.any(Function));
                });

                it('should set the all schema tree entries as touched on "blur"', () => {
                    const spy = jest.spyOn(inputWrapper.vm.schema, '$touch');

                    wrapper.vm.add(inputWrapper.vm);
                    inputWrapper.vm.$emit('blur');

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(wrapper.vm.validationOptions);
                });

                it('should add the input schema\'s validateOn event listener to input', () => {
                    const spy = jest.spyOn(inputWrapper.vm, '$on');

                    wrapper.vm.add(inputWrapper.vm);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', expect.any(Function));
                });

                it('should call inputSchema $validate() on validateOn event', () => {
                    const spy = jest.spyOn(inputWrapper.vm.schema, '$validate');

                    wrapper.vm.add(inputWrapper.vm);
                    inputWrapper.vm.$emit('input', 10);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(10, wrapper.vm.validationOptions);
                });
            });

            describe('remove()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.remove).toBeDefined();
                });

                it('should add "blur" event listener to input', () => {
                    const spy = jest.spyOn(inputWrapper.vm, '$off');

                    wrapper.vm.remove(inputWrapper.vm);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenNthCalledWith(1, 'blur');
                    expect(spy).toHaveBeenNthCalledWith(2, inputWrapper.vm.schema.validateOn);
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
