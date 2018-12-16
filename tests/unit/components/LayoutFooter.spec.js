import { shallowMount } from '@vue/test-utils';
import LayoutFooter from 'inkline/components/LayoutFooter';

describe('Components', () => {
    describe('LayoutFooter', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(LayoutFooter);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
