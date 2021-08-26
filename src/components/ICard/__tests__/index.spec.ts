import { shallowMount } from '@vue/test-utils';
import { ICard } from '@inkline/inkline/components';

describe('Components', () => {
    describe('ICard', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(ICard.name).toEqual('ICard');
        });

        it('should render correctly', () => {
            const wrapper = shallowMount(ICard, { props });
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should return classes object', () => {
                    const wrapper: any = shallowMount(ICard, { props });

                    expect(wrapper.vm.classes).toEqual({
                        [`-${wrapper.vm.color}`]: true,
                        [`-${wrapper.vm.size}`]: true
                    });
                });
            });
        });
    });
});
