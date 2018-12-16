import { shallowMount } from '@vue/test-utils';
import Progress from 'inkline/components/Progress';

describe('Components', () => {
    describe('Progress', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Progress);
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
