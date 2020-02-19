import { shallowMount } from '@vue/test-utils';
import CheckboxButtonGroup from '@inkline/inkline/src/components/CheckboxButtonGroup';

describe('Components', () => {
    describe('CheckboxButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(CheckboxButtonGroup);
        });

        it('should be named correctly', () => {
            expect(CheckboxButtonGroup.name).toEqual('ICheckboxButtonGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
