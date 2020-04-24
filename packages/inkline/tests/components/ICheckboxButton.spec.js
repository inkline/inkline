import { shallowMount } from '@vue/test-utils';
import { ICheckboxButton } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ICheckboxButton', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ICheckboxButton);
        });

        it('should be named correctly', () => {
            expect(ICheckboxButton.name).toEqual('ICheckboxButton');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
