import { shallowMount } from '@vue/test-utils';
import Form from '@inkline/inkline/components/Form';
import { $form } from '@inkline/inkline/prototypes/form'

describe('Components', () => {
    describe('Form', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Form, {
                methods: {
                    created: Form.created
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
                                $validate: () => ({ errors: {}, valid: true })
                            }
                        }
                    },
                    render () {}
                });
            });

            describe('getSchemaTree()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.getSchemaTree).toBeDefined();
                });

                it('should return schema tree from input', () => {
                    const schemaTree = wrapper.vm.getSchemaTree(inputWrapper.vm);

                    expect(schemaTree).toEqual([wrapper.vm.schema, inputWrapper.vm.schema]);
                    expect(schemaTree.length).toEqual(2);
                });

                it('should return schema tree from nested input', () => {
                    inputWrapper.setData({ name: 'group.input' });

                    const schemaTree = wrapper.vm.getSchemaTree(inputWrapper.vm);

                    expect(schemaTree).toEqual([wrapper.vm.schema, wrapper.vm.schema.group, inputWrapper.vm.schema]);
                    expect(schemaTree.length).toEqual(3);
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
                    inputWrapper.setData({ name: 'group.input' });
                    const schemaTree = wrapper.vm.getSchemaTree(inputWrapper.vm);

                    wrapper.vm.add(inputWrapper.vm);
                    inputWrapper.vm.$emit('blur');

                    schemaTree.forEach((schema) => {
                        expect(schema.touched).toEqual(true);
                        expect(schema.untouched).toEqual(false);
                    });
                });

                it('should add the input schema\'s validateOn event listener to input', () => {
                    const spy = jest.spyOn(inputWrapper.vm, '$on');

                    wrapper.vm.add(inputWrapper.vm);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', expect.any(Function));
                });

                it('should set all schema tree entries as dirty and valid on validateOn event', () => {
                    inputWrapper.setData({ name: 'group.input' });
                    const schemaTree = wrapper.vm.getSchemaTree(inputWrapper.vm);

                    wrapper.vm.add(inputWrapper.vm);
                    inputWrapper.vm.$emit(inputWrapper.vm.schema.validateOn, true);

                    schemaTree.forEach((schema) => {
                        expect(schema.errors).toEqual({});
                        expect(schema.valid).toEqual(true);
                        expect(schema.invalid).toEqual(false);
                        expect(schema.dirty).toEqual(true);
                        expect(schema.pristine).toEqual(false);
                    });
                });

                it('should emit validate event on validateOn event', () => {
                    const spy = jest.spyOn(inputWrapper.vm, '$emit');

                    inputWrapper.setData({ name: 'group.input' });
                    wrapper.vm.add(inputWrapper.vm);
                    inputWrapper.vm.$emit(inputWrapper.vm.schema.validateOn, true);

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('submit', expect.any(Function));
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
