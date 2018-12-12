import { mount } from '@vue/test-utils';
import RadioButton from 'inkline/components/RadioButton';

describe('Components', () => {
    describe('RadioButton', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(RadioButton);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
