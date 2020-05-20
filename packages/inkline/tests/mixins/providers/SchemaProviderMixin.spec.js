import { mount } from '@vue/test-utils'

import SchemaProviderMixin from '@inkline/inkline/src/mixins/providers/SchemaProviderMixin';

describe('Mixins', () => {
    describe('SchemaProviderMixin', () => {
        let wrapper;

        beforeEach(() => {
            const Component = {
                render() {},
                props: {
                    parentForm: {
                        default: () => ({
                            add() {},
                            remove() {}
                        })
                    },
                    parentFormGroup: {
                        default: () => ({
                            $set() {}
                        })
                    }
                },
                mixins: [
                    SchemaProviderMixin,
                ]
            };

            wrapper = mount(Component, {
                methods: {
                    mounted: SchemaProviderMixin.mounted,
                    destroyed: SchemaProviderMixin.destroyed
                }
            });
        });

        describe('props', () => {
            describe('schema', () => {
                it('should be defined', () => {
                    expect(wrapper.vm).toHaveProperty('schema');
                });
            });
        });

        describe('mounted()', () => {
            it('should add component to parent form if schema and parent form provided', () => {
                const spy = jest.spyOn(wrapper.vm.parentForm, 'add');

                wrapper.setProps({ schema: true });
                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(wrapper.vm);
            });

            it('should not add component to parent form if parent form not provided', () => {
                const spy = jest.spyOn(wrapper.vm.parentForm, 'add');

                wrapper.setProps({ schema: true, parentForm: false });
                wrapper.vm.mounted();

                expect(spy).not.toHaveBeenCalled();
            });

            it('should not add component if schema not provided', () => {
                const spy = jest.spyOn(wrapper.vm.parentForm, 'add');

                wrapper.setProps({ schema: false });
                wrapper.vm.mounted();

                expect(spy).not.toHaveBeenCalled();
            });

            it('should set input schema for parent form group', () => {
                const spy = jest.spyOn(wrapper.vm, '$set');
                const schema = {};

                wrapper.setProps({ schema });
                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalledWith(wrapper.vm.parentFormGroup, 'inputSchema', schema);
            });

            it('should not set input schema if parent form group not provided', () => {
                const spy = jest.spyOn(wrapper.vm, '$set');
                const schema = {};

                wrapper.setProps({ schema, parentFormGroup: false });
                wrapper.vm.mounted();

                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe('destroyed()', () => {
            it('should remove component from parent form if schema and parent form provided', () => {
                const spy = jest.spyOn(wrapper.vm.parentForm, 'remove');

                wrapper.setProps({ schema: true });
                wrapper.vm.destroyed();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(wrapper.vm);
            });

            it('should not remove component if schema not provided', () => {
                const spy = jest.spyOn(wrapper.vm.parentForm, 'remove');

                wrapper.setProps({ schema: false });
                wrapper.vm.destroyed();

                expect(spy).not.toHaveBeenCalled();
            });
        });
    });
});
