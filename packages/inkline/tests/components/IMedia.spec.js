import { shallowMount } from '@vue/test-utils';
import { IMedia } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IMedia', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IMedia);
        });

        it('should be named correctly', () => {
            expect(IMedia.name).toEqual('IMedia');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
