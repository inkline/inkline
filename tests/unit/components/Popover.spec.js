import { mount } from '@vue/test-utils';
import Popover from 'inkline/components/Popover';

describe('Components', () => {
    describe('Popover', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Popover);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
