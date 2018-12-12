import { mount } from '@vue/test-utils';
import Checkbox from 'inkline/components/Checkbox';

describe('Components', () => {
    describe('Checkbox', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Checkbox);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
