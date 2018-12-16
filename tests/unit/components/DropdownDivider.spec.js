import { shallowMount } from '@vue/test-utils';
import DropdownDivider from 'inkline/components/DropdownDivider';

describe('Components', () => {
    describe('DropdownDivider', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(DropdownDivider);
        });

        it('should be named correctly', () => {
            expect(DropdownDivider.name).toEqual('IDropdownDivider');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
