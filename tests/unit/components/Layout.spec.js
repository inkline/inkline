import { mount } from '@vue/test-utils';
import Layout from 'inkline/components/Layout';

describe('Components', () => {
    describe('Layout', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Layout);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
