import { mount } from '@vue/test-utils';
import CheckboxGroup from 'inkline/components/CheckboxGroup';

describe('Components', () => {
    describe('CheckboxGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(CheckboxGroup);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
