import { shallowMount } from '@vue/test-utils';
import LayoutAside from 'inkline/components/LayoutAside';

describe('Components', () => {
    describe('LayoutAside', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(LayoutAside);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
