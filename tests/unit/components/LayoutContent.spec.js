import { shallowMount } from '@vue/test-utils';
import LayoutAside from '@inkline/inkline/components/LayoutAside';

describe('Components', () => {
    describe('LayoutAside', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(LayoutAside);
        });

        it('should be named correctly', () => {
            expect(LayoutAside.name).toEqual('ILayoutAside');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
