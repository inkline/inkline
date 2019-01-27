import { shallowMount } from '@vue/test-utils';
import { popupManager } from '@inkline/inkline/factories/PopupManager';
import Modal from '@inkline/inkline/components/Modal';

describe('Components', () => {
    describe('Modal', () => {
        let wrapper;

        beforeEach(() => {
            wrapper = shallowMount(Modal, {
                propsData: {
                    id: 'modal'
                },
                slots: {
                    default: ['<div/>']
                },
                methods: {
                    created: Modal.created,
                    destroyed: Modal.destroyed
                }
            });
        });

        it('should render correctly', () => {
            expect(wrapper.html()).toMatchSnapshot();
        });

        describe('props', () => {
            describe('transition', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.transition).toBeDefined();
                    expect(wrapper.vm.transition).toEqual('zoom-in-center-transition');
                });
            });

            describe('closeOnPressEscape', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.closeOnPressEscape).toBeDefined();
                    expect(wrapper.vm.closeOnPressEscape).toEqual(true);
                });
            });

            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual(false);
                });
            });
        });

        describe('computed', () => {
            describe('visible', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.visible).toBeDefined();
                });

                it('should equal value', () => {
                    expect(wrapper.vm.visible).toEqual(wrapper.vm.value);

                    wrapper.setProps({ value: true });

                    expect(wrapper.vm.visible).toEqual(wrapper.vm.value);
                });
            });
        });

        describe('data', () => {
            describe('basename', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.basename).toBeDefined();
                    expect(wrapper.vm.basename).toEqual('modal');
                });
            });

            describe('id', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.id).toBeDefined();
                    expect(wrapper.vm.id).toEqual('modal');
                });

                it('should be randomly generated if not defined', () => {
                    wrapper = shallowMount(Modal, {
                        slots: {
                            default: ['<div/>']
                        }
                    });

                    expect(wrapper.vm.id).toMatch(/^modal-\w+/);
                });
            });
        });

        describe('methods', () => {
            describe('show()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.show).toBeDefined();
                });

                it('should set value to true', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.show();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', true);
                });

                it('should not set value to true if disabled', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ disabled: true });
                    wrapper.vm.show();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should emit show event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.vm.show();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('show', wrapper.vm);
                });

                it('should call popupManager openModal', () => {
                    const spy = jest.spyOn(popupManager, 'openModal');

                    wrapper.vm.show();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(wrapper.vm.id);
                });
            });

            describe('hide()', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.hide).toBeDefined();
                });

                it('should set value to false', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ value: true });
                    wrapper.vm.hide();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('input', false);
                });

                it('should not set value to false if disabled', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ value: true, disabled: true });
                    wrapper.vm.hide();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should emit hide event', () => {
                    const spy = jest.spyOn(wrapper.vm, '$emit');

                    wrapper.setProps({ value: true });
                    wrapper.vm.hide();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenLastCalledWith('hide', wrapper.vm);
                });

                it('should call popupManager closeModal', () => {
                    const spy = jest.spyOn(popupManager, 'closeModal');

                    wrapper.setProps({ value: true });
                    wrapper.vm.hide();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith(wrapper.vm.id);
                });
            });
        });

        describe('watch', () => {
            describe('value()', () => {
                it('should not call show() or hide() if disabled', () => {
                    const spy1 = jest.spyOn(wrapper.vm, 'show');
                    const spy2 = jest.spyOn(wrapper.vm, 'hide');

                    wrapper.setProps({ disabled: true });
                    wrapper.setProps({ value: true });
                    wrapper.setProps({ value: false });

                    expect(spy1).not.toHaveBeenCalled();
                    expect(spy2).not.toHaveBeenCalled();
                });

                it('should call show() if value changes to true', () => {
                    const spy = jest.spyOn(wrapper.vm, 'show');

                    wrapper.setProps({ value: true });

                    expect(spy).toHaveBeenCalled();
                });

                it('should call hide() if value changes to false', () => {
                    const spy = jest.spyOn(wrapper.vm, 'hide');

                    wrapper.setProps({ value: true });
                    wrapper.setProps({ value: false });

                    expect(spy).toHaveBeenCalled();
                });
            });
        });

        describe('created()', () => {
            it('should be defined', () => {
                expect(Modal.created).toBeDefined();
            });

            it('should register the modal to the popup manager', () => {
                const spy = jest.spyOn(popupManager, 'register');

                wrapper.vm.created();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(wrapper.vm);
            });
        });

        describe('destroyed()', () => {
            it('should be defined', () => {
                expect(Modal.destroyed).toBeDefined();
            });

            it('should unregister the modal from the popup manager', () => {
                const spy = jest.spyOn(popupManager, 'unregister');

                wrapper.vm.destroyed();

                expect(spy).toHaveBeenCalled();
                expect(spy).toHaveBeenCalledWith(wrapper.vm);
            });
        });
    });
});
