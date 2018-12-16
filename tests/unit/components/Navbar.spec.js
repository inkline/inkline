import { shallowMount } from '@vue/test-utils';
import Navbar from 'inkline/components/Navbar';

describe('Components', () => {
    describe('Navbar', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Navbar);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
