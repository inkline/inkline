import { shallowMount } from '@vue/test-utils';
import { IAlert } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IAlert', () => {
        it('should be named correctly', () => {
            expect(IAlert.name).toEqual('IAlert');
        });

        it('should render correctly', () => {
            const wrapper = shallowMount(IAlert);
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should return classes object', () => {
                    const wrapper: any = shallowMount(IAlert);

                    expect(wrapper.vm.classes).toEqual({
                        [`-${wrapper.vm.color}`]: true,
                        [`-${wrapper.vm.size}`]: true,
                        '-dismissible': false,
                        '-with-icon': false
                    });
                });
            });
        });

        describe('methods', () => {
            describe('dismiss()', () => {
                it('should emit update:modelValue with false', () => {
                    const wrapper: any = shallowMount(IAlert);

                    wrapper.vm.dismiss();

                    expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false]);
                });
            });
        });
    });
});
