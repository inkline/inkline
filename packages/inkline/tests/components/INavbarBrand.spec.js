import { shallowMount } from '@vue/test-utils';
import { INavbarBrand } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('INavbarBrand', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(INavbarBrand);
        });

        it('should be named correctly', () => {
            expect(INavbarBrand.name).toEqual('INavbarBrand');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
