import {shallowMount} from '@vue/test-utils';
import { IDropdownItem } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('IDropdownItem', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(IDropdownItem);
        });

        it('should be named correctly', () => {
            expect(IDropdownItem.name).toEqual('IDropdownItem');
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

                it('should emit "click" event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('click');
                });
            });
        });
    });
});
