import { mount } from '@vue/test-utils';
import Breadcrumb from 'inkline/components/Breadcrumb';

describe('Components', () => {
    describe('Breadcrumb', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(Breadcrumb);
        });

        it('should be named correctly', () => {
            expect(Breadcrumb.name).toEqual('IBreadcrumb');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
           describe('divider', () => {
               it('should be defined', () => {
                   expect(wrapper.vm.divider).toBeDefined();
                   expect(wrapper.vm.divider).toEqual('/');
               });
           }) ;
        });
    });
});
