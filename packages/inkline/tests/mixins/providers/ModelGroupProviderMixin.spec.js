import { mount } from '@vue/test-utils'

import ModelGroupProviderMixin from '@inkline/inkline/src/mixins/providers/ModelGroupProviderMixin';

describe('Mixins', () => {
    describe('ModelGroupProviderMixin', () => {
        let wrapper;

        beforeEach(() => {
            const Component = {
                render() {},
                props: {
                    schema: {
                        type: Object,
                        default: () => null
                    }
                },
                data() {
                    return {
                        isGrouped: false,
                        parentFormGroup: false
                    }
                },
                mixins: [
                    ModelGroupProviderMixin
                ]
            };

            wrapper = mount(Component);
        });

        describe('props', () => {
            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual('');
                });
            });
        });

        describe('computed', () => {
            describe('model()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.model).toBeDefined();
                });

                describe('get()', () => {
                    it('should return parent form value if grouped', () => {
                        wrapper.setData({
                            isGrouped: true,
                            parentFormGroup: {
                                value: 'value'
                            }
                        });

                        expect(wrapper.vm.model).toEqual('value');
                    });

                    it('should return parent form schema value if grouped', () => {
                        wrapper.setData({
                            isGrouped: true,
                            parentFormGroup: {
                                schema: {
                                    value: 'value'
                                }
                            }
                        });

                        expect(wrapper.vm.model).toEqual('value');
                    });

                    it('should return value if not grouped', () => {
                        wrapper.setProps({
                            value: 'value'
                        });

                        expect(wrapper.vm.model).toEqual('value');
                    });

                    it('should return schema value if not grouped', () => {
                        wrapper.setProps({
                            schema: {
                                value: 'value'
                            }
                        });

                        expect(wrapper.vm.model).toEqual('value');
                    });
                });

                describe('set()', () => {
                    it('should emit "input" event with set value if not grouped', () => {
                        const spy = jest.spyOn(wrapper.vm, '$emit');
                        const spyEmit = jest.spyOn(wrapper.vm, '$emit');

                        wrapper.vm.model = 'value';

                        expect(spy).toHaveBeenCalled();
                        expect(spyEmit).toHaveBeenCalled();
                        expect(spy).toHaveBeenCalledWith('input', 'value');
                        expect(spyEmit).toHaveBeenCalledWith('input', 'value');
                    });

                    it('should emit "input" event from parent group with set value if grouped', () => {
                        wrapper.setData({
                            isGrouped: true,
                            parentFormGroup: {
                                $emit: () => {}
                            }
                        });

                        const spy = jest.spyOn(wrapper.vm.parentFormGroup, '$emit');

                        wrapper.vm.model = 'value';

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenCalledWith('input', 'value');
                    });
                });
            });
        });
    });
});
