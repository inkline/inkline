import { mount } from '@vue/test-utils';
import LayoutHeader from 'inkline/components/LayoutHeader';

describe('Components', () => {
    describe('LayoutHeader', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(LayoutHeader);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
