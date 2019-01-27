import { shallowMount } from '@vue/test-utils';
import Checkable from '@inkline/inkline/components/Checkable';
import CheckableGroup from '@inkline/inkline/components/CheckableGroup';

describe('Components', () => {
    describe('Checkable', () => {
        let wrapper;
        let groupedWrapper;

        beforeEach(() => {
            wrapper = shallowMount(Checkable, {
                render: () => {}
            });

            groupedWrapper = shallowMount(Checkable, {
                render: () => {},
                parentComponent: CheckableGroup,
            });
        });

        describe('data', () => {
            describe('parentFormGroupName', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.parentFormGroupName).toBeDefined();
                    expect(wrapper.vm.parentFormGroupName).toEqual('ICheckableGroup');
                });
            });
        });

        describe('methods', () => {
            describe('onBlur()', () => {
                it('should emit "blur" event', () => {
                    const spy = jest.spyOn(wrapper.vm, 'emitBlur');

                    wrapper.vm.onBlur({});

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith({});
                });

                it('should emit "blur" event on parent form group if defined', () => {
                    const spy = jest.spyOn(groupedWrapper.vm.parentFormGroup, 'emitBlur');

                    groupedWrapper.vm.onBlur({});

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith({});
                });
            });

            describe('onFocus()', () => {
                it('should emit "focus" event', () => {
                    const spy = jest.spyOn(wrapper.vm, 'emitFocus');

                    wrapper.vm.onFocus({});

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith({});
                });

                it('should emit "focus" event on parent form group if defined', () => {
                    const spy = jest.spyOn(groupedWrapper.vm.parentFormGroup, 'emitFocus');

                    groupedWrapper.vm.onFocus({});

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith({});
                });
            });
        });

        describe('computed', () => {
            describe('name()', () => {
                it('should be blank by default', () => {
                    expect(wrapper.vm.name).toBeDefined();
                    expect(wrapper.vm.name).toEqual('');
                });

                it('should return parent form group name if grouped', () => {
                    expect(groupedWrapper.vm.name).toEqual(undefined);
                });
            });
        });
    });
});
