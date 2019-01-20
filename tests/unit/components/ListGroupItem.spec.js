import { shallowMount } from '@vue/test-utils';
import ListGroupItem from 'inkline/components/ListGroupItem';
import { RouterLink } from "../mocks/RouterLink";

describe('Components', () => {
    describe('NavItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ListGroupItem);
        });

        it('should be named correctly', () => {
            expect(ListGroupItem.name).toEqual('IListGroupItem');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('tag', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tag).toBeDefined();
                    expect(wrapper.vm.tag).toEqual('div');
                });
            });
        });

        describe('computed', () => {
            describe('isTag()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.isTag).toBeDefined();
                });

                it('should be <div> tag by default', () => {
                    expect(wrapper.vm.isTag).toEqual('div');
                });

                it('should be <a> tag if "href" attribute is provided', () => {
                    wrapper = shallowMount(ListGroupItem, {
                        propsData: {
                            href: true
                        }
                    });

                    expect(wrapper.vm.isTag).toEqual('a');
                });

                it('should be <router-link> tag if "to" attribute is provided', () => {
                    wrapper = shallowMount(ListGroupItem, {
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
