import {shallowMount} from '@vue/test-utils';
import DropdownItem from '@inkline/inkline/src/components/DropdownItem';

describe('Components', () => {
    describe('DropdownItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(DropdownItem);
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
                it('should dispatch "item-click" to IDropdown', () => {
                    const spy = jest.spyOn(wrapper.vm, 'dispatch');

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('IDropdown', 'item-click', [wrapper.vm.action, wrapper.vm]);
                });
            });
        });
    });
});
