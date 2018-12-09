import { mount } from '@vue/test-utils'

import AttributesProviderMixin from 'inkline/mixins/components/providers/AttributesProviderMixin';
import ClassesProviderMixin from 'inkline/mixins/components/providers/ClassesProviderMixin';
import ReadonlyPropertyMixin from 'inkline/mixins/forms/properties/ReadonlyPropertyMixin';

describe('Mixins', () => {
    describe('ReadonlyPropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                data() {
                    return {
                        parentForm: {
                            isReadonly: false
                        },
                        parentFormGroup: {
                            isReadonly: false
                        }
                    };
                },
                render() {},
                mixins: [
                    AttributesProviderMixin,
                    ClassesProviderMixin,
                    ReadonlyPropertyMixin
                ]
            });
        });

        describe('props', () => {
            describe('readonly', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.readonly).toEqual(false);
                });
            });
        });

        describe('computed', () => {
            describe('isReadonly()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.isReadonly).toBeDefined();
                });

                it('should be "false" if component and parent form groups are not readonly', () => {
                    expect(wrapper.vm.isReadonly).toEqual(false);
                });

                it('should be "true" if component is "readonly"', () => {
                    wrapper.setProps({
                        readonly: true
                    });

                    expect(wrapper.vm.isReadonly).toEqual(true);
                });

                it('should be "true" if parentFormGroup is "readonly"', () => {
                    wrapper.setData({
                        parentFormGroup: {
                            isReadonly: true
                        }
                    });

                    expect(wrapper.vm.isReadonly).toEqual(true);
                });

                it('should be "true" if parentForm is "readonly"', () => {
                    wrapper.setData({
                        parentForm: {
                            isReadonly: true
                        }
                    });

                    expect(wrapper.vm.isReadonly).toEqual(true);
                });
            });
        });

        describe('created()', () => {
            it('should add "readonly" property to attributes provider', () => {
                expect(wrapper.vm.attributesProvider).toBeDefined();
                expect(wrapper.vm.attributesProvider.length).toEqual(1);
            });

            it('should set "readonly" attribute if "readonly" prop is true', () => {
                wrapper.setProps({
                    readonly: true
                });

                expect(wrapper.vm.attributesProvider[0]()).toEqual({ 'readonly': true });
            });
        });
    });
});
