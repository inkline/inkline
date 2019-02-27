import { shallowMount } from '@vue/test-utils';
import SelectOption from '@inkline/inkline/src/components/SelectOption';

describe('Components', () => {
    describe('SelectOption', () => {
        let wrapper;
        let parentWrapper;

        beforeEach(() => {
            wrapper = shallowMount(SelectOption, {
                methods: {
                    created: SelectOption.created,
                    mounted: SelectOption.mounted,
                    destroyed: SelectOption.destroyed
                }
            });
            parentWrapper = shallowMount(SelectOption, {
                parentComponent: {
                    name: 'ISelect',
                    data() {
                        return { value: 'parentValue' }
                    },
                    template: '<div><slot></slot></div>'
                }
            });
        });

        it('should be named correctly', () => {
            expect(SelectOption.name).toEqual('ISelectOption');
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual('');
                });
            });

            describe('label', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.label).toBeDefined();
                    expect(wrapper.vm.label).toEqual('');
                });
            });
        });

        describe('data()', () => {
            describe('parentFormGroupName', () => {
                it('should be defined', () => {
                    expect(wrapper.vm).toHaveProperty('parentFormGroupName');
                    expect(wrapper.vm.parentFormGroup).not.toBeDefined();
                });

                it('should be ISelect parent', () => {
                    expect(parentWrapper.vm.parentFormGroup).toBeDefined();
                });
            });
        });

        describe('computed', () => {
            describe('active()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.active).toBeDefined();
                });

                it('should be false if value not equal to ISelect value', () => {
                    parentWrapper.setProps({ value: 'other' });

                    expect(parentWrapper.vm.active).toEqual(false);
                });

                it('should be true if value equal to ISelect value', () => {
                    parentWrapper.setProps({ value: 'parentValue' });

                    expect(parentWrapper.vm.active).toEqual(true);
                });
            });
        });

        describe('methods', () => {
            describe('getDispatchProps()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.getDispatchProps).toBeDefined();
                });

                it('should return object containing value, label and disabled state', () => {
                    const props = { value: 'abc', label: 'abc', disabled: true };

                    wrapper.setProps(props);

                    expect(wrapper.vm.getDispatchProps()).toEqual(props);
                });
            });

            describe('onClick()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.onClick).toBeDefined();
                });

                it('should return if disabled', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ disabled: true });
                    wrapper.vm.onClick();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should emit click event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                });

                it('should dispatch menu-item-click and option-click', () => {
                    const spy = jest.spyOn(wrapper.vm, 'dispatch');

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenNthCalledWith(1, 'ISelect', 'option-click', wrapper.vm.getDispatchProps());
                    expect(spy).toHaveBeenNthCalledWith(2, 'IDropdown', 'menu-item-click', wrapper.vm);
                });
            });
        });

        describe('created()', () => {
            it('should be defined', () => {
                expect(SelectOption.created).toBeDefined();
            });

            it('should add class rules to classes provider', () => {
                const spy = jest.spyOn(wrapper.vm.classesProvider, 'add');
                const classRulesLength = wrapper.vm.classesProvider.length;

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(wrapper.vm.classesProvider.length).toEqual(classRulesLength + 1);
            });

            it('should have "-active" class added', () => {
                const rule = wrapper.vm.classesProvider[wrapper.vm.classesProvider.length - 1];

                expect(rule()).toEqual(expect.objectContaining({
                    '-active': false
                }));
            });
        });

        describe('mounted()', () => {
            it('should be defined', () => {
                expect(SelectOption.mounted).toBeDefined();
            });

            it('should dispatch menu-item-mounted and option-mounted', () => {
                const spy = jest.spyOn(wrapper.vm, 'dispatch');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenNthCalledWith(1, 'ISelect', 'option-mounted', wrapper.vm.getDispatchProps());
                expect(spy).toHaveBeenNthCalledWith(2, 'IDropdown', 'dropdown-item-mounted', wrapper.vm);
            });
        });

        describe('destroyed()', () => {
            it('should be defined', () => {
                expect(SelectOption.destroyed).toBeDefined();
            });

            it('should dispatch menu-item-destroyed and option-destroyed', () => {
                const spy = jest.spyOn(wrapper.vm, 'dispatch');

                wrapper.vm.destroyed();

                expect(spy).toHaveBeenNthCalledWith(1, 'ISelect', 'option-destroyed', wrapper.vm.getDispatchProps());
                expect(spy).toHaveBeenNthCalledWith(2, 'IDropdown', 'dropdown-item-destroyed', wrapper.vm);
            });
        });
    });
});
