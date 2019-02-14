import { shallowMount } from '@vue/test-utils';
import SelectOption from '@inkline/inkline/src/components/SelectOption';

describe('Components', () => {
    describe('SelectOption', () => {
        let wrapper;
        let parentWrapper;

        beforeEach(() => {
            wrapper = shallowMount(SelectOption);
            parentWrapper = shallowMount(SelectOption, {
                parentComponent: {
                    name: 'ISelect',
                    data() {
                        return { value: 'parentValue' }
                    },
                    template: '<div><slot></slot></div>'
                }
            });
        });

        it('should be named correctly', () => {
            expect(SelectOption.name).toEqual('ISelectOption');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual('');
                });
            });

            describe('label', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.label).toBeDefined();
                    expect(wrapper.vm.label).toEqual('');
                });
            });
        });

        describe('data()', () => {
            describe('parentFormGroupName', () => {
                it('should be defined', () => {
                    expect(wrapper.vm).toHaveProperty('parentFormGroupName');
                    expect(wrapper.vm.parentFormGroup).not.toBeDefined();
                });

                it('should be ISelect parent', () => {
                    expect(parentWrapper.vm.parentFormGroup).toBeDefined();
                });
            });
        });

        describe('computed', () => {
            describe('active()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.active).toBeDefined();
                });

                it('should be false if value not equal to ISelect value', () => {
                    parentWrapper.setProps({ value: 'other' });

                    expect(parentWrapper.vm.active).toEqual(false);
                });

                it('should be true if value equal to ISelect value', () => {
                    parentWrapper.setProps({ value: 'parentValue' });

                    expect(parentWrapper.vm.active).toEqual(true);
                });
            });
        });


    });
});
