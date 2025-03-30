import { render } from '@testing-library/vue';
import { Image } from '../index';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Image', () => {
        const props = {
            src: 'none'
        };

        it('should be named correctly', () => {
            expect(Image.name).toEqual('Image');
        });

        it('should render correctly', () => {
            const wrapper = render(Image, {
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
