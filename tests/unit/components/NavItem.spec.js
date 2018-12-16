import { shallowMount } from '@vue/test-utils';
import NavItem from 'inkline/components/NavItem';

describe('Components', () => {
    describe('NavItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(NavItem);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
