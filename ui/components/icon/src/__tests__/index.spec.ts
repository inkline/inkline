import { render } from '@testing-library/vue';
import { Icon } from '../index';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Icon', () => {
        const props = {
            width: 24,
            height: 24,
            name: 'ink:plus'
        };

        it('should be named correctly', () => {
            expect(Icon.name).toEqual('Icon');
        });

        it('should render correctly', () => {
            const wrapper = render(Icon, {
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
