import { shallowMount } from '@vue/test-utils';
import { INavItem } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('INavItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(INavItem);
        });

        it('should be named correctly', () => {
            expect(INavItem.name).toEqual('INavItem');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('methods', () => {
            describe('onClick', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onClick).toBeDefined();
                });

                it('should dispatch item-click event to INav', () => {
                    const spy = jest.spyOn(wrapper.vm, 'dispatch');

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('INav', 'item-click', wrapper.vm);
                });
            });
        });
    });
});
