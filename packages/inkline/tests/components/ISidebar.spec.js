import { shallowMount } from '@vue/test-utils';
import { ISidebar } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ISidebar', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(ISidebar, {
                methods: {
                    created: ISidebar.created,
                    beforeDestroy: ISidebar.beforeDestroy
                }
            });
        });

        it('should be named correctly', () => {
            expect(ISidebar.name).toEqual('ISidebar');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('collapseOnClick', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapseOnClick).toBeDefined();
                    expect(wrapper.vm.collapseOnClick).toEqual(true);
                });
            });

            describe('collapseOnClickOverlay', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapseOnClickOverlay).toBeDefined();
                    expect(wrapper.vm.collapseOnClickOverlay).toEqual(true);
                });
            });

            describe('collapsePosition', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapsePosition).toBeDefined();
                    expect(wrapper.vm.collapsePosition).toEqual('fixed');
                });
            });

            describe('placement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.placement).toBeDefined();
                    expect(wrapper.vm.placement).toEqual('left');
                });
            });
        });

        describe('computed', () => {
            describe('sidebarWrapperTransition()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.sidebarWrapperTransition).toBeDefined();
                });

                it('should return none transition if collapse position is not relative', () => {
                    wrapper.setProps({ collapsePosition: 'absolute' });
                    expect(wrapper.vm.sidebarWrapperTransition).toEqual('sidebar-wrapper-none-transition');
                });

                it('should return transition if collapse position is relative', () => {
                    wrapper.setProps({ collapsePosition: 'relative' });
                    expect(wrapper.vm.sidebarWrapperTransition).toEqual('sidebar-wrapper-transition');
                });
            });

            describe('sidebarTransition()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.sidebarTransition).toBeDefined();
                });

                it('should return transition if collapse position is not relative', () => {
                    wrapper.setProps({ collapsePosition: 'absolute' });
                    expect(wrapper.vm.sidebarTransition).toEqual('sidebar-transition');
                });

                it('should return transition if collapse position is not relative', () => {
                    wrapper.setProps({ collapsePosition: 'relative' });
                    expect(wrapper.vm.sidebarTransition).toEqual('sidebar-none-transition');
                });
            });
        });

        describe('methods', () => {
            describe('onItemClick()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onItemClick).toBeDefined();
                });

                it('should not set collapsed to false if not collapseOnClick and collapsed', () => {
                    const spy = jest.spyOn(wrapper.vm, 'setCollapse');

                    wrapper.setProps({ collapseOnClick: false });
                    wrapper.setData({ collapsed: false });

                    wrapper.vm.onItemClick();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should set collapsed to false if collapseOnClick and collapsed', () => {
                    const spy = jest.spyOn(wrapper.vm, 'setCollapse');

                    wrapper.setProps({ collapseOnClick: true });
                    wrapper.setData({ collapsed: true });

                    wrapper.vm.onItemClick();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(false);
                });
            });

            describe('onOverlayClick()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onOverlayClick).toBeDefined();
                });

                it('should not set collapsed to false if not collapseOnClickOverlay and collapsed', () => {
                    const spy = jest.spyOn(wrapper.vm, 'setCollapse');

                    wrapper.setProps({ collapseOnClickOverlay: false });
                    wrapper.setData({ collapsed: false });

                    wrapper.vm.onOverlayClick();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should set collapsed to false if collapseOnClickOverlay and collapsed', () => {
                    const spy = jest.spyOn(wrapper.vm, 'setCollapse');

                    wrapper.setProps({ collapseOnClickOverlay: true });
                    wrapper.setData({ collapsed: true });

                    wrapper.vm.onOverlayClick();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(false);
                });
            });
        });

        describe('created()', () => {
            it('should add item-click event listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('item-click', wrapper.vm.onItemClick);
            });

            it('should add class rules to classes provider', () => {
                const spy = jest.spyOn(wrapper.vm.classesProvider, 'add');
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1);
            });

            it('should add "-collapse-${collapsePosition}" class', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-collapse-fixed': true
                }));

                wrapper.setProps({
                    collapsePosition: 'relative'
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-collapse-relative': true
                }));
            });

            it('should add "-placement-${placement}" class', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-placement-left': true
                }));

                wrapper.setProps({
                    placement: 'right'
                });

                expect(rule()).toEqual(expect.objectContaining({
                    '-placement-right': true
                }));
            });
        });

        describe('beforeDestroy()', () => {
            it('should remove item-click event listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$off');

                wrapper.vm.beforeDestroy();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('item-click', wrapper.vm.onItemClick);
            });
        });
    });
});
