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
    });
});
