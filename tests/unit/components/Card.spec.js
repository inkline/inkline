import { mount } from '@vue/test-utils';
import Card from 'inkline/components/Card';

describe('Components', () => {
    describe('Card', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Card);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
