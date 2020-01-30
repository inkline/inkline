import { shallowMount } from '@vue/test-utils';
import LayoutContent from '@inkline/inkline/src/components/LayoutContent';

describe('Components', () => {
    describe('LayoutContent', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(LayoutContent);
        });

        it('should be named correctly', () => {
            expect(LayoutContent.name).toEqual('ILayoutContent');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
