import { shallowMount } from '@vue/test-utils';
import { IRadioButtonGroup } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IRadioButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IRadioButtonGroup);
        });

        it('should be named correctly', () => {
            expect(IRadioButtonGroup.name).toEqual('IRadioButtonGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
