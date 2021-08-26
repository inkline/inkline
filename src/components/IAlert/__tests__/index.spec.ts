import { shallowMount } from '@vue/test-utils';
import { IAlert } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IAlert', () => {
        const props = {
            color: 'primary',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IAlert.name).toEqual('IAlert');
        });

        it('should render correctly', () => {
            const wrapper = shallowMount(IAlert, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should return classes object', () => {
                    const wrapper: any = shallowMount(IAlert, { props });

                    expect(wrapper.vm.classes).toEqual({
                        [`-${wrapper.vm.color}`]: true,
                        [`-${wrapper.vm.size}`]: true,
                        '-dismissible': false,
                        '-with-icon': false
                    });
                });
            });
        });

        describe('watch', () => {
            describe('modelValue', () => {
                it('should update dismissed', async () => {
                    const wrapper: any = shallowMount(IAlert, {
                        props: {
                            modelValue: true,
                            ...props
                        }
                    });

                    expect(wrapper.vm.dismissed).toEqual(false);
                    wrapper.setProps({ modelValue: false });
                    await wrapper.vm.$nextTick();
                    expect(wrapper.vm.dismissed).toEqual(true);
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
