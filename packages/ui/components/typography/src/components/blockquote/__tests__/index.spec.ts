import { render } from '@testing-library/vue';
import { Blockquote } from '../index';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Blockquote', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(Blockquote.name).toEqual('Blockquote');
        });

        it('should render correctly', () => {
            const wrapper = render(Blockquote, {
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
