import { render } from '@testing-library/vue';
import { NavbarBrand } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('NavbarBrand', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(NavbarBrand.name).toEqual('NavbarBrand');
        });

        it('should render correctly', () => {
            const wrapper = render(NavbarBrand, {
                props,
                global: {
                    provide: {
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
