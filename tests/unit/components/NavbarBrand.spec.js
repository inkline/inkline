import { shallowMount } from '@vue/test-utils';
import NavbarBrand from '@inkline/inkline/src/components/NavbarBrand';

describe('Components', () => {
    describe('NavbarBrand', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(NavbarBrand);
        });

        it('should be named correctly', () => {
            expect(NavbarBrand.name).toEqual('INavbarBrand');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
