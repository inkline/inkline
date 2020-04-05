import {shallowMount} from "@vue/test-utils";
import Linkable from '@inkline/inkline/src/components/Linkable';

const RouterLink = {
    name: 'RouterLink',
    render() {}
};

describe('Components', () => {
    describe('Linkable', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount({
                name: 'LinkableComponent',
                template: '<div/>',
                extends: Linkable
            }, {
                components: {
                    RouterLink
                }
            });
        });

        it('should be named correctly', () => {
            expect(Linkable.name).toEqual('ILinkable');
        });

        describe('props', () => {
            describe('tag', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tag).toBeDefined();
                    expect(wrapper.vm.tag).toEqual('a');
                });
            });

            describe('tabindex', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tabindex).toBeDefined();
                    expect(wrapper.vm.tabindex).toEqual(-1);
                });
            });
        });

        describe('data()', () => {
            describe('routerComponent', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.routerComponent).toBeDefined();
                });

                it('should equal router-link', () => {
                    expect(wrapper.vm.routerComponent).toEqual('router-link');
                });

                it('should equal nuxt-link if nuxt is defined', () => {
                    wrapper = shallowMount({
                        name: 'LinkableComponent',
                        template: '<div/>',
                        extends: Linkable
                    }, {
                        components: {
                            RouterLink
                        },
                        mocks: {
                            $nuxt: true
                        }
                    });

                    expect(wrapper.vm.routerComponent).toEqual('nuxt-link');
                });
            });
        });

        describe('computed', () => {
            describe('isTag', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.isTag).toBeDefined();
                });

                it('should be <span> tag by default', () => {
                    expect(wrapper.vm.isTag).toEqual('a');
                });

                it('should be <a> tag if "href" attribute is provided', () => {
                    wrapper.vm.$attrs.href = true;

                    expect(wrapper.vm.isTag).toEqual('a');
                });

                it('should be <router-link> tag if "to" attribute is provided', () => {
                    wrapper.vm.$attrs.to = true;

                    expect(wrapper.vm.isTag).toEqual('router-link');
                });
            });

            describe('isComponent', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.isComponent).toBeDefined();
                });

                it('should return true if tag is equal to routerComponent', () => {
                    wrapper.setProps({ tag: 'router-link' });

                    expect(wrapper.vm.isComponent).toEqual(true);
                });

                it('should return false if tag is not equal to routerComponent', () => {
                    wrapper.setProps({ tag: 'div' });

                    expect(wrapper.vm.isComponent).toEqual(false);
                });
            });
        });

        describe('methods', () => {
            describe('onClick', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onClick).toBeDefined();
                });

                it('should emit click event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');
                    const e = {};

                    wrapper.vm.onClick(e);

                    expect(spy).toHaveBeenCalledWith('click', e);
                });
            });
        });
    });
});
