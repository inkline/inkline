import { mount } from '@vue/test-utils'

import ModelGroupProviderMixin from 'inkline/mixins/forms/providers/ModelGroupProviderMixin';
import EmitInputMethodMixin from 'inkline/mixins/components/methods/EmitInputMethodMixin';

describe('Mixins', () => {
    describe('ModelGroupProviderMixin', () => {
        let wrapper;

        beforeEach(() => {
            const Component = {
                render() {},
                data() {
                    return {
                        isGrouped: false,
                        parentFormGroup: false
                    }
                },
                mixins: [
                    ModelGroupProviderMixin,
                    EmitInputMethodMixin
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
            describe('currentValue()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm).toHaveProperty('currentValue');
                });

                it('should return value if grouped', () => {
                    wrapper.setData({
                        isGrouped: true,
                    });
                    wrapper.setProps({
                        value: 'value'
                    });

                    expect(wrapper.vm.currentValue).toEqual('value');
                });

                it('should return value attribute if not grouped', () => {
                    wrapper.vm.$attrs.value = 'value';

                    expect(wrapper.vm.currentValue).toEqual('value');
                });
            });

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

                    it('should return value if not grouped', () => {
                        wrapper.setProps({
                            value: 'value'
                        });

                        expect(wrapper.vm.model).toEqual('value');
                    });
                });

                describe('set()', () => {
                    it('should emit "input" event with set value if not grouped', () => {
                        const spy = jest.spyOn(wrapper.vm, 'emitInput');
                        const spyEmit = jest.spyOn(wrapper.vm, '$emit');

                        wrapper.vm.model = 'value';

                        expect(spy).toHaveBeenCalled();
                        expect(spyEmit).toHaveBeenCalled();
                        expect(spy).toHaveBeenCalledWith('value');
                        expect(spyEmit).toHaveBeenCalledWith('input', 'value');
                    });

                    it('should emit "input" event from parent group with set value if grouped', () => {
                        wrapper.setData({
                            isGrouped: true,
                            parentFormGroup: {
                                emitInput: () => {}
                            }
                        });

                        const spy = jest.spyOn(wrapper.vm.parentFormGroup, 'emitInput');

                        wrapper.vm.model = 'value';

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenCalledWith('value');
                    });
                });
            });
        });
    });
});
