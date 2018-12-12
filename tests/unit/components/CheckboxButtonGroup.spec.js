import { mount } from '@vue/test-utils';
import CheckboxButtonGroup from 'inkline/components/CheckboxButtonGroup';

describe('Components', () => {
    describe('CheckboxButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(CheckboxButtonGroup);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
