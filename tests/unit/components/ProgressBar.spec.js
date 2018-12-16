import { shallowMount } from '@vue/test-utils';
import ProgressBar from 'inkline/components/ProgressBar';

describe('Components', () => {
    describe('ProgressBar', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ProgressBar);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
