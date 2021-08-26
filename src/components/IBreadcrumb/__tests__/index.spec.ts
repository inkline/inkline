import { shallowMount } from '@vue/test-utils';
import { IBreadcrumb } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IBreadcrumb', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IBreadcrumb.name).toEqual('IBreadcrumb');
        });

        it('should render correctly', () => {
            const wrapper = shallowMount(IBreadcrumb, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should return classes object', () => {
                    const wrapper: any = shallowMount(IBreadcrumb, { props });

                    expect(wrapper.vm.classes).toEqual({
                        [`-${wrapper.vm.color}`]: true,
                        [`-${wrapper.vm.size}`]: true
                    });
                });
            });
        });
    });
});
