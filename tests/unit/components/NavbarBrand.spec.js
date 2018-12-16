import { shallowMount } from '@vue/test-utils';
import NavbarBrand from 'inkline/components/NavbarBrand';

describe('Components', () => {
    describe('NavbarBrand', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(NavbarBrand);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
