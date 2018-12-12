import { mount } from '@vue/test-utils';
import Form from 'inkline/components/Form';

describe('Components', () => {
    describe('Form', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Form);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
