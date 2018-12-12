import { mount } from '@vue/test-utils';
import Select from 'inkline/components/Select';

describe('Components', () => {
    describe('Select', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Select);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
