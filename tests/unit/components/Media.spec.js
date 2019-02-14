import { shallowMount } from '@vue/test-utils';
import Media from '@inkline/inkline/components/Media';

describe('Components', () => {
    describe('Media', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Media);
        });

        it('should be named correctly', () => {
            expect(Media.name).toEqual('IMedia');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
