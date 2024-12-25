import { render } from '@testing-library/vue';
import { LayoutAside } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('LayoutAside', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(LayoutAside.name).toEqual('LayoutAside');
        });

        it('should render correctly', () => {
            const wrapper = render(LayoutAside, {
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
