import { shallowMount } from '@vue/test-utils';
import Checkbox from 'inkline/components/Checkbox';

describe('Components', () => {
    describe('Checkbox', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Checkbox);
        });

        it('should be named correctly', () => {
            expect(Checkbox.name).toEqual('ICheckbox');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm).toHaveProperty('value');
                });
            });

            describe('indeterminate', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.indeterminate).toBeDefined();
                    expect(wrapper.vm.indeterminate).toEqual(false);
                });
            });
        });

        describe('computed', () => {
            describe('checked()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.checked).toBeDefined();
                });

                it('should return value of "model" if Boolean', () => {
                    wrapper = shallowMount(Checkbox, {
                        computed: {
                            currentValue() { return 'value'; }
                        }
                    });
                    wrapper.setProps({ value: 'value' });
                    expect(wrapper.vm.checked).toEqual(true);

                    wrapper = shallowMount(Checkbox, {
                        computed: {
                            currentValue() { return 'value'; }
                        }
                    });
                    wrapper.setProps({ value: 'other' });
                    expect(wrapper.vm.checked).toEqual(false);
                });

                it('should return if value found in "model" if Array', () => {
                    wrapper = shallowMount(Checkbox, {
                        computed: {
                            currentValue() { return 'value1' }
                        }
                    });
                    wrapper.setProps({ value: ['value1', 'value2'] });
                    expect(wrapper.vm.checked).toEqual(true);


                    wrapper = shallowMount(Checkbox, {
                        computed: {
                            currentValue() { return 'value3' }
                        }
                    });
                    wrapper.setProps({ value: ['value1', 'value2'] });
                    expect(wrapper.vm.checked).toEqual(false);
                });
            });
        });
    });
});
