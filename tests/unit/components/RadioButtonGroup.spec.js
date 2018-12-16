import { shallowMount } from '@vue/test-utils';
import RadioButtonGroup from 'inkline/components/RadioButtonGroup';

describe('Components', () => {
    describe('RadioButtonGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(RadioButtonGroup);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
