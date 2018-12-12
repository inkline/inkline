import { mount } from '@vue/test-utils';
import FormLabel from 'inkline/components/FormLabel';

describe('Components', () => {
    describe('FormLabel', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(FormLabel);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
