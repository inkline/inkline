import { mount } from '@vue/test-utils';
import CheckboxButtonGroup from 'inkline/components/CheckboxButtonGroup';

describe('Components', () => {
    describe('CheckboxButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(CheckboxButtonGroup);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
