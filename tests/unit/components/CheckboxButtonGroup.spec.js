import { mount } from '@vue/test-utils';
import CheckboxButtonGroup from 'inkline/components/CheckboxButtonGroup';

describe('Components', () => {
    describe('CheckboxButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(CheckboxButtonGroup);
        });

        it('should be named correctly', () => {
            expect(CheckboxButtonGroup.name).toEqual('ICheckboxButtonGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
