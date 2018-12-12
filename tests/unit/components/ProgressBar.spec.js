import { mount } from '@vue/test-utils';
import ProgressBar from 'inkline/components/ProgressBar';

describe('Components', () => {
    describe('ProgressBar', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(ProgressBar);
        });

        test('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
