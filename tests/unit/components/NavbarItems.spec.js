import { mount } from '@vue/test-utils';
import NavbarItems from 'inkline/components/NavbarItems';

describe('Components', () => {
    describe('NavbarItems', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(NavbarItems);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
