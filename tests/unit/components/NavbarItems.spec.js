import { shallowMount } from '@vue/test-utils';
import NavbarItems from '@inkline/inkline/src/components/NavbarItems';

describe('Components', () => {
    describe('NavbarItems', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(NavbarItems, {
                provide: {
                    navbar: {
                        collapsed: false,
                        collapse: 'md'
                    }
                },
                methods: {
                    created: NavbarItems.created,
                    destroyed: NavbarItems.destroyed
                }
            });
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('data()', () => {
            describe('collapsible', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapsible).toEqual(false);
                });
            });
        });

        describe('methods', () => {
            describe('onWindowResize()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onWindowResize).toBeDefined();
                });

                it('should set collapsible to true if window.innerWidth is less than or equal to breakpoint maximum', () => {
                    window.innerWidth = 600;
                    wrapper.vm.onWindowResize();
                    expect(wrapper.vm.collapsible).toEqual(true);
                });

                it('should set collapsible to false if window.innerWidth is greater than breakpoint maximum', () => {
                    window.innerWidth = 1000;
                    wrapper.vm.onWindowResize();
                    expect(wrapper.vm.collapsible).toEqual(false);
                });
            });
        });

        describe('created()', () => {
            it('should add window resize event listener', () => {
                const spy = jest.spyOn(window, 'addEventListener');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('resize', wrapper.vm.onWindowResize);
            });

            it('should call onWindowResize', () => {
                const spy = jest.spyOn(wrapper.vm, 'onWindowResize');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
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
