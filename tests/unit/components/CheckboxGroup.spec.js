import { shallowMount } from '@vue/test-utils';
import CheckboxGroup from '@inkline/inkline/components/CheckboxGroup';

describe('Components', () => {
    describe('CheckboxGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(CheckboxGroup);
        });

        it('should render correctly', () => {
            expect(CheckboxGroup.name).toEqual('ICheckboxGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
