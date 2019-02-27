import { mount } from '@vue/test-utils'

import AttributesProviderMixin from '@inkline/inkline/src/mixins/components/providers/AttributesProviderMixin';

describe('Mixins', () => {
    describe('AttributesProviderMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render () {},
                mixins: [
                    AttributesProviderMixin,
                ]
            });
        });

        describe('data', () => {
            describe('attributesProvider', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.attributesProvider).toBeDefined();
                    expect(wrapper.vm.attributesProvider.constructor).toEqual(Array);
                });
            });
        });

        describe('methods', () => {
            describe('attributesProvider.add()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.attributesProvider.add).toBeDefined();
                });

                it('should add rule to attributes provider', () => {
                    wrapper.vm.attributesProvider.add(() => ({}));
                    expect(wrapper.vm.attributesProvider.length).toEqual(1);
                });

                it('should add multiple rules to attributes provider', () => {
                    wrapper.vm.attributesProvider.add(() => ({}));
                    wrapper.vm.attributesProvider.add(() => ({}));
                    expect(wrapper.vm.attributesProvider.length).toEqual(2);
                });
            });
        });

        describe('computed', () => {
            describe('attributes', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.attributes).toBeDefined();
                    expect(wrapper.vm.attributes).toEqual({});
                });

                it('should include inline attributes', () => {
                    wrapper.setProps({ id: 'example' });

                    expect(wrapper.vm.attributes).toHaveProperty('id');
                    expect(wrapper.vm.attributes.id).toEqual('example');
                });

                it('should evaluate added attribute rule', () => {
                    wrapper.vm.attributesProvider.add(() => ({ 'attr': 'value' }));

                    expect(wrapper.vm.attributes).toHaveProperty('attr');
                    expect(wrapper.vm.attributes.attr).toEqual('value');
                });

                it('should evaluate added attribute rules', () => {
                    wrapper.vm.attributesProvider.add(() => ({ 'attr1': 'value1' }));
                    wrapper.vm.attributesProvider.add(() => ({ 'attr2': 'value2' }));

                    expect(wrapper.vm.attributes).toHaveProperty('attr1');
                    expect(wrapper.vm.attributes.attr1).toEqual('value1');
                    expect(wrapper.vm.attributes).toHaveProperty('attr2');
                    expect(wrapper.vm.attributes.attr2).toEqual('value2');
                });
            });
        });
    });
});
