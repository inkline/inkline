import { shallowMount } from '@vue/test-utils';
import { ICheckboxButtonGroup } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ICheckboxButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ICheckboxButtonGroup);
        });

        it('should be named correctly', () => {
            expect(ICheckboxButtonGroup.name).toEqual('ICheckboxButtonGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
