import { shallowMount } from '@vue/test-utils';
import { ICheckable } from '@inkline/inkline/src/components';
import { ICheckableGroup } from '@inkline/inkline/src/components';

describe('Components', () => {
    describe('ICheckable', () => {
        let wrapper;
        let groupedWrapper;

        beforeEach(() => {
            wrapper = shallowMount(ICheckable, {
                render: () => {},
                methods: {
                    created: ICheckable.created
                }
            });

            groupedWrapper = shallowMount(ICheckable, {
                render: () => {},
                parentComponent: ICheckableGroup,
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


        describe('props', () => {
            describe('validate', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.validate).toBeDefined();
                    expect(wrapper.vm.validate).toEqual(true);
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

        describe('created()', () => {
            it('should add class rules to classes provider', () => {
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1)
            });

            it('should add "-disabled" class if "disabled" property is true', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({ '-disabled': false }));
                wrapper.setProps({ disabled: true });
                expect(rule()).toEqual(expect.objectContaining({ '-disabled': true }));
            });
        });
    });
});
