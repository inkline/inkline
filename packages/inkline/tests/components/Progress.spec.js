import { shallowMount } from '@vue/test-utils';
import { IProgress } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IProgress', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IProgress);
        });

        it('should be named correctly', () => {
            expect(IProgress.name).toEqual('IProgress');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
