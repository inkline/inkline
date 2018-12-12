import { mount } from '@vue/test-utils';
import DropdownItem from 'inkline/components/DropdownItem';

describe('Components', () => {
    describe('DropdownItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(DropdownItem);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
