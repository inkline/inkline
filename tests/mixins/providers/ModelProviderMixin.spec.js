import { mount } from '@vue/test-utils'

import ModelProviderMixin from '@inkline/inkline/src/mixins/providers/ModelProviderMixin';

describe('Mixins', () => {
    describe('ModelProviderMixin', () => {
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

                    it('should return schema value', () => {
                        wrapper.setProps({
                            schema: {
                                value: 'value'
                            }
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
