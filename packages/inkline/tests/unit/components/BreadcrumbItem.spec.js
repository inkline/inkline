import { shallowMount } from '@vue/test-utils';
import BreadcrumbItem from '@inkline/inkline/src/components/BreadcrumbItem';

describe('Components', () => {
    describe('BreadcrumbItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(BreadcrumbItem);
        });

        it('should be named correctly', () => {
            expect(BreadcrumbItem.name).toEqual('IBreadcrumbItem');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
