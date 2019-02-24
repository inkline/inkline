import {shallowMount} from '@vue/test-utils';
import DropdownItem from '@inkline/inkline/components/DropdownItem';

describe('Components', () => {
    describe('DropdownItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(DropdownItem, {
                methods: {
                    mounted: DropdownItem.mounted,
                    destroyed: DropdownItem.destroyed
                }
            });
        });

        it('should be named correctly', () => {
            expect(DropdownItem.name).toEqual('IDropdownItem');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('action', () => {
                it('should be defined', () => {
                    expect(wrapper.vm).toHaveProperty('action');
                });
            });

            describe('tabindex', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.tabindex).toBeDefined();
                    expect(wrapper.vm.tabindex).toEqual(-1);
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should dispatch "menu-item-click" to IDropdown', () => {
                    const spy = jest.spyOn(wrapper.vm, 'dispatch');

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('IDropdown', 'menu-item-click', [wrapper.vm.action, wrapper.vm]);
                });
            });
        });

        describe('mounted()', () => {
            it('should dispatch "dropdown-item-mounted" to IDropdown', () => {
                const spy = jest.spyOn(wrapper.vm, 'dispatch');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('IDropdown', 'dropdown-item-mounted', wrapper.vm);
            });
        });

        describe('destroyed()', () => {
            it('should dispatch "dropdown-item-destroyed" to IDropdown', () => {
                const spy = jest.spyOn(wrapper.vm, 'dispatch');

                wrapper.vm.destroyed();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith('IDropdown', 'dropdown-item-destroyed', wrapper.vm);
            });
        });
    });
});
