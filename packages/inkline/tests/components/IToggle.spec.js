import { shallowMount } from '@vue/test-utils';
import { IToggle } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IToggle', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IToggle);
        });

        it('should be named correctly', () => {
            expect(IToggle.name).toEqual('IToggle');
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
        });

        describe('methods', () => {
            describe('onChange()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onChange).toBeDefined();
                });

                it('should emit input event with event target checked', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.onChange({
                        target: {
                            checked: true
                        }
                    });

                    expect(spy).toHaveBeenCalledWith('input', true);
                });

                it('should not emit input event if disabled', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ disabled: true });

                    wrapper.vm.onChange();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should not emit input event if readonly', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ readonly: true });

                    wrapper.vm.onChange();

                    expect(spy).not.toHaveBeenCalled();
                });
            });
        });
    });
});
