import { shallowMount } from '@vue/test-utils';
import { IRadioGroup } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IRadioGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IRadioGroup);
        });

        it('should be named correctly', () => {
            expect(IRadioGroup.name).toEqual('IRadioGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
