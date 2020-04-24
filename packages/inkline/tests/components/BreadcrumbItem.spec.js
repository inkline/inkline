import { shallowMount } from '@vue/test-utils';
import { IBreadcrumbItem } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IBreadcrumbItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IBreadcrumbItem);
        });

        it('should be named correctly', () => {
            expect(IBreadcrumbItem.name).toEqual('IBreadcrumbItem');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });
    });
});
