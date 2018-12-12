import { mount } from '@vue/test-utils';
import Badge from 'inkline/components/Badge';

describe('Components', () => {
    describe('Badge', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Badge);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
