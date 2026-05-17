import { render } from '@testing-library/vue';
import { LayoutHeader } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('LayoutHeader', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(LayoutHeader.name).toEqual('LayoutHeader');
        });

        it('should render correctly', () => {
            const wrapper = render(LayoutHeader, {
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
