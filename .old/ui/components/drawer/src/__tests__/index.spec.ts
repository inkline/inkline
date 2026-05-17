import { render } from '@testing-library/vue';
import { Drawer } from '../index';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Drawer', () => {
        const props = {
            color: 'light',
            size: 'md'
        };

        it('should be named correctly', () => {
            expect(Drawer.name).toEqual('Drawer');
        });

        it('should render correctly', () => {
            const wrapper = render(Drawer, {
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
