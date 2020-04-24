import { shallowMount } from '@vue/test-utils';
import { IDropdownDivider } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IDropdownDivider', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IDropdownDivider);
        });

        it('should be named correctly', () => {
            expect(IDropdownDivider.name).toEqual('IDropdownDivider');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
