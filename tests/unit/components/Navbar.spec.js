import { shallowMount } from '@vue/test-utils';
import Navbar from '@inkline/inkline/src/components/Navbar';

describe('Components', () => {
    describe('Navbar', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Navbar, {
                methods: {
                    created: Navbar.created,
                    beforeDestroy: Navbar.beforeDestroy
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
        });

        describe('created()', () => {
            it('should add item-click event listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$on');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('item-click', wrapper.vm.onItemClick);
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
