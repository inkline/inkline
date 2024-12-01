import { render } from '@testing-library/vue';
import { Icon } from '@inkline/inkline/components';
import { InklineIconsKey } from '@inkline/inkline';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('Icon', () => {
        const props = {
            size: 'md',
            icon: 'ink-plus'
        };

        it('should be named correctly', () => {
            expect(Icon.name).toEqual('Icon');
        });

        it('should render correctly', () => {
            const wrapper = render(Icon, {
                props,
                global: {
                    provide: {
                        [InklineIconsKey as symbol]: {
                            inkPlus: {}
                        },
                        ...createTestingInklineOptionsProvide()
                    }
                }
            });
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
