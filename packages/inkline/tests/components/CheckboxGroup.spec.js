import { shallowMount } from '@vue/test-utils';
import { ICheckboxGroup } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ICheckboxGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ICheckboxGroup);
        });

        it('should render correctly', () => {
            expect(ICheckboxGroup.name).toEqual('ICheckboxGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
