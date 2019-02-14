import { shallowMount } from '@vue/test-utils';
import LayoutHeader from '@inkline/inkline/components/LayoutHeader';

describe('Components', () => {
    describe('LayoutHeader', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(LayoutHeader);
        });

        it('should be named correctly', () => {
            expect(LayoutHeader.name).toEqual('ILayoutHeader');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
