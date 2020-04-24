import { shallowMount } from '@vue/test-utils';
import { ILayoutHeader } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ILayoutHeader', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ILayoutHeader);
        });

        it('should be named correctly', () => {
            expect(ILayoutHeader.name).toEqual('ILayoutHeader');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
