import { mount } from '@vue/test-utils';
import CheckboxButton from 'inkline/components/CheckboxButton';

describe('Components', () => {
    describe('CheckboxButton', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(CheckboxButton);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
