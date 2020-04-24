import { shallowMount } from '@vue/test-utils';
import { ILayoutFooter } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ILayoutFooter', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ILayoutFooter);
        });

        it('should be named correctly', () => {
            expect(ILayoutFooter.name).toEqual('ILayoutFooter');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
