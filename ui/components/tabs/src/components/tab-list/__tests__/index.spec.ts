import { render } from '@testing-library/vue';
import { TabList } from '../index';

import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('TabList', () => {
        it('should be named correctly', () => {
            expect(TabList.name).toEqual('TabList');
        });

        it('should render correctly', () => {
            const wrapper = render(TabList, {
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
