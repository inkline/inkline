import { shallowMount } from '@vue/test-utils';
import Progress from '@inkline/inkline/components/Progress';

describe('Components', () => {
    describe('Progress', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Progress);
        });

        it('should be named correctly', () => {
            expect(Progress.name).toEqual('IProgress');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
