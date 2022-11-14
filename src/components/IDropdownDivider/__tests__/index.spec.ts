import { render } from '@testing-library/vue';
import { IDropdownDivider } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IDropdownDivider', () => {
        const props = {};

        it('should be named correctly', () => {
            expect(IDropdownDivider.name).toEqual('IDropdownDivider');
        });

        it('should render correctly', () => {
            const wrapper = render(IDropdownDivider, { props });

            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
