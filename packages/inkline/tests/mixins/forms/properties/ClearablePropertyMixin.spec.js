import { mount } from '@vue/test-utils'

import ClearablePropertyMixin from '@inkline/inkline/src/mixins/forms/properties/ClearablePropertyMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import FocusInputRefMethodMixin from '@inkline/inkline/src/mixins/forms/methods/FocusInputRefMethodMixin';

describe('Mixins', () => {
    describe('ClearablePropertyMixin', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount({
                data() {
                    return {
                        model: ''
                    };
                },
                props: {
                    currentValue: '',
                    focused: false,
                    hovered: false
                },
                mixins: [
                    ClearablePropertyMixin,
                    ClassesProviderMixin,
                    FocusInputRefMethodMixin
                ],
                template: `
                    <div>
                        <input ref="input" />
                    </div>
                `
            });
        });

        describe('props', () => {
            describe('clearable', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.clearable).toBeDefined();
                    expect(wrapper.vm.clearable).toEqual(false);
                });
            });
        });

        describe('computed', () => {
            describe('isClearable', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.isClearable).toBeDefined();
                });

                it('should return true if clearable, has value and is focused', () => {
                    wrapper.setProps({
                        clearable: true,
                        currentValue: 'value',
                        focused: true
                    });

                    expect(wrapper.vm.isClearable).toEqual(true);
                });

                it('should return true if clearable, has value and is hovered', () => {
                    wrapper.setProps({
                        clearable: true,
                        currentValue: 'value',
                        hovered: true
                    });

                    expect(wrapper.vm.isClearable).toEqual(true);
                });

                it('should return false if not clearable', () => {
                    wrapper.setProps({
                        clearable: false,
                        currentValue: 'value'
                    });

                    expect(wrapper.vm.isClearable).toEqual(false);
                });

                it('should return false if clearable, but value not set', () => {
                    wrapper.setProps({
                        clearable: true,
                        currentValue: ''
                    });

                    expect(wrapper.vm.isClearable).toEqual(false);
                });
            });
        });

        describe('methods', () => {
            describe('clear()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.clear).toBeDefined();
                });

                it('should emit "clear" event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.clear();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('clear');
                });

                it('should set "model" to empty string', () => {
                    wrapper.setProps({
                        model: 'value'
                    });

                    wrapper.vm.clear();

                    expect(wrapper.vm.model).toEqual('');
                });


                it('should focus input ref', () => {
                    const spy = jest.spyOn(wrapper.vm, 'focusInputRef');

                    wrapper.vm.clear();

                    expect(spy).toHaveBeenCalled();
                });
            });
        });


        describe('created()', () => {
            it('should add "-clearable" class to classes provider', () => {
                expect(wrapper.vm.classesProvider).toBeDefined();
                expect(wrapper.vm.classesProvider.length).toEqual(1);
            });

            it('should set "-clearable" class if "clearable" prop is true', () => {
                wrapper.setProps({
                    clearable: true
                });

                expect(wrapper.vm.classesProvider[0]()).toEqual({ '-clearable': true });
            });
        });
    });
});
