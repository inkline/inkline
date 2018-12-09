import { mount } from '@vue/test-utils'

import ModelProviderMixin from 'inkline/mixins/forms/providers/ModelProviderMixin';

describe('Mixins', () => {
    describe('ModelProviderMixin', () => {
        let wrapper;

        beforeEach(() => {
            const Component = {
                render() {},
                mixins: [
                    ModelProviderMixin,
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
                    expect(wrapper.vm.currentValue).toBeDefined();
                    expect(wrapper.vm.currentValue).toEqual(wrapper.vm.value);
                });

                it('should return current value', () => {
                    wrapper.setProps({
                        value: 'value'
                    });

                    expect(wrapper.vm.currentValue).toEqual('value');
                });
            });

            describe('model()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.model).toBeDefined();
                });

                describe('get()', () => {
                    it('should return value', () => {
                        wrapper.setProps({
                            value: 'value'
                        });

                        expect(wrapper.vm.model).toEqual('value');
                    });
                });

                describe('set()', () => {
                    it('should emit "input" event with set value', () => {
                        const spy = jest.spyOn(wrapper.vm, '$emit');

                        wrapper.vm.model = 'value';

                        expect(spy).toHaveBeenCalled();
                        expect(spy).toHaveBeenCalledWith('input', 'value');
                    });
                });
            });
        });
    });
});
