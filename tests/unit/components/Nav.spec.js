import { mount } from '@vue/test-utils';
import Nav from 'inkline/components/Nav';

describe('Components', () => {
    describe('Nav', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Nav);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
