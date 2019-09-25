import { shallowMount } from '@vue/test-utils';
import Navbar from '@inkline/inkline/src/components/Navbar';

describe('Components', () => {
    describe('Navbar', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Navbar, {
                methods: {
                    created: Navbar.created,
                    destroyed: Navbar.destroyed,
                    provide: Navbar.provide
                }
            });
        });

        it('should be named correctly', () => {
            expect(Navbar.name).toEqual('INavbar');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('collapse', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapse).toBeDefined();
                    expect(wrapper.vm.collapse).toEqual('md');
                });
            });

            describe('collapseOnClick', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapseOnClick).toBeDefined();
                    expect(wrapper.vm.collapseOnClick).toEqual(true);
                });
            });

            describe('fluid', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.fluid).toBeDefined();
                    expect(wrapper.vm.fluid).toEqual(false);
                });
            });

            describe('toggleAnimation', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.toggleAnimation).toBeDefined();
                    expect(wrapper.vm.toggleAnimation).toEqual('close');
                });
            });
        });

        describe('data()', () => {
            describe('collapsed', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapsed).toBeDefined();
                    expect(wrapper.vm.collapsed).toEqual(false);
                });
            });

            describe('windowWidth', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.windowWidth).toBeDefined();
                    expect(wrapper.vm.windowWidth).toEqual(expect.any(Number));
                });
            });
        });

        describe('provide()', () => {
            it('should return object containing collapsed status and collapse breakpoint', () => {
                expect(wrapper.vm.provide()).toEqual({ navbar: { collapsed: false, collapse: 'md' } });
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

                it('should return if collapse breakpoint is not set', () => {
                    window.innerWidth = 100;
                    wrapper.vm.onWindowResize();
                    wrapper.setProps({ collapse: '' });
                    window.innerWidth = 1000;
                    wrapper.vm.onWindowResize();
                    expect(wrapper.vm.windowWidth).toEqual(100);
                });

                it('should set windowWidth', () => {
                    window.innerWidth = 100;
                    wrapper.vm.onWindowResize();
                    expect(wrapper.vm.windowWidth).toEqual(100);

                    window.innerWidth = 1000;
                    wrapper.vm.onWindowResize();
                    expect(wrapper.vm.windowWidth).toEqual(1000);
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

            it('should add item-click event listener if collapseOnClick', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('item-click', expect.any(Function));
            });

            it('should not add item-click event listener if not collapseOnClick', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.setProps({ collapseOnClick: false });
                wrapper.vm.created();

                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe('destroyed()', () => {
            it('should remove window resize event listener', () => {
                const spy = jest.spyOn(window, 'removeEventListener');

                wrapper.vm.destroyed();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('resize', wrapper.vm.onWindowResize);
            });
        });
    });
});
