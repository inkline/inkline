import { mount } from '@vue/test-utils'

import CustomPropertyMixin from '@inkline/inkline/src/mixins/components/properties/CustomPropertyMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';

describe('Mixins', () => {
    describe('CustomPropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [
                    CustomPropertyMixin,
                    ClassesProviderMixin
                ]
            });
        });

        describe('props', () => {
            describe('custom', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.custom).toBeDefined();
                    expect(wrapper.vm.custom).toEqual(true);
                });
            });
        });

        describe('created()', () => {
            it('should add "-custom" class to classes provider', () => {
                expect(wrapper.vm.classesProvider).toBeDefined();
                expect(wrapper.vm.classesProvider.length).toEqual(1);
            });

            it('should set "-custom" class if "custom" prop is true', () => {
                wrapper.setProps({
                    custom: true
                });

                expect(wrapper.vm.classesProvider[0]()).toEqual({ '-custom': true });
            });
        });
    });
});
