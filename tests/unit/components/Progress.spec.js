import { mount } from '@vue/test-utils';
import Progress from 'inkline/components/Progress';

describe('Components', () => {
    describe('Progress', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Progress);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
