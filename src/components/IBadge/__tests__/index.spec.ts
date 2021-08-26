import { shallowMount } from '@vue/test-utils';
import { IBadge } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IBadge', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(IBadge.name).toEqual('IBadge');
        });

        it('should render correctly', () => {
            const wrapper = shallowMount(IBadge, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should return classes object', () => {
                    const wrapper: any = shallowMount(IBadge, { props });

                    expect(wrapper.vm.classes).toEqual({
                        [`-${wrapper.vm.color}`]: true,
                        [`-${wrapper.vm.size}`]: true
                    });
                });
            });
        });
    });
});
