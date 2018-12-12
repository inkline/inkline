import { mount } from '@vue/test-utils';
import Dropdown from 'inkline/components/Dropdown';

describe('Components', () => {
    describe('Dropdown', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Dropdown);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
