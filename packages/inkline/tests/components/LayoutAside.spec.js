import { shallowMount } from '@vue/test-utils';
import { ILayoutAside } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ILayoutAside', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ILayoutAside);
        });

        it('should be named correctly', () => {
            expect(ILayoutAside.name).toEqual('ILayoutAside');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
