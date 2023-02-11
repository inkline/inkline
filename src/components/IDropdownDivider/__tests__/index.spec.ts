import { render } from '@testing-library/vue';
import { IDropdownDivider } from '@inkline/inkline/components';
import { createInkline } from '@inkline/inkline/__tests__/utils';
import { InklineKey } from '@inkline/inkline/plugin';

describe('Components', () => {
    describe('IDropdownDivider', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IDropdownDivider.name).toEqual('IDropdownDivider');
        });

        it('should render correctly', () => {
            const wrapper = render(IDropdownDivider, {
                props,
                global: {
                    provide: {
                        [InklineKey as symbol]: createInkline()
                    }
                }
            });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
