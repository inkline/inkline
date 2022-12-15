import { shallowMount } from '@vue/test-utils';
import { INavbar } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('INavbar', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(INavbar, {
                methods: {
                    created: INavbar.created,
                    beforeDestroy: INavbar.beforeDestroy
                }
            });
        });

        it('should be named correctly', () => {
            expect(INavbar.name).toEqual('INavbar');
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

            describe('collapseOnClickOutside', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.collapseOnClickOutside).toBeDefined();
                    expect(wrapper.vm.collapseOnClickOutside).toEqual(true);
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
            describe('onClickItem()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onClickItem).toBeDefined();
                });

                it('should not set collapsed to false if not collapseOnClick and collapsed', () => {
                    const spy = jest.spyOn(wrapper.vm, 'setCollapse');

                    wrapper.setProps({ collapseOnClick: false });
                    wrapper.setData({ collapsed: false });

                    wrapper.vm.onClickItem();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should set collapsed to false if collapseOnClick and collapsed', () => {
                    const spy = jest.spyOn(wrapper.vm, 'setCollapse');

                    wrapper.setProps({ collapseOnClick: true });
                    wrapper.setData({ collapsed: true });

                    wrapper.vm.onClickItem();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(false);
                });
            });

            describe('onClickOutside()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onClickOutside).toBeDefined();
                });

                it('should not set collapsed to false if not collapseOnClick and collapsed', () => {
                    const spy = jest.spyOn(wrapper.vm, 'setCollapse');

                    wrapper.setProps({ collapseOnClickOutside: false });
                    wrapper.setData({ collapsed: false });

                    wrapper.vm.onClickOutside();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should set collapsed to false if collapseOnClick and collapsed', () => {
                    const spy = jest.spyOn(wrapper.vm, 'setCollapse');

                    wrapper.setProps({ collapseOnClickOutside: true });
                    wrapper.setData({ collapsed: true });

                    wrapper.vm.onClickOutside();

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
                expect(spy).toHaveBeenCalledWith('item-click', wrapper.vm.onClickItem);
            });
        });

        describe('beforeDestroy()', () => {
            it('should remove item-click event listener', () => {
                const spy = jest.spyOn(wrapper.vm, '$off');

                wrapper.vm.beforeDestroy();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('item-click', wrapper.vm.onClickItem);
            });
        });
    });
});
