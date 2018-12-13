import { mount } from '@vue/test-utils';
import BreadcrumbItem from 'inkline/components/BreadcrumbItem';

const RouterLink = {
    name: 'RouterLink',
    render() {}
};

describe('Components', () => {
    describe('BreadcrumbItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = mount(BreadcrumbItem, {
                components: {
                    RouterLink
                }
            });
        });

        it('should be named correctly', () => {
            expect(BreadcrumbItem.name).toEqual('IBreadcrumbItem');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('tag()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tag).toBeDefined();
                });

                it('should be <a> tag by default', () => {
                    expect(wrapper.vm.tag).toEqual('a');
                });

                it('should be <router-link> tag if "to" attribute is provided', () => {
                    wrapper = mount(BreadcrumbItem, {
                        components: {
                            RouterLink
                        },
                        propsData: {
                            to: true
                        }
                    });

                    expect(wrapper.vm.tag).toEqual('router-link');
                });
            });
        });
    });
});
