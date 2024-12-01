import { render } from '@testing-library/vue';
import { Mark } from '@inkline/inkline/components';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Mark', () => {
        const props = {
            text: 'The quick brown fox jumps over the lazy dog',
            query: 'fox'
        };

        it('should be named correctly', () => {
            expect(Mark.name).toEqual('Mark');
        });

        it('should render correctly', () => {
            const wrapper = render(Mark, {
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
