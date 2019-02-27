import { mount } from '@vue/test-utils'

import VariantPropertyMixin from '@inkline/inkline/src/mixins/components/properties/VariantPropertyMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

describe('Mixins', () => {
    describe('VariantPropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [
                    VariantPropertyMixin,
                    ClassesProviderMixin
                ]
            });
        });

        describe('props', () => {
            describe('variant', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.variant).toBeDefined();
                    expect(wrapper.vm.variant).toEqual('');
                });
            });
        });

        describe('created()', () => {
            it('should add variant class to classes provider', () => {
                expect(wrapper.vm.classesProvider).toBeDefined();
                expect(wrapper.vm.classesProvider.length).toEqual(1);
            });

            it(`should set "-variant" class`, () => {
                wrapper.setProps({
                    variant: 'primary'
                });

                expect(wrapper.vm.classesProvider[0]()).toEqual(`-primary`);
            });
        });
    });
});
