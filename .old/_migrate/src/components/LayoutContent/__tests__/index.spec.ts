import { render } from '@testing-library/vue';
import { LayoutContent } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('LayoutContent', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(LayoutContent.name).toEqual('LayoutContent');
        });

        it('should render correctly', () => {
            const wrapper = render(LayoutContent, {
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
