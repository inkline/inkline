import { mount } from '@vue/test-utils';
import LayoutFooter from 'inkline/components/LayoutFooter';

describe('Components', () => {
    describe('LayoutFooter', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(LayoutFooter);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
