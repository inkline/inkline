import { render } from '@testing-library/vue';
import { INavbarBrand } from '@inkline/inkline/components';

describe('Components', () => {
    describe('INavbarBrand', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(INavbarBrand.name).toEqual('INavbarBrand');
        });

        it('should render correctly', () => {
            const wrapper = render(INavbarBrand, {
                props
            });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
