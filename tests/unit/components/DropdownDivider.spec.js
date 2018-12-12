import { mount } from '@vue/test-utils';
import DropdownDivider from 'inkline/components/DropdownDivider';

describe('Components', () => {
    describe('DropdownDivider', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(DropdownDivider);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
