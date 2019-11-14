import { shallowMount } from '@vue/test-utils'

import PopupControlsProviderMixin from '@inkline/inkline/src/mixins/components/providers/PopupControlsProviderMixin';

describe('Mixins', () => {
    describe('PopupControlsProviderMixin', () => {
        let wrapper;

        beforeEach(() => {
            const Component = {
                name: 'Popup',
                props: {
                    disabled: { type: Boolean, default: false },
                    basename: { type: String, default: '' },
                    id: { type: String, default: '' },
                },
                mixins: [
                    PopupControlsProviderMixin
                ],
                template: '<div ref="popup"><slot></slot></div>'
            };

            wrapper = shallowMount(Component, {
                propsData: {
                    basename: 'popup',
                    id: 'popup'
                },
                methods: {
                    mounted: PopupControlsProviderMixin.mounted,
                    destroyed: PopupControlsProviderMixin.destroyed
                },
                slots: {
                    default: ['<div/>']
                }
            });
        });

        describe('props', () => {
            describe('trigger', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.trigger).toBeDefined();
                    expect(wrapper.vm.trigger).toEqual('click');
                });
            });

            describe('showTimeout', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.showTimeout).toBeDefined();
                    expect(wrapper.vm.showTimeout).toEqual(250);
                });
            });

            describe('hideTimeout', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.hideTimeout).toBeDefined();
                    expect(wrapper.vm.hideTimeout).toEqual(150);
                });
            });

            describe('value', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.value).toBeDefined();
                    expect(wrapper.vm.value).toEqual(false);
                });
            });
        });

        describe('data', () => {
            describe('timeout', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.timeout).toBeDefined();
                    expect(wrapper.vm.timeout).toEqual(null);
                });
            });

            describe('popupElement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.popupElement).toBeDefined();
                });
            });

            describe('triggerElement', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.triggerElement).toBeDefined();
                });
            });

            describe('visible', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.visible).toBeDefined();
                    expect(wrapper.vm.visible).toEqual(false);
                });
            });
        });

        describe('computed', () => {
            describe('triggers', () => {
                it('should be defined', () => {
                    expect(wrapper.vm.triggers).toBeDefined();
                });

                it('should equal to trigger if trigger is array', () => {
                    wrapper.setProps({
                        trigger: ['focus']
                    });

                    expect(wrapper.vm.triggers).toEqual(wrapper.vm.trigger);
                });

                it('should equal to [trigger] if trigger is not array', () => {
                    wrapper.setProps({
                        trigger: 'focus'
                    });

                    expect(wrapper.vm.triggers).toEqual([wrapper.vm.trigger]);
                });
            });
        });

        describe('methods', () => {
            describe('onClick()', () => {
                it('should call hide() if visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'hide');
                    wrapper.setData({ visible: true });

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                });

                it('should call show() if not visible', () => {
                    const spy = jest.spyOn(wrapper.vm, 'show');
                    wrapper.setData({ visible: false });

                    wrapper.vm.onClick();

                    expect(spy).toHaveBeenCalled();
                });

                it('should not execute if disabled', () => {
                    const spy = jest.spyOn(wrapper.vm, 'hide');
                    wrapper.setData({ visible: true });
                    wrapper.setProps({ disabled: true });

                    wrapper.vm.onClick();

                    expect(spy).not.toHaveBeenCalled();
                });
            });

            describe('onClickOutside()', () => {
                it('should not call hide() if value is true', () => {
                    const spy = jest.spyOn(wrapper.vm, 'hide');
                    wrapper.setProps({ value: true });

                    wrapper.vm.onClickOutside();

                    expect(spy).not.toHaveBeenCalled();
                });

                it('should call hide() if value is false', () => {
                    const spy = jest.spyOn(wrapper.vm, 'hide');
                    wrapper.setProps({ value: false });

                    wrapper.vm.onClickOutside();

                    expect(spy).toHaveBeenCalled();
                });
            });

            describe('show()', () => {
                it('should set visible to true instantly if trigger is set to "click"', (done) => {
                    wrapper.setData({ visible: false });

                    wrapper.vm.show();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(true);
                        done();
                    }, 0);
                });

                it('should set visible to true after showTimeout if trigger is set to "hover"', (done) => {
                    wrapper.setData({ visible: false });
                    wrapper.setProps({ trigger: 'hover' });

                    wrapper.vm.show();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(true);
                        done();
                    }, 500);
                });

                it('should not set visible to true if disabled', (done) => {
                    wrapper.setData({ visible: false });
                    wrapper.setProps({ disabled: true });

                    wrapper.vm.show();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(false);
                        done();
                    }, 0);
                });
            });

            describe('hide()', () => {
                it('should set visible to false instantly if trigger is set to "click"', (done) => {
                    wrapper.setData({ visible: true });

                    wrapper.vm.hide();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(false);
                        done();
                    }, 0);
                });

                it('should set visible to false after showTimeout if trigger is set to "hover"', (done) => {
                    wrapper.setData({ visible: true });
                    wrapper.setProps({ trigger: 'hover' });

                    wrapper.vm.hide();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(false);
                        done();
                    }, 500);
                });

                it('should not set visible to false if disabled', (done) => {
                    wrapper.setData({ visible: true });
                    wrapper.setProps({ disabled: true });

                    wrapper.vm.hide();

                    setTimeout(() => {
                        expect(wrapper.vm.visible).toEqual(true);
                        done();
                    }, 0);
                });
            });

            describe('initElements()', () => {
                it('should throw error if trigger element not provided', () => {
                    wrapper.vm.$slots.default = [];

                    expect(() => wrapper.vm.initElements())
                        .toThrowError('Popup component requires one child element');
                });

                it('should throw error if default slot not provided', () => {
                    wrapper.vm.$slots.default = undefined;

                    expect(() => wrapper.vm.initElements())
                        .toThrowError('Popup component requires one child element');
                });

                it('should set triggerElement and dropdownElement', () => {
                    wrapper.setData({ triggerElement: null, popupElement: null });

                    wrapper.vm.initElements();

                    expect(wrapper.vm.triggerElement).not.toEqual(null);
                    expect(wrapper.vm.popupElement).not.toEqual(null);
                });
            });

            describe('initAriaAttributes()', () => {
                it('should set popupElement id', () => {
                    const spy = jest.spyOn(wrapper.vm.popupElement, 'setAttribute');

                    wrapper.vm.initAriaAttributes();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenCalledWith('id', wrapper.vm.id);
                });

                it('should set triggerElement aria-haspopup and aria-controls', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'setAttribute');

                    wrapper.vm.initAriaAttributes();

                    expect(spy).toHaveBeenCalled();
                    expect(spy).toHaveBeenNthCalledWith(1, 'aria-haspopup', wrapper.vm.basename);
                    expect(spy).toHaveBeenNthCalledWith(2, 'aria-controls', wrapper.vm.id);
                });
            });

            describe('addEvents()', () => {
                it('should add click event to triggerElement if trigger is "click"', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'addEventListener');
                    wrapper.setProps({ trigger: 'click' });

                    wrapper.vm.addEvents();

                    expect(spy).toHaveBeenNthCalledWith(1, 'click', wrapper.vm.onClick);
                });

                it('should add mouseenter and mouseleave events to trigger element if trigger is "hover"', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'addEventListener');
                    wrapper.setProps({ trigger: 'hover' });

                    wrapper.vm.addEvents();

                    expect(spy).toHaveBeenNthCalledWith(1, 'mouseenter', wrapper.vm.show);
                    expect(spy).toHaveBeenNthCalledWith(2, 'mouseleave', wrapper.vm.hide);
                });

                it('should add focus and blur events to trigger element if trigger is "focus"', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'addEventListener');
                    wrapper.setProps({ trigger: 'focus' });

                    wrapper.vm.addEvents();

                    expect(spy).toHaveBeenNthCalledWith(1, 'focus', wrapper.vm.show);
                    expect(spy).toHaveBeenNthCalledWith(2, 'blur', wrapper.vm.hide);
                });
            });

            describe('removeEvents()', () => {
                it('should add click event to triggerElement if trigger is "click"', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'removeEventListener');
                    wrapper.setProps({ trigger: 'click' });

                    wrapper.vm.removeEvents();

                    expect(spy).toHaveBeenNthCalledWith(1, 'click', wrapper.vm.onClick);
                });

                it('should add mouseenter and mouseleave events to trigger element if trigger is "hover"', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'removeEventListener');
                    wrapper.setProps({ trigger: 'hover' });

                    wrapper.vm.removeEvents();

                    expect(spy).toHaveBeenNthCalledWith(1, 'mouseenter', wrapper.vm.show);
                    expect(spy).toHaveBeenNthCalledWith(2, 'mouseleave', wrapper.vm.hide);
                });

                it('should remove focus and blur events to trigger element if trigger is "focus"', () => {
                    const spy = jest.spyOn(wrapper.vm.triggerElement, 'removeEventListener');
                    wrapper.setProps({ trigger: 'focus' });

                    wrapper.vm.removeEvents();

                    expect(spy).toHaveBeenNthCalledWith(1, 'focus', wrapper.vm.show);
                    expect(spy).toHaveBeenNthCalledWith(2, 'blur', wrapper.vm.hide);
                });
            });
        });

        describe('mounted()', () => {
            it('should initialize elements', () => {
                const spy = jest.spyOn(wrapper.vm, 'initElements');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
            });

            it('should add events', () => {
                const spy = jest.spyOn(wrapper.vm, 'addEvents');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
            });

            it('should initialize aria attributes', () => {
                const spy = jest.spyOn(wrapper.vm, 'initAriaAttributes');

                wrapper.vm.mounted();

                expect(spy).toHaveBeenCalled();
            });
        });


        describe('destroyed()', () => {
            it('should remove events', () => {
                const spy = jest.spyOn(wrapper.vm, 'removeEvents');

                wrapper.vm.destroyed();

                expect(spy).toHaveBeenCalled();
            });
        });
    });
});
