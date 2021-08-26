import { shallowMount } from '@vue/test-utils';
import { IBreadcrumbItem } from '@inkline/inkline/components';

describe('Components', () => {
    describe('IBreadcrumbItem', () => {
        it('should be named correctly', () => {
            expect(IBreadcrumbItem.name).toEqual('IBreadcrumbItem');
        });

        it('should render correctly', () => {
            const wrapper = shallowMount(IBreadcrumbItem);
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('classes', () => {
                it('should return classes object', () => {
                    const wrapper: any = shallowMount(IBreadcrumbItem, {
                        props: {
                            active: true,
                            disabled: true
                        }
                    });

                    expect(wrapper.vm.classes).toEqual({
                        '-active': true,
                        '-disabled': true
                    });
                });
            });

            describe('tabIndex', () => {
                it('should return -1 if disabled', () => {
                    const wrapper: any = shallowMount(IBreadcrumbItem, {
                        props: {
                            disabled: true
                        }
                    });

                    expect(wrapper.vm.tabIndex).toEqual(-1);
                });

                it('should return -1 if active', () => {
                    const wrapper: any = shallowMount(IBreadcrumbItem, {
                        props: {
                            active: true
                        }
                    });

                    expect(wrapper.vm.tabIndex).toEqual(-1);
                });

                it('should return tabindex otherwise', () => {
                    const wrapper: any = shallowMount(IBreadcrumbItem, {
                        props: {
                            disabled: false,
                            active: false
                        }
                    });

                    expect(wrapper.vm.tabIndex).toEqual(wrapper.vm.tabindex);
                });
            });
        });
    });
});
