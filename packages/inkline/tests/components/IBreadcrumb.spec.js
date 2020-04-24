import { shallowMount } from '@vue/test-utils';
import { IBreadcrumb } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IBreadcrumb', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IBreadcrumb);
        });

        it('should be named correctly', () => {
            expect(IBreadcrumb.name).toEqual('IBreadcrumb');
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
