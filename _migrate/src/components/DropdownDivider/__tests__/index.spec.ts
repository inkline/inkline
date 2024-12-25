import { render } from '@testing-library/vue';
import { DropdownDivider } from '@inkline/inkline/components';
import { createTestingInklineOptionsProvide } from '@inkline/test-utils';

describe('Components', () => {
    describe('DropdownDivider', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(DropdownDivider.name).toEqual('DropdownDivider');
        });

        it('should render correctly', () => {
            const wrapper = render(DropdownDivider, {
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
