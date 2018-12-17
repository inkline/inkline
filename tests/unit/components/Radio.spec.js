import { shallowMount } from '@vue/test-utils';
import Radio from 'inkline/components/Radio';

describe('Components', () => {
    describe('Radio', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Radio, {
                props: {
                    isGroupedOverride: {
                        type: Boolean,
                        default: false
                    }
                },
                computed: {
                    parentFormGroup() { return { value: 'value' }; },
                    isGrouped() {
                        return this.isGroupedOverride;
                    }
                }
            });
        });

        it('should be named correctly', () => {
            expect(Radio.name).toEqual('IRadio');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('currentValue()', () => {
                it('should return value attribute if not grouped', () => {
                    expect(wrapper.vm.currentValue).toEqual(undefined);
                });

                it('should return value property if grouped', () => {
                    wrapper.setProps({ value: 'valueProp', isGroupedOverride: true });
                    wrapper.vm.$attrs.value = 'valueAttr';

                    expect(wrapper.vm.currentValue).toEqual('valueProp');
                });
            });

            describe('checked()', () => {
                it('should return false if currentValue is not equal to model', () => {
                    wrapper.setProps({ value: 'other', isGroupedOverride: true });

                    expect(wrapper.vm.checked).toEqual(false);
                });

                it('should return true if currentValue is equal to model', () => {
                    wrapper.setProps({ value: 'value', isGroupedOverride: true });

                    expect(wrapper.vm.checked).toEqual(true);
                });
            });
        });
    });
});
