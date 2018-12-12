import { mount } from '@vue/test-utils';
import Container from 'inkline/components/Container';

describe('Components', () => {
    describe('Container', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Container);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
