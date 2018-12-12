import { mount } from '@vue/test-utils';
import RadioGroup from 'inkline/components/RadioGroup';

describe('Components', () => {
    describe('RadioGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(RadioGroup);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
