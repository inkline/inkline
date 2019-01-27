import { shallowMount } from '@vue/test-utils';
import RadioButtonGroup from '@inkline/inkline/components/RadioButtonGroup';

describe('Components', () => {
    describe('RadioButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(RadioButtonGroup);
        });

        it('should be named correctly', () => {
            expect(RadioButtonGroup.name).toEqual('IRadioButtonGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
