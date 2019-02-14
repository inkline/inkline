import { mount } from '@vue/test-utils'

import AttributesProviderMixin from '@inkline/inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/mixins/components/providers/ClassesProviderMixin';
import DisabledPropertyMixin from '@inkline/inkline/mixins/forms/properties/DisabledPropertyMixin';

describe('Mixins', () => {
    describe('DisabledPropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                data() {
                    return {
                        parentForm: {
                            isDisabled: false
                        },
                        parentFormGroup: {
                            isDisabled: false
                        }
                    };
                },
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

                it('should be "false" if component and parent form groups are not disabled', () => {
                    expect(wrapper.vm.isDisabled).toEqual(false);
                });

                it('should be "true" if component is "disabled"', () => {
                    wrapper.setProps({
                        disabled: true
                    });

                    expect(wrapper.vm.isDisabled).toEqual(true);
                });

                it('should be "true" if parentFormGroup is "disabled"', () => {
                    wrapper.setData({
                        parentFormGroup: {
                            isDisabled: true
                        }
                    });

                    expect(wrapper.vm.isDisabled).toEqual(true);
                });

                it('should be "true" if parentForm is "disabled"', () => {
                    wrapper.setData({
                        parentForm: {
                            isDisabled: true
                        }
                    });

                    expect(wrapper.vm.isDisabled).toEqual(true);
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

            it('should set "aria-disabled" attribute if "disabled" prop is true', () => {
                wrapper.setProps({
                    disabled: true
                });

                expect(wrapper.vm.attributesProvider[0]()).toEqual({ 'aria-disabled': 'true' });
            });
        });
    });
});
