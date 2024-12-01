import { render } from '@testing-library/vue';
import { LayoutFooter } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('LayoutFooter', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(LayoutFooter.name).toEqual('LayoutFooter');
        });

        it('should render correctly', () => {
            const wrapper = render(LayoutFooter, {
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
