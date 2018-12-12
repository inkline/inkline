import { mount } from '@vue/test-utils';
import LayoutAside from 'inkline/components/LayoutAside';

describe('Components', () => {
    describe('LayoutAside', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(LayoutAside);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
