import { shallowMount } from '@vue/test-utils';
import NavbarBrand from 'inkline/components/NavbarBrand';
import { RouterLink } from '../mocks/RouterLink';

describe('Components', () => {
    describe('NavbarBrand', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(NavbarBrand);
        });

        it('should be named correctly', () => {
            expect(NavbarBrand.name).toEqual('INavbarBrand');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('computed', () => {
            describe('isTag()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.isTag).toBeDefined();
                });

                it('should be <a> tag by default', () => {
                    expect(wrapper.vm.isTag).toEqual('a');
                });

                it('should be <router-link> tag if "to" attribute is provided', () => {
                    wrapper = shallowMount(NavbarBrand, {
                        components: {
                            RouterLink
                        },
                        propsData: {
                            to: true
                        }
                    });

                    expect(wrapper.vm.isTag).toEqual('router-link');
                });
            });
        });
    });
});
