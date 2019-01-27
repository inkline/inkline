import { shallowMount } from '@vue/test-utils';
import RadioGroup from '@inkline/inkline/components/RadioGroup';

describe('Components', () => {
    describe('RadioGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(RadioGroup);
        });

        it('should be named correctly', () => {
            expect(RadioGroup.name).toEqual('IRadioGroup');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
