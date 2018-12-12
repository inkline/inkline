import { mount } from '@vue/test-utils';
import SelectOption from 'inkline/components/SelectOption';

describe('Components', () => {
    describe('SelectOption', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(SelectOption);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
