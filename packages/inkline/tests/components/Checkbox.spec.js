import { shallowMount } from '@vue/test-utils';
import { ICheckbox } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ICheckbox', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ICheckbox);
        });

        it('should be named correctly', () => {
            expect(ICheckbox.name).toEqual('ICheckbox');
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

                it('should return true if model is equal to currentValue if Boolean', () => {
                    wrapper = shallowMount(ICheckbox, {
                        computed: {
                            currentValue() { return 'value'; },
                            model() { return 'value'; }
                        }
                    });

                    wrapper.setProps({ value: 'value' });
                    expect(wrapper.vm.checked).toEqual(true);
                });

                it('should return false if model and is not equal to currentValue if Boolean', () => {
                    wrapper = shallowMount(ICheckbox, {
                        computed: {
                            currentValue() { return 'value'; },
                            model() { return 'othervalue'; }
                        }
                    });

                    wrapper.setProps({ value: 'value' });
                    expect(wrapper.vm.checked).toEqual(false);
                });

                it('should return if value found in model if Array', () => {
                    wrapper = shallowMount(ICheckbox, {
                        computed: {
                            currentValue() { return 'value1' }
                        }
                    });
                    wrapper.setProps({ value: ['value1', 'value2'] });
                    expect(wrapper.vm.checked).toEqual(true);


                    wrapper = shallowMount(ICheckbox, {
                        computed: {
                            currentValue() { return 'value3' }
                        }
                    });
                    wrapper.setProps({ value: ['value1', 'value2'] });
                    expect(wrapper.vm.checked).toEqual(false);
                });

                it('should return if model is not defined', () => {
                    wrapper = shallowMount(ICheckbox, {
                        computed: {
                            currentValue() { return 'value'; },
                            model() { return null; }
                        }
                    });

                    wrapper.setProps({ value: 'value' });
                    expect(wrapper.vm.checked).toEqual(undefined);
                });
            });
        });
    });
});
