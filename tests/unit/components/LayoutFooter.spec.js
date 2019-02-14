import { shallowMount } from '@vue/test-utils';
import LayoutFooter from '@inkline/inkline/components/LayoutFooter';

describe('Components', () => {
    describe('LayoutFooter', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(LayoutFooter);
        });

        it('should be named correctly', () => {
            expect(LayoutFooter.name).toEqual('ILayoutFooter');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
