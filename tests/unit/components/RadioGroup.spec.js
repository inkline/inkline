import { mount } from '@vue/test-utils';
import RadioGroup from 'inkline/components/RadioGroup';

describe('Components', () => {
    describe('RadioGroup', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(RadioGroup);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
