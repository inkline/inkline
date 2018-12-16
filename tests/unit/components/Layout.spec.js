import { shallowMount } from '@vue/test-utils';
import Layout from 'inkline/components/Layout';

describe('Components', () => {
    describe('Layout', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Layout);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
