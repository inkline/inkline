import { shallowMount } from '@vue/test-utils';
import CheckboxButton from '@inkline/inkline/components/CheckboxButton';

describe('Components', () => {
    describe('CheckboxButton', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(CheckboxButton);
        });

        it('should be named correctly', () => {
            expect(CheckboxButton.name).toEqual('ICheckboxButton');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
