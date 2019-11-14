import Vue from 'vue';
import { mount } from '@vue/test-utils'

import CollapsibleProviderMixin from '@inkline/inkline/src/mixins/components/providers/CollapsibleProviderMixin';
import ClassesProviderMixin from '@inkline/inkline/src/mixins/components/providers/ClassesProviderMixin';
import Navbar from "@/components/Navbar/index";

describe('Mixins', () => {
    describe('CollapsibleProviderMixin', () => {
        let wrapper;
        const createWrapper = () => mount({
            render () {},
            mixins: [
                ClassesProviderMixin,
                CollapsibleProviderMixin,
            ],
            methods: {
                created: CollapsibleProviderMixin.created,
                beforeDestroy: CollapsibleProviderMixin.beforeDestroy,
                provide: CollapsibleProviderMixin.provide
            }
        });

        beforeEach(() => {
            wrapper = createWrapper();
        });

        describe('data', () => {
            describe('collapsed', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapsed).toBeDefined();
                    expect(wrapper.vm.collapsed).toEqual(false);
                });
            });

            describe('collapsible', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapsible).toBeDefined();
                    expect(wrapper.vm.collapsible).toEqual(false);
                });
            });

            describe('windowWidth', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.windowWidth).toBeDefined();
                });

                it('should equal window width', () => {
                    expect(wrapper.vm.windowWidth).toEqual(window.innerWidth);
                });

                it('should equal 0 if window is not defined', () => {
                    Vue.$isServer = true;
                    expect(createWrapper().vm.windowWidth).toEqual(0);
                    Vue.$isServer = false;
                });
            });
        });

        describe('provide()', () => {
            it('should return object containing collapsed status and collapse breakpoint', () => {
                expect(wrapper.vm.provide()).toEqual({
                    collapsible: {
                        collapsible: false,
                        collapsed: false,
                        collapse: 'md'
                    }
                });
            });
        });

        describe('watch', () => {
            describe('value()', () => {
                it('should set collapsed to true if value is set to true', () => {
                    expect(wrapper.vm.collapsed).toEqual(false);
                    expect(wrapper.vm.value).toEqual(false);
                    wrapper.setProps({ value: true });
                    expect(wrapper.vm.collapsed).toEqual(true);
                });

                it('should set collapsed to false if value is set to false', () => {
                    wrapper.setData({ collapsed: true });
                    wrapper.setProps({ value: true });

                    expect(wrapper.vm.collapsed).toEqual(true);
                    expect(wrapper.vm.value).toEqual(true);
                    wrapper.setProps({ value: false });
                    expect(wrapper.vm.collapsed).toEqual(false);
                });
            });

            describe('collapsed()', () => {
                it('should emit input event with false if collapsed is set to false', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setData({ collapsed: true });
                    wrapper.setData({ collapsed: false });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', false);
                });

                it('should emit input event with true if collapsed is set to true', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setData({ collapsed: false });
                    wrapper.setData({ collapsed: true });

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', true);
                });
            });
        });

        describe('created()', () => {
            it('should be defined', () => {
                expect(Navbar.created).toBeDefined();
            });

            it('should add class rules to classes provider', () => {
                const spy = jest.spyOn(wrapper.vm.classesProvider, 'add');
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1);
            });

            it('should not try to add class rules to classes provider if classes provider undefined', () => {
                wrapper.vm.classesProvider = false;
                wrapper.vm.created();

                expect(() => wrapper.vm.created()).not.toThrowError();
            });

            it('should add "-collapsed" class if "collapsed"', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-collapsed': false
                }));

                wrapper.setData({
                    collapsed: true
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-collapsed': true
                }));
            });

            it('should add "-collapse-md" class if "collapse"', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                wrapper.setProps({
                    collapse: 'md'
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-collapse-md': true
                }));
            });

            it('should not add window resize event listener if $isServer', () => {
                Vue.$isServer = true;

                const spy = jest.spyOn(window, 'addEventListener');

                wrapper.vm.created();

                expect(spy).not.toHaveBeenCalled();

                Vue.$isServer = false;
            });

            it('should add window resize event listener', () => {
                const spy = jest.spyOn(window, 'addEventListener');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('resize', wrapper.vm.onWindowResize);
            });

            it('should call initial onWindowResize', () => {
                const spy = jest.spyOn(wrapper.vm, 'onWindowResize');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
            });

            it('should add collapse event listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('collapse', wrapper.vm.setCollapse);
            });

            it('should add toggle-collapse event listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('toggle-collapse', wrapper.vm.toggleCollapse);
            });
        });

        describe('beforeDestroy()', () => {
            it('should not remove window resize event listener if $isServer', () => {
                Vue.$isServer = true;

                const spy = jest.spyOn(window, 'removeEventListener');

                wrapper.vm.beforeDestroy();

                expect(spy).not.toHaveBeenCalled();

                Vue.$isServer = false;
            });

            it('should remove window resize event listener', () => {
                const spy = jest.spyOn(window, 'removeEventListener');

                wrapper.vm.beforeDestroy();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('resize', wrapper.vm.onWindowResize);
            });

            it('should remove collapse event listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$off');

                wrapper.vm.beforeDestroy();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('collapse', wrapper.vm.setCollapse);
            });

            it('should remove toggle-collapse event listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$off');

                wrapper.vm.beforeDestroy();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('toggle-collapse', wrapper.vm.toggleCollapse);
            });
        });

        describe('methods', () => {
            describe('setCollapse()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.setCollapse).toBeDefined();
                });

                it('should set collapsed status to true', () => {
                    expect(wrapper.vm.collapsed).toEqual(false);
                    wrapper.vm.setCollapse(true);
                    expect(wrapper.vm.collapsed).toEqual(true);
                });

                it('should set collapsed status to false', () => {
                    wrapper.vm.setCollapse(true);
                    expect(wrapper.vm.collapsed).toEqual(true);
                    wrapper.vm.setCollapse(false);
                    expect(wrapper.vm.collapsed).toEqual(false);
                });
            });

            describe('toggleCollapse()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.toggleCollapse).toBeDefined();
                });

                it('should toggle collapsed status', () => {
                    expect(wrapper.vm.collapsed).toEqual(false);
                    wrapper.vm.toggleCollapse();
                    expect(wrapper.vm.collapsed).toEqual(true);
                });
            });

            describe('onWindowResize()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onWindowResize).toBeDefined();
                });

                it('should set collapsible to true if collapse is true', () => {
                    wrapper.setProps({ collapse: true, collapsible: false });
                    wrapper.vm.onWindowResize();

                    expect(wrapper.vm.collapsible).toEqual(true);
                });

                it('should return if collapse is false', () => {
                    wrapper.setProps({ collapse: false, collapsible: false });
                    wrapper.vm.onWindowResize();

                    expect(wrapper.vm.collapsible).toEqual(false);
                });

                it('should set windowWidth', () => {
                    window.innerWidth = 100;
                    wrapper.vm.onWindowResize();
                    expect(wrapper.vm.windowWidth).toEqual(100);

                    window.innerWidth = 1000;
                    wrapper.vm.onWindowResize();
                    expect(wrapper.vm.windowWidth).toEqual(1000);
                });

                it('should set collapsible based on breakpoint', () => {
                    wrapper.setProps({ collapse: 'md' });

                    window.innerWidth = 100;
                    wrapper.vm.onWindowResize();
                    expect(wrapper.vm.collapsible).toEqual(true);

                    window.innerWidth = 1000;
                    wrapper.vm.onWindowResize();
                    expect(wrapper.vm.collapsible).toEqual(false);
                });

                it('should set collapsed to false if transitioning to breakpoint larger than threshold', () => {
                    window.innerWidth = 100;
                    wrapper.vm.onWindowResize();
                    wrapper.vm.toggleCollapse();

                    window.innerWidth = 1000;
                    wrapper.vm.onWindowResize();
                    expect(wrapper.vm.collapsed).toEqual(false);
                });
            });
        });
    });
});
