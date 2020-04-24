import { shallowMount } from '@vue/test-utils';
import { ILayoutContent } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ILayoutContent', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ILayoutContent);
        });

        it('should be named correctly', () => {
            expect(ILayoutContent.name).toEqual('ILayoutContent');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
