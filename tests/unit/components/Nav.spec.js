import { shallowMount } from '@vue/test-utils';
import Nav from 'inkline/components/Nav';

describe('Components', () => {
    describe('Nav', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Nav);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
