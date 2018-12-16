import { shallowMount } from '@vue/test-utils';
import NavbarItems from 'inkline/components/NavbarItems';

describe('Components', () => {
    describe('NavbarItems', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(NavbarItems);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
