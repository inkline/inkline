import { mount } from '@vue/test-utils';
import DropdownMenu from 'inkline/components/DropdownMenu';

describe('Components', () => {
    describe('DropdownMenu', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(DropdownMenu);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
