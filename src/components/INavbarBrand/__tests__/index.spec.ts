import { render } from '@testing-library/vue';
import { INavbarBrand } from '@inkline/inkline/components';
import { InklineKey } from '@inkline/inkline/plugin';
import { createInkline } from '@inkline/inkline/__tests__/utils';

describe('Components', () => {
    describe('INavbarBrand', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(INavbarBrand.name).toEqual('INavbarBrand');
        });

        it('should render correctly', () => {
            const wrapper = render(INavbarBrand, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
