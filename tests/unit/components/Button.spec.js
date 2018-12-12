import { mount } from '@vue/test-utils';
import Button from 'inkline/components/Button';

describe('Components', () => {
    describe('Button', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Button);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
