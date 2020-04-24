import { mount } from '@vue/test-utils'

import AttributesProviderMixin from '@inkline/inkline/src/mixins/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/providers/ClassesProviderMixin';
import DisabledPropertyMixin from '@inkline/inkline/src/mixins/properties/DisabledPropertyMixin';

describe('Mixins', () => {
    describe('DisabledPropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                render() {},
                mixins: [
                    AttributesProviderMixin,
                    ClassesProviderMixin,
                    DisabledPropertyMixin
                ]
            });
        });

        describe('props', () => {
            describe('disabled', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.disabled).toEqual(false);
                });
            });
        });

        describe('computed', () => {
            describe('isDisabled()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.isDisabled).toBeDefined();
                });

                it('should return the value of disabled property', () => {
                    expect(wrapper.vm.isDisabled).toEqual(wrapper.vm.disabled);

                    wrapper.setProps({
                        disabled: true
                    });

                    expect(wrapper.vm.isDisabled).toEqual(wrapper.vm.disabled);
                });
            });
        });

        describe('created()', () => {
            it('should add "-disabled" class to classes provider', () => {
                expect(wrapper.vm.classesProvider).toBeDefined();
                expect(wrapper.vm.classesProvider.length).toEqual(1);
            });

            it('should add "aria-disabled" property to classes provider', () => {
                expect(wrapper.vm.attributesProvider).toBeDefined();
                expect(wrapper.vm.attributesProvider.length).toEqual(1);
            });

            it('should set "-disabled" class if "disabled" prop is true', () => {
                wrapper.setProps({
                    disabled: true
                });

                expect(wrapper.vm.classesProvider[0]()).toEqual({ '-disabled': true });
            });

            it('should set "artia-disabled" attribute if "disabled" prop is true', () => {
                wrapper.setProps({
                    disabled: true
                });

                expect(wrapper.vm.attributesProvider[0]()).toEqual({ 'aria-disabled': 'true' });
            });
        });
    });
});
