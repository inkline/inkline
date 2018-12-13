import { mount } from '@vue/test-utils';
import CheckboxButton from 'inkline/components/CheckboxButton';

describe('Components', () => {
    describe('CheckboxButton', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(CheckboxButton);
        });

        it('should be named correctly', () => {
            expect(CheckboxButton.name).toEqual('ICheckboxButton');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
