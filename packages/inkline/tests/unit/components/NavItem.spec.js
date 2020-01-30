import { shallowMount } from '@vue/test-utils';
import NavItem from '@inkline/inkline/src/components/NavItem';

describe('Components', () => {
    describe('NavItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(NavItem);
        });

        it('should be named correctly', () => {
            expect(NavItem.name).toEqual('INavItem');
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
